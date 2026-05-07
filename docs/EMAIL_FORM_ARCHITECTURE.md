# ReadyHost — Email & Form Architecture

How a contact form submission ends up in your inbox.

---

## Two services, one flow

| Service | Job |
|---|---|
| **Cloudflare Email Routing** | Receives anything sent to `hello@readyhosts.co` and forwards it to your real inbox |
| **Formspree** | Catches form submissions from `readyhosts.co`, validates them, and emails them to `hello@readyhosts.co` |

Together they replace the brittle `mailto:` form (which loses ~50% of leads) with a real backend that has spam filtering, retry logic, and a dashboard showing every submission.

---

## Path 1: Visitor uses the contact form

```
[ readyhosts.co contact form ]
            │
            │  fetch POST (FormData)
            ▼
[ Formspree endpoint ]
            │
            │  validates, spam-checks, formats email
            ▼
[ hello@readyhosts.co ]
            │
            │  Cloudflare Email Routing intercepts
            ▼
[ nethaneel.nb.brown@gmail.com ]   ← you read it here
```

Total time: ~5–10 seconds end to end.

## Path 2: Someone emails hello@readyhosts.co directly

```
[ External sender ]
            │
            ▼
[ Cloudflare MX records for readyhosts.co ]
            │
            │  Email Routing rule: "hello" → forward
            ▼
[ nethaneel.nb.brown@gmail.com ]
```

Total time: ~30 seconds.

---

## Configuration details

### Cloudflare
| Setting | Value |
|---|---|
| Domain | readyhosts.co |
| Service | Email Routing |
| Custom address | `hello` |
| Destination | `nethaneel.nb.brown@gmail.com` (editable) |
| Status | Pending nameserver cutover |

### Formspree
| Setting | Value |
|---|---|
| Form name | ReadyHost Contact Form |
| Endpoint | `https://formspree.io/f/<ID>` |
| Notification email | `hello@readyhosts.co` |
| Captured fields | name, email, phone, properties, message |
| Spam filter | Default (Akismet + honeypot) |

### React component (`src/ReadyHost_Main.jsx`)
| Item | Detail |
|---|---|
| Endpoint constant | `FORMSPREE_ENDPOINT` (top of file, ~line 16) |
| Submit handler | `handleSubmit` — async fetch with FormData payload |
| Loading state | `isSubmitting` — disables button, shows "Sending…" |
| Error state | `submitError` — renders red banner above button |
| Success state | `sent` — replaces form with "Inquiry received." card |
| Form reset | Triggers automatically on successful submission |

---

## Why this architecture (vs. alternatives)

| Alternative | Why we didn't pick it |
|---|---|
| `mailto:` (current) | ~50% drop-off; no record of who tried; no spam filter; depends on user having a mail client configured |
| Resend + custom Edge Function | Better long-term but adds ~2 hours of build + DNS for SPF/DKIM. Overkill for current volume. |
| Google Workspace + Gmail SMTP | $6/user/month plus DNS work. Pay only when you need a real `hello@` mailbox to send from. |
| Native Vercel form handler | Doesn't exist — Vercel doesn't ship a form-to-email service. |
| GoDaddy's email forwarding | Breaks the moment we move nameservers off GoDaddy. |

**Formspree free tier:** 50 submissions/month, all features. Upgrade ($10/mo) when you cross that threshold.

---

## Testing checklist

- [ ] Cloudflare Email Routing enabled
- [ ] Custom address `hello@readyhosts.co` verified at destination
- [ ] Direct email to `hello@readyhosts.co` arrives at destination inbox (after DNS cutover)
- [ ] Formspree form created with correct notification email
- [ ] React component endpoint constant updated with real Formspree ID
- [ ] Local form submission returns 200 from Formspree
- [ ] Form submission email arrives at destination inbox
- [ ] Subject and body include all 5 fields
- [ ] Reply-to header is the submitter's email

---

## Troubleshooting

**Form submits but no email arrives:**
1. Check Formspree dashboard → submission shows up?
   - YES → problem is downstream (Cloudflare or destination inbox spam)
   - NO → endpoint URL is wrong in React code
2. Verify FORMSPREE_ENDPOINT in `src/ReadyHost_Main.jsx` matches the URL Formspree gave you
3. Check spam folder in destination inbox

**Form returns error in browser:**
1. Open browser DevTools → Network tab → find the POST request
2. Status 404 → endpoint typo
3. Status 422 → Formspree validation rejected (check field names)
4. Status 403 → form not yet activated (Formspree requires confirming the email address on first submit)
5. Status 0 / network error → CORS issue (rare with Formspree, contact their support)

**Direct emails to hello@readyhosts.co don't arrive:**
1. Check `dig readyhosts.co MX` — should return Cloudflare's mail servers (mailstream-*.mx.cloudflare.net)
2. If still GoDaddy MX → DNS hasn't cut over yet, wait
3. Verify Cloudflare Email Routing is enabled (not just configured)
4. Verify destination address was confirmed via verification email
5. Cloudflare → Email → Activity log → check delivery status per message

---

## Files

| File | Purpose |
|---|---|
| `src/ReadyHost_Main.jsx` | React component with Formspree integration |
| `docs/CLOUDFLARE_SETUP_LOG.md` | Cloudflare setup steps + test results |
| `docs/CLOUDFLARE_NAMESERVERS.txt` | Cloudflare-assigned nameservers (paste from dashboard) |
| `docs/FORMSPREE_CONFIG.txt` | Formspree form ID + recommended settings |
| `docs/NEXT_STEPS_AFTER_EMAIL_SETUP.md` | DNS cutover + Vercel deploy procedure |
| `docs/LAUNCH_CHECKLIST.md` | Full pre-launch verification |
