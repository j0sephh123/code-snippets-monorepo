import { identifyCodeType } from './code-utils';

describe('identifyCodeType', () => {
  test('should return null for an invalid code snippet', () => {
    expect(identifyCodeType('const x = ')).toBe(null);
  });

  // Test Cases for TypeScript Identification
  test('should return "TypeScript" for TypeScript snippet with type annotations', () => {
    expect(identifyCodeType('const x: number = 10;')).toBe('TypeScript');
  });

  test('should return "TypeScript" for TypeScript snippet with interfaces', () => {
    expect(identifyCodeType('interface Point { x: number, y: number }')).toBe(
      'TypeScript'
    );
  });

  // Test Cases for JavaScript Identification
  test('should return "JavaScript" for JavaScript snippet using var', () => {
    expect(identifyCodeType('var x = 10;')).toBe('JavaScript');
  });

  test('should return "JavaScript" for JavaScript snippet using let and const', () => {
    expect(identifyCodeType('let x = 10; const y = 20;')).toBe('JavaScript');
  });

  // Combined Test Cases
  test('should return "JavaScript" for snippet valid in both TypeScript and JavaScript', () => {
    expect(identifyCodeType('const x = 10;')).toBe('JavaScript');
  });
});
