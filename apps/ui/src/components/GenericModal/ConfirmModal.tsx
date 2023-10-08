import { Button, Group } from '@mantine/core';
import useDialogState from '../../store/dialog/useDialogState';
import ModalWrapper from './ModalWrapper';
import { toggleDialog } from '../../store/dialog/dialogState';

export default function ConfirmModal() {
  const {
    payload: { confirmMessage, callback },
  } = useDialogState<'confirm'>();

  const handleConfirm = () => callback();
  const handleCancel = () => toggleDialog('closed');

  return (
    <ModalWrapper title={confirmMessage}>
      <Group>
        <Button color="red" onClick={handleConfirm}>
          Confirm
        </Button>
        <Button color="gray" onClick={handleCancel}>
          Cancel
        </Button>
      </Group>
    </ModalWrapper>
  );
}
