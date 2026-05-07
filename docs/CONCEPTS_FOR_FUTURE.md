# ReadyHost — Future Enhancement Roadmap

Things to build into the site after launch. Ordered by impact-to-effort ratio.

---

## Tier 1 — Ship within 30 days of launch

### 1. Real form submission backend (replace `mailto:`)
Today the form opens the user's mail client. That's a ~50% drop-off vs. a real submit.
**Build:** Drop-in **Formspree** ($0 to start, $10/mo for 1000 submissions) or **Resend** + a Vercel Edge Function. Both: ~30 min of work.

### 2. Testimonials / reviews carousel
Hotels and hosts buy on social proof. Three short quotes with name, property, photo. Place between Services and Why Us.

### 3. Photo gallery — before/after of cleaned properties
Lightbox modal with 8–12 photos. Lazy-load images. Use Vercel's automatic image optimization.

### 4. Email newsletter signup (footer)
ConvertKit or Beehiiv. Capture emails for monthly host tips. Costs ~$0–$30/mo.

### 5. Booking-style inquiry calendar
Replace the "How many properties" field with a date picker showing "earliest available" — converts urgency-driven leads.

---

## Tier 2 — Ship within 90 days

### 6. Dynamic pricing toggle (Airbnb / Hotel rates)
When pricing is finalized, add a toggle that shows tiered packages. Keep custom pricing as the headline option.
**Note:** stays per current spec (no pricing) until Nate green-lights.

### 7. Service request dashboard (logged-in)
Existing customers log in to see upcoming cleans, request swaps, view photo reports. Built on Supabase + Clerk auth.

### 8. Turno / Hospitable / Base44 integration badges
"Plug into your existing tools" — install/connect buttons that webhook into our scheduling.

### 9. Blog (cleaning tips for Airbnb hosts)
Built on MDX. SEO play. 1 post/week → ~50 long-tail rankings within 6 months. Topics: linen rotation, deep clean checklist, guest damage protocol.

### 10. Video walkthrough of a real clean
60-second hero video showing a turnover from arrival → photo report. Embed via Mux or self-host through Vercel.

---

## Tier 3 — Build when revenue justifies

### 11. Mobile app (host portal)
React Native or Expo. Push notifications when a clean completes. Photo reports in-app. Build only when 10+ recurring clients are using the dashboard daily.

### 12. AI-driven pricing per property
Square footage, bed count, complexity → dynamic quote. Ship behind a "Get instant quote" CTA.

### 13. Damage / restock auto-flagging
Vision model on photo reports flags missing amenities or damage. Push alerts to host before they have to ask.

### 14. Multi-language (Spanish, Portuguese)
South Florida market reality. Translate Hero, Services, Contact. Reuse same React component, swap content via i18n.

### 15. Referral program
"Refer a host, get one free clean." Tracked through unique referral codes. Built on Rewardful or rolled in-house.

---

## Technical debt / housekeeping

- Move from inline SVG service-area illustration to a real interactive map (Mapbox or Leaflet)
- Migrate `mailto:` form to a proper backend with reCAPTCHA
- Add structured data (Schema.org `LocalBusiness`) for Google rich results
- Set up automated Lighthouse CI on every deploy
- Add error monitoring (Sentry — free tier)
- A/B test hero CTA copy ("Request a Clean" vs. "Get Same-Day Coverage")

---

## Don't build

- Live chat widget — won't be staffed, will hurt the brand
- Generic "Why hire a cleaner" content — every cleaning company has it, dilutes positioning
- Comment section on blog — moderation tax, no upside
