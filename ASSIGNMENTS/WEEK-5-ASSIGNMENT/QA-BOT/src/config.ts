import path from 'node:path';

export const PORT = Number(process.env.PORT || 3000);
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');
export const ALLOWED_EXTENSIONS = new Set(['.pdf', '.docx', '.txt', '.csv']);
export const MAX_FILE_SIZE = 10 * 1024 * 1024;
