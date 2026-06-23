import 'dotenv/config';

import express from 'express';
import path from 'node:path';
import multer from 'multer';

import healthRoutes from './routes/health';
import searchRoutes from './routes/search';
import { ensureUploadDir } from './utils/upload';
import { logError, logInfo } from './utils/logger';

const app = express();

ensureUploadDir();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'PUBLIC')));

app.use((req, _res, next) => {
  const requestId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  (req as express.Request & { requestId?: string }).requestId = requestId;
  logInfo(`REQUEST ${requestId} ${req.method} ${req.originalUrl}`);
  next();
});

app.use(healthRoutes);
app.use(searchRoutes);

app.use((err: unknown, _req: express.Request, res: express.Response, _next: (err?: unknown) => void) => {
  if (err instanceof multer.MulterError) {
    logError('Multer error', err);
    if (err.code === 'LIMIT_FILE_SIZE') {
      res.status(413).json({ error: 'File exceeds the 10MB limit.' });
      return;
    }

    res.status(400).json({ error: err.message });
    return;
  }

  if (err instanceof Error && err.message.includes('Unsupported file type')) {
    logError('Upload validation error', err);
    res.status(400).json({ error: err.message });
    return;
  }

  logError('Unhandled server error', err);
  console.error(err);
  res.status(500).json({ error: 'Unexpected server error.' });
});

export { app };
