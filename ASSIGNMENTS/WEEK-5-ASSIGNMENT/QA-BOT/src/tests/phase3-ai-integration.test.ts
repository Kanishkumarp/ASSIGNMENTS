import test from 'node:test';
import assert from 'node:assert/strict';

import { getModelInfo } from '../phases/phase3-ai-integration';

test('Phase 3 exposes model metadata', () => {
  const info = getModelInfo();
  assert.ok(typeof info.provider === 'string');
  assert.ok(typeof info.model === 'string');
  assert.ok(typeof info.temperature === 'number');
});
