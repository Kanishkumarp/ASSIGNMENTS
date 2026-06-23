import test from 'node:test';
import assert from 'node:assert/strict';

import { ALLOWED_EXTENSIONS, MAX_FILE_SIZE } from '../phases/phase2-file-handling';

test('Phase 2 keeps upload rules explicit', () => {
  assert.ok(ALLOWED_EXTENSIONS.has('.pdf'));
  assert.ok(ALLOWED_EXTENSIONS.has('.txt'));
  assert.equal(MAX_FILE_SIZE, 10 * 1024 * 1024);
});
