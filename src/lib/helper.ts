import { toast } from '@/lib/toast';

export function getFromLocalStorage(key: string): string | null {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key);
  }
  return null;
}

export function getFromSessionStorage(key: string): string | null {
  if (typeof sessionStorage !== 'undefined') {
    return sessionStorage.getItem(key);
  }
  return null;
}

export function copyToClipboard(text: string, toastMessage?: string) {
  if (!navigator.clipboard) {
    return; // Clipboard API not supported
  }
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success(toastMessage ?? 'Code copied!');
    })
    .catch((err) => {
      toast.error('Failed to copy text to clipboard:', err);
    });
}
