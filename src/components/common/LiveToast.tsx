import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const LiveToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 p-3.5 rounded-card bg-surface shadow-modal border border-border transition-all duration-200 animate-slide-in"
          >
            <div className="mt-0.5 shrink-0">
              {isSuccess && <CheckCircle2 className="w-4 h-4 text-brand-green" />}
              {isWarning && <AlertTriangle className="w-4 h-4 text-brand-amber" />}
              {isError && <AlertCircle className="w-4 h-4 text-brand-red" />}
              {!isSuccess && !isWarning && !isError && <Info className="w-4 h-4 text-[#557A65]" />}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-ink-primary leading-tight">{toast.title}</p>
              <p className="text-xs text-ink-secondary mt-0.5 leading-relaxed">{toast.message}</p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 text-ink-muted hover:text-ink-primary p-0.5 rounded transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
