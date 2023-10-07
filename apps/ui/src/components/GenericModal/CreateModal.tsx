import useDialogState from '../../store/dialog/useDialogState';
import CreateSnippetForm from '../form/CreateSnippetForm';
import Wrapper from '../form/Wrapper';

export default function CreateModal() {
  const {
    payload: { title },
  } = useDialogState<'create'>();

  return (
    <Wrapper title={title}>
      <CreateSnippetForm />
    </Wrapper>
  );
}
