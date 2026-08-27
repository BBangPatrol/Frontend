import { Outlet } from "react-router";

import {
  ResponsiveProvider,
  useResponsive,
} from "../contexts/ResponsiveContext";

import DesktopNavigation from "../components/navigation/DesktopNavigation";
import MobileNavigation from "../components/navigation/MobileNavigation";

function LayoutContent() {
  const { isMobile } = useResponsive();

  return (
    <div className="root-layout">
      {isMobile ? <MobileNavigation /> : <DesktopNavigation />}

      <main className="root-layout__content">
        <Outlet />
      </main>
    </div>
  );
}

export default function RootLayout() {
  return (
    <ResponsiveProvider>
      <LayoutContent />
    </ResponsiveProvider>
  );
}
