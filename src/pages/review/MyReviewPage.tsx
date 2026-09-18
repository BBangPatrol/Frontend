// libraries
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// hooks
// import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useReviews } from "../../hooks/api/useGetRevies";
// contexts
import { useResponsive } from "../../contexts/ResponsiveContext";
// components
import Pagination from "../../components/common/Pagination";
import PageHeader from "../../components/common/PageHeader";
import ReviewCard from "./components/ReviesCard";
import PageStatus from "../../components/common/PageStatus";
// assets
import review from "../../assets/images/dashboardPage/review.svg";
import like from "../../assets/icon/like-sub-01.svg";

export default function MyReviewPage() {
  // const isLoggedIn = useIsLoggedIn();
  // const navigate = useNavigate();

  const { isMobile } = useResponsive();

  const { data: ReviewData, isPending, isError } = useReviews(true);

  const [cursorHistory, setCursorHistory] = useState<Array<number | undefined>>(
    [undefined],
  );

  if (isPending) {
    return <PageStatus message="리뷰 데이터를 불러오는 중입니다." />;
  }

  if (isError) {
    return (
      <PageStatus message="리뷰 데이터를 불러오는 중 오류가 발생했습니다." />
    );
  }

  // const ReviewData = {
  //   reviews: [
  //     {
  //       bakeryId: 1,
  //       bakeryName: "성심당 본점",
  //       reviewId: 1,
  //       rating: 5,
  //       content: "튀소는 언제 먹어도 맛있어요. 사람 많지만 회전율 굿!",
  //       likeCount: 12,
  //       date: "2026.05.20",
  //     },
  //     {
  //       bakeryId: 1,
  //       bakeryName: "성심당 본점",
  //       reviewId: 2,
  //       rating: 5,
  //       content: "튀소는 언제 먹어도 맛있어요. 사람 많지만 회전율 굿!",
  //       likeCount: 12,
  //       date: "2026.05.20",
  //     },
  //     {
  //       bakeryId: 1,
  //       bakeryName: "성심당 본점",
  //       reviewId: 3,
  //       rating: 5,
  //       content: "튀소는 언제 먹어도 맛있어요. 사람 많지만 회전율 굿!",
  //       likeCount: 12,
  //       date: "2026.05.20",
  //     },
  //     {
  //       bakeryId: 1,
  //       bakeryName: "성심당 본점",
  //       reviewId: 4,
  //       rating: 5,
  //       content: "튀소는 언제 먹어도 맛있어요. 사람 많지만 회전율 굿!",
  //       likeCount: 12,
  //       date: "2026.05.20",
  //     },
  //     {
  //       bakeryId: 2,
  //       bakeryName: "하레하레",
  //       reviewId: 5,
  //       rating: 5,
  //       content: "소금빵 겉바속촉 제대로입니다. 인생 소금빵 등극!",
  //       likeCount: 25,
  //       date: "2026.05.18",
  //     },
  //   ],
  //   reviewCount: 7,
  //   reviewLikes: 42,
  //   pageInfo: {
  //     page: 0,
  //     size: 5,
  //     totalElements: 7,
  //     totalPages: 2,
  //     hasNext: true,
  //   },
  // };

  const handlePageChange = (page: number) => {
    if (page <= cursorHistory.length) {
      setCursorHistory((history) => history.slice(0, page));
      return;
    }
    setCursorHistory((history) => [...history, page]);
  };

  return (
    <div
      className={`  flex flex-col items-center justify-center max-w-7xl mx-auto ${isMobile ? "p-4 gap-6 mb-10" : "p-6 gap-8 mb-40"} `}
    >
      <div className="flex items-center justify-between w-full">
        <PageHeader
          title="나의 리뷰"
          icon={review}
          subTitle="작성한 리뷰를 확인하고 관리해보세요!"
        />
      </div>
      <div
        className={`flex items-center justify-center w-full ${isMobile ? "gap-2" : "gap-4"}`}
      >
        <div
          className={`flex flex-col flex-1 items-center justify-center rounded-xl border border-gray-04 bg-gray-05 gap-2 ${isMobile ? "px-4 py-3 " : "p-4"}`}
        >
          <p
            className={`text-center text-gray-02 ${isMobile ? "typo-head-05" : "typo-head-04"}`}
          >
            작성한 리뷰
          </p>
          <p
            className={`text-center text-black-01 ${isMobile ? "typo-head-03" : "typo-head-01"}`}
          >
            {ReviewData.reviewCount}
          </p>
        </div>
        <div
          className={`flex flex-col flex-1 items-center justify-center rounded-xl border-main-05 bg-yellow-01 ${isMobile ? "px-4 py-3 gap-2" : "p-4 gap-2"}`}
        >
          <p
            className={`flex items-center gap-1 text-center text-sub-03 ${isMobile ? "typo-head-05" : "typo-head-04"}`}
          >
            <img
              src={like}
              alt="like"
              className={`${isMobile ? "w-3 h-3" : "w-5 h-5"}`}
            />
            받은 도움이 돼요 수
          </p>
          <p
            className={`text-center text-sub-01 ${isMobile ? "typo-head-03" : "typo-head-01"}`}
          >
            {ReviewData.reviewLikes}
          </p>
        </div>
      </div>
      <div
        className={`flex flex-col items-center justify-center w-full ${isMobile ? "gap-4" : "gap-8"}`}
      >
        {ReviewData.reviews.length === 0 ? (
          <div
            className={`self-start text-gray-01 ${isMobile ? "typo-sub-02" : "typo-sub-01"} `}
          >
            아직 리뷰가 없어요.
          </div>
        ) : (
          <div
            className={`flex flex-col w-full ${isMobile ? " gap-4" : "gap-4"}`}
          >
            {ReviewData.reviews.map((review) => (
              <ReviewCard
                key={review.reviewId}
                storeName={review.bakeryName}
                visitDate={review.date}
                rating={review.rating}
                content={review.content}
                helpfulCount={review.likeCount}
              />
            ))}
          </div>
        )}
        <Pagination
          page={cursorHistory.length}
          totalPages={ReviewData.pageInfo.totalPages}
          hasNext={ReviewData.pageInfo.hasNext}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
