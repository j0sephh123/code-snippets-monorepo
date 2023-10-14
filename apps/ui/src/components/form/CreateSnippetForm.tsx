import { useState } from 'react';
import { Button, Textarea, Tooltip } from '@mantine/core';
import {
  FORM_DESCRIPTION_MAX_LENGTH,
  FORM_CODE_MAX_LENGTH,
  FORM_CODE_MIN_LENGTH,
  FORM_DESCRIPTION_MIN_LENGTH,
} from '@joseph/config';
import { trpc } from '../../utils/tprc';
import { toggleDialog } from '../../store/dialog/dialogState';

// TODO extract placeholders, defaults, labels in a config file
// TODO a more complete approach on error handling is necessary
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
        maxLength={FORM_CODE_MAX_LENGTH}
        withAsterisk
        label="Description"
        placeholder="Description"
        description={`Between ${FORM_DESCRIPTION_MIN_LENGTH} and ${FORM_DESCRIPTION_MAX_LENGTH} characters`}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Textarea
        description={`Between ${FORM_CODE_MIN_LENGTH} and ${FORM_CODE_MAX_LENGTH} characters`}
        maxLength={FORM_DESCRIPTION_MAX_LENGTH}
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
          disabled={!isUserInputValid}
          variant="gradient"
          fullWidth
          onClick={handleCreateSnippet}
        >
          Create
        </Button>
      ) : (
        <Tooltip label="To be able to submit, fill all required fields">
          <Button
            disabled={!isUserInputValid}
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
