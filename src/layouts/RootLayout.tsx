import { Outlet } from "react-router-dom";

import {
  ResponsiveProvider,
  useResponsive,
} from "../contexts/ResponsiveContext";

import DesktopNavigation from "../components/navigation/DesktopNavigation";
import MobileNavigation from "../components/navigation/MobileNavigation";

function LayoutContent() {
  const { isMobile } = useResponsive();

  return (
    <div className="min-h-screen w-full">
      {isMobile ? <MobileNavigation /> : <DesktopNavigation />}

      <main className="w-full">
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
