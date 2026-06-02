# Deploy on Netlify

## Settings

| Setting | Value |
|---------|--------|
| **Build command** | *(leave empty)* |
| **Publish directory** | `.` (project root) |

Or use the included `netlify.toml` — Netlify reads it automatically.

## Required files on Netlify

Make sure these are in your repo / upload:

- `index.html`, `contact.html`
- `config.js` ← must contain `EKKA_SHEETS_URL` with your `/exec` link
- `contact.js`, `main.js`, `styles.css`, `contact.css`
- `assets/` folder (logos)

## After deploy

1. Open `https://your-site.netlify.app/contact.html`
2. The yellow warning should **not** show on load
3. Submit a test form → check Google Sheet **Brands** / **Creators** tabs

## If forms still fail

1. Open your `/exec` URL in an incognito tab — must show `{"ok":true,...}` not Sign in
2. Redeploy Apps Script: **Anyone** + **New version**
3. Update `config.js` and the fallback URL in `contact.html` if the `/exec` link changed
4. In Netlify: **Deploys → Trigger deploy** to publish latest files

## Google Apps Script

Paste `google-apps-script/Code.gs` in your sheet’s Apps Script, run `setupSheets` once, then deploy as Web app.
