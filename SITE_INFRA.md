# SITE_INFRA — PCS Accounting

*Living manifest so this repo can identify itself (Code Handoff v1.2 rule). Append, never overwrite.*

| Field | Value |
|---|---|
| **Site name** | PCS Accounting (PCS Tax Service: For Business) |
| **Primary domain** | accounting.pcstaxservice.com |
| **Site repo** | github: kingcdk1/pcs-accounting (GitHub Pages, static) |
| **Back-end project** | Downloads/pcs-accounting-api → pcs-accounting-api.vercel.app (Vercel team: **five-stone-investments** — the REAL team) |
| **Lead generating?** | YES — consult forms (short + long) + Enterprise "Talk to Us" |
| **Back-end type** | Type 3 Client Desk (records + per-client checklists) — Client Desk part PARKED; Lead Vault behavior first |
| **Own Supabase project** | **ref `mxuenhsdknlevlytneku`** — https://mxuenhsdknlevlytneku.supabase.co (created 07/04/26; its OWN project per Decision 1, NOT the shared `gcrzmiwgjvuujffbqjbq`) |
| **Resend sending domain** | pcstaxservice.com (from: leads@pcstaxservice.com) — verification UNCONFIRMED |
| **Notify list** | (office inbox TBD — set as LEAD_EMAIL_TO) |
| **Login** | Google (shared identity = the Google account); roles admin/manager/staff |
| **Last audited** | 07/04/26 (see Downloads/LEAD_STACK_MASTER.md audit block) |

## Wiring status (07/04/26)
- Form → `/api/lead` endpoint: **LIVE** (deployed, localStorage backup on).
- Email (Resend): **OFF** — RESEND_API_KEY not set yet.
- Supabase storage + login: **project created, not yet wired** — needs anon key + schema SQL + Google provider.

## UPDATE 07/05/26 — storage + email BOTH LIVE (tested)
- **Email:** RESEND_API_KEY + LEAD_EMAIL_TO set (Cyrus + Sandra Gmail, comma fan-out); real test delivered to both inboxes. Interim sender `"PCS Accounting" <leads@renucustom.com>`; swap to `leads@accounting.pcstaxservice.com` after the 3 GoDaddy records verify (domain already created in Resend).
- **Storage:** full standard schema in own project `mxuenhsdknlevlytneku` — `profiles` (+roles, hardened signup trigger, `is_admin()`/`is_team()`), `leads` (RLS: anon insert-only, team read/update), `notify_recipients` (seeded Cyrus+Sandra ON — the "Where leads go" panel table). Endpoint inserts every lead → verified `stored:true` + row in DB.
- Env on `pcs-accounting-api`: `RESEND_API_KEY`, `LEAD_EMAIL_TO`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`.

## To finish (remaining)
1. Google OAuth client for this site + enable Google provider + redirect URLs → login works.
2. Build leads dashboard (leads view + "Where leads go" toggle panel + roles board).
3. GoDaddy DNS (3 records) → swap sender to real subdomain.
4. Add Ginger to recipients (need her Gmail).
5. Rotate project JWT secret (service_role key transited a clipboard read 07/05 — cheap to rotate while project is young).
