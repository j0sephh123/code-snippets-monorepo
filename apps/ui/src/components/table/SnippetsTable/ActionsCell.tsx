import { Prisma } from '@prisma/client';
import { ActionIcon, Group } from '@mantine/core';
import { IconLink, IconTrash } from '@tabler/icons-react';
import { Link } from 'wouter';

type Props = {
  id: Prisma.$SnippetPayload['scalars']['id'];
};

export default function ActionsCell({ id }: Props) {
  return (
    <Group gap="xs">
      <Link href={`/snippets/${id}`}>
        <ActionIcon variant="filled">
          <IconLink style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
      </Link>
      <ActionIcon color="red" variant="filled">
        <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
      </ActionIcon>
    </Group>
  );
}
