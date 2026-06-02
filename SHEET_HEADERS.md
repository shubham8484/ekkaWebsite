# Google Sheet headers (copy into row 1)

Your spreadsheet:  
https://docs.google.com/spreadsheets/d/1QbO_zsE1c_0XC1L1c38wk6WaG4PGVwxAi4glQuI1ksk/

Rename the **bottom tabs** to exactly: **Brands** and **Creators**  
(or run `setupSheets` in Apps Script — it will rename your first two tabs and fill headers).

---

## Tab 1 — `Brands`

Paste this into **row 1** (columns A → E):

| A | B | C | D | E |
|---|---|---|---|---|
| Timestamp | Name | Email | Phone | Brand Name |

**Form field keys (website → sheet):**

| Form field | Header column |
|------------|----------------|
| name | Name |
| email | Email |
| phone | Phone |
| brandName | Brand Name |
| *(auto)* | Timestamp |

---

## Tab 2 — `Creators`

Paste this into **row 1** (columns A → H):

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| Timestamp | Creator Username | Full Name | Mobile Number | Total Followers | Country | City | Creator Category |

**Form field keys (website → sheet):**

| Form field | Header column |
|------------|----------------|
| username | Creator Username |
| fullName | Full Name |
| mobile | Mobile Number |
| followers | Total Followers |
| country | Country |
| city | City |
| category | Creator Category |
| *(auto)* | Timestamp |

---

## One-line copy (tab-separated)

**Brands row 1:**

```
Timestamp	Name	Email	Phone	Brand Name
```

**Creators row 1:**

```
Timestamp	Creator Username	Full Name	Mobile Number	Total Followers	Country	City	Creator Category
```

After headers are set, deploy Apps Script and add the Web App URL to `config.js`.
