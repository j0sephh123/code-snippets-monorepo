import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import CodeBlock from './CodeBlock';

describe('components > CodeBlock', () => {
  it('renders', () => {
    const { asFragment } = render(
      <CodeBlock code="code" language="TypeScript" />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
