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
    <header
      className="
        sticky top-0 z-[100]
        h-[72px] w-full
        border-b border-black/5
        bg-white/95
        backdrop-blur-md
      "
    >
      <div
        className="
          mx-auto
          flex h-full w-full
          max-w-[1280px]
          items-center justify-between
          px-8
        "
      >
        {/* Logo */}
        <NavLink
          to="/"
          className="
            text-xl
            font-bold
            text-[#191919]
            no-underline
          "
        >
          LOGO
        </NavLink>

        {/* Navigation */}
        <nav className="flex items-center gap-10">
          {navigationItems.map(({ label, path, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              className={({ isActive }) =>
                `
                  relative
                  py-2
                  text-[15px]
                  no-underline
                  transition-colors
                  duration-200

                  ${
                    isActive
                      ? "font-semibold text-[#191919]"
                      : "font-medium text-[#8a8a8a] hover:text-[#191919]"
                  }
                `
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
