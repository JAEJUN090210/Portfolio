import styled from '@emotion/styled';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { useDismissToast, useToasts } from '../../stores/settingStore';

const Viewport = styled.div`
  position: fixed;
  right: ${({ theme }) => theme.spacing[4]};
  bottom: ${({ theme }) => theme.spacing[4]};
  z-index: 95;
  display: grid;
  gap: ${({ theme }) => theme.spacing[3]};
  width: min(360px, calc(100vw - 2rem));
`;

const ToastItem = styled.div<{ tone: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[3]};
  border: 1px solid
    ${({ tone, theme }) =>
      tone === 'danger' ? theme.colors.danger : tone === 'success' ? theme.colors.success : theme.colors.borderStrong};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.panel};
  box-shadow: ${({ theme }) => theme.shadows.soft};

  button {
    display: inline-grid;
    place-items: center;
    border: 0;
    color: inherit;
    background: transparent;
  }
`;

function AutoDismissToast({ id }: { id: string }) {
  const dismiss = useDismissToast();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => dismiss(id), 3200);
    return () => window.clearTimeout(timeoutId);
  }, [dismiss, id]);

  return null;
}

export function ToastViewport() {
  const toasts = useToasts();
  const dismiss = useDismissToast();

  return (
    <Viewport aria-live="polite" aria-relevant="additions">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} tone={toast.tone} role="status">
          <AutoDismissToast id={toast.id} />
          <span>{toast.message}</span>
          <button type="button" aria-label="Dismiss toast" onClick={() => dismiss(toast.id)}>
            <X size={16} />
          </button>
        </ToastItem>
      ))}
    </Viewport>
  );
}
