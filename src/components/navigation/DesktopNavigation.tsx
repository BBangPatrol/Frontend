import { NavLink } from "react-router";

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
  return (
    <header className="desktop-navigation">
      <div className="desktop-navigation__inner">
        <NavLink to="/" className="desktop-navigation__logo">
          LOGO
        </NavLink>

        <nav className="desktop-navigation__menu">
          {navigationItems.map(({ label, path, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              className={({ isActive }) =>
                [
                  "desktop-navigation__item",
                  isActive ? "desktop-navigation__item--active" : "",
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
    </header>
  );
}
