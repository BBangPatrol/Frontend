import { Outlet } from "react-router-dom";

import Footer from "../components/Footer";
import { useResponsive } from "../contexts/ResponsiveContext";

export default function FooterLayout() {
  const { isMobile } = useResponsive();

  return (
    <div className="flex flex-1 flex-col">
      <main className="flex-1 w-full relative">
        <Outlet />
      </main>

      <Footer isMobile={isMobile} />
    </div>
  );
}
