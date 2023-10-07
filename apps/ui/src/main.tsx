import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { createTheme } from '@mantine/core';
import GenericModal from './components/GenericModal/GenericModal';
import TRPCProvider from './components/TRPCProvider';
import { Route } from 'wouter';
import SnippetPage from './pages/SnippetPage/SnippetPage';
import Layout from './components/Layout/Layout';
import CodeSnippetDialogTrigger from './components/CodeSnippetDialogTrigger/CodeSnippetDialogTrigger';
import IndexPage from './pages/IndexPage/IndexPage';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <TRPCProvider>
      <MantineProvider defaultColorScheme="dark" theme={createTheme({})}>
        <Layout>
          <Route path="/" component={IndexPage} />
          <Route
            path="/snippets/:id"
            component={(props) => <SnippetPage id={props.params.id} />}
          />
        </Layout>
        <GenericModal />
        <CodeSnippetDialogTrigger />
      </MantineProvider>
    </TRPCProvider>
  </StrictMode>
);
