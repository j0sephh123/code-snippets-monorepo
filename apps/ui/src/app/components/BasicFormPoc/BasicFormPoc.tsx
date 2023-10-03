import { useState } from 'react';
import { trpc } from '../../../utils/tprc';

export default function BasicFormPoc() {
  const [value, setValue] = useState('');

  const mutation = trpc.createPost.useMutation({
    onSuccess(data, variables, context) {
      console.log({
        data,
        variables,
        context,
      });
    },
  });

  return (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button
        onClick={() => {
          mutation.mutate({
            title: value,
          });
        }}
      >
        Create
      </button>
    </div>
  );
}
