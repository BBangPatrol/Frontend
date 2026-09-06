import { NavLink } from "react-router";
import { useEffect, useRef, useState } from "react";
import { useResponsive } from "../../contexts/ResponsiveContext";

import logo from "../../assets/icon/logo.svg";

import ProfileModal from "../modal/ProfileModal";
import LoginModal from "../modal/LoginModal";

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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  const tempProfileImageUrl =
    "https://stickershop.line-scdn.net/stickershop/v1/product/15939148/LINEStorePC/main.png?v=1";

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

  return (
    <header className="sticky top-0 z-100 h-18 w-full border-b border-black/5 bg-white/95 backdrop-blur-md border-b-1 border-main-04">
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
                src={tempProfileImageUrl}
                alt="Profile"
                className="h-8 w-8 rounded-full object-cover"
              />

              <p className="typo-body-03 text-black-01">닉네임</p>
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
                    setIsLoggedIn(false);
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
          nickname="빵순이"
          profileImageUrl={tempProfileImageUrl}
          onClose={() => setIsProfileModalOpen(false)}
          onChangeNickname={() => {}}
          onSubmit={() => setIsProfileModalOpen(false)}
          onLogout={() => {
            setIsLoggedIn(false);
            setIsProfileModalOpen(false);
          }}
        />
      )}
      {isLoginModalOpen && (
        <LoginModal
          isMobile={isMobile}
          onClick={() => {
            setIsLoginModalOpen(false);
            setIsLoggedIn(true);
          }}
          onClose={() => setIsLoginModalOpen(false)}
        />
      )}
    </header>
  );
}
