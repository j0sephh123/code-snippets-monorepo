import { proxy } from 'valtio';

type CreateDialog = { type: 'create'; payload: { title: string } };
type ConfirmDialog = {
  type: 'confirm';
  payload: { confirmMessage: string; callback: () => void };
};

export type DialogState = { type: 'closed' } | CreateDialog | ConfirmDialog;

export const defaultDialogState: DialogState = {
  type: 'closed',
};

export const dialogState = proxy<DialogState>(defaultDialogState);

export const toggleDialog = <T extends DialogState['type']>(
  type: T,
  payload?: T extends 'create'
    ? CreateDialog['payload']
    : T extends 'confirm'
    ? ConfirmDialog['payload']
    : never
): void => {
  if (payload) {
    (dialogState as DialogState & { payload: unknown }).payload = payload;
  }
  dialogState.type = type;
};
