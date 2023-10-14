import { identifyCodeType } from './code-utils';

describe('identifyCodeType', () => {
  test('should return "invalid" for an invalid code snippet', () => {
    expect(identifyCodeType('const x = ')).toBe('invalid');
  });

  // Test Cases for TypeScript Identification
  test('should return "ts" for TypeScript snippet with type annotations', () => {
    expect(identifyCodeType('const x: number = 10;')).toBe('ts');
  });

  test('should return "ts" for TypeScript snippet with interfaces', () => {
    expect(identifyCodeType('interface Point { x: number, y: number }')).toBe(
      'ts'
    );
  });

  // Test Cases for JavaScript Identification
  test('should return "js" for JavaScript snippet using var', () => {
    expect(identifyCodeType('var x = 10;')).toBe('js');
  });

  test('should return "js" for JavaScript snippet using let and const', () => {
    expect(identifyCodeType('let x = 10; const y = 20;')).toBe('js');
  });

  // Combined Test Cases
  test('should return "js" for snippet valid in both TypeScript and JavaScript', () => {
    expect(identifyCodeType('const x = 10;')).toBe('js');
  });
});
