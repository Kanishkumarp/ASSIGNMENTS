import test from 'node:test';
import assert from 'node:assert/strict';

import { searchUploadSchema } from '../types';

test('Phase 7 keeps response metadata fields predictable', () => {
  const parsed = searchUploadSchema.safeParse({ question: 'What is revenue?', promptType: 'default' });
  assert.equal(parsed.success, true);
});
