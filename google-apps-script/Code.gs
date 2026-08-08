/**
 * Backend de synchronisation pour Johns_pomodoro.
 * A coller dans Extensions > Apps Script d'une feuille Google Sheets dediee,
 * puis a deployer en Web App (Executer en tant que "Moi", Acces "Tout le monde").
 * Voir SHEETS_SYNC_SETUP.md a la racine du projet pour la procedure complete.
 */

const TASKS_SHEET = 'Tasks';
const META_SHEET = 'Meta';
const TASKS_HEADER = ['Type', 'ID', 'Text', 'Completed', 'TimeSpent', 'ParentID'];

function doGet(e) {
  return withLock_(function () {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheets = getOrCreateSheets_(ss);
    return jsonOut_(Object.assign(
      { status: 'ok', tasks: readTasks_(sheets.tasksSheet) },
      readMeta_(sheets.metaSheet)
    ));
  });
}

function doPost(e) {
  return withLock_(function () {
    const body = JSON.parse(e.postData.contents);
    if (!body || !Array.isArray(body.tasks)) {
      throw new Error('Invalid payload: missing tasks[]');
    }
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheets = getOrCreateSheets_(ss);
    writeTasks_(sheets.tasksSheet, body.tasks);
    writeMeta_(sheets.metaSheet, {
      taskIdCounter: body.taskIdCounter || 0,
      sessionCount: body.sessionCount || 1,
      lastModified: body.lastModified || Date.now()
    });
    return jsonOut_({ status: 'ok', lastModified: body.lastModified || Date.now() });
  });
}

function withLock_(fn) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(5000);
    return fn();
  } catch (err) {
    return jsonOut_({ status: 'error', message: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function jsonOut_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheets_(ss) {
  let tasksSheet = ss.getSheetByName(TASKS_SHEET);
  if (!tasksSheet) {
    tasksSheet = ss.insertSheet(TASKS_SHEET);
    tasksSheet.appendRow(TASKS_HEADER);
  }
  let metaSheet = ss.getSheetByName(META_SHEET);
  if (!metaSheet) {
    metaSheet = ss.insertSheet(META_SHEET);
    metaSheet.appendRow(['Key', 'Value']);
    metaSheet.appendRow(['taskIdCounter', 0]);
    metaSheet.appendRow(['sessionCount', 1]);
    metaSheet.appendRow(['lastModified', 0]);
  }
  return { tasksSheet: tasksSheet, metaSheet: metaSheet };
}

function readTasks_(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  const rows = sheet.getRange(2, 1, lastRow - 1, 6).getValues();
  return rows
    .filter(function (r) { return r[0]; })
    .map(function (r) {
      return {
        type: String(r[0]),
        id: Number(r[1]),
        text: String(r[2]),
        completed: r[3] === true || r[3] === 'TRUE',
        timeSpent: Number(r[4]) || 0,
        parentId: r[5] === '' || r[5] === null ? null : Number(r[5])
      };
    });
}

function writeTasks_(sheet, tasks) {
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.getRange(2, 1, lastRow - 1, 6).clearContent();
  }
  if (tasks.length === 0) return;
  const rows = tasks.map(function (t) {
    return [
      t.type,
      t.id,
      t.text,
      !!t.completed,
      t.timeSpent || 0,
      t.parentId === null || t.parentId === undefined ? '' : t.parentId
    ];
  });
  sheet.getRange(2, 1, rows.length, 6).setValues(rows);
}

function readMeta_(sheet) {
  const values = sheet.getRange(2, 1, 3, 2).getValues();
  const meta = { taskIdCounter: 0, sessionCount: 1, lastModified: 0 };
  values.forEach(function (row) {
    const key = row[0];
    const val = row[1];
    if (Object.prototype.hasOwnProperty.call(meta, key)) {
      meta[key] = Number(val) || 0;
    }
  });
  return meta;
}

function writeMeta_(sheet, meta) {
  sheet.getRange(2, 1, 3, 2).setValues([
    ['taskIdCounter', meta.taskIdCounter],
    ['sessionCount', meta.sessionCount],
    ['lastModified', meta.lastModified]
  ]);
}
