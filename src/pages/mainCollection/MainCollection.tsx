// libraries
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
// hooks
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useCollection } from "../../hooks/api/useGetCollection";
// components
import LoginModal from "../../components/modal/LoginModal";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/Button";
import SearchInput from "./components/SearchInput";
import BakeryReviewCard from "./components/BakeryReviewCard";
import PageStatus from "../../components/common/PageStatus";

// utils
import { startKakaoLogin } from "../../utils/kakao";
// assets
import book from "../../assets/icon/book-sub-01.svg";
import camera from "../../assets/icon/camera-white.svg";
import plus from "../../assets/icon/plus.svg";
// contexts
import { useResponsive } from "../../contexts/ResponsiveContext";

export default function MainCollectionPage() {
  const isLoggedIn = useIsLoggedIn();
  const navigate = useNavigate();

  const { isMobile } = useResponsive();

  // const collectionData = {
  //   visits: [
  //     {
  //       storeId: 1,
  //       storeName: "성심당 본점",
  //       storeImageUrl:
  //         "https://cdn.100ssd.co.kr/news/photo/202408/112594_92378_1525.png",
  //       visitDate: "2026-06-05",

  //       state: "reviewed",

  //       reviewId: 101,
  //       rating: 4,
  //       reviewContent:
  //         "튀김소보로는 언제나 진리! 튀김소보로는 언제나 진리! 튀김소보로는 언제나 진리!튀김소보로는 언제나 진리! 튀김소보로는 언제나 진리! 튀김소보로는 언제나 진리! 튀김소보로는 언제나 진리!튀김소보로는 언제나 진리! 튀김소보로는 언제나 진리! 튀김소보로는 언제나 진리!튀김소보로는 언제나 진리! 튀김소보로는 언제나 진리! 튀김소보로는 언제나 진리!튀김소보로는 언제나 진리! 튀김소보로는 언제나 진리! 튀김소보로는 언제나 진리!     ",
  //       reviewDeadline: null,
  //     },
  //     {
  //       storeId: 2,
  //       storeName: "런던베이글뮤지엄 안국점",
  //       storeImageUrl:
  //         "https://www.qplace.kr/content/images/2023/03/---_No.3444-------.jpg",
  //       visitDate: "2026-06-10",

  //       state: "none",

  //       reviewId: null,
  //       rating: null,
  //       reviewContent: null,
  //       reviewDeadline: "2026-06-16",
  //       remainingDays: 6,
  //     },
  //     {
  //       storeId: 3,
  //       storeName: "카페 레이어드 연남",
  //       storeImageUrl:
  //         "https://www.canews.kr/news/photo/202109/4880_7185_2342.jpg",
  //       visitDate: "2026-05-20",

  //       state: "expired",

  //       reviewId: null,
  //       rating: null,
  //       reviewContent: null,
  //       reviewDeadline: "2026-05-27",
  //       remainingDays: 0,
  //     },
  //     {
  //       storeId: 1,
  //       storeName: "성심당 본점",
  //       storeImageUrl:
  //         "https://cdn.100ssd.co.kr/news/photo/202408/112594_92378_1525.png",
  //       visitDate: "2026-06-05",

  //       state: "reviewed",

  //       reviewId: 101,
  //       rating: 4,
  //       reviewContent:
  //         "튀김소보로는 언제나 진리! 튀김소보로는 언제나 진리! 튀김소보로는 언제나 진리!튀김소보로는 언제나 진리! 튀김소보로는 언제나 진리! 튀김소보로는 언제나 진리! 튀김소보로는 언제나 진리!튀김소보로는 언제나 진리! 튀김소보로는 언제나 진리! 튀김소보로는 언제나 진리!튀김소보로는 언제나 진리! 튀김소보로는 언제나 진리! 튀김소보로는 언제나 진리!튀김소보로는 언제나 진리! 튀김소보로는 언제나 진리! 튀김소보로는 언제나 진리!     ",
  //       reviewDeadline: null,
  //     },
  //     {
  //       storeId: 2,
  //       storeName: "런던베이글뮤지엄 안국점",
  //       storeImageUrl:
  //         "https://www.qplace.kr/content/images/2023/03/---_No.3444-------.jpg",
  //       visitDate: "2026-06-10",

  //       state: "none",

  //       reviewId: null,
  //       rating: null,
  //       reviewContent: null,
  //       reviewDeadline: "2026-06-16",
  //       remainingDays: 6,
  //     },
  //     {
  //       storeId: 3,
  //       storeName: "카페 레이어드 연남",
  //       storeImageUrl:
  //         "https://www.canews.kr/news/photo/202109/4880_7185_2342.jpg",
  //       visitDate: "2026-05-20",

  //       state: "expired",

  //       reviewId: null,
  //       rating: null,
  //       reviewContent: null,
  //       reviewDeadline: "2026-05-27",
  //       remainingDays: 0,
  //     },
  //     {
  //       storeId: 1,
  //       storeName: "성심당 본점",
  //       storeImageUrl:
  //         "https://cdn.100ssd.co.kr/news/photo/202408/112594_92378_1525.png",
  //       visitDate: "2026-06-05",

  //       state: "reviewed",

  //       reviewId: 101,
  //       rating: 4,
  //       reviewContent:
  //         "튀김소보로는 언제나 진리! 튀김소보로는 언제나 진리! 튀김소보로는 언제나 진리!튀김소보로는 언제나 진리! 튀김소보로는 언제나 진리! 튀김소보로는 언제나 진리! 튀김소보로는 언제나 진리!튀김소보로는 언제나 진리! 튀김소보로는 언제나 진리! 튀김소보로는 언제나 진리!튀김소보로는 언제나 진리! 튀김소보로는 언제나 진리! 튀김소보로는 언제나 진리!튀김소보로는 언제나 진리! 튀김소보로는 언제나 진리! 튀김소보로는 언제나 진리!     ",
  //       reviewDeadline: null,
  //     },
  //     {
  //       storeId: 2,
  //       storeName: "런던베이글뮤지엄 안국점",
  //       storeImageUrl:
  //         "https://www.qplace.kr/content/images/2023/03/---_No.3444-------.jpg",
  //       visitDate: "2026-06-10",

  //       state: "none",

  //       reviewId: null,
  //       rating: null,
  //       reviewContent: null,
  //       reviewDeadline: "2026-06-16",
  //       remainingDays: 6,
  //     },
  //     {
  //       storeId: 3,
  //       storeName: "카페 레이어드 연남",
  //       storeImageUrl:
  //         "https://www.canews.kr/news/photo/202109/4880_7185_2342.jpg",
  //       visitDate: "2026-05-20",

  //       state: "expired",

  //       reviewId: null,
  //       rating: null,
  //       reviewContent: null,
  //       reviewDeadline: "2026-05-27",
  //       remainingDays: 0,
  //     },
  //   ],
  // } as const;

  // const collectionData = {
  //   visits: [],
  // } as const;

  const {
    data: collectionData,
    isLoading,
    isError,
  } = useCollection(isLoggedIn);

  if (isLoading) {
    return <PageStatus message="컬렉션을 불러오는 중입니다." />;
  }

  if (isError) {
    return (
      <PageStatus message="컬렉션을 불러오지 못했습니다." showBackButton />
    );
  }

  return (
    <div
      className={`  flex flex-col items-start justify-center max-w-7xl mx-auto ${isMobile ? "p-4 gap-6 mb-10" : "p-6 gap-8 mb-40"} `}
    >
      {isMobile ? (
        <div className="fixed bottom-5 right-5 shadow-md rounded-full bg-sub-01 flex items-center justify-center w-10 h-10">
          <img src={plus} alt="플러스" className="w-6 h-6" />{" "}
        </div>
      ) : null}
      <div className="flex items-center justify-between w-full">
        <PageHeader
          title="나의 빵 컬렉션"
          icon={book}
          subTitle="영수증을 인증하여 지금까지 다녀온 빵집 기록들을 모아보세요"
          noBackButton={true}
        />
        {!isMobile && (
          <Button
            onClick={() => {
              if (isLoggedIn) {
                // navigate to collection page
              }
            }}
            className="flex items-center gap-2 rounded-[10px] bg-primary py-2 px-4 text-white"
          >
            <img
              src={camera}
              alt="카메라"
              className={` ${isMobile ? "typo-head-03" : "w-5 h-5"}`}
            />
            <p className={` ${isMobile ? "typo-head-03" : "text-base"}`}>
              영수증으로 방문 인증
            </p>
          </Button>
        )}
      </div>
      <SearchInput
        onSearch={(keyword) => {
          console.log("검색어:", keyword);
        }}
      />
      {isLoggedIn ? (
        collectionData!.visits.length === 0 ? (
          <div
            className={`text-center text-gray-01 ${isMobile ? "typo-sub-02" : "typo-sub-01"} `}
          >
            인증한 빵집이 없어요.
          </div>
        ) : (
          <div
            className={
              isMobile ? "flex flex-col gap-4" : "grid grid-cols-3 gap-6"
            }
          >
            {collectionData!.visits.map((visit) => (
              <BakeryReviewCard
                key={visit.storeId}
                {...visit}
                onWriteReview={() => console.log(`리뷰 작성: ${visit.storeId}`)}
                onEditReview={() => console.log(`리뷰 수정: ${visit.reviewId}`)}
                onDeleteReview={() =>
                  console.log(`리뷰 삭제: ${visit.reviewId}`)
                }
              />
            ))}
          </div>
        )
      ) : (
        <LoginModal
          isMobile={isMobile}
          onClick={startKakaoLogin}
          description="로그인하고 나만의 빵집 기록을 모아 빵 컬렉션을 만들어보세요"
          onClose={() => {
            navigate("/");
          }}
        />
      )}
    </div>
  );
}
