# ReadyHost — Launch Checklist

Run through this in order. Don't skip the verification steps — once you go live, errors are public.

---

## 0. Email & Form Setup (do this first — gates everything else)

- [ ] Cloudflare account active
- [ ] readyhosts.co added to Cloudflare
- [ ] Cloudflare-assigned nameservers captured in `docs/CLOUDFLARE_NAMESERVERS.txt`
- [ ] Email Routing enabled on Cloudflare
- [ ] Routing rule created: `hello@readyhosts.co` → personal inbox
- [ ] Destination email verified (clicked the verification link)
- [ ] Formspree account active
- [ ] ReadyHost Contact Form created in Formspree
- [ ] Formspree notification email set to `hello@readyhosts.co`
- [ ] Formspree endpoint ID copied into `src/ReadyHost_Main.jsx` (line ~16, `FORMSPREE_ENDPOINT`)
- [ ] Form submission tested locally (`npm run dev`) — submission shows up in Formspree dashboard
- [ ] Test email from Formspree arrives at destination inbox (after DNS cutover)
- [ ] Submit button shows "Sending…" during in-flight request
- [ ] Success state "Inquiry received." displays after 200 response
- [ ] Error banner displays on failed submission

---

## A. Build & Code

- [ ] ReadyHost website component built and tested locally (`npm run dev` shows full page)
- [ ] All sections render: Nav, Hero, Stats, Services, Why Us, Service Area, Contact, Footer
- [ ] Logo displays correctly (RH circle in teal `#1B6C72`)
- [ ] Branding colors correct: Teal `#1B6C72` (primary), Orange `#FF6B35` (accent)
- [ ] Tagline "Cleaner canceled? We've got it handled." visible in hero
- [ ] Service area section accurate: Fort Lauderdale → Dania Beach
- [ ] **No pricing information visible anywhere** — re-grep to confirm
- [ ] Footer displays correctly with email + nav links
- [ ] Contact email reads `hello@readyhosts.co` everywhere

## B. Functionality

- [ ] All anchor links scroll to the correct section (Services, Why, Area, Contact)
- [ ] Mobile menu toggle opens/closes
- [ ] Mobile menu auto-closes after clicking a link
- [ ] Contact form opens default mail client with pre-filled subject + body
- [ ] Test email actually delivers to `hello@readyhosts.co` from your phone and laptop
- [ ] All external links (`mailto:`, `https://readyhosts.co`) work

## C. Responsive / Cross-Device

- [ ] Tested on iPhone (portrait + landscape)
- [ ] Tested on Android phone if available
- [ ] Tested on iPad / tablet
- [ ] Tested on desktop Chrome
- [ ] Tested on desktop Safari
- [ ] No horizontal scroll on any breakpoint

## D. Repo & Deployment

- [ ] GitHub repo created (`readyhost-website`)
- [ ] Code committed and pushed to `main`
- [ ] `.gitignore` excludes `node_modules`, `dist`, `.env`
- [ ] Vercel account created
- [ ] Vercel project connected to GitHub repo
- [ ] First deploy succeeded (green status in Vercel)
- [ ] `*.vercel.app` URL loads the site correctly

## E. Domain & DNS

- [ ] `readyhosts.co` added in Vercel → Settings → Domains
- [ ] GoDaddy nameservers updated to Vercel's (`ns1`–`ns4.vercel-dns.com`)
- [ ] DNS propagation complete — `dig readyhosts.co NS +short` returns Vercel
- [ ] `https://readyhosts.co` loads in incognito browser
- [ ] `https://www.readyhosts.co` redirects to apex (or loads correctly)
- [ ] SSL certificate active — green padlock visible

## F. Email

- [ ] `hello@readyhosts.co` forwarding configured (Cloudflare Email Routing or equivalent)
- [ ] Test email sent to `hello@readyhosts.co` arrives in inbox
- [ ] Reply from `hello@readyhosts.co` works (if reply-from configured)

## G. SEO & Discoverability

- [ ] `<title>` set to `ReadyHost — Airbnb Cleaning, Hotel-Grade Standards`
- [ ] Meta description added (under 160 chars)
- [ ] Open Graph tags added (og:title, og:description, og:image)
- [ ] Favicon uploaded (32x32 + 192x192)
- [ ] Google Search Console: site added and verified
- [ ] Sitemap submitted to Google Search Console
- [ ] Bing Webmaster Tools: site added (optional but cheap)

## H. Analytics

- [ ] Vercel Analytics enabled (free tier — one-click in Vercel dashboard)
- [ ] OR Plausible / Google Analytics 4 installed
- [ ] First pageview event registered

## I. Launch Day

- [ ] Soft launch: send link to 3 friends, ask them to break it
- [ ] Fix any issues they find
- [ ] Update GoDaddy MX records if email forwarding is now via Cloudflare
- [ ] Add link to ReadyHost email signature
- [ ] Add link to ReadyHost Instagram bio (if applicable)
- [ ] Tell hotels in the FTL outreach list — the website is live

## J. Post-Launch (Week 1)

- [ ] Monitor Vercel deploy logs daily
- [ ] Monitor Search Console for crawl errors
- [ ] Confirm at least 1 inquiry submitted via the contact form
- [ ] Lighthouse score: Performance > 90, Accessibility > 95, SEO > 90
- [ ] Backup a snapshot of the GitHub repo

---

**Branding reference (verify against site):**

| Element | Value |
|---|---|
| Primary Teal | `#1B6C72` |
| Secondary Orange | `#FF6B35` |
| Domain | readyhosts.co |
| Email | hello@readyhosts.co |
| Tagline | "Cleaner canceled? We've got it handled." |
| Service Area | Fort Lauderdale → Dania Beach |
| No pricing on site | ✓ verified |
