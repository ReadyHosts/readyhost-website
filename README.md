# ReadyHost Website

**Project:** ReadyHost Website
**Stack:** React + Tailwind CSS
**Domain:** readyhosts.co
**Email:** hello@readyhosts.co
**Deployment:** Vercel (free tier)
**Build Date:** 2026-05-07

---

## Overview

Single-page marketing site for ReadyHost — Airbnb cleaning company with hotel-grade standards. Service area: Fort Lauderdale Boulevard to Dania Beach, South Florida.

**Tagline:** "Cleaner canceled? We've got it handled."

**Positioning:** Airbnb Cleaning Company with Hotel-Grade Standards

## Brand

| Element | Value |
|---|---|
| Primary (Teal) | `#1B6C72` |
| Secondary (Orange) | `#FF6B35` |
| Background light | `#f9fafb` |
| Text dark | `#111827` |
| Text muted | `#6b7280` |

## Folder Structure

```
Website/
├── README.md                     # This file
├── BUILD_STATUS.txt              # Build summary
├── src/
│   └── ReadyHost_Main.jsx        # Main single-file React component
├── components/                   # Future modular components
├── public/                       # Logo + image assets
└── docs/
    ├── DEPLOYMENT_GUIDE.md       # GitHub + Vercel deployment
    ├── GODADDY_SETUP_STEPS.md    # DNS / nameserver swap on GoDaddy
    ├── LAUNCH_CHECKLIST.md       # Pre-launch verification
    └── CONCEPTS_FOR_FUTURE.md    # Future enhancement roadmap
```

## Build Notes

- No pricing displayed anywhere on the site (custom/contract pricing only)
- Contact form submits via `mailto:hello@readyhosts.co`
- Mobile-first responsive (works on phone, tablet, desktop)
- Tailwind core utilities only — no custom CSS compiler needed
- Logo placeholder: "RH" initials inside teal circle (drop-in replaceable)

## Next Step

Open `docs/DEPLOYMENT_GUIDE.md` for the GitHub → Vercel → GoDaddy launch sequence.
