import React, { type FC, type PropsWithChildren, useState } from 'react';
import { createPortal } from 'react-dom';

import Dialog, { DialogProps } from '../components/Dialog';

export interface DialogOptionProps
  extends Omit<DialogProps, 'open' | 'onClose'> {
  isGlobal?: boolean;
  onClose?: () => void;
}

interface DialogContextProps extends DialogOptionProps {
  open: boolean;
  showDialog: (
    content: React.ReactNode,
    dialogProps?: DialogOptionProps,
  ) => void;
  hideDialog: () => void;
  content?: React.ReactNode;
  dialogProps?: DialogOptionProps;
}

export const DialogContext = React.createContext<DialogContextProps>({
  open: false,
  showDialog() {},
  hideDialog() {},
});

export const useDialog = (): DialogContextProps => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dialogProps, setDialogProps] = useState<DialogOptionProps>();
  const [content, setContent] = useState<React.ReactNode>();

  const showDialog = (
    content: React.ReactNode,
    dialogProps?: DialogOptionProps,
  ) => {
    setIsOpen(true);
    setDialogProps(dialogProps);
    setContent(content);
  };

  const hideDialog = () => {
    setIsOpen(false);
    setDialogProps(undefined);
    setContent(undefined);
  };

  return {
    showDialog,
    hideDialog,
    open: isOpen,
    content,
    dialogProps,
  };
};

export const DialogProvider: FC<PropsWithChildren> = ({ children }) => {
  const { showDialog, hideDialog, open, content, dialogProps } = useDialog();
  return (
    <DialogContext.Provider
      value={{
        showDialog,
        hideDialog,
        open,
      }}
    >
      {children}

      {dialogProps?.isGlobal && open ? (
        createPortal(
          <Dialog
            open={open}
            onClose={dialogProps?.onClose ?? hideDialog}
            {...dialogProps}
          >
            {content}
          </Dialog>,
          document.body,
        )
      ) : (
        <Dialog
          open={open}
          onClose={dialogProps?.onClose ?? hideDialog}
          {...dialogProps}
        >
          {content}
        </Dialog>
      )}
    </DialogContext.Provider>
  );
};

export default DialogProvider;
