// context
import { useResponsive } from "../../../contexts/ResponsiveContext";
// assets
import Edit from "../../../assets/icon/edit.svg";
import Info from "../../../assets/icon/info.svg";
import star from "../../../assets/icon/star.svg";
import emptyStar from "../../../assets/icon/empty_star.svg";
// libraries
import { useNavigate } from "react-router-dom";
// types
import type { Review } from "../../../api/collection";
// constants
import { REVIEW_KEYWORDS } from "../../../constants/reviews";

export type ReviewState = "none" | "expired" | "reviewed";

export interface BakeryReviewCardProps {
  storeId: number;
  storeName: string;
  storeImageUrl: string;
  visitDate: string;
  state: ReviewState;
  review: Review | null;

  visitDetailId: number;
  remainingDays?: number | null;

  onWriteReview: () => void;
  onEditReview: () => void;
  onDeleteReview: () => void;
}

export default function BakeryReviewCard({
  storeId,
  storeName,
  storeImageUrl,
  visitDate,
  state,
  review,
  remainingDays,
  visitDetailId,
  onWriteReview,
  onEditReview,
  onDeleteReview,
}: BakeryReviewCardProps) {
  const commonProps = {
    storeId,
    storeName,
    storeImageUrl,
    visitDate,
    state,
    review,
    remainingDays,
    visitDetailId,
    onWriteReview,
    onEditReview,
    onDeleteReview,
  };

  const { isMobile } = useResponsive();

  return isMobile ? (
    <MobileReviewCard {...commonProps} />
  ) : (
    <DesktopReviewCard {...commonProps} />
  );
}

type ReviewCardInnerProps = Omit<BakeryReviewCardProps, "isMobile">;

function DesktopReviewCard({
  storeId,
  storeName,
  storeImageUrl,
  visitDate,
  state,
  review,
  remainingDays,
  onWriteReview,
  onEditReview,
  onDeleteReview,
}: ReviewCardInnerProps) {
  const navigate = useNavigate();

  const keywordLabels = review?.keywords
    .map(
      (keywordId) => REVIEW_KEYWORDS.find(({ id }) => id === keywordId)?.label,
    )
    .filter((label): label is string => Boolean(label));

  return (
    <article
      className="w-full overflow-hidden rounded-3xl border border-gray-04 bg-white shadow-dropdown"
      onClick={() => navigate(`/detail/${storeId}`)}
    >
      <img
        src={storeImageUrl}
        alt={storeName}
        className="h-62.5 w-full object-cover"
      />

      <div
        className={`p-5  flex flex-col justify-between h-59 ${review ? "h-59" : "h-45"}`}
      >
        <div className="flex items-center justify-between">
          <h3 className="typo-head-03 text-black-01">{storeName}</h3>
          <span className="rounded-md bg-gray-04 p-2 typo-body-05 text-gray-02">
            {visitDate}
          </span>
        </div>

        {state === "none" && (
          <div className="flex flex-col gap-2 items-center justify-center rounded-xl border border-main-05 bg-yellow-02 p-3 h-full mt-2">
            <div className="text-center flex flex-col items-center gap-1">
              <p className="typo-body-03 text-black-01">
                리뷰를 기다리고 있어요!
              </p>
              {remainingDays !== undefined && remainingDays !== null && (
                <p className="typo-sub-02 text-black-02">
                  작성 기한: {remainingDays}일 남음
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onWriteReview();
              }}
              className="bg-sub-01 hover:bg-sub-02 Shadow-btntransition-colors 
              duration-200 rounded-lg flex items-center justify-center gap-2 bg-primary py-2 w-full text-white"
            >
              <img src={Edit} alt="" className="h-3.5 w-3.5" />
              <span className="typo-head-05">리뷰 쓰기</span>
            </button>
          </div>
        )}

        {state === "expired" && (
          <div className="flex min-h-25 h-full flex-col items-center justify-center gap-2 rounded-xl bg-gray-04 py-3 px-4 text-center border border-gray-03">
            <img src={Info} alt="" className="h-6 w-6" />
            <div className="flex flex-col items-center gap-1">
              <p className="typo-body-03 text-gray-01">리뷰 작성 만료</p>
              <p className="typo-sub-02 text-gray-02">
                인증 후 7일이 지나 리뷰를 쓸 수 없어요.
              </p>
            </div>
          </div>
        )}

        {state === "reviewed" && (
          <div className="flex h-full flex-col justify-between mt-1.5 ">
            <div className="flex flex-col justify-start gap-1.5">
              <div className="flex items-center gap-[1.5px]">
                {Array.from({ length: 5 }, (_, index) => (
                  <img
                    key={index}
                    src={index < review?.rating! ? star : emptyStar}
                    alt={index < review?.rating! ? "채워진 별" : "빈 별"}
                    className="w-4 h-4"
                  />
                ))}
              </div>
              <div className={`flex flex-col gap-1`}>
                {keywordLabels!.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {keywordLabels!.map((label) => (
                      <div
                        key={label}
                        className="h-5 px-1 py-2 rounded-lg border border-sub-01 flex justify-center items-center typo-sub-02 md:typo-body-03 text-sub-01"
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                )}
                {/* <p className="text-gray-01 typo-sub-01-des mt-1">{content}</p> */}
                <p className="typo-body-03-des text-black-01 line-clamp-2">
                  {review?.content}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              {review?.images?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`리뷰 이미지 ${index + 1}`}
                  className="w-15 h-15 object-cover rounded-md"
                />
              ))}
            </div>

            <div className="flex gap-3 border-t border-gray-04 pt-1.5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditReview();
                }}
                className="typo-body-03 text-black-02 underline hover:text-black-01"
              >
                리뷰 수정
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteReview();
                }}
                className="typo-body-03 text-black-02 underline hover:text-black-01"
              >
                리뷰 삭제
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

