import { createPortal } from "react-dom";
// assets
import X from "../../assets/icon/X-gray-02.svg";
import kakao from "../../assets/kakao-login.svg";

interface LoginModalProps {
  isMobile?: boolean;
  onClick: () => void;
  onClose?: () => void;
}

export default function LoginModal({
  isMobile = false,
  onClick,
  onClose,
}: LoginModalProps) {
  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50">
      <div
        className={`relative flex flex-col items-center justify-center rounded-[20px] bg-white shadow-dropdown  ${
          isMobile ? "w-78 gap-7 p-9" : "w-118 gap-8 p-12"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          className={`absolute flex ${isMobile ? " top-4 right-4  h-3 w-3" : " top-5 right-5  h-8 w-8"}`}
        >
          <img src={X} alt="Close" className="w-5 h-5" />
        </button>
        {/* Header */}
        <h2
          className={` text-black-01 ${isMobile ? "typo-head-02" : "typo-head-01"}`}
        >
          로그인
        </h2>

        <div className={`flex flex-col gap-2`}>
          <button
            type="button"
            className={`flex w-full items-center justify-center shadow-btn`}
            onClick={onClick}
          >
            <img
              src={kakao}
              alt="Kakao Login"
              className={isMobile ? "h-9" : "h-12"}
            />
          </button>
          <button
            type="button"
            className={`flex w-full items-center justify-center text-gray-02 underline underline-offset-3 underline-gray-02 ${isMobile ? "typo-head-05" : "typo-sub-01 "}`}
            onClick={onClose}
          >
            개스트로 둘러보기
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
