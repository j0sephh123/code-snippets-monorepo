import { describe, it, expect } from 'vitest';
import { MantineProvider, createTheme } from '@mantine/core';
import { render } from '@testing-library/react';
import CodeSnippetDialogTrigger from './CodeSnippetDialogTrigger';

describe('components > CodeSnippetDialogTrigger', () => {
  it('renders', () => {
    const { asFragment } = render(
      <MantineProvider defaultColorScheme="dark" theme={createTheme({})}>
        <CodeSnippetDialogTrigger />
      </MantineProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
