import useDialogState from '../../store/dialog/useDialogState';
import CreateSnippetForm from '../form/CreateSnippetForm';

export default function CreateModal() {
  const { payload } = useDialogState<'create'>();

  return (
    <div>
      <CreateSnippetForm title={payload.title} />
    </div>
  );
}
