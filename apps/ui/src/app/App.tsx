import { Table } from '@mantine/core';
import { trpc } from '../utils/tprc';
import BasicFormPoc from './components/BasicFormPoc/BasicFormPoc';
import Layout from './components/Layout/Layout';
import TableWrapper from './components/table/TableWrapper';
import { toggleDialog } from './store/dialog/dialogState';

const tableDummyData = [
  { id: 1, cells: [<div>11</div>, <div>12</div>, <div>13</div>] },
  { id: 2, cells: [<div>21</div>, <div>22</div>, <div>23</div>] },
];
const tableDummyColumns = ['mass', 'symbol', 'name'];

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
      <BasicFormPoc />
      <h1>App</h1>
      <TableWrapper columns={tableDummyColumns}>
        {tableDummyData.map((row) => (
          <Table.Tr key={row.id}>
            {row.cells.map((cell, cellIndex) => (
              <Table.Td key={`${row.id}-${cellIndex}`}>{cell}</Table.Td>
            ))}
          </Table.Tr>
        ))}
      </TableWrapper>
    </Layout>
  );
}
