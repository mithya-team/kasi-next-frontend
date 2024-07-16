// stores/dialogStore.ts
import { Action, action } from 'easy-peasy';

import { AuthDialogType } from '@/models/auth/auth.types';

export interface TDialogState {
  isOpen: boolean;
  dialogType: AuthDialogType | null;
  setIsOpen: Action<TDialogState, boolean>;
  setDialogType: Action<TDialogState, AuthDialogType | null>;
  openDialog: Action<TDialogState, AuthDialogType>;
  closeDialog: Action<TDialogState>;
}

const DialogStore: TDialogState = {
  isOpen: false,
  dialogType: null,
  setIsOpen: action((state, payload) => {
    state.isOpen = payload;
  }),
  setDialogType: action((state, payload) => {
    state.dialogType = payload;
  }),
  openDialog: action((state, payload) => {
    state.isOpen = true;
    state.dialogType = payload;
  }),
  closeDialog: action((state) => {
    state.isOpen = false;
    state.dialogType = null;
  }),
};

export default DialogStore;
