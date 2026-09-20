import { createPortal } from "react-dom";

type Props = {
  isMobile: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onClose: () => void;
  onConfirm: () => void;
};
export default function ConfirmModal({
  isMobile,
  title,
  description,
  confirmText = "확인",
  cancelText = "취소",
  onClose,
  onConfirm,
}: Props) {
  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50">
      <div
        role="dialog"
        aria-modal="true"
        className={` flex flex-col items-center rounded-4xl bg-white p-8 shadow-dropdown ${isMobile ? "w-78 gap-3" : "w-96 gap-6"} `}
      >
        {/* 안내 문구 */}
        <div
          className={` flex w-full flex-col items-center justify-center text-center ${description ? "gap-2" : ""} `}
        >
          <p
            className={` text-black-01 ${isMobile ? "typo-head-01" : "typo-head-02"} `}
          >
            {title}
          </p>
          {description && (
            <p
              className={` whitespace-pre-line text-gray-60 ${isMobile ? "typo-body-03" : "typo-sub-01"} `}
            >
              {description}
            </p>
          )}
        </div>
        {/* 버튼 */}
        <div
          className={` flex w-full gap-3 ${isMobile ? "flex-col" : "flex-row"} `}
        >
          <button
            type="button"
            onClick={onClose}
            className={` rounded-xl bg-gray-04 text-gray-01 typo-head-04 ${isMobile ? "h-10.5 w-full" : "h-11.5 flex-1"} `}
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={` rounded-xl bg-sub-01 text-white typo-head-04 shadow-button ${isMobile ? "h-10.5 w-full" : "h-11.5 flex-1"} `}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
