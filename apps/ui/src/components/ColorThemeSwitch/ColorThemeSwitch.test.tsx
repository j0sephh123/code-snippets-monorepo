import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import ColorThemeSwitch from './ColorThemeSwitch';
import { renderWithProvider } from '../../tests/renderUtils';

const setColorSchemeSpy = vi.hoisted(vi.fn);

vi.mock('@mantine/core', async () => {
  const mantineActual = await vi.importActual('@mantine/core');

  return {
    ...(mantineActual as any),
    useMantineColorScheme: () => ({ setColorScheme: setColorSchemeSpy }),
  };
});

describe('components > ColorThemeSwitch', () => {
  it('renders', async () => {
    const user = userEvent.setup();
    const { asFragment } = renderWithProvider(<ColorThemeSwitch />, {
      provider: 'mantine',
    });
    const btn = screen.getByRole('button');

    await user.click(btn);

    expect(setColorSchemeSpy).toHaveBeenCalledWith('light');
    expect(asFragment()).toMatchSnapshot();
  });
});
