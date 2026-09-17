import { createPortal } from "react-dom";
import { useRef, useState } from "react";

// assets
import X from "../../assets/icon/X-gray-02.svg";
import Camera from "../../assets/icon/camera-white.svg";

interface ProfileModalProps {
  isMobile?: boolean;
  nickname?: string;
  profileImageUrl?: string;
  onClose: () => void;
  onChangeNickname?: (value: string) => void;
  onSubmit: (nickname: string, profileImage?: File) => void;
  onLogout?: () => void;
}

export default function ProfileModal({
  isMobile = false,
  nickname = "빵돌이",
  profileImageUrl,
  onClose,
  onChangeNickname,
  onSubmit,
  onLogout,
}: ProfileModalProps) {
  // 닉네임
  const [editedNickname, setEditedNickname] = useState(nickname);

  // 선택한 이미지 파일
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  // 이미지 미리보기 URL
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // 파일 input 접근용
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNicknameChange = (value: string) => {
    setEditedNickname(value);
    onChangeNickname?.(value);
  };

  // 사진 선택
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // 이미지 파일인지 확인
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 선택해주세요.");
      return;
    }

    setSelectedImage(file);

    // 미리보기
    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);
  };

  // 수정 완료
  const handleSubmit = () => {
    if (editedNickname.trim() === "") {
      alert("닉네임을 입력해주세요.");
      return;
    }
    if (editedNickname === nickname && !selectedImage) {
      alert("변경 사항이 없습니다.");
      return;
    }
    onSubmit(editedNickname, selectedImage ?? undefined);
  };

  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50">
      <div
        className={`flex flex-col rounded-[20px] bg-white  shadow-dropdown ${
          isMobile ? "w-78 gap-7 p-7" : "w-118 gap-8 p-9"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2
            className={`text-black-01 ${
              isMobile ? "typo-head-03" : "typo-head-01"
            }`}
          >
            프로필 수정
          </h2>

          <button
            type="button"
            onClick={onClose}
            className={`flex items-center justify-center rounded-full bg-gray-04 ${
              isMobile ? "h-6 w-6" : "h-8 w-8"
            }`}
          >
            <img
              src={X}
              alt="Close"
              className={isMobile ? "h-3 w-3" : "h-5 w-5"}
            />
          </button>
        </div>

        <div className={`flex flex-col ${isMobile ? "gap-5" : "gap-6"}`}>
          {/* Profile Image */}
          <div
            className={`relative mx-auto ${
              isMobile ? "h-20 w-20" : "h-24 w-24"
            }`}
          >
            {/* 숨겨진 파일 input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

            {/* Profile Image */}
            {previewImage || profileImageUrl ? (
              <img
                src={previewImage ?? profileImageUrl}
                alt="Profile"
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-main-01 text-[42px]">
                👨‍🍳
              </div>
            )}

            {/* Camera Button */}
            <button
              type="button"
              className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-sub-01 text-white"
              onClick={() => fileInputRef.current?.click()}
            >
              <img
                src={Camera}
                alt="Camera"
                className={isMobile ? "h-3 w-3" : "h-4 w-4"}
              />
            </button>
          </div>

          {/* Nickname Input */}
          <div className="flex flex-col gap-2">
            <label
              className={`block text-black-01 ${
                isMobile ? "typo-body-03" : "typo-body-02"
              }`}
            >
              닉네임
            </label>

            <input
              value={editedNickname}
              onChange={(e) => handleNicknameChange(e.target.value)}
              className={`w-full rounded-xl border border-main-03 text-black-01 outline-none focus:border-main-01 ${
                isMobile
                  ? "p-3 typo-sub-01"
                  : "px-4 py-3 text-[16px] leading-6 font-normal"
              }`}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={handleSubmit}
            className={`flex-1 rounded-xl bg-sub-01 font-semibold text-white shadow-btn ${
              isMobile ? "typo-head-05 py-3" : "typo-head-04 py-4"
            }`}
          >
            수정 완료
          </button>

          <button
            type="button"
            onClick={onLogout}
            className={`flex-1 rounded-xl border border-red font-semibold text-red shadow-btn ${
              isMobile ? "typo-head-05 py-3" : "typo-head-04 py-4"
            }`}
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
