import React, { useState, useRef, useEffect, useCallback } from "react";

/**
 * ReadyHostChat — embedded AI sales-qualification chat widget.
 *
 * Architecture:
 *   <ReadyHostChat /> (this component, client)
 *      ↓ POST /api/chat   (no API key)
 *   api/chat.js (Vercel serverless, holds ANTHROPIC_API_KEY + system prompt)
 *      ↓
 *   Anthropic Messages API
 *
 * Lead capture is FRICTIONLESS — Claude gathers name/phone/email/service_type
 * via natural conversation. When ready, it emits a [SUBMIT_LEAD]{json}[/SUBMIT_LEAD]
 * token. This component detects the token, strips it from the displayed text,
 * parses the JSON, and POSTs to Formspree (xnjwbzke). No inline form.
 */

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xnjwbzke";
const TOAST_SESSION_KEY = "rh_chat_toast_shown";
const TOAST_DELAY_MS = 3000;
const TOAST_DISMISS_MS = 5000;

const SUGGESTED_OPENERS = [
  "I host on Airbnb",
  "I manage multiple properties (PMC)",
  "I run a hotel",
  "I want to clean for ReadyHost",
];

const SERVICE_LABELS = {
  host: "Airbnb host",
  pmc: "Property manager / PMC",
  hotel: "Hotel",
  cleaner: "Cleaner applicant",
  other: "Other",
};

// Detects [SUBMIT_LEAD]{json}[/SUBMIT_LEAD] anywhere in a message
const SUBMIT_TOKEN_RE = /\[SUBMIT_LEAD\]([\s\S]*?)\[\/SUBMIT_LEAD\]/;

