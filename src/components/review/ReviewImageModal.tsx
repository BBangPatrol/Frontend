import { createPortal } from "react-dom";

type ReviewImageModalProps = {
  image: string;
  onClose: () => void;
};

export default function ReviewImageModal({ image, onClose }: ReviewImageModalProps) {
  return createPortal(
    <div role="dialog" aria-modal="true" aria-label="리뷰 이미지 크게 보기" className="fixed inset-0 z-9999 flex items-center justify-center p-4">
      <button type="button" aria-label="이미지 닫기" onClick={onClose} className="absolute inset-0 bg-black/70" />
      <div className="relative">
        <img src={image} alt="확대된 리뷰 이미지" className="max-h-[85dvh] max-w-[90vw] rounded-xl object-contain" />
        <button type="button" aria-label="이미지 닫기" onClick={onClose} className="absolute -right-3 -top-3 flex size-8 items-center justify-center rounded-full bg-white text-xl text-black-01 shadow-dropdown">
          ×
        </button>
      </div>
    </div>,
    document.body,
  );
}
