import { useState } from "react";
import MobileMapPage, { type Bakery, type SheetPosition } from "../../components/map/mobile/MobileMapPage";
import { useResponsive } from "../../contexts/ResponsiveContext";
import DesktopMapPage from "../../components/map/desktop/DesktopMapPage";

const bakeries: Bakery[] = [
  { id: 1, name: "성심당 본점", rating: "4.8", distance: "1.2km", selected: true },
  { id: 2, name: "성심당 본점", rating: "4.8", distance: "1.2km", selected: false },
  { id: 3, name: "성심당 본점", rating: "4.8", distance: "1.2km", selected: false },
  { id: 4, name: "성심당 본점", rating: "4.8", distance: "1.2km", selected: false },
  { id: 5, name: "성심당 본점", rating: "4.8", distance: "1.2km", selected: false },
  { id: 6, name: "성심당 본점", rating: "4.8", distance: "1.2km", selected: false },
  { id: 7, name: "성심당 본점", rating: "4.8", distance: "1.2km", selected: false },
  { id: 8, name: "성심당 본점", rating: "4.8", distance: "1.2km", selected: false },
  { id: 9, name: "성심당 본점", rating: "4.8", distance: "1.2km", selected: false },
  { id: 10, name: "성심당 본점", rating: "4.8", distance: "1.2km", selected: false },
];

export default function MapPage() {
  const [sheetPosition, setSheetPosition] = useState<SheetPosition>("closed");
  const { isMobile } = useResponsive();

  return isMobile ? (
    <MobileMapPage bakeries={bakeries} sheetPosition={sheetPosition} onSheetPositionChange={setSheetPosition} />
  ) : (
    <DesktopMapPage bakeries={bakeries} />
  );
}
