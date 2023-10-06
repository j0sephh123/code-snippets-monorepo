import { useSnapshot } from 'valtio';
import { DialogState, dialogState } from './dialogState';

export default function useDialogState<T extends DialogState['type']>() {
  const result = useSnapshot(dialogState);

  if (result.type !== 'closed') {
    return result as Extract<DialogState, { type: T }>;
  }

  throw new Error('Dialog is closed, payload is not available.');
}
