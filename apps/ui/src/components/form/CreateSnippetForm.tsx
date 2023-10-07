import { useState } from 'react';
import { Language } from '@prisma/client';
import { Button, Select, Textarea, Tooltip } from '@mantine/core';
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

  const isValid = code.length > 0 && description.length > 0;

  return (
    <>
      <Textarea
        rows={2}
        maxLength={190}
        withAsterisk
        label="Description"
        placeholder="Description"
        description="Between 1 and 190 characters"
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
        description="Between 1 and 4000 characters"
        maxLength={4000}
        rows={4}
        withAsterisk
        label="Code"
        placeholder="Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      {isValid ? (
        <Button
          disabled={code.length === 0 || description.length === 0}
          variant="gradient"
          fullWidth
          onClick={handleCreateSnippet}
        >
          Create
        </Button>
      ) : (
        <Tooltip label='To be able to submit, fill all required fields'>
          <Button
            disabled={code.length === 0 || description.length === 0}
            variant="gradient"
            fullWidth
            onClick={handleCreateSnippet}
          >
            Create
          </Button>
        </Tooltip>
      )}
    </>
  );
}
