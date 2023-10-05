import { useState } from 'react';
import { Button, TextInput } from '@mantine/core';
import { trpc } from '../../../utils/tprc';

export default function BasicFormPoc() {
  const trpcContext = trpc.useContext();
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('');
  const [description, setDescription] = useState('');

  const mutation = trpc.createPost.useMutation({
    onSuccess() {
      trpcContext.getSnippets.invalidate();
      setCode('');
      setLanguage('');
      setDescription('');
    },
  });

  return (
    <div>
      <TextInput
        placeholder="Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <TextInput
        placeholder="Language"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button
        onClick={() => {
          mutation.mutate({
            code,
            description,
            language,
          });
        }}
      >
        Create
      </Button>
    </div>
  );
}
