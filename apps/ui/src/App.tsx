import { Route, Switch } from 'wouter';
import CodeSnippetDialogTrigger from './components/CodeSnippetDialogTrigger/CodeSnippetDialogTrigger';
import GenericModal from './components/GenericModal/GenericModal';
import Layout from './components/Layout/Layout';
import IndexPage from './pages/IndexPage/IndexPage';
import SnippetPage from './pages/SnippetPage/SnippetPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

export default function App() {
  return (
    <>
      <Layout>
        <Switch>
          <Route path="/" component={IndexPage} />
          <Route
            path="/snippets/:id"
            component={(props) => <SnippetPage id={+props.params.id} />}
          />
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Layout>
      <GenericModal />
      <CodeSnippetDialogTrigger />
    </>
  );
}
