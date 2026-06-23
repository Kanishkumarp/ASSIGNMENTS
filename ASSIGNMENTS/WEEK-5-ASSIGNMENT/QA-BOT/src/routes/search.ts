import express from 'express';

import { extractTextFromFile, extractTextFromFiles } from '../loaders';
import { generateAnswer } from '../model';
import { searchDocumentSchema, searchUploadSchema } from '../types';
import { upload } from '../utils/upload';

const router = express.Router();

router.post('/search/document', async (req, res) => {
  try {
    const requestId = (req as express.Request & { requestId?: string }).requestId || 'unknown';
    const startedAt = Date.now();
    const parsed = searchDocumentSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues[0]?.message || 'Validation failed.' });
      return;
    }

    const { question, documentPath, documentText, promptType } = parsed.data;
    const text = documentText || (documentPath ? await extractTextFromFile(documentPath) : '');

    const result = await generateAnswer(question, text, promptType);
    res.json({
      ...result,
      requestId,
      responseTimeMs: Date.now() - startedAt,
      source: documentText ? 'documentText' : 'documentPath',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to process document.' });
  }
});

router.post('/search/upload', upload.array('files', 5), async (req, res) => {
  try {
    const requestId = (req as express.Request & { requestId?: string }).requestId || 'unknown';
    const startedAt = Date.now();
    const parsed = searchUploadSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues[0]?.message || 'Validation failed.' });
      return;
    }

    if (!req.files || req.files.length === 0) {
      res.status(400).json({ error: 'At least one file is required.' });
      return;
    }

    const files = req.files as Express.Multer.File[];
    const text = await extractTextFromFiles(files.map((file) => ({ path: file.path })));
    const result = await generateAnswer(parsed.data.question, text, parsed.data.promptType);

    res.json({
      ...result,
      filesProcessed: files.map((file) => file.filename),
      requestId,
      responseTimeMs: Date.now() - startedAt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to process uploaded files.' });
  }
});

export default router;
