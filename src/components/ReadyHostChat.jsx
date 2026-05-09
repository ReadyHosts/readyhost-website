import React, { useState, useRef, useEffect, useCallback } from "react";

/**
 * ReadyHostChat — embedded AI sales-qualification chat widget.
 *
 * Architecture:
 *   <ReadyHostChat /> (this component, client)
 *      ↓ POST /api/chat   (no API key)
 *   api/chat.js (Vercel serverless, holds ANTHROPIC_API_KEY)
 *      ↓
 *   Anthropic Messages API
 *
 * Lead capture: when the visitor clicks "Send my info to ReadyHost", an inline
 * form replaces the input area. On submit, fields go to Formspree (xnjwbzke)
 * along with a transcript of the conversation.
 */

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xnjwbzke";

const SUGGESTED_OPENERS = [
  "I host on Airbnb",
  "I manage multiple properties (PMC)",
  "I run a hotel",
  "I want to clean for ReadyHost",
];

const SERVICE_OPTIONS = [
  { value: "host", label: "Airbnb host" },
  { value: "pmc", label: "Property manager / PMC" },
  { value: "hotel", label: "Hotel" },
  { value: "cleaner", label: "Cleaner applicant" },
  { value: "other", label: "Something else" },
];

const SERVICE_LABELS = SERVICE_OPTIONS.reduce((acc, o) => {
  acc[o.value] = o.label;
  return acc;
}, {});

