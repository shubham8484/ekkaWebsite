#!/usr/bin/env node
/** Convert merged CSV → TSV for clean copy-paste into Google Sheets */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const csvPath = path.join(__dirname, '..', 'data', 'all-creators-merged.csv');
const tsvPath = path.join(__dirname, '..', 'data', 'all-creators-merged.tsv');

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
  return lines.map((line) =>
    parseCsvLine(line).map((cell) => cell.replace(/[\t\r\n]+/g, ' ').trim())
  );
}

const rows = parseCsv(fs.readFileSync(csvPath, 'utf8'));
const tsv = rows.map((r) => r.join('\t')).join('\n');
fs.writeFileSync(tsvPath, tsv + '\n', 'utf8');
console.log(`Wrote ${rows.length} rows × ${rows[0]?.length} cols → ${tsvPath}`);
