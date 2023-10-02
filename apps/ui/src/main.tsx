import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import TRPCProvider from './app/components/TRPCProvider';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { createTheme } from '@mantine/core';

const theme = createTheme({});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <TRPCProvider>
        <MantineProvider defaultColorScheme="dark" theme={theme}>
          <App />
        </MantineProvider>
      </TRPCProvider>
    </BrowserRouter>
  </StrictMode>
);
