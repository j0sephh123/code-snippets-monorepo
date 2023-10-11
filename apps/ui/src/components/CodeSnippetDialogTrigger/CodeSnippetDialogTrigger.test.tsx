import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import CodeSnippetDialogTrigger from './CodeSnippetDialogTrigger';
import { renderWithProvider } from '../../tests/renderUtils';

const toggleDialogSpy = vi.hoisted(vi.fn);

vi.mock('../../store/dialog/dialogState', () => ({
  toggleDialog: toggleDialogSpy,
}));

describe('components > CodeSnippetDialogTrigger', () => {
  it('renders', async () => {
    const user = userEvent.setup();
    const { asFragment } = renderWithProvider(<CodeSnippetDialogTrigger />, {
      provider: 'mantine',
    });
    const btn = screen.getByRole('button');

    await user.click(btn);

    expect(toggleDialogSpy).toHaveBeenCalledWith('create', {
      title: 'Create a Code Snippet',
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
