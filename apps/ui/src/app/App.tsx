import BasicFormPoc from './components/BasicFormPoc/BasicFormPoc';
import Layout from './components/Layout/Layout';
import { toggleDialog } from './store/dialog/dialogState';
import SnippetsTable from './components/table/SnippetsTable/SnippetsTable';

export default function App() {
  return (
    <Layout>
      <button onClick={() => toggleDialog('create', { title: 'title' })}>
        Open Create Dialog
      </button>
      <button
        onClick={() =>
          toggleDialog('confirm', { confirmMessage: 'confirmMessage' })
        }
      >
        Open Confirm Delete Dialog
      </button>
      <BasicFormPoc />
      <h1>App</h1>
      <SnippetsTable />
    </Layout>
  );
}
