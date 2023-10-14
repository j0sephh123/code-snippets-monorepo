import * as parser from '@babel/parser';

// This is ugly, but with the current implementation 
// plugins: ['typescript'] can also parse JS code
// to avoid checking for explicit TS constructs, these implementation 
// seems to satisfy the necessary business logic represented as test cases
export function identifyCodeType(codeSnippet: string): 'invalid' | 'ts' | 'js' {
  let isJS = true;
  let isTS = true;

  try {
    parser.parse(codeSnippet, { sourceType: 'module' });
  } catch (e) {
    isJS = false;
  }

  try {
    parser.parse(codeSnippet, {
      sourceType: 'module',
      plugins: ['typescript'],
    });
  } catch (e) {
    isTS = false;
  }

  if (!isJS && !isTS) {
    return 'invalid';
  }

  if (isTS && !isJS) {
    return 'ts';
  }

  if (isJS) {
    return 'js';
  }

  // This should never be reached based on current logic,
  // but it's here to satisfy TypeScript's requirement that all code paths must return a value.
  return 'invalid';
}
