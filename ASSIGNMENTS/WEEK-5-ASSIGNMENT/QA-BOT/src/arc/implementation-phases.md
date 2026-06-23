# Phase-by-Phase Implementation Plan

## Phase 1 — Foundation
- Set up the Express + TypeScript server.
- Add a health endpoint and static frontend hosting.
- Verify with tests for `/health` and basic request handling.

## Phase 2 — File Handling
- Add upload validation for `.pdf`, `.docx`, `.txt`, and `.csv` files.
- Enforce the 10MB file-size limit.
- Store uploads in `./uploads` and return processed file names.
- Verify with tests for unsupported file type and file upload validation.

## Phase 3 — AI Integration
- Replace the placeholder response with a real LLM chain using the configured provider.
- Add prompt-type-aware answer generation for `default`, `detailed`, `concise`, and `technical`.

## Phase 4 — API Integration
- Add structured validation for `/search/document` and `/search/upload`.
- Return consistent success and error payloads.
- Expand tests for happy-path and error cases.

## Phase 5 — UX Improvements
- Connect the HTML page to the backend with real form submission.
- Show loading, result, and model metadata in the UI.

## Phase 6 — Deployment Ready
- Run the TypeScript build and tests.
- Prepare for deployment with environment-based configuration and logging.

## Current Test Coverage
- `GET /health` returns healthy status.
- `/search/document` rejects missing document input.
- `/search/upload` rejects unsupported file types.
