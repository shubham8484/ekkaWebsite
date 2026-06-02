#!/usr/bin/env node
/**
 * Export each Google Sheet tab as its own CSV (+ TSV for paste into Sheets).
 * Output: data/tabs/{tab-name}.csv and data/tabs/{tab-name}.tsv
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SPREADSHEET_ID = '1MwK7MavtCOZ5QQ2fkKAE8yODEvlP8EtekVO03ZTtN7Y';
const OUT_DIR = path.join(__dirname, '..', 'data', 'tabs');

const TABS = [
  { name: 'Instagram Creators', gid: '1170460398' },
  { name: 'YouTube Creators', gid: '391973331' },
  { name: 'Doctor/Health', gid: '1003712236' },
  { name: 'MOM', gid: '64274041' },
  { name: 'HairCare', gid: '1661033681' },
  { name: 'Marathi', gid: '123827105' },
  { name: 'Makeup/MUA', gid: '1039486084' },
  { name: 'Northeast', gid: '1593198033' },
  { name: 'South-Indian', gid: '639252278' },
];

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function parseCsvLine(line) {
  const fields = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else inQuotes = !inQuotes;
    } else if (c === ',' && !inQuotes) {
      fields.push(cur);
      cur = '';
    } else cur += c;
  }
  fields.push(cur);
  return fields;
}

function parseCsv(text) {
  const lines = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (inQuotes && text[i + 1] === '"') {
        cur += '""';
        i++;
      } else {
        inQuotes = !inQuotes;
        cur += c;
      }
    } else if ((c === '\n' || c === '\r') && !inQuotes) {
      if (c === '\r' && text[i + 1] === '\n') i++;
      if (cur.trim()) lines.push(cur);
      cur = '';
    } else cur += c;
  }
  if (cur.trim()) lines.push(cur);
  return lines.map((line) => parseCsvLine(line));
}

function escapeCsvField(value) {
  const s = String(value ?? '');
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function csvToTsv(rows) {
  return rows
    .map((row) => row.map((cell) => String(cell ?? '').replace(/[\t\r\n]+/g, ' ').trim()).join('\t'))
    .join('\n');
}

async function fetchTabCsv(tab) {
  const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${tab.gid}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed "${tab.name}": HTTP ${res.status}`);
  return res.text();
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const index = [];
  console.log('Exporting tabs from Google Sheet...\n');

  for (const tab of TABS) {
    const rawCsv = await fetchTabCsv(tab);
    const rows = parseCsv(rawCsv);
    const dataRows = rows.length > 1 ? rows.length - 1 : 0;
    const slug = slugify(tab.name);

    const csvPath = path.join(OUT_DIR, `${slug}.csv`);
    const tsvPath = path.join(OUT_DIR, `${slug}.tsv`);

    fs.writeFileSync(csvPath, rawCsv.trim() + '\n', 'utf8');
    fs.writeFileSync(tsvPath, csvToTsv(rows) + '\n', 'utf8');

    index.push({
      tab: tab.name,
      gid: tab.gid,
      rows: dataRows,
      csv: `data/tabs/${slug}.csv`,
      tsv: `data/tabs/${slug}.tsv`,
    });

    console.log(`  ✓ ${tab.name}: ${dataRows} rows → ${slug}.csv`);
  }

  fs.writeFileSync(
    path.join(OUT_DIR, 'index.json'),
    JSON.stringify({ spreadsheetId: SPREADSHEET_ID, exportedAt: new Date().toISOString(), tabs: index }, null, 2)
  );

  console.log(`\nDone. Files saved to:\n  ${OUT_DIR}/`);
  console.log('\nTab-wise files:');
  for (const t of index) {
    console.log(`  ${t.tab}: ${t.csv}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
