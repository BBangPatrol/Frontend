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
    <div className="flex min-h-dvh w-full flex-col">
      {isMobile ? <MobileNavigation /> : <DesktopNavigation />}

      <main className="flex w-full flex-1 flex-col">
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
