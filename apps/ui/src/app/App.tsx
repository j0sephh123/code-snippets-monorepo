import { trpc } from '../utils/tprc';

export default function App() {
  const demo = trpc.demo.useQuery();
  const getUser = trpc.getUser.useQuery('custom input');

  console.log({
    'demo.data': demo.data,
    'getUser.data': getUser.data,
  });

  return (
    <div>
      <h1>App</h1>
    </div>
  );
}
