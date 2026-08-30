import { useState } from "react";
import MobileDrawPage from "../../components/collection/mobile/MobileDrawPage";
import { useResponsive } from "../../contexts/ResponsiveContext";
import DesktopDrawPage from "../../components/collection/desktop/DesktopDrawPage";

export default function DrawPage() {
  const [isDrawResultOpen, setIsDrawResultOpen] = useState(false);
  const { isMobile } = useResponsive();

  return isMobile ? (
    <MobileDrawPage isDrawResultOpen={isDrawResultOpen} onDraw={() => setIsDrawResultOpen(true)} onCloseDrawResult={() => setIsDrawResultOpen(false)} />
  ) : (
    <DesktopDrawPage isDrawResultOpen={isDrawResultOpen} onDraw={() => setIsDrawResultOpen(true)} onCloseDrawResult={() => setIsDrawResultOpen(false)} />
  );
}
