import { Outlet } from "react-router";

import Footer from "../components/Footer";
import { useResponsive } from "../contexts/ResponsiveContext";

export default function FooterLayout() {
  const { isMobile } = useResponsive();

  return (
    <>
      <Outlet />
      <Footer isMobile={isMobile} />
    </>
  );
}
