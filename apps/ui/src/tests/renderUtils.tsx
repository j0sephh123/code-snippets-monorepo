/* eslint-disable @typescript-eslint/ban-types */
import { MantineProvider, createTheme } from '@mantine/core';
import { render } from '@testing-library/react';
import { PropsWithChildren, ReactElement } from 'react';

// TODO think of a better way to handle combining different providers
// i.e mantine and router
type RenderProvider = 'mantine';
type Params = {
  provider: RenderProvider;
};

export function renderWithProvider(ui: ReactElement, { provider }: Params) {
  if (!provider) {
    return render(ui);
  }

  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <MantineProvider defaultColorScheme="dark" theme={createTheme({})}>
        {children}
      </MantineProvider>
    );
  }

  return render(ui, { wrapper: Wrapper });
}
