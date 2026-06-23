import test from 'node:test';
import assert from 'node:assert/strict';

import { getLogFiles } from '../phases/phase6-deployment';

test('Phase 6 exposes logging files', () => {
  const logs = getLogFiles();
  assert.ok(typeof logs.appLog === 'string');
  assert.ok(typeof logs.errorLog === 'string');
});
