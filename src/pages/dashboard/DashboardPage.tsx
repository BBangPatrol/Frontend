import coinImage from "@/assets/images/dashboardPage/coin.svg";
import giftImage from "@/assets/images/dashboardPage/gift.svg";
import grayGiftImage from "@/assets/images/dashboardPage/gray-gift.svg";
import medalImage from "@/assets/images/dashboardPage/medal.svg";
import reviewImage from "@/assets/images/dashboardPage/review.svg";
import rightBlackArrow from "@/assets/images/dashboardPage/right-black-arrow.svg";
import rightBrownArrow from "@/assets/images/dashboardPage/right-brown-arrow.svg";
import logoImage from "@/assets/icon/logo.svg";
import cameraImage from "@/assets/images/dashboardPage/camera.svg";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { DashboardData, DashboardMission } from "../../api/users";
import PageStatus from "../../components/common/PageStatus";
import { useResponsive } from "../../contexts/ResponsiveContext";
import { useDashboard } from "../../hooks/api/useDashboard";
import type { RootState } from "../../store/store";

interface ResponsiveProps {
  isMobile: boolean;
}

interface DashboardHeaderProps extends ResponsiveProps {
  nickname: string;
  profileImageUrl: string | null;
}

interface CollectiblesCardProps extends ResponsiveProps {
  collectionBooks: DashboardData["collectionBooks"];
}

interface MissionCardProps extends ResponsiveProps {
  missions: DashboardMission[];
}

interface PointAndReviewCardProps extends ResponsiveProps {
  point: number;
  reviews: DashboardData["reviews"];
}

export default function DashboardPage() {
  const { isMobile } = useResponsive();
  const profileImageUrl = useSelector(
    (state: RootState) => state.auth.user?.imageUrl ?? null,
  );
  const dashboardQuery = useDashboard();

  if (dashboardQuery.isPending)
    return <PageStatus message="대시보드를 불러오는 중입니다." isLoading />;
  if (dashboardQuery.isError || !dashboardQuery.data)
    return (
      <PageStatus message="대시보드를 불러오지 못했습니다." showBackButton />
    );

  const { nickname, collectionBooks, point, reviews, missions } =
    dashboardQuery.data;

  return (
    <main className="p-4 flex flex-col gap-7 md:p-8 md:gap-9 md:max-w-7xl md:m-auto">
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
    </main>
  );
}

function DashboardHeader({
  isMobile,
  nickname,
  profileImageUrl,
}: DashboardHeaderProps) {
  return (
    <section className="flex">
      <div className="flex gap-3 items-center">
        <div className="size-10 rounded-full overflow-hidden">
          <img
            className="size-full object-cover"
            src={profileImageUrl ?? logoImage}
            alt={`${nickname} 프로필`}
          />
        </div>
        <h2 className="text-2xl font-extrabold text-bl ack-01">
          안녕, <span className="text-sub-01">{nickname}</span>!
        </h2>
      </div>
      {!isMobile && (
        <Link
          to="/"
          className="flex gap-2 ml-auto px-8 py-4 bg-sub-01 text-white rounded-2xl typo-head-03"
        >
          <img src={cameraImage} />
          <p>영수증으로 방문 인증</p>
        </Link>
      )}
    </section>
  );
}

function CollectiblesCard({
  isMobile,
  collectionBooks,
}: CollectiblesCardProps) {
  const itemLimit = isMobile ? 3 : 8;
  const visibleItems = collectionBooks.items.slice(0, itemLimit);
  const emptyItemCount = itemLimit - visibleItems.length;

  return (
    <Link to="/dashboard/collection">
      <section className="flex flex-col gap-4 p-5 bg-yellow-02 border border-main-05 rounded-xl md:rounded-4xl md:p-7 md:gap-5">
        <div className="flex gap-1.5 items-center">
          <div>
            <img className="md:size-7" src={giftImage} />
          </div>
          <h3 className={`${isMobile ? "typo-head-04" : "typo-head-02"}`}>
            수집품 도감
          </h3>
          <div
            className={`flex text-sub-02 ml-auto ${isMobile ? "typo-sub-02" : "typo-body-04"}`}
          >
            전체보기 <img src={rightBrownArrow} />
          </div>
        </div>
        <div className="flex flex-col gap-3 md:gap-4">
          <div className="flex flex-col gap-1 md:gap-2">
            <p className={isMobile ? "typo-head-04" : "typo-head-03"}>
              {collectionBooks.collected}개의 수집품을 모았어요
            </p>
            <p
              className={`${isMobile ? "typo-sub-02" : "typo-body-03"} text-gray-02`}
            >
              수집품 뽑기로 {collectionBooks.total}가지의 수집품을 모아보세요
            </p>
          </div>
          <div className="grid grid-cols-3 grid-rows-1 gap-3 md:grid-cols-4 md:grid-rows-2 md:gap-2">
            {visibleItems.map((item) => (
              <div
                key={item.collectibleId}
                className="flex aspect-square items-center justify-center overflow-hidden rounded-xl border-2 border-gray-03 bg-white p-2 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)] md:rounded-lg"
              >
                <img
                  className="size-full object-contain"
                  src={item.image}
                  alt={item.name}
                />
              </div>
            ))}
            {Array.from({ length: emptyItemCount }, (_, index) => (
              <div
                key={`empty-${index}`}
                className="flex aspect-square items-center justify-center overflow-hidden rounded-xl border-2 border-gray-03 bg-gray-05 p-2 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)] border-dashed md:rounded-lg text-2xl font-bold text-gray-03"
              >
                ?
              </div>
            ))}
          </div>
        </div>
      </section>
    </Link>
  );
}

