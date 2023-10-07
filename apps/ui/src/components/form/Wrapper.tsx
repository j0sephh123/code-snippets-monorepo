import { Stack, Title } from '@mantine/core';
import { PropsWithChildren } from 'react';

type Props = { title: string } & PropsWithChildren;

export default function Wrapper({ children, title }: Props) {
  return (
    <Stack>
      <Title order={3}>{title}</Title>
      {children}
    </Stack>
  );
}
