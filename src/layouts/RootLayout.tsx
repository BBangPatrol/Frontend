import { Outlet, useLocation } from "react-router-dom";
import { motion } from "motion/react";

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
  const { pathname } = useLocation();

  return (
    <div className="min-h-dvh flex flex-col">
      {isMobile ? <MobileNavigation /> : <DesktopNavigation />}

      <motion.div key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex min-w-0 flex-1 flex-col">
        <Outlet />
      </motion.div>
    </div>
  );
}
