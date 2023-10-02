import { trpc } from '../utils/tprc';
import Layout from './components/Layout/Layout';

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
      <h1>App</h1>
    </Layout>
  );
}
