import { Prisma } from '@prisma/client';
import { ActionIcon, Group } from '@mantine/core';
import { IconLink, IconTrash } from '@tabler/icons-react';

type Props = {
  id: Prisma.$SnippetPayload['scalars']['id'];
};

export default function ActionsCell({ id }: Props) {
  return (
    <Group gap="xs">
      <ActionIcon variant="filled">
        <IconLink style={{ width: '70%', height: '70%' }} stroke={1.5} />
      </ActionIcon>
      <ActionIcon color="red" variant="filled">
        <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
      </ActionIcon>
    </Group>
  );
}
