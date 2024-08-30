import {
  toast as _toast,
  ToastContainer as _ToastContainer,
  ToastContent,
  ToastOptions,
} from 'react-toastify';

import { GLOBAL_TOAST_ID } from '@/constant/toast';

/**
 * Get toast options.
 *
 * @param args Optional arguments object.
 * @param args.containerId The container ID of the toast. Defaults to {@link GLOBAL_TOAST_ID}.
 * @returns An object containing the toast options.
 */
export function getToastOptions<T = unknown>(args?: {
  containerId?: string;
}): ToastOptions<T> {
  const { containerId = GLOBAL_TOAST_ID } = args ?? {
    containerId: GLOBAL_TOAST_ID,
  };
  return {
    position: 'bottom-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    containerId: containerId,
  } as ToastOptions<T>;
}

export const toast = {
  success: <T = unknown>(
    content: ToastContent,
    containerId = GLOBAL_TOAST_ID,
  ) => _toast.success<T>(content, getToastOptions<T>({ containerId })),
  error: <T = unknown>(content: ToastContent, containerId = GLOBAL_TOAST_ID) =>
    _toast.error<T>(content, getToastOptions<T>({ containerId })),
  info: <T = unknown>(content: ToastContent, containerId = GLOBAL_TOAST_ID) =>
    _toast.info<T>(content, getToastOptions<T>({ containerId })),
};

export const ToastContainer = _ToastContainer;
