import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './App';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { createTheme } from '@mantine/core';
import GenericModal from './components/GenericModal/GenericModal';
import TRPCProvider from './components/TRPCProvider';
import { Route } from 'wouter';
import SnippetPage from './pages/SnippetPage';

const theme = createTheme({});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <TRPCProvider>
      <MantineProvider defaultColorScheme="dark" theme={theme}>
        <Route path='/' component={App} />
        <Route path='/snippets/:id' component={SnippetPage} />
        <GenericModal />
      </MantineProvider>
    </TRPCProvider>
  </StrictMode>
);
