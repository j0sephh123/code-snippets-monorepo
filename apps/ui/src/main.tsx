import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { createTheme } from '@mantine/core';
import GenericModal from './components/GenericModal/GenericModal';
import TRPCProvider from './components/TRPCProvider';

const theme = createTheme({});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <TRPCProvider>
        <MantineProvider defaultColorScheme="dark" theme={theme}>
          <App />
          <GenericModal />
        </MantineProvider>
      </TRPCProvider>
    </BrowserRouter>
  </StrictMode>
);
