import test from 'node:test';
import assert from 'node:assert/strict';

import { uiHtmlPath } from '../phases/phase5-ui-enhancement';

test('Phase 5 keeps the UI entry point available', () => {
  assert.equal(uiHtmlPath, 'PUBLIC/index.html');
});
