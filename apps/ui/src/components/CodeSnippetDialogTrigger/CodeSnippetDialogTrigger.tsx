import { ActionIcon, Tooltip } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { toggleDialog } from '../../store/dialog/dialogState';
import classes from './CodeSnippetDialogTrigger.module.css';

export default function CodeSnippetDialogTrigger() {
  return (
    <Tooltip label="Create a Code Snippet">
      <ActionIcon
        onClick={() =>
          toggleDialog('create', { title: 'Create a Code Snippet' })
        }
        className={classes.actionIcon}
        radius="xl"
        size="xl"
        variant="filled"
      >
        <IconPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
      </ActionIcon>
    </Tooltip>
  );
}
