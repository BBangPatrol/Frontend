import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { startKakaoLogin } from "../../utils/kakao";
import { useLogout } from "../../hooks/api/useLogout";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useResponsive } from "../../contexts/ResponsiveContext";
// assets
import logo from "../../assets/icon/logo.svg";
// constants
import Button from "../Button";
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

export default function MobileNavigation() {
  const { isMobile } = useResponsive();

  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = useIsLoggedIn();
  const { mutate: requestLogout } = useLogout();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const location = useLocation();

  const profileImageUrl = user?.imageUrl || logo;

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // 페이지 이동 시 메뉴 자동 닫기
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // 메뉴 열려 있을 때 body 스크롤 막기
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* =========================
          Mobile Header
      ========================= */}

      <header
        className="
          sticky top-0 z-300
          flex h-15 w-full
          items-center justify-between
          bg-white/90
          px-3
          backdrop-blur-md
          border-b border-main-04
        "
      >
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 typo-head-04 font-bold text-[#191919] no-underline"
        >
          <img src={logo} alt="LOGO" className="h-6 w-6" />
          <p>빵범대</p>
        </NavLink>

        {/* Hamburger Button */}
        <button
          type="button"
          onClick={toggleMenu}
          aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={isOpen}
          className="
            flex h-8 w-8
            cursor-pointer
            flex-col
            items-center
            justify-center
            gap-1.25
            border-0
            bg-transparent
            p-0
          "
        >
          {/* 첫 번째 선 */}
          <span
            className={`
              block
              h-0.5 w-5.5
              rounded-full
              bg-sub-01
              transition-transform
              duration-200

              ${isOpen ? "translate-y-[7px] rotate-45" : ""}
            `}
          />

          {/* 두 번째 선 */}
          <span
            className={`
              block
              h-0.5 w-5.5
              rounded-full
              bg-sub-01
              transition-opacity
              duration-200

              ${isOpen ? "opacity-0" : "opacity-100"}
            `}
          />

          {/* 세 번째 선 */}
          <span
            className={`
              block
              h-0.5 w-5.5
              rounded-full
              bg-sub-01
              transition-transform
              duration-200

              ${isOpen ? "-translate-y-[7px] -rotate-45" : ""}
            `}
          />
        </button>
      </header>

      {/* =========================
          Backdrop
      ========================= */}

      <button
        type="button"
        aria-label="메뉴 닫기"
        onClick={closeMenu}
        className={`
          fixed inset-0
          z-200
          border-0
          bg-white/65
          p-0
          backdrop-blur-sm

          transition-opacity
          duration-200

          ${
            isOpen
              ? "visible pointer-events-auto opacity-100"
              : "invisible pointer-events-none opacity-0"
          }
        `}
      />

      {/* =========================
          Menu Sheet
      ========================= */}

      <div
        className={`
          fixed
          left-0 right-0 top-15
          z-250

          rounded-b-3xl
          bg-white/95

          p-4

          shadow-[0_16px_40px_rgba(0,0,0,0.06)]
          backdrop-blur-xl

          transition-all
          duration-300
          ease-[cubic-bezier(0.22,1,0.36,1)]

          ${
            isOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-[120%] opacity-0"
          }
        `}
      >
        <nav className="flex flex-col gap-4">
          {navigationItems.map(({ label, path, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              className={({ isActive }) =>
                `
                  flex
                  items-center

                  border-b
                  border-gray-04

                  p-2

                  typo-body-03

                  transition-colors
                  duration-200

                  last:border-b-0

                  ${isActive ? "font-bold text-sub-01" : "font-medium text-black-01"}
                `
              }
            >
              {label}
            </NavLink>
          ))}
          {isLoggedIn ? (
            <div className="flex w-full justify-between py-3">
              <div className="flex items-center gap-2">
                <img
                  src={profileImageUrl}
                  alt="Profile"
                  className="h-6 w-6 rounded-full"
                />
                <p className="typo-body-03">{user?.userNickname}님 환영합니다</p>
              </div>
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="typo-sub-02 text-gray-02"
              >
                프로필 수정하기
              </button>
            </div>
          ) : (
            <Button
              onClick={() => setIsLoginModalOpen(true)}
              isMobile={isMobile}
            >
              로그인
            </Button>
          )}
        </nav>
        {isProfileModalOpen && (
          <ProfileModal
            isMobile={isMobile}
            nickname={user?.userNickname ?? ""}
            profileImageUrl={profileImageUrl}
            onClose={() => setIsProfileModalOpen(false)}
            onChangeNickname={() => {}}
            onSubmit={() => setIsProfileModalOpen(false)}
            onLogout={() => {
              requestLogout();
              setIsProfileModalOpen(false);
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
      </div>
    </>
  );
}
