# ReadyHost — Vercel Deployment Guide

End-to-end: GitHub → Vercel → readyhosts.co live with SSL.
Total active time: ~30 minutes. DNS propagation adds 24–48 hrs.

---

## 1. Prerequisites

- Free **Vercel** account → https://vercel.com/signup (sign up with GitHub for fastest path)
- Free **GitHub** account → https://github.com/join
- **Node 18+** locally if you want to run `npm run dev` first (optional)
- This `Website/` folder ready to push

---

## 2. Initialize the Vite + React + Tailwind project

The `ReadyHost_Main.jsx` file is the single page component. To deploy it, drop it into a Vite + Tailwind shell.

From terminal, in the parent folder of `Website/`:

```bash
cd ~/Desktop/ReadyHost/Website
npm create vite@latest . -- --template react
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

When prompted by Vite, accept overwriting only `package.json`. Then:

**`tailwind.config.js`** — set content paths:

```js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
```

**`src/index.css`** — replace contents with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**`src/main.jsx`** — replace `App` import with `ReadyHostMain`:

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import ReadyHostMain from "./ReadyHost_Main.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReadyHostMain />
  </React.StrictMode>
);
```

**`index.html`** — update `<title>` to `ReadyHost — Airbnb Cleaning, Hotel-Grade Standards`.

Test locally:

```bash
npm run dev
```

Visit `http://localhost:5173`. Confirm hero, services, contact form all render.

---

## 3. Push to GitHub

```bash
cd ~/Desktop/ReadyHost/Website
git init
git add .
git commit -m "Initial ReadyHost website"
```

On GitHub:
1. Click **New Repository** → name it `readyhost-website`
2. Set to **Private** (or Public — your call)
3. Do NOT add README or .gitignore (the local repo already has them)
4. Copy the remote URL it gives you

Back in terminal:

```bash
git remote add origin https://github.com/YOUR_USERNAME/readyhost-website.git
git branch -M main
git push -u origin main
```

---

## 4. Connect Vercel to GitHub

1. Go to https://vercel.com/new
2. Click **Import Git Repository**
3. Authorize Vercel to access your GitHub if prompted
4. Find `readyhost-website` → **Import**
5. Framework: Vercel will auto-detect **Vite** ✓
6. Build command: `npm run build` (auto-filled)
7. Output directory: `dist` (auto-filled)
8. Click **Deploy**

First build takes ~60 seconds. Vercel gives you a `*.vercel.app` URL — confirm the site loads there before doing DNS.

**Auto-deploy is on by default:** every push to `main` triggers a new production deploy. Pull requests get preview URLs automatically.

---

## 5. GoDaddy DNS Configuration

Two paths — **pick A**, it's cleaner:

### Path A (recommended): Point GoDaddy nameservers at Vercel

1. In Vercel project → **Settings** → **Domains** → add `readyhosts.co`
2. Vercel will tell you which nameservers to use (typically `ns1.vercel-dns.com` through `ns4.vercel-dns.com`)
3. In GoDaddy → **My Products** → `readyhosts.co` → **DNS** → **Nameservers** → **Change** → **I'll use my own nameservers**
4. Enter the four Vercel nameservers, save

See `GODADDY_SETUP_STEPS.md` for screen-by-screen detail.

### Path B: Keep GoDaddy nameservers, add A/CNAME records

Only do this if you have other DNS records (email, etc.) you don't want to migrate.

In GoDaddy DNS Management:
- Add **A** record: `@` → `76.76.21.21`
- Add **CNAME** record: `www` → `cname.vercel-dns.com`

---

## 6. Timeline & Verification

| Step | Time |
|---|---|
| Vercel deploy | 30–90 seconds |
| GoDaddy nameserver save | Instant |
| DNS propagation | 1–48 hours (typically 1–4) |
| SSL provisioning | Automatic, 1–10 min after DNS resolves |

**Verify:**

```bash
dig readyhosts.co +short
# Should return Vercel IPs (76.76.21.x)
```

Or just visit `https://readyhosts.co` in an incognito window. If it loads with a green padlock, you're live.

---

## 7. SSL Certificate

Fully automatic. Vercel provisions a Let's Encrypt cert as soon as DNS resolves to their nameservers. Auto-renews. No action needed.

---

## 8. Post-Deployment Checklist

- [ ] `https://readyhosts.co` loads
- [ ] `https://www.readyhosts.co` redirects to apex (Vercel handles by default)
- [ ] Padlock / SSL active
- [ ] Mobile menu opens and closes
- [ ] Contact form opens mail client with prefilled subject
- [ ] All anchor links scroll to correct sections
- [ ] Logo displays as teal "RH" circle
- [ ] No `localhost` or placeholder strings visible
- [ ] Run Lighthouse: target Performance > 90, Accessibility > 95
- [ ] Submit sitemap to Google Search Console (`https://readyhosts.co/sitemap.xml` — Vite + plugin or manual)
- [ ] Confirm `hello@readyhosts.co` email forwarding is active in GoDaddy

---

## Troubleshooting

**Site doesn't load after 24 hrs:** Check `dig readyhosts.co NS` — should show `*.vercel-dns.com`. If it still shows GoDaddy nameservers, the GoDaddy save didn't take — redo step 5.

**SSL error / "not secure":** Vercel needs DNS to resolve before it can issue. Wait another hour after DNS propagates.

**Form opens mail but doesn't send:** That's expected — `mailto:` opens the user's mail client. They click send. To bypass, swap to Formspree or Resend later (see `CONCEPTS_FOR_FUTURE.md`).

---

**Email:** hello@readyhosts.co
**Domain:** readyhosts.co