function nowTime() {
  return new Date().toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

function inferServiceFromConversation(messages) {
  const text = messages.map((m) => m.content.toLowerCase()).join(" ");
  if (/\bcleaner\b|join your team|i clean|i'm a cleaner/.test(text)) return "cleaner";
  if (/\bhotel\b|rooms\b|housekeep/.test(text)) return "hotel";
  if (/\bpmc\b|property manage|portfolio|multiple (units|properties)/.test(text)) return "pmc";
  if (/\bhost\b|airbnb|str|short.term rental|listing/.test(text)) return "host";
  return "other";
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
  const [showForm, setShowForm] = useState(false);
  const [submitState, setSubmitState] = useState("idle"); // idle | sending | success | error
  const [submitError, setSubmitError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service_type: "",
    inquiry_details: "",
  });

  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isSending, showForm]);

  // Reset unread when opened
  useEffect(() => {
    if (open) setUnread(0);
  }, [open]);

  const sendMessage = useCallback(
    async (text) => {
      const trimmed = (text || "").trim();
      if (!trimmed || isSending) return;

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
        if (!res.ok) {
          throw new Error(data?.error || "Request failed");
        }
        const reply = data.reply || "Sorry — could you say that again?";
        setMessages((m) => [
          ...m,
          { role: "assistant", content: reply, time: nowTime() },
        ]);
        if (!open) setUnread((u) => u + 1);
      } catch (err) {
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content:
              "I'm having trouble responding right now. You can email hello@readyhosts.co or click \"Send my info\" below — Nethaneel gets back to everyone within 24 hours.",
            time: nowTime(),
            isError: true,
          },
        ]);
      } finally {
        setIsSending(false);
      }
    },
    [messages, isSending, apiPath, open]
  );

  const onInputKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const openForm = () => {
    // Pre-fill from conversation
    const inferred = inferServiceFromConversation(messages);
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    setForm((f) => ({
      ...f,
      service_type: f.service_type || inferred,
      inquiry_details:
        f.inquiry_details ||
        (lastUser ? lastUser.content.slice(0, 280) : ""),
    }));
    setShowForm(true);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitState("sending");

    const transcript = messages
      .map(
        (m) =>
          `${m.role === "user" ? "Visitor" : "ReadyHost AI"}: ${m.content}`
      )
      .join("\n\n");

    const payload = new FormData();
    payload.append("name", form.name);
    payload.append("email", form.email);
    payload.append("phone", form.phone);
    payload.append("service_type", SERVICE_LABELS[form.service_type] || form.service_type);
    payload.append("inquiry_details", form.inquiry_details);
    payload.append(
      "message",
      `Service interest: ${SERVICE_LABELS[form.service_type] || form.service_type}\n\nInquiry: ${form.inquiry_details}\n\n--- CHAT TRANSCRIPT ---\n${transcript}`
    );
    payload.append(
      "_subject",
      `New ReadyHost AI chat lead — ${form.name || "Web visitor"} (${SERVICE_LABELS[form.service_type] || form.service_type})`
    );
    if (form.email) payload.append("_replyto", form.email);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: payload,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data?.errors?.[0]?.message ||
            `Submission failed (status ${res.status})`
        );
      }
      setSubmitState("success");
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: `Thanks ${form.name.split(" ")[0] || "—"}! Nethaneel will reach out within 24 hours.`,
          time: nowTime(),
        },
      ]);
      setShowForm(false);
    } catch (err) {
      setSubmitError(
        err.message ||
          "Submission failed. Please email hello@readyhosts.co directly."
      );
      setSubmitState("error");
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
    setForm({
      name: "",
      email: "",
      phone: "",
      service_type: "",
      inquiry_details: "",
    });
    setShowForm(false);
    setSubmitState("idle");
    setSubmitError("");
  };

  const hasUserSpoken = messages.some((m) => m.role === "user");

  return (
    <>
      {/* ==================== LAUNCHER BUBBLE ==================== */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open ReadyHost chat"
          className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-[60] flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-[#1B6C72] to-[#0c4348] text-white shadow-2xl hover:shadow-[0_15px_40px_-10px_rgba(27,108,114,0.7)] motion-safe:transition-all motion-safe:hover:-translate-y-0.5"
        >
          <svg className="w-6 h-6 lg:w-7 lg:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[22px] h-[22px] px-1.5 rounded-full bg-[#FF6B35] text-white text-xs font-bold flex items-center justify-center shadow-md">
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
          className="fixed bottom-4 right-4 lg:bottom-6 lg:right-6 z-[70] w-[calc(100vw-2rem)] sm:w-[400px] h-[calc(100vh-6rem)] sm:h-[600px] max-h-[700px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden motion-safe:animate-[slideUp_.2s_ease-out]"
          style={{ animation: "slideUp 0.2s ease-out" }}
        >
          <style>{`
            @keyframes slideUp {
              from { transform: translateY(20px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
            @keyframes typingBounce {
              0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
              30% { transform: translateY(-4px); opacity: 1; }
            }
          `}</style>

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
            {messages.map((m, i) => (
              <MessageBubble key={i} role={m.role} content={m.content} time={m.time} isError={m.isError} />
            ))}
            {isSending && <TypingIndicator />}
            {submitState === "success" && (
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={startNewChat}
                  className="text-xs font-semibold text-[#1B6C72] hover:underline"
                >
                  Start a new conversation
                </button>
              </div>
            )}
          </div>

          {/* Input area OR inline form */}
          {showForm ? (
            <InlineSubmitForm
              form={form}
              setForm={setForm}
              onSubmit={submitForm}
              onCancel={() => setShowForm(false)}
              submitState={submitState}
              submitError={submitError}
            />
          ) : (
            <div className="border-t border-gray-200 bg-white">
              {/* Suggested openers — show only on first turn */}
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
                  placeholder="Type a message…"
                  disabled={isSending || submitState === "success"}
                  className="flex-1 resize-none px-3 py-2.5 min-h-[44px] max-h-[120px] text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1B6C72] focus:border-[#1B6C72] outline-none disabled:bg-gray-50 disabled:text-gray-500"
                />
                <button
                  type="button"
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || isSending}
                  aria-label="Send"
                  className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#ff8554] text-white flex items-center justify-center shadow-md hover:shadow-lg disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed motion-safe:transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>

              {/* Submit info button — visible after first user message */}
              {hasUserSpoken && submitState !== "success" && (
                <div className="px-3 pb-3">
                  <button
                    type="button"
                    onClick={openForm}
                    className="w-full inline-flex items-center justify-center px-4 py-2.5 min-h-[44px] rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#1B6C72] to-[#0c4348] hover:from-[#155357] hover:to-[#0a3a3e] motion-safe:transition-all shadow-sm"
                  >
                    Send my info to ReadyHost
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              )}

              <div className="px-4 pb-3 text-[10px] text-gray-400 text-center">
                AI assistant. For urgent requests, email hello@readyhosts.co.
              </div>
            </div>
          )}
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
              style={{
                animation: `typingBounce 1.2s infinite ${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function InlineSubmitForm({ form, setForm, onSubmit, onCancel, submitState, submitError }) {
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  return (
    <form onSubmit={onSubmit} className="border-t border-gray-200 bg-white p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-gray-900">Confirm your details</h4>
        <button
          type="button"
          onClick={onCancel}
          className="text-xs text-gray-500 hover:text-gray-700 font-medium"
        >
          ← back to chat
        </button>
      </div>

      <FormField
        label="Full name"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
        autoComplete="name"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <FormField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="email"
          inputMode="email"
        />
        <FormField
          label="Phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          autoComplete="tel"
          inputMode="tel"
        />
      </div>
      <div>
        <label htmlFor="service_type" className="block text-xs font-semibold text-gray-700 mb-1">
          I'm a… <span className="text-[#FF6B35]">*</span>
        </label>
        <select
          id="service_type"
          name="service_type"
          value={form.service_type}
          onChange={handleChange}
          required
          className="w-full px-3 py-2.5 min-h-[40px] text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B6C72] focus:border-[#1B6C72] outline-none bg-white"
        >
          <option value="">Select one…</option>
          {SERVICE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="inquiry_details" className="block text-xs font-semibold text-gray-700 mb-1">
          What do you need? <span className="text-[#FF6B35]">*</span>
        </label>
        <textarea
          id="inquiry_details"
          name="inquiry_details"
          rows={2}
          value={form.inquiry_details}
          onChange={handleChange}
          required
          placeholder="A quick sentence — # of properties, type of need, etc."
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B6C72] focus:border-[#1B6C72] outline-none resize-none"
        />
      </div>

      {submitError && (
        <div role="alert" className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-700">
          {submitError}
        </div>
      )}

      <button
        type="submit"
        disabled={submitState === "sending"}
        className="w-full inline-flex items-center justify-center px-4 py-2.5 min-h-[44px] rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#FF6B35] to-[#ff8554] hover:from-[#e85a26] hover:to-[#ff6b35] disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed motion-safe:transition-all shadow-md"
      >
        {submitState === "sending" ? "Sending…" : "Send to Nethaneel"}
      </button>
      <p className="text-[10px] text-gray-400 text-center">
        Submissions are processed by Formspree.
      </p>
    </form>
  );
}

function FormField({ label, name, value, onChange, type = "text", required, autoComplete, inputMode }) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-semibold text-gray-700 mb-1">
        {label}{required && <span className="text-[#FF6B35]"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="w-full px-3 py-2.5 min-h-[40px] text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B6C72] focus:border-[#1B6C72] outline-none"
      />
    </div>
  );
}
