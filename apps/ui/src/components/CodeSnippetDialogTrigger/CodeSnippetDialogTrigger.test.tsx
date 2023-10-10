import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { MantineProvider, createTheme } from '@mantine/core';
import CodeSnippetDialogTrigger from './CodeSnippetDialogTrigger';

const toggleDialogSpy = vi.hoisted(() => vi.fn());

vi.mock('../../store/dialog/dialogState', () => ({
  toggleDialog: toggleDialogSpy,
}));

describe('components > CodeSnippetDialogTrigger', () => {
  it('renders', async () => {
    const user = userEvent.setup();
    const { asFragment } = render(
      <MantineProvider defaultColorScheme="dark" theme={createTheme({})}>
        <CodeSnippetDialogTrigger />
      </MantineProvider>
    );
    const btn = screen.getByRole('button');

    await user.click(btn);

    expect(toggleDialogSpy).toHaveBeenCalledWith('create', {
      title: 'Create a Code Snippet',
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
