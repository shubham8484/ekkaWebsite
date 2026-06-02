# Fix “Could not reach Google Sheets”

Your web app must return **JavaScript or JSON** — not a **Sign in** page.

## Quick test (do this first)

Open this in **Chrome Incognito** (not logged in):

```
https://script.google.com/macros/s/AKfycbx6dnbFZUh7zTBlJdArhpM27nl15FOr9xNV55rtZ-7LY5x-XYYO6a3rEmxxVq7Bw-6Z/exec?callback=ekkaConnectionTest&type=brand&name=Test&email=test@test.com&phone=000&brandName=Test
```

**Good** — you see something like:

```text
ekkaConnectionTest({"success":true,"message":"Brand inquiry saved."})
```

**Bad** — you see **Sign in** → deployment is still not public. Follow steps below.

---

## Correct setup (important)

### 1. Script must be bound to your sheet

1. Open your spreadsheet  
2. **Extensions → Apps Script** (opens a project *linked* to this sheet)  
3. Delete old code → paste **`google-apps-script/Code.gs`** → **Save**

### 2. Authorize once

1. In Apps Script, choose function **`setupSheets`**
2. Click **Run** → **Review permissions** → allow access to the sheet

### 3. Create a **NEW** deployment (not only Edit)

1. **Deploy → New deployment**
2. Click gear ⚙️ → select **Web app**
3. **Execute as:** Me  
4. **Who has access:** **Anyone** (not “Only myself”, not “Anyone with Google account” if you want no login)
5. **Deploy** → copy the **Web app** URL (ends with `/exec`)

### 4. Update the website

In `config.js`:

```js
window.EKKA_SHEETS_URL = 'https://script.google.com/macros/s/YOUR_NEW_ID/exec';
```

Use the URL from step 3. Old URLs stop working after a new deployment sometimes.

### 5. Test again

- Incognito test link (above) must show `ekkaConnectionTest({...})`
- Open `contact.html` → yellow warning should disappear
- Submit a test form → row appears in **Brands** or **Creators** tab

---

## Your spreadsheet

https://docs.google.com/spreadsheets/d/1QbO_zsE1c_0XC1L1c38wk6WaG4PGVwxAi4glQuI1ksk/

Tabs: **Brands** and **Creators** (see `SHEET_HEADERS.md` for column names).

## Export CSV

Open a tab → **File → Download → Comma-separated values (.csv)**.

## Still failing?

- Use **New deployment**, not only “Edit” on an old one  
- URL must end with **`/exec`**, not `/dev`  
- Run `setupSheets` after pasting new code  
- Workspace / school Google accounts may block “Anyone” — try a personal Gmail sheet  
- Double-click `contact.html` is fine — no Python needed
