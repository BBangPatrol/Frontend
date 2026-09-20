// libraries
import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
// contexts
import { useResponsive } from "../../contexts/ResponsiveContext";
// hooks
import { useEditProfile } from "../../hooks/api/useEditProfile";
import { useEditProfileImage } from "../../hooks/api/useEditProfileImage";
import { useLogout } from "../../hooks/api/useLogout";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useMe } from "../../hooks/api/useMe";
import { useDeleteUser } from "../../hooks/api/useDeleteUser";
// utils
import { startKakaoLogin } from "../../utils/kakao";
// assets
import logo from "../../assets/icon/logo.svg";
// components
import ProfileModal from "../modal/ProfileModal";
import LoginModal from "../modal/LoginModal";
import ConfirmModal from "../modal/ConfirmModal";

const navigationItems = [
  {
    label: "홈",
    path: "/",
    end: true,
  },
  {
    label: "지도",
    path: "/map",
  },
  {
    label: "컬렉션",
    path: "/collection",
  },
  {
    label: "대시보드",
    path: "/dashboard",
  },
];

export default function DesktopNavigation() {
  const { isMobile } = useResponsive();

  const isLoggedIn = useIsLoggedIn();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const { data: me } = useMe();
  const { mutate: requestLogout } = useLogout();
  const { mutate: requestEditProfile } = useEditProfile();
  const { mutate: requestEditProfileImage } = useEditProfileImage();
  const { mutate: requestDeleteUser } = useDeleteUser();

  const profileRef = useRef<HTMLDivElement>(null);

  const profileImageUrl = me?.imageUrl || logo;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEditProfile = (
    newNickname?: string | undefined,
    newProfileImage?: File | undefined,
  ) => {
    if (newNickname) {
      requestEditProfile(newNickname, {
        onSuccess: () => {
          setIsProfileModalOpen(false);
        },
      });
    }
    if (newProfileImage) {
      requestEditProfileImage(newProfileImage, {
        onSuccess: () => {
          setIsProfileModalOpen(false);
        },
      });
    }
  };

  return (
    <header className="sticky top-0 z-100 h-18 w-full border-black/5 bg-white/95 backdrop-blur-md border-b">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-8">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 typo-head-03 font-bold text-[#191919] no-underline"
        >
          <img src={logo} alt="LOGO" className="h-7 w-7" />
          <p>빵범대</p>
        </NavLink>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          {navigationItems.map(({ label, path, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              className={({ isActive }) =>
                `relative py-0.5 typo-body-03 no-underline transition-colors duration-200 ${
                  isActive
                    ? "font-semibold text-sub-01 border-b-2 border-sub-01"
                    : "font-medium text-black-01 hover:text-sub-01"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Profile */}
        {isLoggedIn ? (
          <div ref={profileRef} className="relative">
            <button
              type="button"
              onClick={() => setIsProfileOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-full px-3 py-1 transition-colors hover:bg-gray-100"
            >
              <img
                src={profileImageUrl}
                alt="Profile"
                className="h-8 w-8 rounded-full object-cover"
              />

              <p className="typo-body-03 text-black-01">{me?.userNickname}</p>
            </button>

            {isProfileOpen && (
              <div className="absolute left-1/2 top-full mt-3 w-44 -translate-x-1/2 rounded-xl border border-black/5 bg-white p-2 shadow-lg">
                <button
                  type="button"
                  className="flex w-full items-center justify-center rounded-lg px-3 py-2 typo-body-03 text-black-01 transition-colors hover:bg-gray-100"
                  onClick={() => {
                    setIsProfileModalOpen(true);
                    setIsProfileOpen(false);
                  }}
                >
                  프로필 수정하기
                </button>

                <button
                  type="button"
                  className="flex w-full items-center justify-center rounded-lg px-3 py-2 typo-body-03 text-red-500 transition-colors hover:bg-gray-100"
                  onClick={() => {
                    requestLogout();
                    setIsProfileOpen(false);
                  }}
                >
                  로그아웃
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            className="typo-body-03 rounded-[36px] bg-sub-01 px-6 py-2 text-white transition-colors duration-200 hover:bg-sub-02"
            onClick={() => setIsLoginModalOpen(true)}
          >
            로그인
          </button>
        )}
      </div>
      {isProfileModalOpen && (
        <ProfileModal
          isMobile={isMobile}
          nickname={me?.userNickname ?? ""}
          profileImageUrl={profileImageUrl}
          onClose={() => setIsProfileModalOpen(false)}
          onSubmit={handleEditProfile}
          onLogout={() => {
            requestLogout();
            setIsProfileModalOpen(false);
          }}
          onDeleteAccount={() => {
            setIsProfileModalOpen(false);
            setIsConfirmModalOpen(true);
          }}
        />
      )}
      {isLoginModalOpen && (
        <LoginModal
          isMobile={isMobile}
          onClick={startKakaoLogin}
          onClose={() => setIsLoginModalOpen(false)}
        />
      )}
      {isConfirmModalOpen && (
        <ConfirmModal
          isMobile={isMobile}
          title="정말 탈퇴하시겠습니까?"
          description="탈퇴 시 작성한 리뷰와 컬렉션이 모두 삭제됩니다."
          confirmText="탈퇴"
          cancelText="취소"
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={() => {
            setIsConfirmModalOpen(false);
            requestDeleteUser();
          }}
        />
      )}
    </header>
  );
}
