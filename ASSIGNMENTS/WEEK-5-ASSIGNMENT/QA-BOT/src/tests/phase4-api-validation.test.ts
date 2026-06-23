import test from 'node:test';
import assert from 'node:assert/strict';

import { searchDocumentSchema } from '../phases/phase4-api-validation';

test('Phase 4 validates document request input', () => {
  const result = searchDocumentSchema.safeParse({ question: 'What is revenue?', documentText: 'Revenue is 100M.' });
  assert.equal(result.success, true);
});

test('Phase 4 rejects missing document content', () => {
  const result = searchDocumentSchema.safeParse({ question: 'What is revenue?' });
  assert.equal(result.success, false);
});
