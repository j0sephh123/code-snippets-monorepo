import useDialogState from '../../store/dialog/useDialogState';

export default function CreateModal() {
  const { payload } = useDialogState<'create'>();

  return <div>CreateModal {payload.title}</div>;
}
