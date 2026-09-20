// assets
// import click_like from "../../../assets/icon/like-black-01.svg";
import unclick_like from "../../../assets/icon/like-gray-02.svg";
import star from "../../../assets/icon/star.svg";
import emptyStar from "../../../assets/icon/empty_star.svg";
// contexts
import { useResponsive } from "../../../contexts/ResponsiveContext";
import { formatRelativeDate } from "../../../utils/date";

interface ReviewCardProps {
  storeName: string;
  visitDate: string;
  rating: number;
  content: string;
  helpfulCount: number;
  onEdit?: () => void;
  onDelete?: () => void;
  onHelpful?: () => void;
}

export default function ReviewCard({
  storeName,
  visitDate,
  rating,
  content,
  helpfulCount,
  onEdit,
  onDelete,
  onHelpful,
}: ReviewCardProps) {
  const { isMobile } = useResponsive();

  return (
    <article
      className={`w-full rounded-2xl border border-gray-04 bg-white flex flex-col gap-3 ${
        isMobile ? "px-3 py-4" : "p-5"
      }`}
    >
      <div className={`flex flex-col gap-1`}>
        {/* 가게명 + 날짜 */}
        <div className="flex items-center justify-between">
          <h3
            className={`text-black-01 ${isMobile ? "typo-head-05" : "typo-head-03"}`}
          >
            {storeName}
          </h3>

          <time
            className={`text-gray-02 ${isMobile ? "typo-sub-02" : "typo-sub-01"}`}
          >
            {formatRelativeDate(visitDate)}
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

      {/* 리뷰 내용 */}
      <p
        className={`text-gray-01 ${
          isMobile
            ? "rounded-lg px-3 py-2 typo-sub-02       "
            : "rounded-2xl px-3 py-4 typo-sub-01"
        } bg-gray-04`}
      >
        {content}
      </p>

      {/* 하단 */}
      <div className={`flex items-center justify-between `}>
        {/* 수정 / 삭제 */}
        <div
          className={`flex text-black-02 underline hover:text-black-01 ${
            isMobile ? "gap-3 typo-sub-02" : "gap-3 typo-body-03"
          }`}
        >
          <button type="button" onClick={onEdit}>
            리뷰 수정
          </button>

          <button type="button" onClick={onDelete}>
            리뷰 삭제
          </button>
        </div>

        {/* 도움이 돼요 */}
        <button
          type="button"
          onClick={onHelpful}
          className={`flex items-center rounded-lg bg-gray-04 text-gray-02 gap-2 px-3 py-1.5 typo-body-04
          }`}
        >
          <img src={unclick_like} alt="like" className={`w-3.5 h-3.5`} />

          <span>도움이 돼요 {helpfulCount}</span>
        </button>
      </div>
    </article>
  );
}