function MissionCard({ isMobile, missions }: MissionCardProps) {
  const [missionIndex, setMissionIndex] = useState(0);
  const currentMission = missions[missionIndex % missions.length];

  useEffect(() => {
    if (missions.length <= 1) return;

    const intervalId = window.setInterval(() => {
      setMissionIndex((currentIndex) => (currentIndex + 1) % missions.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [missions.length]);

  if (!currentMission) return null;

  const progressPercentage =
    currentMission.targetCount > 0
      ? Math.min((currentMission.count / currentMission.targetCount) * 100, 100)
      : 0;
  const statusText =
    currentMission.status === "not_received" ? "보상 수령 가능" : "진행 중";
  const fadeClassName = missions.length > 1 ? "dashboard-mission-fade" : "";

  return (
    <Link to="/mission">
      <section className="flex flex-col p-5 gap-4 rounded-xl bg-white border border-main-05 md:rounded-4xl md:gap-5 md:p-7">
        <div className="flex gap-1.5 items-center">
          <div>
            <img src={medalImage} />
          </div>
          <h3 className={isMobile ? "typo-head-04" : "typo-head-02"}>
            진행 중 미션
          </h3>
          <img src={rightBlackArrow} className="ml-auto" />
        </div>
        <div className="flex flex-col gap-3 md:gap-4.5">
          <div
            key={currentMission.missionId}
            className={`flex flex-col gap-1 md:gap-2 ${fadeClassName}`}
          >
            <p className={isMobile ? "typo-head-04" : "typo-head-03"}>
              {currentMission.title}
            </p>
            <p
              className={`${isMobile ? "typo-sub-02" : "typo-body-03"} text-gray-02`}
            >
              {statusText}
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <div
              className={`flex justify-between text-sub-01 ${isMobile ? "typo-body-04" : "typo-body-03"}`}
            >
              <p>진행률</p>
              <p key={currentMission.missionId} className={fadeClassName}>
                {currentMission.count}
                <span className="text-gray-01">
                  {" "}
                  / {currentMission.targetCount}
                </span>
              </p>
            </div>
            <div
              className="h-2.5 w-full overflow-hidden rounded-full bg-gray-04"
              role="progressbar"
              aria-label="미션 진행률"
              aria-valuemin={0}
              aria-valuemax={currentMission.targetCount}
              aria-valuenow={currentMission.count}
            >
              <div
                className="h-full rounded-full bg-sub-01 transition-[width] duration-700 ease-in-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </section>
    </Link>
  );
}

function PointAndReviewCard({
  isMobile,
  point,
  reviews,
}: PointAndReviewCardProps) {
  return (
    <section className="flex gap-4">
      <Link
        to="/"
        className="flex flex-col gap-4 p-5 flex-1 bg-white border border-main-05 rounded-xl md:rounded-4xl md:gap-6 md:p-7"
      >
        <div className="flex gap-1.5 items-center">
          <img src={coinImage} className="size-5 md:size-7" />
          <h3 className={isMobile ? "typo-head-04" : "typo-head-02"}>포인트</h3>
          <img src={rightBlackArrow} className="ml-auto size-4" />
        </div>
        <div className="flex flex-col gap-3">
          <p>
            <span className="text-2xl font-extrabold">{point}</span>
            <span className="typo-head-04 text-gray-02 font-extrabold ml-0.5">
              P
            </span>
          </p>
          <div className="flex gap-1 items-center">
            <img src={grayGiftImage} />
            <p className="text-sm font-bold text-gray-01">
              뽑기{" "}
              <span className="text-sub-01">{Math.floor(point / 100)}</span>회
              가능
            </p>
          </div>
        </div>
      </Link>
      <Link
        to="/dashboard/reviews"
        className="flex flex-col gap-4 p-5 flex-1 bg-white border border-main-05 rounded-xl md:rounded-4xl md:gap-6 md:p-7"
      >
        <div className="flex gap-1.5 items-center">
          <img src={reviewImage} className="size-5 md:size-7" />
          <h3 className={isMobile ? "typo-head-04" : "typo-head-02"}>
            나의 리뷰
          </h3>
          <img src={rightBlackArrow} className="ml-auto size-4" />
        </div>
        <div className="flex flex-col gap-3">
          <p>
            <span className="text-2xl font-extrabold">
              {reviews.reviewCount}
            </span>
            <span className="typo-head-04 text-gray-02 font-extrabold ml-0.5">
              건
            </span>
          </p>
          <p className="text-sm font-bold text-gray-01">
            받은 좋아요{" "}
            <span className="text-sub-01">{reviews.reviewLikes}</span>
          </p>
        </div>
      </Link>
    </section>
  );
}
