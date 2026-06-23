import { z } from 'zod';

export const promptTypeSchema = z.enum(['default', 'detailed', 'concise', 'technical']);

export const searchDocumentSchema = z.object({
  question: z.string().trim().min(1, 'Question is required.'),
  documentPath: z.string().trim().optional(),
  documentText: z.string().trim().optional(),
  promptType: promptTypeSchema.optional().default('default'),
}).refine((data) => Boolean(data.documentPath?.trim() || data.documentText?.trim()), {
  message: 'Please provide documentPath or documentText.',
  path: ['documentPath'],
});

export const searchUploadSchema = z.object({
  question: z.string().trim().min(1, 'Question is required.'),
  promptType: promptTypeSchema.optional().default('default'),
});

export type SearchDocumentInput = z.infer<typeof searchDocumentSchema>;
export type SearchUploadInput = z.infer<typeof searchUploadSchema>;
