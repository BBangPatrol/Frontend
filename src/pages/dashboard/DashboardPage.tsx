import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { DashboardData } from "../../api/users";
import PageStatus from "../../components/common/PageStatus";
import CollectiblesCard from "../../components/dashboard/CollectiblesCard";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import MissionCard from "../../components/dashboard/MissionCard";
import PointAndReviewCard from "../../components/dashboard/PointAndReviewCard";
import LoginModal from "../../components/modal/LoginModal";
import { useResponsive } from "../../contexts/ResponsiveContext";
import { useDashboard } from "../../hooks/api/useDashboard";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import type { RootState } from "../../store/store";
import { startKakaoLogin } from "../../utils/kakao";

const guestDashboardData: DashboardData = {
  nickname: "게스트",
  collectionBooks: {
    collected: 0,
    total: 0,
    items: [],
  },
  point: 0,
  reviews: {
    reviewCount: 0,
    reviewLikes: 0,
  },
  missions: [
    {
      missionId: 0,
      title: "로그인하고 미션에 참여해보세요",
      count: 0,
      targetCount: 1,
      status: "in_progress",
    },
  ],
};

export default function DashboardPage() {
  const isLoggedIn = useIsLoggedIn();
  const navigate = useNavigate();
  const { isMobile } = useResponsive();
  const profileImageUrl = useSelector(
    (state: RootState) => state.auth.user?.imageUrl ?? null,
  );
  const dashboardQuery = useDashboard(isLoggedIn);

  if (isLoggedIn && dashboardQuery.isPending)
    return <PageStatus message="대시보드를 불러오는 중입니다." isLoading />;
  if (isLoggedIn && (dashboardQuery.isError || !dashboardQuery.data))
    return (
      <PageStatus message="대시보드를 불러오지 못했습니다." showBackButton />
    );

  const { nickname, collectionBooks, point, reviews, missions } =
    isLoggedIn ? dashboardQuery.data! : guestDashboardData;

  return (
    <main className="w-full p-4 flex flex-col gap-7 md:p-8 md:gap-9 md:max-w-7xl md:mx-auto">
      <DashboardHeader
        isMobile={isMobile}
        nickname={nickname}
        profileImageUrl={profileImageUrl}
      />
      {isMobile ? (
        <div className="flex flex-col gap-5">
          <CollectiblesCard
            isMobile={isMobile}
            collectionBooks={collectionBooks}
          />
          <MissionCard isMobile={isMobile} missions={missions} />
          <PointAndReviewCard
            isMobile={isMobile}
            point={point}
            reviews={reviews}
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          <CollectiblesCard
            isMobile={isMobile}
            collectionBooks={collectionBooks}
          />
          <div className="flex flex-col gap-5">
            <MissionCard isMobile={isMobile} missions={missions} />
            <PointAndReviewCard
              isMobile={isMobile}
              point={point}
              reviews={reviews}
            />
          </div>
        </div>
      )}
      {!isLoggedIn && (
        <LoginModal
          isMobile={isMobile}
          onClick={startKakaoLogin}
          description="로그인하고 나만의 빵집 활동과 기록을 한눈에 확인해보세요"
          onClose={() => navigate("/")}
        />
      )}
    </main>
  );
}
