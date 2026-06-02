#!/usr/bin/env node
/**
 * Downloads all tabs from the Blubox/Ekka creator roster Google Sheet
 * and merges them into a single CSV with a "Source Tab" column.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SPREADSHEET_ID = '1MwK7MavtCOZ5QQ2fkKAE8yODEvlP8EtekVO03ZTtN7Y';

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

/** Parse a single CSV line respecting quoted fields */
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
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      fields.push(cur);
      cur = '';
    } else {
      cur += c;
    }
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
    } else {
      cur += c;
    }
  }
  if (cur.trim()) lines.push(cur);

  if (lines.length === 0) return { headers: [], rows: [] };

  const headers = parseCsvLine(lines[0]).map((h) => h.trim());
  const rows = lines.slice(1).map((line) => {
    const vals = parseCsvLine(line);
    const row = {};
    headers.forEach((h, i) => {
      row[h] = (vals[i] ?? '').trim();
    });
    return row;
  });

  return { headers, rows };
}

function escapeCsvField(value) {
  const s = String(value ?? '');
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function normalizeHeader(h) {
  return h.trim().replace(/\s+/g, ' ');
}

/** Map variant column names to canonical names */
const HEADER_ALIASES = {
  'Creator Name': 'Creator Name',
  Name: 'Creator Name',
  'Name ': 'Creator Name',
  Followers: 'Followers',
  'Avg View': 'Avg View',
  'Avg Views': 'Avg View',
  Category: 'Category',
  'Insta Link': 'Insta Link',
  'Instagram Link': 'Insta Link',
  'YT Link': 'YouTube Link',
  'YouTube Link': 'YouTube Link',
  'Reel+ Story Price': 'Reel+ Story Price',
  'Reel Price': 'Reel Price',
  'Story Price': 'Story Price',
  Gender: 'Gender',
  Age: 'Age',
  State: 'State',
  City: 'City',
  Location: 'City',
  Language: 'Language',
  'Dietary Options': 'Dietary Options',
  Remark: 'Remark',
  Remarks: 'Remark',
};

const CANONICAL_ORDER = [
  'Source Tab',
  'Creator Name',
  'Followers',
  'Avg View',
  'Category',
  'Insta Link',
  'YouTube Link',
  'Reel+ Story Price',
  'Reel Price',
  'Story Price',
  'Gender',
  'Age',
  'State',
  'City',
  'Language',
  'Dietary Options',
  'Remark',
];

async function fetchTab(tab) {
  const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${tab.gid}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch "${tab.name}": ${res.status}`);
  const text = await res.text();
  const { headers, rows } = parseCsv(text);

  const normalizedRows = rows
    .filter((row) => {
      const firstVal = Object.values(row).find((v) => v && v.trim());
      return Boolean(firstVal);
    })
    .map((row) => {
      const out = { 'Source Tab': tab.name };
      for (const [key, val] of Object.entries(row)) {
        const normKey = normalizeHeader(key);
        if (!normKey) continue;
        const canonical = HEADER_ALIASES[normKey] || normKey;
        if (out[canonical] && out[canonical] !== val && val) {
          out[canonical] = out[canonical] ? `${out[canonical]} | ${val}` : val;
        } else if (val) {
          out[canonical] = val;
        }
      }
      return out;
    });

  return { tab: tab.name, headers, count: normalizedRows.length, rows: normalizedRows };
}

async function main() {
  console.log('Fetching tabs from Google Sheet...\n');

  const allRows = [];
  const stats = [];

  for (const tab of TABS) {
    const result = await fetchTab(tab);
    stats.push({ name: result.tab, rows: result.count, headers: result.headers.join(' | ') });
    allRows.push(...result.rows);
    console.log(`  ✓ ${result.tab}: ${result.count} rows`);
  }

  // Collect any extra columns not in canonical order
  const extraCols = new Set();
  for (const row of allRows) {
    for (const key of Object.keys(row)) {
      if (!CANONICAL_ORDER.includes(key)) extraCols.add(key);
    }
  }

  const finalHeaders = [...CANONICAL_ORDER, ...[...extraCols].sort()];

  const lines = [finalHeaders.map(escapeCsvField).join(',')];
  for (const row of allRows) {
    lines.push(finalHeaders.map((h) => escapeCsvField(row[h] ?? '')).join(','));
  }

  const outDir = path.join(__dirname, '..', 'data');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'all-creators-merged.csv');
  fs.writeFileSync(outPath, lines.join('\n') + '\n', 'utf8');

  console.log(`\nMerged ${allRows.length} creators into:\n  ${outPath}`);
  console.log('\nTab breakdown:');
  for (const s of stats) {
    console.log(`  - ${s.name}: ${s.rows}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
