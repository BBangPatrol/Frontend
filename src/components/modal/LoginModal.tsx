import { createPortal } from "react-dom";
import { motion } from "motion/react";
// assets
import X from "../../assets/icon/X-gray-02.svg";
import kakao from "../../assets/kakao-login.svg";

interface LoginModalProps {
  isMobile?: boolean;
  description?: string;
  onClick: () => void;
  onClose?: () => void;
}

export default function LoginModal({
  isMobile = false,
  description,
  onClick,
  onClose,
}: LoginModalProps) {
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50"
    >
      <motion.div
        initial={{ y: 6, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        className={`relative flex flex-col items-center justify-center rounded-[20px] bg-white shadow-dropdown  ${
          isMobile ? "w-78 gap-3 p-9" : "w-118 gap-5 p-12"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          className={`absolute flex ${isMobile ? " top-4 right-4  h-5 w-5" : " top-5 right-5  h-8 w-8"}`}
        >
          <img src={X} alt="Close" className="w-5 h-5" />
        </button>
        {/* Header */}
        <div
          className={`flex flex-col items-center ${isMobile ? "gap-2" : "gap-3"}`}
        >
          <h2
            className={` text-black-01 ${isMobile ? "typo-head-02" : "typo-head-01"}`}
          >
            {description ? "로그인이 필요해요" : "로그인"}
          </h2>
          {description && (
            <p
              className={`text-gray-02 text-center ${isMobile ? "typo-body-04" : "typo-body-03"}`}
              style={{ whiteSpace: "pre-line" }}
            >
              {description}
            </p>
          )}
        </div>

        <div className={`flex flex-col gap-4`}>
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
            className={`flex w-full items-center justify-center text-gray-02 underline underline-offset-3 underline-gray-02 ${isMobile ? "typo-sub-03" : "typo-sub-01 "}`}
            onClick={onClose}
          >
            게스트로 둘러보기
          </button>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
