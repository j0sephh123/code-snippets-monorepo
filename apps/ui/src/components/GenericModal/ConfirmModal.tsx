import useDialogState from '../../store/dialog/useDialogState';

export default function ConfirmModal() {
  const { payload } = useDialogState<'confirm'>();

  return <div>ConfirmModal {payload.confirmMessage}</div>;
}
