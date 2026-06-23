import fs from 'node:fs';
import path from 'node:path';

const LOG_DIR = path.join(process.cwd(), 'logs');
const APP_LOG = path.join(LOG_DIR, 'app.log');
const ERROR_LOG = path.join(LOG_DIR, 'errors.log');

function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}

function writeLog(filePath: string, message: string) {
  ensureLogDir();
  fs.appendFileSync(filePath, `${new Date().toISOString()} ${message}\n`, 'utf8');
}

export function logInfo(message: string) {
  writeLog(APP_LOG, message);
}

export function logError(message: string, error?: unknown) {
  writeLog(ERROR_LOG, `${message} ${error instanceof Error ? error.stack || error.message : String(error)}`);
}

export function getLogFiles() {
  return {
    appLog: APP_LOG,
    errorLog: ERROR_LOG,
  };
}
