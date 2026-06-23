import express from 'express';

import { getModelInfo } from '../model';

const router = express.Router();

router.get('/health', (_req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    model: getModelInfo(),
  });
});

export default router;
