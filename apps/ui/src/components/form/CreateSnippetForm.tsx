import { useState } from 'react';
import { Language } from '@prisma/client';
import { Button, TextInput, Select, Textarea } from '@mantine/core';
import { trpc } from '../../utils/tprc';
import { toggleDialog } from '../../store/dialog/dialogState';

const defaultLanguage: Language = 'JavaScript';

// TODO experiment with refactoring
// TODO extract placeholders, defaults, labels in a config file
export default function CreateSnippetForm() {
  const trpcContext = trpc.useContext();
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState<Language>(defaultLanguage);
  const [description, setDescription] = useState('');

  const { mutate: createSnippet } = trpc.createSnippet.useMutation({
    onSuccess() {
      trpcContext.getSnippets.invalidate();
      setCode('');
      setLanguage(defaultLanguage);
      setDescription('');
      toggleDialog('closed');
    },
  });

  const handleCreateSnippet = () => {
    createSnippet({
      code,
      description,
      language,
    });
  };

  return (
    <>
      <TextInput
        withAsterisk
        label="Description"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Select
        withAsterisk
        value={language}
        onChange={(e) => setLanguage(e as keyof typeof Language)}
        label="Language"
        placeholder="Pick a language"
        data={Object.keys(Language)}
      />
      <Textarea
        withAsterisk
        label="Code"
        placeholder="Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <Button
        disabled={code.length === 0 || description.length === 0}
        variant="gradient"
        fullWidth
        onClick={handleCreateSnippet}
      >
        Create
      </Button>
    </>
  );
}