function MobileReviewCard({
  storeId,
  storeName,
  storeImageUrl,
  visitDate,
  state,
  review,
  remainingDays,
  onWriteReview,
  onEditReview,
  onDeleteReview,
}: ReviewCardInnerProps) {
  const navigate = useNavigate();

  const keywordLabels = review?.keywords
    .map(
      (keywordId) => REVIEW_KEYWORDS.find(({ id }) => id === keywordId)?.label,
    )
    .filter((label): label is string => Boolean(label));

  return (
    <article
      className="flex w-full overflow-hidden rounded-xl border border-gray-04 bg-white shadow-dropdown"
      onClick={() => navigate(`/detail/${storeId}`)}
    >
      <img
        src={storeImageUrl}
        alt={storeName}
        className="w-27.5 shrink-0 self-stretch object-cover"
      />

      <div className="flex flex-1 w-full flex-col justify-between p-3 max-h-50">
        <div className="flex items-center justify-between">
          <h3 className="typo-head-05 text-black-01">{storeName}</h3>
          <span className="rounded-sm bg-gray-04 p-1 typo-sub-04 text-gray-02">
            {visitDate}
          </span>
        </div>

        {state === "none" && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onWriteReview();
            }}
            className="mt-1.5 bg-sub-01 hover:bg-sub-02 Shadow-btn text-white transition-colors 
              duration-200 rounded-md flex items-center justify-center gap-1 bg-primary py-2 w-full "
          >
            <img src={Edit} alt="" className="h-2.5 w-2.5" />
            <span className="typo-body-05">리뷰 쓰기</span>
            <span className="typo-sub-04 text-gray-04">
              ({remainingDays}일 남음)
            </span>
          </button>
        )}

        {state === "expired" && (
          <div className="mt-1.5 flex items-center gap-2 rounded-sm bg-gray-04 px-3 py-2">
            <img src={Info} alt="" className="h-5 w-5 shrink-0" />
            <div className="flex flex-col gap-0.5">
              <p className="typo-body-05 text-gray-01">리뷰 작성 만료</p>
              <p className="typo-sub-04 text-gray-02">
                인증 후 7일이 지나 리뷰를 쓸 수 없어요.
              </p>
            </div>
          </div>
        )}

        {state === "reviewed" && (
          <div
            className="mt-1 flex flex-col justify-between gap-1"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/detail/review/${storeId}`);
            }}
          >
            <div className="flex items-center gap-0.5 text-orange-02">
              <img src={star} alt="별" className="w-2 h-2" />
              <span className="typo-sub-02 text-KUMDORI-01">
                {review?.rating ?? 0}
              </span>
            </div>

            <div className={`flex flex-col gap-1`}>
              {keywordLabels!.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {keywordLabels!.map((label) => (
                    <div
                      key={label}
                      className="h-5 px-1 rounded-lg border-[0.3px] border-sub-01 flex justify-center items-center typo-sub-04 text-sub-01"
                    >
                      {label}
                    </div>
                  ))}
                </div>
              )}
              {/* <p className="text-gray-01 typo-sub-01-des mt-1">{content}</p> */}
              <p className="mt-1 typo-body-05-des text-black-01 line-clamp-3">
                {review?.content}
              </p>
            </div>

            <div className="flex gap-1">
              {review?.images?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`리뷰 이미지 ${index + 1}`}
                  className="w-10 h-10 object-cover rounded-md"
                />
              ))}
            </div>

            <div className="mt-2 flex gap-3 border-t border-gray-04 pt-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditReview();
                }}
                className="typo-sub-03 text-black-02 underline hover:text-black-01                      "
              >
                리뷰 수정
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteReview();
                }}
                className="typo-sub-03 text-black-02 underline hover:text-black-01 "
              >
                리뷰 삭제
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
