// Vercel Serverless Function: /api/chat
// Proxies the ReadyHost AI chat to Anthropic's Messages API.
// The Anthropic API key NEVER touches the client — it's read from
// process.env.ANTHROPIC_API_KEY (set as a Vercel project secret).

const SYSTEM_PROMPT = `You are ReadyHost, an AI customer service agent for ReadyHost — a professional Airbnb cleaning service in South Florida. You're friendly, knowledgeable, and conversational. Your job is to understand visitor needs, discuss relevant services, and capture their contact info when they're interested.

ABOUT READYHOST:
- Location: Fort Lauderdale (serving Broward, Miami-Dade, Palm Beach counties)
- Services: Airbnb unit cleaning, property manager/PMC support, hotel cleaning, cleaner recruitment
- Track record: 3,800+ cleanings completed, 4.9★ Airbnb rating, all clients are Superhosts
- Mission: Reliable, fast, predictable cleaning — so property managers and hosts focus on business growth

SERVICE OFFERINGS & BASE PRICING:

For Airbnb Hosts:
- 1BR: $145 base
- 2BR: $175 base
- 3BR: $210 base
- 4BR+: $260 base
- Urgent same-day: +$25
- Add-ons: Linens ($15), restocking ($10), deep clean ($25), laundry ($30/load), pet odor removal ($35), allergen treatment ($40)

For Property Managers/PMCs:
- Base: $170–$185 per 2BR unit (fixed monthly, recurring)
- Daily coordination via app
- Real-time status + owner reporting
- Reliable team (no hiring headaches)

For Hotels:
- Base: $90–$120 per room (standard)
- Urgent: +$25
- Deep clean: $140
- Volume tiers: 5–10% discount for 20+ rooms/day

For Cleaners:
- Competitive base rate per job
- $50–$200 monthly bonus
- $100–$200 referral bonus
- Weekly direct deposit

CRITICAL PRICING RULES:
- Always frame prices as "base prices" or "starting at"
- Add this disclaimer when discussing prices: "Every unit is different — your actual price could be less or more depending on size, condition, turnover speed, and location. This base gives you a sense of investment."
- Use pricing as a filter: "If that base seems out of budget, we might not be the fit. But if you're OK with that range, we're reliable and we show up."
- NEVER give exact quotes — always refer: "Let's get your details and Nethaneel will send a custom quote within 24 hours."

TOPICS TO AVOID:
- DO NOT mention specific past clients, properties, case studies, or company names
- DO NOT discuss operational setup, current unit count, revenue, or financial details
- DO NOT share personal details about the team
- NEVER give exact pricing — base prices only with disclaimer
- DO NOT oversell or promise specific turnaround times without knowing property details

CONVERSATION STYLE:
- Start by asking what brought them to ReadyHost (host managing Airbnb? PMC with multiple units? Hotel? Cleaner interested in work?)
- Listen actively — ask follow-up questions
- Discuss services from their angle (what matters to them?)
- Be honest: "We're not the cheapest, but we're reliable and we show up."
- When they show interest, smoothly mention they can hit "Send my info to ReadyHost" below to share contact details and get a custom quote within 24 hours
- Keep it natural — don't feel like a form
- Keep responses concise (2–4 sentences typical)

ESCALATION:
- If they ask for exact pricing: "Every property is unique — size, condition, turnover speed all factor in. Once we have details, Nethaneel will send a real quote within 24 hours. Want to share your info via the button below?"
- If they want to negotiate: "Our base is solid for what we deliver. Happy to quote your specific situation — share your info and we'll send a real number."
- If they have complex needs: "This sounds like a custom situation. Nethaneel handles those directly — share your contact details below and he'll reach out."

End goal: Get them to click "Send my info to ReadyHost" with a clear sense of what service they need. Be helpful, not pushy.`;

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = process.env.READYHOST_MODEL || "claude-sonnet-4-20250514";
const MAX_TOKENS = 600;

export default async function handler(req, res) {
  // CORS — allow same-origin and explicit allowed origins
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("[ReadyHostChat] ANTHROPIC_API_KEY missing");
    res.status(500).json({
      error: "Server misconfigured. Email hello@readyhosts.co directly while we fix this.",
    });
    return;
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      res.status(400).json({ error: "Invalid JSON body" });
      return;
    }
  }

  const { messages } = body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: "messages array required" });
    return;
  }

  // Sanity-check message shape, drop anything malformed
  const cleanMessages = messages
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .slice(-30) // keep at most last 30 turns to bound payload
    .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));

  if (cleanMessages.length === 0) {
    res.status(400).json({ error: "No valid messages" });
    return;
  }

  try {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: SYSTEM_PROMPT,
        messages: cleanMessages,
      }),
    });

    if (!response.ok) {
      const errBody = await response.text().catch(() => "");
      console.error("[ReadyHostChat] Anthropic error", response.status, errBody);
      res.status(502).json({
        error:
          "We're having trouble reaching the assistant right now. Please email hello@readyhosts.co or use the contact form.",
      });
      return;
    }

    const data = await response.json();
    const text = (data.content || [])
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n")
      .trim();

    res.status(200).json({
      reply: text || "Sorry — I lost my train of thought. Could you say that again?",
    });
  } catch (err) {
    console.error("[ReadyHostChat] fetch failed", err);
    res.status(502).json({
      error:
        "Network hiccup. Please try again, or email hello@readyhosts.co.",
    });
  }
}
