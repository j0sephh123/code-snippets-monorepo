import * as parser from '@babel/parser';
import { Language } from '@prisma/client';

// This is ugly, but with the current implementation
// plugins: ['typescript'] can also parse JS code
// to avoid checking for explicit TS constructs, these implementation
// seems to satisfy the necessary business logic represented as test cases

export function identifyCodeType(codeSnippet: string): Language | null {
  let isJS = true;
  let isTS = true;

  // Check if code is JavaScript
  try {
    parser.parse(codeSnippet, { sourceType: 'module' });
  } catch (e) {
    isJS = false;
  }

  // Check if code is TypeScript
  try {
    parser.parse(codeSnippet, {
      sourceType: 'module',
      plugins: ['typescript'],
    });
  } catch (e) {
    isTS = false;
  }

  // Check and return the detected language or null if invalid
  if (!isJS && !isTS) {
    return null;
  }

  if (isTS && !isJS) {
    return 'TypeScript';
  }

  if (isJS) {
    return 'JavaScript';
  }

  // This should never be reached based on current logic,
  // but it's here to satisfy TypeScript's requirement that all code paths must return a value.
  return null;
}
