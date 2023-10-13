import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { createTheme } from '@mantine/core';
import TRPCProvider from './components/TRPCProvider';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <TRPCProvider>
      <MantineProvider defaultColorScheme="dark" theme={createTheme({})}>
        <App />
      </MantineProvider>
    </TRPCProvider>
  </StrictMode>
);
