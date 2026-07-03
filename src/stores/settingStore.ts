import { create } from 'zustand';

export type ToastTone = 'success' | 'info' | 'danger';

export type Toast = {
  id: string;
  message: string;
  tone: ToastTone;
};

type SettingState = {
  toasts: Toast[];
  pushToast: (message: string, tone?: ToastTone) => void;
  dismissToast: (id: string) => void;
};

const createToastId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const useSettingStore = create<SettingState>((set) => ({
  toasts: [],
  pushToast: (message, tone = 'info') =>
    set((state) => ({
      toasts: [...state.toasts, { id: createToastId(), message, tone }].slice(-3),
    })),
  dismissToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));

export const useToasts = () => useSettingStore((state) => state.toasts);
export const usePushToast = () => useSettingStore((state) => state.pushToast);
export const useDismissToast = () => useSettingStore((state) => state.dismissToast);
