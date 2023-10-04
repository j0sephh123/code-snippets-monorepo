import { trpc } from '../utils/tprc';
import BasicFormPoc from './components/BasicFormPoc/BasicFormPoc';
import Layout from './components/Layout/Layout';
import TableBody from './components/table/TableBody';
import TableWrapper from './components/table/TableWrapper';
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

  const elements = [
    { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
    { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
    { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
    { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
  ];

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
      <TableWrapper>
        <TableBody data={elements} />
      </TableWrapper>
    </Layout>
  );
}
