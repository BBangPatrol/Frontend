import starIcon from "@/assets/images/detailPage/star.svg";
import likeIcon from "@/assets/images/detailPage/like.svg";
import activeLikeIcon from "@/assets/icon/like-sub-01.svg";
import fullStarIcon from "@/assets/images/reviewDetailPage/review-full-star.svg";
import { REVIEW_KEYWORDS } from "../../constants/reviews";
import { useResponsive } from "../../contexts/ResponsiveContext";
import { useToggleReviewLike } from "../../hooks/api/useToggleReviewLike";

type ReviewProps = {
  isDetail?: boolean;
  canManage?: boolean;
  onEdit?: () => void;
  storeId: string;
  reviewId: number;
  starRating: number;
  userName?: string;
  content?: string;
  date?: string;
  likeCount?: number;
  isLike?: boolean;
  keywords?: number[];
};

export default function Review({ isDetail = false, canManage = false, onEdit, storeId, reviewId, starRating, userName = "알수없음", content = "알수없음", date = "0일 전", likeCount = 0, isLike = false, keywords = [] }: ReviewProps) {
  const { isMobile } = useResponsive();
  const likeMutation = useToggleReviewLike();
  const keywordLabels = keywords
    .map((keywordId) => REVIEW_KEYWORDS.find(({ id }) => id === keywordId)?.label)
    .filter((label): label is string => Boolean(label));

  return (
    <article className="flex flex-col py-2 gap-3 border-b border-gray-04">
      <header className="flex gap-2 items-center">
        <button className="size-7 md:size-8 bg-main-03 rounded-full justify-center items-center">
          <p className="text-gray-01 typo-body-04">{userName.charAt(0)}</p>
        </button>
        <p className="text-black-01 typo-body-03 md:text-base!">{userName}</p>
        {isDetail && !isMobile ? (
          <p className="flex gap-0.5 items-center">
            {Array.from({ length: starRating }).map((_, index) => (
              <img key={index} src={fullStarIcon} />
            ))}
          </p>
        ) : (
          <p className="flex gap-0.5 items-center">
            <img src={starIcon} />
            <span className="text-KUMDORI-01 typo-sub-02 md:text-sm!">{starRating}</span>
          </p>
        )}
        <p className="ml-auto md:self-start text-gray-02 typo-sub-03 md:text-xs!">{date}</p>
      </header>
      <div className={`flex flex-col ${isDetail && "gap-2"}`}>
        {keywordLabels.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {keywordLabels.map((label) => (
              <div key={label} className="h-5 px-1 py-2 rounded-lg border border-sub-01 flex justify-center items-center typo-sub-02 md:typo-body-03 text-sub-01">
                {label}
              </div>
            ))}
          </div>
        )}
        <p className="text-gray-01 typo-sub-01-des mt-1">{content}</p>
      </div>
      <div className="flex">
        <button
          type="button"
          aria-pressed={isLike}
          aria-label={isLike ? "도움이 돼요 취소" : "도움이 돼요"}
          disabled={likeMutation.isPending}
          onClick={() => likeMutation.mutate({ storeId, reviewId })}
          className={`flex h-7 items-center justify-start gap-2 self-start rounded-lg border px-3 py-1.5 disabled:opacity-60 ${isLike ? "border-sub-01 bg-main-05" : "border-transparent bg-gray-04"}`}
        >
          <img src={isLike ? activeLikeIcon : likeIcon} alt="" className="size-3.5" />
          <div className={`flex gap-1 typo-body-04 ${isLike ? "text-sub-01" : "text-gray-02"}`}>
            <p>도움이 돼요</p>
            <p>{likeCount}</p>
          </div>
        </button>
        {isDetail && canManage && (
          <>
            <button type="button" onClick={onEdit} className="ml-5 text-black-02 typo-body-03 underline">리뷰 수정</button>
            <button className="ml-3 text-black-02 typo-body-03 underline">리뷰 삭제</button>
          </>
        )}
      </div>
    </article>
  );
}
