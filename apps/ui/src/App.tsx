import Layout from './components/Layout/Layout';
import SnippetsTable from './components/table/SnippetsTable/SnippetsTable';
import { toggleDialog } from './store/dialog/dialogState';

export default function App() {
  return (
    <Layout>
      <button
        onClick={() => toggleDialog('create', { title: 'Create a snippet' })}
      >
        Open Create Dialog
      </button>
      <button
        onClick={() =>
          toggleDialog('confirm', { confirmMessage: 'confirmMessage' })
        }
      >
        Open Confirm Delete Dialog
      </button>
      <h1>App</h1>
      <SnippetsTable />
    </Layout>
  );
}
