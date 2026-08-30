import DesktopMissionPage from "../../components/mission/desktop/DesktopMissionPage";
import MobileMissionPage, { type MissionProgress } from "../../components/mission/mobile/MobileMissionPage";
import { useResponsive } from "../../contexts/ResponsiveContext";

const missions: MissionProgress[] = [
  [3, 5],
  [0, 5],
  [4, 5],
  [5, 5],
  [1, 5],
  [0, 5],
];

export default function MissionPage() {
  const { isMobile } = useResponsive();

  return isMobile ? <MobileMissionPage missions={missions} /> : <DesktopMissionPage missions={missions} />;
}
