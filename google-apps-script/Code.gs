/**
 * EKKA MEDIA — Google Sheets form handler
 * Works from double-clicked HTML (file://) via JSONP callback.
 * After editing: Deploy → Manage deployments → Edit → New version → Deploy (Anyone)
 */

var SPREADSHEET_ID = '1QbO_zsE1c_0XC1L1c38wk6WaG4PGVwxAi4glQuI1ksk';
var BRAND_SHEET = 'Brands';
var CREATOR_SHEET = 'Creators';

var BRAND_HEADERS = ['Timestamp', 'Name', 'Email', 'Phone', 'Brand Name'];
var CREATOR_HEADERS = [
  'Timestamp',
  'Creator Username',
  'Full Name',
  'Mobile Number',
  'Total Followers',
  'Country',
  'City',
  'Creator Category'
];

function getSpreadsheet_() {
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

function setupSheets() {
  var ss = getSpreadsheet_();
  var sheets = ss.getSheets();
  var brandSheet = ss.getSheetByName(BRAND_SHEET);
  var creatorSheet = ss.getSheetByName(CREATOR_SHEET);

  if (!brandSheet && sheets[0]) {
    brandSheet = sheets[0];
    brandSheet.setName(BRAND_SHEET);
  }
  if (!creatorSheet && sheets[1]) {
    creatorSheet = sheets[1];
    creatorSheet.setName(CREATOR_SHEET);
  }
  if (!brandSheet) brandSheet = ss.insertSheet(BRAND_SHEET);
  if (!creatorSheet) creatorSheet = ss.insertSheet(CREATOR_SHEET);

  writeHeaders_(brandSheet, BRAND_HEADERS);
  writeHeaders_(creatorSheet, CREATOR_HEADERS);
}

function writeHeaders_(sheet, headers) {
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.setFrozenRows(1);
}

function getSheetWithHeaders_(ss, sheetName, headers) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) sheet = ss.insertSheet(sheetName);
  if (sheet.getLastRow() === 0) writeHeaders_(sheet, headers);
  return sheet;
}

function doGet(e) {
  var p = e && e.parameter ? e.parameter : {};
  if (p.type === 'brand' || p.type === 'creator') {
    var result = processSubmissionData_(p);
    if (p.callback) {
      return jsonpResponse_(p.callback, result);
    }
    return jsonResponse_(result);
  }
  return jsonResponse_({ ok: true, message: 'Ekka Media forms endpoint is running.' });
}

function doPost(e) {
  try {
    var data = {};
    if (e.parameter && e.parameter.payload) {
      data = JSON.parse(e.parameter.payload);
    } else if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter && e.parameter.type) {
      data = e.parameter;
    }
    return jsonResponse_(processSubmissionData_(data));
  } catch (err) {
    return jsonResponse_({ success: false, error: String(err.message || err) });
  }
}

function processSubmissionData_(data) {
  try {
    var type = data.type;
    var ss = getSpreadsheet_();

    if (type === 'brand') {
      var brandSheet = getSheetWithHeaders_(ss, BRAND_SHEET, BRAND_HEADERS);
      brandSheet.appendRow([
        new Date(),
        sanitize_(data.name),
        sanitize_(data.email),
        sanitize_(data.phone),
        sanitize_(data.brandName)
      ]);
      return { success: true, message: 'Brand inquiry saved.' };
    }

    if (type === 'creator') {
      var creatorSheet = getSheetWithHeaders_(ss, CREATOR_SHEET, CREATOR_HEADERS);
      creatorSheet.appendRow([
        new Date(),
        sanitize_(data.username),
        sanitize_(data.fullName),
        sanitize_(data.mobile || data.phone || data.mobileNumber),
        sanitize_(data.followers),
        sanitize_(data.country),
        sanitize_(data.city),
        sanitize_(data.category)
      ]);
      return { success: true, message: 'Creator application saved.' };
    }

    return { success: false, error: 'Unknown form type.' };
  } catch (err) {
    return { success: false, error: String(err.message || err) };
  }
}

function sanitize_(value) {
  if (value === null || value === undefined) return '';
  return String(value).trim();
}

function jsonpResponse_(callback, obj) {
  if (!/^[a-zA-Z_$][\w$]*$/.test(callback)) {
    return jsonResponse_({ success: false, error: 'Invalid callback name.' });
  }
  return ContentService.createTextOutput(callback + '(' + JSON.stringify(obj) + ')').setMimeType(
    ContentService.MimeType.JAVASCRIPT
  );
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
