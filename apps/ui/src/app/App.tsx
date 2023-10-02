import { trpc } from '../utils/tprc';
import ColorThemeSwitch from './components/ColorThemeSwitch/ColorThemeSwitch';

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
    <div>
      <ColorThemeSwitch />
      <h1>App</h1>
    </div>
  );
}
