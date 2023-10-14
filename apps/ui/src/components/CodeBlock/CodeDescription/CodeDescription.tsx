import { useEffect, useRef, useState } from 'react';
import { Textarea } from '@mantine/core';
import { Snippet } from '@prisma/client';
import { FORM_DESCRIPTION_MAX_LENGTH } from '@joseph/config';
import { useDebouncedValue } from '@mantine/hooks';
import { trpc } from '../../../utils/tprc';

type Props = Pick<Snippet, 'description' | 'id'>;

export default function CodeDescription({ description, id }: Props) {
  const { mutate: handleUpdateSnippetDescription } =
    trpc.updateSnippetDescription.useMutation();
  const descriptionRef = useRef(description);
  const [input, setInput] = useState(description || '');
  const [debounced] = useDebouncedValue(input, 500);

  useEffect(() => {
    if (input === descriptionRef.current) return;

    handleUpdateSnippetDescription({
      description: input,
      id,
    });
  }, [debounced, description, handleUpdateSnippetDescription, id, input]);

  useEffect(() => {
    descriptionRef.current = description;
  }, [description]);

  return (
    <Textarea
      variant="unstyled"
      maxLength={FORM_DESCRIPTION_MAX_LENGTH}
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  );
}
