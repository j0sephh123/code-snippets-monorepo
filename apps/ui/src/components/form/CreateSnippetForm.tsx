import { useState } from 'react';
import { Button, Textarea, Tooltip } from '@mantine/core';
import { trpc } from '../../utils/tprc';
import { toggleDialog } from '../../store/dialog/dialogState';

// TODO experiment with refactoring
// TODO extract placeholders, defaults, labels in a config file
export default function CreateSnippetForm() {
  const trpcContext = trpc.useContext();
  const [codeInput, setCodeInput] = useState('');
  const [isCodeInputInvalid, setIsCodeInputInvalid] = useState(false);
  const [description, setDescription] = useState('');

  const { mutate: createSnippet } = trpc.createSnippet.useMutation({
    onSuccess() {
      trpcContext.getSnippets.invalidate();
      setCodeInput('');
      setDescription('');
      toggleDialog('closed');
    },
    onError() {
      // TODO a more complete approach is necessary here
      setIsCodeInputInvalid(true);
    },
  });

  const handleCreateSnippet = () => {
    createSnippet({
      code: codeInput,
      description,
    });
  };

  const isUserInputValid = codeInput.length > 0 && description.length > 0;

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
      <Textarea
        description="Between 1 and 4000 characters"
        maxLength={4000}
        rows={4}
        withAsterisk
        label="Code"
        placeholder="Code"
        value={codeInput}
        onChange={(e) => setCodeInput(e.target.value)}
        error={isCodeInputInvalid ? 'Invalid code snippet' : null}
      />
      {isUserInputValid ? (
        <Button
          disabled={codeInput.length === 0 || description.length === 0}
          variant="gradient"
          fullWidth
          onClick={handleCreateSnippet}
        >
          Create
        </Button>
      ) : (
        <Tooltip label="To be able to submit, fill all required fields">
          <Button
            disabled={codeInput.length === 0 || description.length === 0}
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
