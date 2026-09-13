import { useState } from "react";
import MobileMapPage, { type SheetPosition } from "../../components/map/mobile/MobileMapPage";
import { useResponsive } from "../../contexts/ResponsiveContext";
import DesktopMapPage from "../../components/map/desktop/DesktopMapPage";

export default function MapPage() {
  const [sheetPosition, setSheetPosition] = useState<SheetPosition>("closed");
  const { isMobile } = useResponsive();

  return isMobile ? (
    <MobileMapPage sheetPosition={sheetPosition} onSheetPositionChange={setSheetPosition} />
  ) : (
    <DesktopMapPage />
  );
}
