import { Modal } from '@mantine/core';
import { dialogState, toggleDialog } from '../../store/dialog/dialogState';
import CreateModal from './CreateModal';
import ConfirmModal from './ConfirmModal';
import { useSnapshot } from 'valtio';

export default function GenericModal() {
  const { type } = useSnapshot(dialogState);

  return (
    <Modal opened={type !== 'closed'} onClose={() => toggleDialog('closed')}>
      {type === 'create' && <CreateModal />}
      {type === 'confirm' && <ConfirmModal />}
    </Modal>
  );
}
