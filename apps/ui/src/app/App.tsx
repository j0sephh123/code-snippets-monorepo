import { useEffect } from 'react';
import './App.css';

export function App() {
  useEffect(() => {
    fetch('/api').then(r=>r.json()).then(console.log)
  }, []);

  return (
    <div>
      <h1>
        <span> Hello there, </span>
        Welcome ui 👋
      </h1>
    </div>
  );
}

export default App;
