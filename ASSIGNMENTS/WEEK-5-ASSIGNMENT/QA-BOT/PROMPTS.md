# Application Prompt Templates

This file documents the prompt templates used by the application in `src/model.ts`.

## Prompt Types

### default
`Answer clearly and accurately using the provided document context. Use bullet points when helpful and keep the output easy to read.`

### detailed
`Provide a detailed explanation with context, key points, caveats, and a short summary at the end.`

### concise
`Answer briefly and directly with only the most important details.`

### technical
`Answer from a technical perspective using precise terminology, structured steps, and practical notes.`

## How prompts are used

In `src/model.ts`, the selected prompt type is inserted into the system message:

- `system`: `You are a QA assistant. ${instructions}`
- `user`: `Document context:\n${documentText}\n\nQuestion:\n${question}`

This means the application uses the prompt type instruction as the high-level role guidance for the AI model.
