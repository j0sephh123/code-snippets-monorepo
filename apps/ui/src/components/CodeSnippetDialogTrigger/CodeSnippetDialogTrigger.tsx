import { ActionIcon } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { toggleDialog } from '../../store/dialog/dialogState';

export default function CodeSnippetDialogTrigger() {
  return (
    <ActionIcon
      onClick={() => toggleDialog('create', { title: 'Create a Code Snippet' })}
      style={{
        position: 'fixed',
        right: '20px',
        bottom: '20px',
      }}
      radius="xl"
      size="xl"
      variant="filled"
    >
      <IconPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
    </ActionIcon>
  );
}
