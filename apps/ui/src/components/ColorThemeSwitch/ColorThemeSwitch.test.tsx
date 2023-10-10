import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import ColorThemeSwitch from './ColorThemeSwitch';
import { MantineProvider, createTheme } from '@mantine/core';

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
    const { asFragment } = render(
      <MantineProvider defaultColorScheme="dark" theme={createTheme({})}>
        <ColorThemeSwitch />
      </MantineProvider>
    );
    const btn = screen.getByRole('button');

    await user.click(btn);

    expect(setColorSchemeSpy).toHaveBeenCalledWith('light');
    expect(asFragment()).toMatchSnapshot();
  });
});
