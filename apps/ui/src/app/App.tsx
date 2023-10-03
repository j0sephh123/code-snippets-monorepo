import { trpc } from '../utils/tprc';
import Layout from './components/Layout/Layout';
import { toggleDialog } from './store/dialog/dialogState';

export default function App() {
  const demo = trpc.demo.useQuery();
  const getUser = trpc.getUser.useQuery('custom input');
  const fromPrisma = trpc.fromPrisma.useQuery();

  console.log({
    'demo.data': demo.data,
    'getUser.data': getUser.data,
    'fromPrisma.data': fromPrisma.data,
  });

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
      <h1>App</h1>
    </Layout>
  );
}
