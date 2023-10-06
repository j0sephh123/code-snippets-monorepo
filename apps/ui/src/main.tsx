import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { createTheme } from '@mantine/core';
import GenericModal from './components/GenericModal/GenericModal';
import TRPCProvider from './components/TRPCProvider';
import { Route } from 'wouter';
import SnippetPage from './pages/SnippetPage';
import Layout from './components/Layout/Layout';
import SnippetsTable from './components/table/SnippetsTable/SnippetsTable';
import CodeSnippetDialogTrigger from './components/CodeSnippetDialogTrigger/CodeSnippetDialogTrigger';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <TRPCProvider>
      <MantineProvider defaultColorScheme="dark" theme={createTheme({})}>
        <Layout>
          <Route path="/" component={SnippetsTable} />
          <Route path="/snippets/:id" component={SnippetPage} />
        </Layout>
        <GenericModal />
        <CodeSnippetDialogTrigger />
      </MantineProvider>
    </TRPCProvider>
  </StrictMode>
);
