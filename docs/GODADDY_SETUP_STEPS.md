# GoDaddy DNS Setup — Point readyhosts.co at Vercel

Step-by-step. Active time: ~5 minutes. DNS propagation: 1–48 hours after save.

---

## Before you start

- Vercel project deployed and live at `*.vercel.app`
- `readyhosts.co` already added under Vercel → Project Settings → Domains
- GoDaddy account credentials handy

---

## Step 1 — Open the GoDaddy dashboard

1. Go to https://dcc.godaddy.com/control/portfolio (your domain portfolio page)
2. Sign in if not already signed in
3. You should see `readyhosts.co` in your domain list

> If you have many domains, use the search bar at the top of the portfolio page.

---

## Step 2 — Open DNS for readyhosts.co

1. Click on `readyhosts.co` in the domain list
2. The domain detail page opens
3. In the left sidebar (or under the "DNS" tab on newer GoDaddy UI), click **DNS**
4. You'll land on the **DNS Management** page

What you'll see:
- A table of records (A, CNAME, MX, TXT, etc.) at the top
- A **Nameservers** section near the bottom of the page

---

## Step 3 — Find the Nameservers section

Scroll down past the records table until you see a section labeled **Nameservers**.

It currently shows GoDaddy's defaults, something like:
```
ns01.domaincontrol.com
ns02.domaincontrol.com
```

Click the **Change** button (or pencil icon) next to Nameservers.

---

## Step 4 — Switch to custom nameservers

A modal appears with two options:
- "I'll use GoDaddy nameservers"
- "**I'll use my own nameservers**" ← **select this one**

After selecting "I'll use my own nameservers," four input fields appear.

---

## Step 5 — Enter Vercel's nameservers

Enter the following, one per field:

```
ns1.vercel-dns.com
ns2.vercel-dns.com
ns3.vercel-dns.com
ns4.vercel-dns.com
```

> **Note:** Vercel sometimes only requires two nameservers (`ns1` and `ns2`). When you added the domain in Vercel, Vercel showed you the exact ones to use — those override anything here. Use what Vercel told you.

---

## Step 6 — Save

1. Click **Save** at the bottom of the modal
2. GoDaddy shows a warning: "Changing nameservers will affect email and website."
3. Confirm — click **Continue** or **Yes, change nameservers**
4. You'll see a green "Saved successfully" toast or banner

GoDaddy now lists your custom Vercel nameservers under the Nameservers section.

---

## Step 7 — Wait for propagation

DNS propagation timeline:
| Time elapsed | What's happening |
|---|---|
| 0–15 min | GoDaddy publishes the change globally |
| 15 min – 4 hr | Most ISPs pick it up |
| 4–24 hr | Stragglers (some corporate DNS, mobile carriers) |
| 24–48 hr | Worst-case full propagation |

In practice you'll see `readyhosts.co` resolve within an hour for most networks.

---

## Step 8 — Verify

**Browser test (easiest):**
- Open an incognito/private window
- Visit `https://readyhosts.co`
- Site should load with padlock (SSL)

**Command-line test:**
```bash
dig readyhosts.co NS +short
```
Expected output:
```
ns1.vercel-dns.com.
ns2.vercel-dns.com.
ns3.vercel-dns.com.
ns4.vercel-dns.com.
```

**Online test:** https://www.whatsmydns.net/#NS/readyhosts.co — green checks worldwide = done.

---

## Step 9 — In Vercel, confirm domain is verified

1. Go back to Vercel → Project → **Settings** → **Domains**
2. `readyhosts.co` should now show a green checkmark and "Valid configuration"
3. Vercel auto-issues SSL within a few minutes

---

## Important notes about email

**If you have email forwarding set up on GoDaddy** (e.g., `hello@readyhosts.co` forwarding to your inbox), switching nameservers to Vercel will **break email forwarding** until you reconfigure it.

Two options:
1. **Recommended:** Set up email forwarding through a separate provider (Cloudflare Email Routing — free, 5-minute setup) and add the MX records via Vercel DNS.
2. Use Path B in `DEPLOYMENT_GUIDE.md` (keep GoDaddy nameservers, add A/CNAME records only). Email forwarding stays untouched.

If `hello@readyhosts.co` is already forwarding, do a quick verification by sending a test email **before** the cutover so you have a baseline.

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| Site still shows GoDaddy parking page after 24 hr | Re-check nameservers in GoDaddy — the save may have silently failed. Re-enter and save again. |
| Vercel says "Invalid configuration" | DNS hasn't propagated yet. Wait. |
| SSL error in browser | DNS resolved but SSL hasn't issued yet. Wait 10 min. |
| Email forwarding broken | Expected — reconfigure via Cloudflare or add MX records in Vercel DNS. |

---

**Done? Move to:** `LAUNCH_CHECKLIST.md`
