import { createPortal } from "react-dom";
// assets
import X from "../../assets/icon/X-gray-02.svg";
import Camera from "../../assets/icon/camera-white.svg";

interface ProfileModalProps {
  isPhone?: boolean;
  nickname?: string;
  profileImageUrl?: string;
  onClose?: () => void;
  onChangeNickname?: (value: string) => void;
  onSubmit?: () => void;
}

export default function ProfileModal({
  isPhone = false,
  nickname = "빵순이",
  profileImageUrl,
  onClose,
  onChangeNickname,
  onSubmit,
}: ProfileModalProps) {
  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50">
      <div
        className={`flex flex-col rounded-[20px] bg-white shadow-dropdown p-9 ${
          isPhone ? "w-78 gap-7" : "w-118 gap-8"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2
            className={` text-black-01 ${isPhone ? "typo-head-03" : "typo-head-01"}`}
          >
            프로필 수정
          </h2>
          <button
            type="button"
            onClick={onClose}
            className={`flex items-center justify-center rounded-full bg-gray-04 ${isPhone ? "h-6 w-6" : "h-8 w-8"}`}
          >
            <img
              src={X}
              alt="Close"
              className={isPhone ? "h-3 w-3" : "h-5 w-5"}
            />
          </button>
        </div>
        <div className={`flex flex-col ${isPhone ? "gap-5" : "gap-6"}`}>
          {/* Profile Image */}
          <div
            className={`relative mx-auto ${isPhone ? "h-20 w-20" : "h-24 w-24"}`}
          >
            {profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt="Profile"
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-main-01 text-[42px]">
                👨‍🍳
              </div>
            )}

            <button
              type="button"
              className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-sub-01 text-white"
            >
              <img
                src={Camera}
                alt="Camera"
                className={isPhone ? "h-3 w-3" : "h-4 w-4"}
              />
            </button>
          </div>
          {/* Nickname Input */}
          <div className={`flex flex-col gap-2`}>
            <label
              className={`block text-black-01 ${isPhone ? "typo-body-03" : "typo-body-02"}`}
            >
              닉네임
            </label>
            <input
              value={nickname}
              onChange={(e) => onChangeNickname?.(e.target.value)}
              className={`w-full rounded-xl border border-main-03 text-black-01 outline-none focus:border-main-01 ${isPhone ? "p-3 typo-sub-01" : "px-4 py-3 text-[16px] leading-6 font-normal"}`}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={onSubmit}
          className={`w-full rounded-xl bg-[#CB8E57] font-semibold text-white shadow-btn ${isPhone ? "typo-head-05 py-3" : "typo-head-04 py-4"}`}
        >
          수정 완료
        </button>
      </div>
    </div>,
    document.body,
  );
}