function nowTime() {
  return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function extractLead(text) {
  if (!text) return { lead: null, cleanText: text };
  const match = text.match(SUBMIT_TOKEN_RE);
  if (!match) return { lead: null, cleanText: text };
  let lead = null;
  try {
    lead = JSON.parse(match[1].trim());
  } catch {
    // malformed JSON — ignore the token, keep raw message
    return { lead: null, cleanText: text };
  }
  const cleanText = text.replace(SUBMIT_TOKEN_RE, "").trim();
  return { lead, cleanText };
}

export default function ReadyHostChat({ apiPath = "/api/chat" }) {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hey, I'm ReadyHost — your AI assistant. Are you a host, property manager, hotel, or interested in cleaning for us?",
      time: nowTime(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [submitState, setSubmitState] = useState("idle"); // idle | submitting | success | error
  const [submitError, setSubmitError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // ─────────────────────── ONBOARDING TOAST ───────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;
    let shown = false;
    try {
      shown = window.sessionStorage.getItem(TOAST_SESSION_KEY) === "1";
    } catch {
      // sessionStorage may be blocked; just don't show toast in that case
      return;
    }
    if (shown) return;

    const showT = setTimeout(() => {
      // Don't show toast if chat is already open
      if (!open) {
        setShowToast(true);
        try {
          window.sessionStorage.setItem(TOAST_SESSION_KEY, "1");
        } catch {
          /* noop */
        }
      }
    }, TOAST_DELAY_MS);

    return () => clearTimeout(showT);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-dismiss + click-anywhere dismiss
  useEffect(() => {
    if (!showToast) return;
    const dismissT = setTimeout(() => setShowToast(false), TOAST_DISMISS_MS);
    const onAnyClick = () => setShowToast(false);
    // Slight delay before binding click handler so the toast itself isn't dismissed by the same render-tick click
    const bindT = setTimeout(() => {
      window.addEventListener("click", onAnyClick, { passive: true });
    }, 200);
    return () => {
      clearTimeout(dismissT);
      clearTimeout(bindT);
      window.removeEventListener("click", onAnyClick);
    };
  }, [showToast]);

  // Auto-scroll to bottom on new content
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isSending, submitState]);

  // Reset unread when opened
  useEffect(() => {
    if (open) {
      setUnread(0);
      setShowToast(false);
    }
  }, [open]);

  // ─────────────────────── FORMSPREE SUBMIT ───────────────────────
  const submitLead = useCallback(
    async (lead, fullMessages) => {
      setSubmitState("submitting");
      setSubmitError("");

      const transcript = fullMessages
        .map(
          (m) =>
            `${m.role === "user" ? "Visitor" : "ReadyHost AI"}: ${m.displayContent || m.content}`
        )
        .join("\n\n");

      const serviceLabel = SERVICE_LABELS[lead.service] || lead.service || "Other";

      const payload = new FormData();
      payload.append("name", lead.name || "");
      payload.append("email", lead.email || "");
      payload.append("phone", lead.phone || "");
      payload.append("service_type", serviceLabel);
      payload.append("inquiry_details", lead.summary || "");
      payload.append(
        "message",
        `Captured from AI chat.\n\nService: ${serviceLabel}\nSummary: ${lead.summary || "—"}\n\n--- TRANSCRIPT ---\n${transcript}`
      );
      payload.append(
        "_subject",
        `New ReadyHost AI chat lead — ${lead.name || "Web visitor"} (${serviceLabel})`
      );
      if (lead.email) payload.append("_replyto", lead.email);

      try {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          body: payload,
          headers: { Accept: "application/json" },
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(
            data?.errors?.[0]?.message || `Submission failed (status ${res.status})`
          );
        }
        setSubmitState("success");
      } catch (err) {
        setSubmitError(
          err.message || "Couldn't submit. Please email hello@readyhosts.co directly."
        );
        setSubmitState("error");
      }
    },
    []
  );

  // ─────────────────────── SEND MESSAGE ───────────────────────
  const sendMessage = useCallback(
    async (text) => {
      const trimmed = (text || "").trim();
      if (!trimmed || isSending || submitState === "submitting" || submitState === "success") return;

      const userMsg = { role: "user", content: trimmed, time: nowTime() };
      const next = [...messages, userMsg];
      setMessages(next);
      setInput("");
      setIsSending(true);

      try {
        const res = await fetch(apiPath, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            messages: next.map(({ role, content }) => ({ role, content })),
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.error || "Request failed");

        const rawReply = data.reply || "Sorry — could you say that again?";
        const { lead, cleanText } = extractLead(rawReply);

        const assistantMsg = {
          role: "assistant",
          // Send `content` (raw with token) back to the API in future turns,
          // display `displayContent` (token-stripped) to the user.
          content: rawReply,
          displayContent: cleanText,
          time: nowTime(),
        };

        const updated = [...next, assistantMsg];
        setMessages(updated);
        if (!open) setUnread((u) => u + 1);

        // If Claude sent a submission token AND we haven't already submitted, fire it.
        if (lead && submitState === "idle") {
          // basic sanity check — need at minimum an email
          if (lead.email && lead.name) {
            await submitLead(lead, updated);
          }
        }
      } catch (err) {
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content:
              "I'm having trouble responding right now. Email hello@readyhosts.co — Nethaneel gets back to everyone within 24 hours.",
            time: nowTime(),
            isError: true,
          },
        ]);
      } finally {
        setIsSending(false);
      }
    },
    [messages, isSending, apiPath, open, submitState, submitLead]
  );

  const onInputKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const startNewChat = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Fresh start — what can I help with? Host, property manager, hotel, or cleaner?",
        time: nowTime(),
      },
    ]);
    setSubmitState("idle");
    setSubmitError("");
  };

  const hasUserSpoken = messages.some((m) => m.role === "user");
  const conversationLocked = submitState === "submitting" || submitState === "success";

  return (
    <>
      <style>{`
        @keyframes rhSlideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes rhTypingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>

      {/* ==================== ONBOARDING TOAST ==================== */}
      {showToast && !open && (
        <div
          role="status"
          aria-live="polite"
          onClick={(e) => {
            e.stopPropagation();
            setShowToast(false);
          }}
          className="fixed bottom-24 right-4 md:bottom-28 md:right-6 z-[55] max-w-[calc(100vw-2rem)] sm:max-w-xs bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 cursor-pointer"
          style={{ animation: "rhSlideUp 0.25s ease-out" }}
        >
          <p className="text-sm text-gray-800 leading-snug pr-6">
            <span className="text-[#FF6B35]">💬</span> Quick response? Chat with me here — no forms, just questions.
          </p>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={(e) => {
              e.stopPropagation();
              setShowToast(false);
            }}
            className="absolute top-2 right-2 w-6 h-6 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 flex items-center justify-center text-xs font-bold"
          >
            ×
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowToast(false);
              setOpen(true);
            }}
            className="mt-2.5 inline-flex items-center text-xs font-bold text-[#1B6C72] hover:underline"
          >
            Got it →
          </button>
        </div>
      )}

      {/* ==================== LAUNCHER BUBBLE ==================== */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open ReadyHost chat"
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[60] flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-white md:bg-gradient-to-br md:from-[#1B6C72] md:to-[#0c4348] text-[#1B6C72] md:text-white border-2 md:border-0 border-[#1B6C72] shadow-xl md:shadow-2xl hover:shadow-[0_15px_40px_-10px_rgba(27,108,114,0.7)] motion-safe:transition-all motion-safe:hover:-translate-y-0.5"
        >
          <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          {/* Active orange dot */}
          <span
            aria-hidden="true"
            className="absolute top-1 right-1 md:top-2 md:right-2 w-3 h-3 rounded-full bg-[#FF6B35] border-2 border-white shadow"
          />
          {unread > 0 && (
            <span className="absolute -top-1.5 -left-1.5 min-w-[22px] h-[22px] px-1.5 rounded-full bg-[#FF6B35] text-white text-xs font-bold flex items-center justify-center shadow-md">
              {unread > 9 ? "9+" : unread}
            </span>
          )}
        </button>
      )}

      {/* ==================== OPEN PANEL ==================== */}
      {open && (
        <div
          role="dialog"
          aria-label="ReadyHost chat"
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[70] w-[calc(100vw-2rem)] sm:w-[400px] h-[calc(100vh-6rem)] sm:h-[600px] max-h-[700px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          style={{ animation: "rhSlideUp 0.2s ease-out" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#1B6C72] to-[#0c4348] text-white">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <div className="font-bold leading-tight">ReadyHost AI</div>
                <div className="text-[11px] text-white/75 leading-tight flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                  We typically reply in seconds
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Minimize chat"
              className="w-9 h-9 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto bg-[#f9fafb] px-4 py-4 space-y-3">
            {messages.map((m, i) => {
              const display = m.displayContent !== undefined ? m.displayContent : m.content;
              if (!display) return null; // entire message was just the token
              return (
                <MessageBubble
                  key={i}
                  role={m.role}
                  content={display}
                  time={m.time}
                  isError={m.isError}
                />
              );
            })}
            {isSending && <TypingIndicator />}
            {submitState === "submitting" && <SubmittingIndicator />}
            {submitState === "success" && <SuccessBanner onReset={startNewChat} />}
            {submitState === "error" && (
              <div role="alert" className="rounded-xl bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-700">
                {submitError}{" "}
                <a href="mailto:hello@readyhosts.co" className="underline font-semibold">
                  Email Nethaneel directly
                </a>
                .
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="border-t border-gray-200 bg-white">
            {!hasUserSpoken && (
              <div className="px-4 pt-3 flex flex-wrap gap-2">
                {SUGGESTED_OPENERS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => sendMessage(s)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#1B6C72]/10 text-[#1B6C72] hover:bg-[#1B6C72]/20 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-end gap-2 px-3 py-3">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder={
                  conversationLocked
                    ? submitState === "success"
                      ? "Inquiry submitted — start a new chat above"
                      : "Submitting…"
                    : "Type a message…"
                }
                disabled={isSending || conversationLocked}
                className="flex-1 resize-none px-3 py-2.5 min-h-[44px] max-h-[120px] text-base sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1B6C72] focus:border-[#1B6C72] outline-none disabled:bg-gray-50 disabled:text-gray-500"
              />
              <button
                type="button"
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isSending || conversationLocked}
                aria-label="Send"
                className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#ff8554] text-white flex items-center justify-center shadow-md hover:shadow-lg disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed motion-safe:transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>

            <div className="px-4 pb-3 text-[10px] text-gray-400 text-center">
              AI assistant. For urgent requests, email hello@readyhosts.co.
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ==================== Subcomponents ==================== */

function MessageBubble({ role, content, time, isError }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[80%] ${isUser ? "items-end" : "items-start"} flex flex-col`}>
        <div
          className={`px-3.5 py-2.5 text-sm leading-relaxed rounded-2xl whitespace-pre-wrap break-words ${
            isUser
              ? "bg-gradient-to-br from-[#1B6C72] to-[#0c4348] text-white rounded-br-sm"
              : isError
              ? "bg-red-50 text-red-700 border border-red-200 rounded-bl-sm"
              : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm"
          }`}
        >
          {content}
        </div>
        <div className={`mt-1 text-[10px] text-gray-400 px-1 ${isUser ? "text-right" : "text-left"}`}>
          {time}
        </div>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-gray-400"
              style={{ animation: `rhTypingBounce 1.2s infinite ${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SubmittingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-[#1B6C72]/5 border border-[#1B6C72]/20 rounded-2xl rounded-bl-sm px-4 py-3 text-xs text-[#1B6C72] font-semibold flex items-center gap-2">
        <svg className="motion-safe:animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4zm2 5.3A8 8 0 014 12H0c0 3 1.1 5.8 3 7.9l3-2.6z"
          />
        </svg>
        Submitting your request…
      </div>
    </div>
  );
}

function SuccessBanner({ onReset }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#1B6C72]/10 to-[#1B6C72]/5 border border-[#1B6C72]/30 p-4">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#1B6C72] flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold text-gray-900">Request submitted ✓</div>
          <div className="mt-0.5 text-xs text-gray-600">
            Nethaneel will reach out within 24 hours. Check your email for updates.
          </div>
          <button
            type="button"
            onClick={onReset}
            className="mt-2 text-xs font-semibold text-[#1B6C72] hover:underline"
          >
            Start a new conversation
          </button>
        </div>
      </div>
    </div>
  );
}
