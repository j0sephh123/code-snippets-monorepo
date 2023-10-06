import { useState } from 'react';
import { Button, TextInput } from '@mantine/core';
import { trpc } from '../../utils/tprc';
import { toggleDialog } from '../../store/dialog/dialogState';

type Props = {
  title: string;
};

export default function CreateSnippetForm({ title }: Props) {
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
      toggleDialog('closed');
    },
  });

  return (
    <>
      <h1>{title}</h1>
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
    </>
  );
}
