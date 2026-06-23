import fs from 'node:fs/promises';
import path from 'node:path';
import mammoth from 'mammoth';

const pdfParse = require('pdf-parse');

export async function extractTextFromFile(filePath: string): Promise<string> {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === '.pdf') {
    const buffer = await fs.readFile(filePath);
    const data = await pdfParse(buffer);
    return data.text
      .split('\n')
      .map((line: string) => line.trim())
      .filter(Boolean)
      .join('\n');
  }

  if (ext === '.docx') {
    const buffer = await fs.readFile(filePath);
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  if (ext === '.csv' || ext === '.txt') {
    return (await fs.readFile(filePath, 'utf8')).trim();
  }

  throw new Error('Unsupported file type for extraction.');
}

export async function extractTextFromFiles(files: Array<{ path: string }>): Promise<string> {
  const chunks = await Promise.all(files.map((file) => extractTextFromFile(file.path)));
  return chunks.filter(Boolean).join('\n\n');
}
