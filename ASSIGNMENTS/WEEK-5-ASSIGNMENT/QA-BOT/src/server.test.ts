import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import type { AddressInfo } from 'node:net';

import { app } from './app';

let server: ReturnType<typeof app.listen> | undefined;
let baseUrl = 'http://127.0.0.1';

before(async () => {
  server = app.listen(0);
  await new Promise<void>((resolve) => server?.once('listening', () => resolve()));
  const address = server.address() as AddressInfo;
  baseUrl = `http://127.0.0.1:${address.port}`;
});

after(async () => {
  await new Promise<void>((resolve, reject) => {
    if (!server) {
      resolve();
      return;
    }

    server.close((error) => (error ? reject(error) : resolve()));
  });
});

async function request(path: string, init?: RequestInit) {
  const response = await fetch(`${baseUrl}${path}`, init);
  return {
    status: response.status,
    json: await response.json().catch(() => null),
    text: await response.text().catch(() => ''),
  };
}

test('GET /health returns healthy status', async () => {
  const result = await request('/health');

  assert.equal(result.status, 200);
  assert.equal(result.json?.status, 'healthy');
});

test('POST /search/document validates missing document input', async () => {
  const result = await request('/search/document', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question: 'What is this?' }),
  });

  assert.equal(result.status, 400);
  assert.match(String(result.json?.error || ''), /document/i);
});

test('POST /search/upload rejects unsupported file type', async () => {
  const form = new FormData();
  form.append('question', 'What is this file?');
  form.append('files', new Blob(['hello'], { type: 'text/plain' }), 'notes.exe');

  const result = await request('/search/upload', {
    method: 'POST',
    body: form,
  });

  assert.equal(result.status, 400);
  assert.match(String(result.json?.error || ''), /unsupported|allowed/i);
});
