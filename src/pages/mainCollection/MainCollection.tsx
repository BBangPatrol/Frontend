// libraries
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// hooks
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useCollection } from "../../hooks/api/useGetCollection";
import { useDeleteReview } from "../../hooks/api/useDeleteReviews";
// components
import LoginModal from "../../components/modal/LoginModal";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/Button";
import SearchInput from "./components/SearchInput";
import BakeryReviewCard from "./components/BakeryReviewCard";
import BakeryEmptyReviewCard from "./components/BakeryEmptyReviewCard";
import PageStatus from "../../components/common/PageStatus";
import ConfirmModal from "../../components/modal/ConfirmModal";
// utils
import { startKakaoLogin } from "../../utils/kakao";
// assets
import book from "../../assets/icon/book-sub-01.svg";
import camera from "../../assets/icon/camera-white.svg";
import plus from "../../assets/icon/plus.svg";
// contexts
import { useResponsive } from "../../contexts/ResponsiveContext";
// types
import type { Visit } from "../../api/collection";

export default function MainCollectionPage() {
  const isLoggedIn = useIsLoggedIn();
  const navigate = useNavigate();

  const { isMobile } = useResponsive();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [visit, setVisit] = useState<Visit | null>(null);

  // const collectionData: { visits: Visit[] } = {
  //   visits: [
  //     // =========================
  //     // 리뷰 있음
  //     // =========================
  //     {
  //       storeId: 1,
  //       storeName: "성심당 본점",
  //       storeImageUrl:
  //         "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1080&auto=format&fit=crop",
  //       visitDate: "2026-09-15",
  //       state: "reviewed",
  //       visitDetailId: 101,
  //       review: {
  //         id: 1001,
  //         rating: 5,
  //         content:
  //           "빵 종류도 다양하고 정말 맛있었어요. 다음에도 또 방문하고 싶어요!",
  //         keywords: [1, 3, 5],
  //         images: [
  //           "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1080&auto=format&fit=crop",
  //           "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1080&auto=format&fit=crop",
  //           "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1080&auto=format&fit=crop",
  //           "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1080&auto=format&fit=crop",
  //           "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1080&auto=format&fit=crop",
  //         ],
  //         thumbnails: [
  //           "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=200&auto=format&fit=crop",
  //           "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=200&auto=format&fit=crop",
  //         ],
  //       },
  //       reviewDeadline: "2026-09-22",
  //       remainingDays: 2,
  //     },

  //     {
  //       storeId: 2,
  //       storeName: "런던베이글뮤지엄",
  //       storeImageUrl:
  //         "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?q=80&w=1080&auto=format&fit=crop",
  //       visitDate: "2026-09-10",
  //       state: "reviewed",
  //       visitDetailId: 102,
  //       review: {
  //         id: 1002,
  //         rating: 4,
  //         content:
  //           "베이글이 쫀득하고 맛있었어요. 종류가 많아서 고르는 재미도 있었습니다.",
  //         keywords: [2, 4],
  //         images: [
  //           "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?q=80&w=1080&auto=format&fit=crop",
  //         ],
  //         thumbnails: [
  //           "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?q=80&w=200&auto=format&fit=crop",
  //         ],
  //       },
  //       reviewDeadline: "2026-09-17",
  //       remainingDays: null,
  //     },

  //     {
  //       storeId: 3,
  //       storeName: "카페 노티드",
  //       storeImageUrl:
  //         "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1080&auto=format&fit=crop",
  //       visitDate: "2026-09-05",
  //       state: "reviewed",
  //       visitDetailId: 103,
  //       review: {
  //         id: 1003,
  //         rating: 4.5,
  //         content:
  //           "도넛이 부드럽고 크림도 맛있었어요. 분위기도 아기자기해서 좋았습니다.",
  //         keywords: [1, 6],
  //         images: [
  //           "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1080&auto=format&fit=crop",
  //           "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=1080&auto=format&fit=crop",
  //         ],
  //         thumbnails: [
  //           "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=200&auto=format&fit=crop",
  //           "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=200&auto=format&fit=crop",
  //         ],
  //       },
  //       reviewDeadline: "2026-09-12",
  //       remainingDays: null,
  //     },

  //     // =========================
  //     // 리뷰 없음
  //     // =========================
  //     {
  //       storeId: 4,
  //       storeName: "밀도 성수점",
  //       storeImageUrl:
  //         "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=1080&auto=format&fit=crop",
  //       visitDate: "2026-09-18",
  //       state: "none",
  //       visitDetailId: 104,
  //       review: null,
  //       reviewDeadline: "2026-09-25",
  //       remainingDays: 5,
  //     },

  //     {
  //       storeId: 5,
  //       storeName: "아우어베이커리",
  //       storeImageUrl:
  //         "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1080&auto=format&fit=crop",
  //       visitDate: "2026-09-17",
  //       state: "none",
  //       visitDetailId: 105,
  //       review: null,
  //       reviewDeadline: "2026-09-24",
  //       remainingDays: 4,
  //     },

  //     {
  //       storeId: 6,
  //       storeName: "브레드05",
  //       storeImageUrl:
  //         "https://images.unsplash.com/photo-1509440159761-68a3f6b1b6f1?q=80&w=1080&auto=format&fit=crop",
  //       visitDate: "2026-09-16",
  //       state: "none",
  //       visitDetailId: 106,
  //       review: null,
  //       reviewDeadline: "2026-09-23",
  //       remainingDays: 3,
  //     },

  //     // =========================
  //     // 리뷰 만료
  //     // =========================
  //     {
  //       storeId: 7,
  //       storeName: "김영모과자점",
  //       storeImageUrl:
  //         "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1080&auto=format&fit=crop",
  //       visitDate: "2026-09-01",
  //       state: "expired",
  //       visitDetailId: 107,
  //       review: null,
  //       reviewDeadline: "2026-09-08",
  //       remainingDays: 0,
  //     },

  //     {
  //       storeId: 8,
  //       storeName: "파리크라상 강남점",
  //       storeImageUrl:
  //         "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1080&auto=format&fit=crop",
  //       visitDate: "2026-08-25",
  //       state: "expired",
  //       visitDetailId: 108,
  //       review: null,
  //       reviewDeadline: "2026-09-01",
  //       remainingDays: 0,
  //     },

  //     {
  //       storeId: 9,
  //       storeName: "성수베이커리",
  //       storeImageUrl:
  //         "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=1080&auto=format&fit=crop",
  //       visitDate: "2026-08-20",
  //       state: "expired",
  //       visitDetailId: 109,
  //       review: null,
  //       reviewDeadline: "2026-08-27",
  //       remainingDays: 0,
  //     },
  //   ],
  // };

  // const collectionData = {
  //   visits: [],
  // } as const;

  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: collectionData,
    isLoading,
    isError,
  } = useCollection(isLoggedIn, searchQuery);
  const { mutate: deleteReview } = useDeleteReview();

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
      className={`  flex flex-col items-start justify-center max-w-7xl mx-auto ${isMobile ? "p-4 gap-6 mb-10" : "p-6 gap-8 mb-20"} `}
    >
      {isMobile ? (
        <button
          className="fixed bottom-5 right-5 shadow-md rounded-full bg-sub-01 flex items-center justify-center w-10 h-10"
          onClick={() => {
            navigate("/map");
          }}
        >
          <img src={plus} alt="플러스" className="w-6 h-6" />{" "}
        </button>
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
              navigate("/receipt/verify");
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
          setSearchQuery(keyword);
        }}
        searchQuery={searchQuery}
      />
      {isLoggedIn ? (
        collectionData?.visits.length === 0 ? (
          searchQuery ? (
            <div className="flex flex-col w-full items-center justify-center py-20">
              <p className="typo-body-01 text-gray-01">검색 결과가 없어요</p>
              <p className="mt-1 typo-sub-01 text-gray-02">
                다른 빵집 이름으로 검색해보세요.
              </p>
            </div>
          ) : (
            <BakeryEmptyReviewCard
              onClick={() => {
                navigate("/map");
              }}
            />
          )
        ) : (
          <div
            className={
              isMobile
                ? "flex flex-col gap-4 w-full"
                : "grid grid-cols-3 gap-6 w-full"
            }
          >
            {collectionData!.visits.map((visit) => (
              <BakeryReviewCard
                key={`${visit.visitDetailId}`}
                {...visit}
                onWriteReview={() =>
                  navigate(`/detail/review/new/${visit.storeId}`, {
                    state: { visitDetailId: visit.visitDetailId },
                  })
                }
                onEditReview={() =>
                  navigate(
                    `/detail/review/${visit.storeId}/${visit.review?.id}/edit`,
                    {
                      state: { review: visit.review },
                    },
                  )
                }
                onDeleteReview={() => {
                  setShowDeleteModal(true);
                  setVisit(visit);
                }}
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
      {showDeleteModal && (
        <ConfirmModal
          isMobile={isMobile}
          title="리뷰 삭제"
          description="리뷰를 삭제하시겠습니까?"
          confirmText="삭제"
          cancelText="취소"
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => {
            deleteReview({
              storeId: visit!.storeId,
              reviewId: visit!.review!.id,
              page: 0,
            });

            setShowDeleteModal(false);
            setVisit(null);
          }}
        />
      )}
    </div>
  );
}
