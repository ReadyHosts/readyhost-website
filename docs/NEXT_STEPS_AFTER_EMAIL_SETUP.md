# Next Steps: Deploying ReadyHost (Cloudflare-fronted)

You've finished email + form setup. Here's the cutover order.

> **Architecture:** GoDaddy → (nameservers) → Cloudflare DNS → (CNAME) → Vercel. This differs from the original `DEPLOYMENT_GUIDE.md`, which routed nameservers directly to Vercel. The Cloudflare route is preferred because Cloudflare also handles email and gives you free CDN/DDoS protection.

---

## 1. Push to GitHub + deploy to Vercel

Same as `DEPLOYMENT_GUIDE.md` sections 2–4:

```bash
cd ~/Desktop/ReadyHost/Website
npm create vite@latest . -- --template react
npm install
# … Tailwind setup, see DEPLOYMENT_GUIDE.md for full detail
git init && git add . && git commit -m "Initial ReadyHost website"
# Push to GitHub repo "readyhost-website"
# Import into Vercel
```

After Vercel deploys, you'll have a URL like `readyhost-website.vercel.app`. Confirm the site loads there before doing DNS.

---

## 2. Update FORMSPREE_ENDPOINT in the code

Open `src/ReadyHost_Main.jsx`, find the line near the top:

```js
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORMSPREE_ID";
```

Replace `YOUR_FORMSPREE_ID` with the actual ID from your Formspree dashboard. Commit + push. Vercel auto-redeploys in ~60 seconds.

---

## 3. Switch GoDaddy nameservers to Cloudflare

> **DO THIS LAST.** Once you save in GoDaddy, GoDaddy stops being authoritative and Cloudflare takes over DNS for everything (including email). If anything in Cloudflare DNS isn't configured, things break until DNS propagates back.

1. GoDaddy dashboard → `readyhosts.co` → **DNS** → **Nameservers** → **Change**
2. Select **I'll use my own nameservers**
3. Enter the two Cloudflare-assigned nameservers (from `CLOUDFLARE_NAMESERVERS.txt`)
4. Save → confirm the warning

Propagation: 1–48 hours, usually 1–4.

---

## 4. Point Cloudflare DNS at Vercel

In Cloudflare dashboard for `readyhosts.co` → **DNS** → **Records**:

Add the following:

| Type | Name | Content | Proxy |
|---|---|---|---|
| CNAME | `@` (apex) | `cname.vercel-dns.com` | DNS only (gray cloud) |
| CNAME | `www` | `cname.vercel-dns.com` | DNS only (gray cloud) |

> **Important:** Keep the proxy on **DNS only** (gray cloud) — orange-cloud proxying conflicts with Vercel's edge. If you want Cloudflare CDN later, follow Vercel's "Cloudflare proxy" docs to configure it correctly.

Then in Vercel → Project → Settings → Domains:
- Add `readyhosts.co`
- Add `www.readyhosts.co` (will auto-redirect to apex)
- Vercel verifies the CNAME and issues SSL automatically

---

## 5. Verify everything

Once DNS resolves (test with `dig readyhosts.co +short` — should return Vercel IPs):

| Test | Command / Action |
|---|---|
| Site loads | Visit `https://readyhosts.co` in incognito |
| SSL active | Green padlock present |
| `www` redirects | Visit `https://www.readyhosts.co` → redirects to apex |
| Form submits | Fill contact form on live site, submit |
| Submission shows in Formspree | Check Formspree dashboard |
| Email arrives | Check destination inbox (`nethaneel.nb.brown@gmail.com`) |
| Direct email works | Send email to `hello@readyhosts.co` from external account, confirm arrival |

---

## 6. Final launch tasks

See `LAUNCH_CHECKLIST.md` for the full 60-item verification (now includes the email/form section).

Highlights:
- Submit sitemap to Google Search Console
- Add the `readyhosts.co` link to your email signature
- Update LinkedIn/IG with the live URL
- Send a test inquiry from your phone — make sure mobile UX is clean

---

## Rollback plan (just in case)

If something breaks during the cutover:

1. **Site doesn't load after 24 hr:** revert GoDaddy nameservers to GoDaddy defaults (`ns01.domaincontrol.com` etc.). Site will be down a few hours then back to original parking.
2. **Email broken:** verify Cloudflare MX records are present (Cloudflare auto-adds when you enable Email Routing). If missing, re-enable Email Routing.
3. **Form returns 404:** Formspree endpoint ID is wrong in code. Edit, commit, push.

Document anything weird in `CLOUDFLARE_SETUP_LOG.md`.
