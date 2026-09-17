import { useSelector } from "react-redux";
import PageStatus from "../../components/common/PageStatus";
import CollectiblesCard from "../../components/dashboard/CollectiblesCard";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import MissionCard from "../../components/dashboard/MissionCard";
import PointAndReviewCard from "../../components/dashboard/PointAndReviewCard";
import { useResponsive } from "../../contexts/ResponsiveContext";
import { useDashboard } from "../../hooks/api/useDashboard";
import type { RootState } from "../../store/store";

export default function DashboardPage() {
  const { isMobile } = useResponsive();
  const profileImageUrl = useSelector((state: RootState) => state.auth.user?.imageUrl ?? null);
  const dashboardQuery = useDashboard();

  if (dashboardQuery.isPending) return <PageStatus message="대시보드를 불러오는 중입니다." isLoading />;
  if (dashboardQuery.isError || !dashboardQuery.data) return <PageStatus message="대시보드를 불러오지 못했습니다." showBackButton />;

  const { nickname, collectionBooks, point, reviews, missions } = dashboardQuery.data;

  return (
    <main className="w-full p-4 flex flex-col gap-7 md:p-8 md:gap-9 md:max-w-7xl md:mx-auto">
      <DashboardHeader isMobile={isMobile} nickname={nickname} profileImageUrl={profileImageUrl} />
      {isMobile ? (
        <div className="flex flex-col gap-5">
          <CollectiblesCard isMobile={isMobile} collectionBooks={collectionBooks} />
          <MissionCard isMobile={isMobile} missions={missions} />
          <PointAndReviewCard isMobile={isMobile} point={point} reviews={reviews} />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          <CollectiblesCard isMobile={isMobile} collectionBooks={collectionBooks} />
          <div className="flex flex-col gap-5">
            <MissionCard isMobile={isMobile} missions={missions} />
            <PointAndReviewCard isMobile={isMobile} point={point} reviews={reviews} />
          </div>
        </div>
      )}
    </main>
  );
}
