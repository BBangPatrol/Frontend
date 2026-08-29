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

  // 메뉴 열려 있을 때 body 스크롤 방지
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header className="mobile-navigation">
        <NavLink to="/" className="mobile-navigation__logo" onClick={closeMenu}>
          LOGO
        </NavLink>

        <button
          type="button"
          className="mobile-navigation__hamburger"
          onClick={toggleMenu}
          aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={isOpen}
        >
          <span
            className={[
              "mobile-navigation__hamburger-line",
              isOpen ? "mobile-navigation__hamburger-line--top-open" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          />

          <span
            className={[
              "mobile-navigation__hamburger-line",
              isOpen ? "mobile-navigation__hamburger-line--middle-open" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          />

          <span
            className={[
              "mobile-navigation__hamburger-line",
              isOpen ? "mobile-navigation__hamburger-line--bottom-open" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          />
        </button>
      </header>

      {/* 반투명 backdrop */}
      <button
        type="button"
        aria-label="메뉴 닫기"
        className={[
          "mobile-navigation__backdrop",
          isOpen ? "mobile-navigation__backdrop--open" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={closeMenu}
      />

      {/* 위에서 아래로 내려오는 메뉴 */}
      <div
        className={[
          "mobile-navigation__sheet",
          isOpen ? "mobile-navigation__sheet--open" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <nav className="mobile-navigation__menu">
          {navigationItems.map(({ label, path, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              className={({ isActive }) =>
                [
                  "mobile-navigation__item",
                  isActive ? "mobile-navigation__item--active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")
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
