import useDialogState from '../../store/dialog/useDialogState';
import CreateSnippetForm from '../form/CreateSnippetForm';
import ModalWrapper from './ModalWrapper';

export default function CreateModal() {
  const {
    payload: { title },
  } = useDialogState<'create'>();

  return (
    <ModalWrapper title={title}>
      <CreateSnippetForm />
    </ModalWrapper>
  );
}
