import DesktopDetailPage from "../../components/detail/desktop/DesktopDetailPage";
import MobileDetailPage from "../../components/detail/mobile/MobileDetailPage";
import { useResponsive } from "../../contexts/ResponsiveContext";

const reviewPercentages = [0, 25, 50, 75, 100];

export default function DetailPage() {
  const { isMobile } = useResponsive();

  return isMobile ? <MobileDetailPage reviewPercentages={reviewPercentages} /> : <DesktopDetailPage reviewPercentages={reviewPercentages} />;
}
