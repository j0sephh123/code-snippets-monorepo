import { useState } from 'react';
import { Language } from '@prisma/client';
import { Button, TextInput, Select } from '@mantine/core';
import { trpc } from '../../utils/tprc';
import { toggleDialog } from '../../store/dialog/dialogState';

type Props = {
  title: string;
};

const defaultLanguage: Language = 'JavaScript';

export default function CreateSnippetForm({ title }: Props) {
  const trpcContext = trpc.useContext();
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState<Language>(defaultLanguage);
  const [description, setDescription] = useState('');

  const mutation = trpc.createSnippet.useMutation({
    onSuccess() {
      trpcContext.getSnippets.invalidate();
      setCode('');
      setLanguage(defaultLanguage);
      setDescription('');
      toggleDialog('closed');
    },
  });

  return (
    <>
      <h1>{title}</h1>
      <h2>{Language.JavaScript}</h2>
      <TextInput
        label="Code"
        placeholder="Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <TextInput
        label="Description"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Select
        value={language}
        onChange={(e) => setLanguage(e as keyof typeof Language)}
        label="Language"
        placeholder="Pick a language"
        data={Object.keys(Language)}
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
