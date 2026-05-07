# Cloudflare Email Routing — Setup Log

**Domain:** readyhosts.co
**Setup date:** 2026-05-07
**Status:** PENDING USER COMPLETION (browser steps require your account auth)

---

## What this is

Cloudflare Email Routing receives mail sent to `hello@readyhosts.co` and forwards it to your real inbox. It's free and reliable. Required because once we move DNS to Vercel/Cloudflare, GoDaddy's built-in email forwarding stops working.

---

## Setup steps (Cloudflare browser tab is already open)

### 1. Add readyhosts.co to Cloudflare

1. The Cloudflare dashboard is open at the **Add a Site** page
2. Enter: `readyhosts.co`
3. Click **Continue**
4. Select **Free** plan → **Continue**
5. Cloudflare scans existing DNS records (this takes ~30 seconds)
6. Cloudflare displays your assigned nameservers — they'll be something like:
   - `xxx.ns.cloudflare.com`
   - `yyy.ns.cloudflare.com`

> Save those exact names. They will NOT be `ns1.cloudflare.com` / `ns2.cloudflare.com` (that's a placeholder used in some docs). Cloudflare assigns each domain two specific subdomain nameservers.

### 2. Enable Email Routing

1. Once `readyhosts.co` is added, click into it
2. Left sidebar → **Email** → **Email Routing**
3. Click **Get Started** / **Enable Email Routing**
4. Cloudflare adds the required MX + TXT records for you (one-click)

### 3. Create the routing rule

1. Under **Routing rules** → **Custom address**
2. Add address:
   - **Custom address:** `hello`
   - **Action:** Send to an email
   - **Destination address:** `nethaneel.nb.brown@gmail.com`
     *(or your preferred personal inbox — change as needed)*
3. Click **Save**
4. Cloudflare sends a verification email to the destination — open it and click **Verify**

### 4. Verify it works

Once verification is confirmed:

1. From any external account, send a test email to `hello@readyhosts.co`
2. Check your destination inbox — should arrive within ~30 seconds
3. Reply from inbox — note: replies go from your real address, not `hello@readyhosts.co` (Cloudflare Email Routing is forward-only; for send-as, use Gmail's "Send mail as" feature with a relay)

---

## Test result

| Test | Result |
|---|---|
| Custom address verified | [ ] |
| Test email sent to hello@readyhosts.co | [ ] |
| Email received in destination inbox | [ ] |
| Email subject + body intact | [ ] |
| Forwarded within 30 seconds | [ ] |

Update this table after completing the steps above.

---

## Important: Nameserver impact

Adding readyhosts.co to Cloudflare assigns nameservers but **does not switch them yet**. The nameservers only take effect when you update them in GoDaddy.

**Until then:** Email Routing won't actually receive mail (because GoDaddy is still authoritative for DNS, not Cloudflare).

**After GoDaddy nameserver swap:** Email Routing activates within DNS propagation window (~1–24 hr).

See `GODADDY_SETUP_STEPS.md` and `NEXT_STEPS_AFTER_EMAIL_SETUP.md` for the cutover procedure.

---

## Reference

- Cloudflare Email Routing docs: https://developers.cloudflare.com/email-routing/
- Account dashboard: https://dash.cloudflare.com
