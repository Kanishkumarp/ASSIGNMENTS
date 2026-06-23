import test from 'node:test';
import assert from 'node:assert/strict';

import { PORT } from '../phases/phase1-foundation';

test('Phase 1 exposes the app entry configuration', () => {
  assert.ok(Number.isInteger(PORT));
  assert.ok(PORT > 0);
});
