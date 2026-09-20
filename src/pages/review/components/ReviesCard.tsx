// assets
import likeIcon from "../../../assets/images/detailPage/like.svg";
import activeLikeIcon from "../../../assets/icon/like-sub-01.svg";
import star from "../../../assets/icon/star.svg";
import emptyStar from "../../../assets/icon/empty_star.svg";
// contexts
import { useResponsive } from "../../../contexts/ResponsiveContext";
// constants
import { REVIEW_KEYWORDS } from "../../../constants/reviews";
// hooks
import { useToggleReviewLike } from "../../../hooks/api/useToggleReviewLike";
import useIsLoggedIn from "../../../hooks/useIsLoggedIn";
interface ReviewCardProps {
  storeId: string;
  reviewId: number;
  storeName: string;
  rating: number;
  content: string;
  keywords: number[];
  images: string[];
  thumbnails: string[];
  helpfulCount: number;
  visitDate: string;
  isLike: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ReviewCard({
  storeId,
  reviewId,
  storeName,
  visitDate,
  rating,
  content,
  keywords,
  images,
  helpfulCount,
  isLike,
  onEdit,
  onDelete,
}: ReviewCardProps) {
  const { isMobile } = useResponsive();

  const isLoggedIn = useIsLoggedIn();

  const likeMutation = useToggleReviewLike();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}.${month}.${day}`;
  };

  const keywordLabels = keywords
    .map(
      (keywordId) => REVIEW_KEYWORDS.find(({ id }) => id === keywordId)?.label,
    )
    .filter((label): label is string => Boolean(label));

  return (
    <article
      className={`w-full rounded-2xl border border-gray-04 bg-white flex flex-col ${
        isMobile ? "px-3 py-4 gap-2" : "p-5 gap-3"
      }`}
    >
      <div className="flex flex-col gap-1">
        {/* 가게명 + 날짜 */}
        <div className="flex items-center justify-between">
          <h3
            className={`text-black-01 ${
              isMobile ? "typo-head-05" : "typo-head-03"
            }`}
          >
            {storeName}
          </h3>

          <time
            className={`text-gray-02 ${
              isMobile ? "typo-sub-02" : "typo-sub-01"
            }`}
          >
            {formatDate(visitDate)}
          </time>
        </div>

        {/* 별점 */}
        <div className={`flex ${isMobile ? "gap-[1.5px]" : "gap-0.5"}`}>
          {Array.from({ length: 5 }).map((_, index) => (
            <img
              key={index}
              src={index < rating ? star : emptyStar}
              alt={index < rating ? "채워진 별" : "빈 별"}
              className={`${isMobile ? "w-4 h-4" : "w-5 h-5"}`}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        {/* 키워드 */}
        {keywordLabels.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {keywordLabels.map((label) => (
              <div
                key={label}
                className={`h-5 px-1 rounded-lg border-sub-01 flex justify-center items-center text-sub-01 ${
                  isMobile
                    ? "border-[0.3px] typo-sub-04"
                    : "py-2 border typo-sub-02"
                }`}
              >
                {label}
              </div>
            ))}
          </div>
        )}

        {/* 리뷰 내용 */}
        <p
          className={`text-black-01 ${
            isMobile ? "typo-body-05-des" : "typo-body-03-des"
          }`}
        >
          {content}
        </p>
      </div>

      {/* 리뷰 이미지 */}
      <div className="flex gap-2">
        {images?.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`리뷰 이미지 ${index + 1}`}
            className={`object-cover rounded-md ${
              isMobile ? "w-10 h-10" : "w-15 h-15"
            }`}
          />
        ))}
      </div>

      {/* 하단 */}
      <div className="flex items-center justify-between">
        {/* 수정 / 삭제 */}
        <div
          className={`flex text-black-02 underline ${
            isMobile ? "gap-3 typo-sub-02" : "gap-3 typo-body-03"
          }`}
        >
          <button
            type="button"
            onClick={onEdit}
            className="hover:text-black-01"
          >
            리뷰 수정
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="hover:text-black-01"
          >
            리뷰 삭제
          </button>
        </div>

        {/* 도움이 돼요 */}
        <button
          type="button"
          aria-pressed={isLike}
          aria-label={isLike ? "도움이 돼요 취소" : "도움이 돼요"}
          disabled={likeMutation.isPending}
          onClick={() => {
            if (!isLoggedIn) {
              setIsLoginModalOpen(true);
              return;
            }

            likeMutation.mutate({
              storeId,
              reviewId,
            });
          }}
          className={`flex h-7 items-center justify-start gap-2 rounded-lg border px-3 py-1.5 typo-body-04 disabled:opacity-60 ${
            isLike
              ? "border-sub-01 bg-main-05 text-sub-01"
              : "border-transparent bg-gray-04 text-gray-02"
          }`}
        >
          <img
            src={isLike ? activeLikeIcon : likeIcon}
            alt=""
            className="w-3.5 h-3.5"
          />

          <span>도움이 돼요 {helpfulCount}</span>
        </button>
      </div>
    </article>
  );
}
