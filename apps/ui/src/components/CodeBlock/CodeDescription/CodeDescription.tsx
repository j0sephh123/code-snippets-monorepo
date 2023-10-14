import { useEffect, useState } from 'react';
import { Textarea, Text } from '@mantine/core';
import { Snippet } from '@prisma/client';
import { FORM_DESCRIPTION_MAX_LENGTH } from '@joseph/config';
import { useDebouncedState } from '@mantine/hooks';
import { trpc } from '../../../utils/tprc';

type Props = Pick<Snippet, 'description' | 'id'>;

// TODO rudimentary, but does intended job
export default function CodeDescription({ description, id }: Props) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { mutate: handleUpdateSnippetDescription } =
    trpc.updateSnippetDescription.useMutation({
      onSuccess() {
        setIsSubmitted(true);
      },
    });
  const [debounced, setDebounced] = useDebouncedState(description || '', 500);

  useEffect(() => {
    if (description === debounced) return;
    handleUpdateSnippetDescription({
      description: debounced,
      id,
    });
  }, [debounced, description, handleUpdateSnippetDescription, id]);

  useEffect(() => {
    if (isSubmitted) {
      const timeoutId = setTimeout(() => {
        setIsSubmitted(false);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [isSubmitted]);

  return (
    <>
      <Textarea
        variant="unstyled"
        maxLength={FORM_DESCRIPTION_MAX_LENGTH}
        defaultValue={debounced}
        onChange={(e) => setDebounced(e.target.value)}
      />
      {isSubmitted && <Text c="teal.4">Saved</Text>}
    </>
  );
}
