import { AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  confirmVariant?: "destructive" | "default";
  onConfirm: () => void;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "确认",
  confirmVariant = "default",
  onConfirm,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative bg-white dark:bg-[#18181B] rounded-xl border border-[#E4E4E7] dark:border-[#27272A] shadow-lg p-6 max-w-sm w-full mx-4 animate-scale-in">
        <div className="flex items-start gap-3 mb-4">
          {confirmVariant === "destructive" && (
            <div className="w-9 h-9 rounded-full bg-[#FEF2F2] dark:bg-[#7F1D1D]/30 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
            </div>
          )}
          <div>
            <div className="text-[15px] font-semibold text-[#18181B] dark:text-[#FAFAFA] mb-1">
              {title}
            </div>
            <div className="text-[13px] text-[#A1A1AA]">{description}</div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onOpenChange(false)}
            className="px-4 py-1.5 rounded-lg border border-[#D1D1D6] dark:border-[#3F3F46] text-[13px] text-[#52525B] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] transition-colors"
          >
            取消
          </button>
          <button
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            className={`px-4 py-1.5 rounded-lg text-[13px] font-medium text-white transition-colors ${
              confirmVariant === "destructive"
                ? "bg-[#EF4444] hover:bg-[#DC2626]"
                : "bg-brand hover:bg-brand-700"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
