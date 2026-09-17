import { Outlet } from "react-router-dom";

import {
  ResponsiveProvider,
  useResponsive,
} from "../contexts/ResponsiveContext";

import DesktopNavigation from "../components/navigation/DesktopNavigation";
import MobileNavigation from "../components/navigation/MobileNavigation";

export default function RootLayout() {
  return (
    <ResponsiveProvider>
      <LayoutContent />
    </ResponsiveProvider>
  );
}

function LayoutContent() {
  const { isMobile } = useResponsive();

  return (
    <div className="min-h-dvh flex flex-col">
      {isMobile ? <MobileNavigation /> : <DesktopNavigation />}

      <Outlet />
    </div>
  );
}
