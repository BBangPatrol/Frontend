import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";

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
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

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
          sticky top-0 z-[300]
          flex h-[60px] w-full
          items-center justify-between
          border-b border-black/5
          bg-white/90
          px-5
          backdrop-blur-md
        "
      >
        {/* Logo */}
        <NavLink
          to="/"
          onClick={closeMenu}
          className="
            text-lg
            font-bold
            text-[#191919]
            no-underline
          "
        >
          LOGO
        </NavLink>

        {/* Hamburger Button */}
        <button
          type="button"
          onClick={toggleMenu}
          aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={isOpen}
          className="
            flex h-10 w-10
            cursor-pointer
            flex-col
            items-center
            justify-center
            gap-[5px]
            border-0
            bg-transparent
            p-0
          "
        >
          {/* 첫 번째 선 */}
          <span
            className={`
              block
              h-[2px] w-[22px]
              rounded-full
              bg-[#191919]
              transition-transform
              duration-200

              ${isOpen ? "translate-y-[7px] rotate-45" : ""}
            `}
          />

          {/* 두 번째 선 */}
          <span
            className={`
              block
              h-[2px] w-[22px]
              rounded-full
              bg-[#191919]
              transition-opacity
              duration-200

              ${isOpen ? "opacity-0" : "opacity-100"}
            `}
          />

          {/* 세 번째 선 */}
          <span
            className={`
              block
              h-[2px] w-[22px]
              rounded-full
              bg-[#191919]
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
          z-[200]
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
          left-0 right-0 top-[60px]
          z-[250]

          rounded-b-3xl
          bg-white/95

          px-5
          pb-8
          pt-4

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
        <nav className="flex flex-col">
          {navigationItems.map(({ label, path, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              className={({ isActive }) =>
                `
                  flex
                  min-h-[60px]
                  items-center

                  border-b
                  border-black/5

                  px-1

                  text-lg
                  no-underline

                  transition-colors
                  duration-200

                  last:border-b-0

                  ${
                    isActive
                      ? "font-bold text-[#191919]"
                      : "font-medium text-[#8a8a8a]"
                  }
                `
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
}
