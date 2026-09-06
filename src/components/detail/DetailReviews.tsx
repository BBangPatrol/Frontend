import { Link } from "react-router";
import Review from "../review/Review";
import ReviewSummary from "./ReviewSummary";
import rightArrowIcon from "@/assets/images/detailPage/right-arrow.svg";
import type { StoreReview } from "../../api/stores";

type DetailReviewsProps = {
  reviews: StoreReview[];
  reviewPercentages?: number[];
};

export default function DetailReviews({ reviews, reviewPercentages }: DetailReviewsProps) {
  return (
    <section className="flex flex-col gap-3 md:gap-4">
      <h3>
        <span className="text-black-01 typo-body-01 md:text-lg! md:font-bold! md:leading-7!">리뷰</span>{" "}
        <span className="text-[#99A1AF] typo-body-01 md:text-lg! md:font-normal! md:leading-7!">1,234</span>
      </h3>
      {reviewPercentages && <ReviewSummary reviewPercentages={reviewPercentages} />}
      <div className="flex flex-col gap-2 md:gap-4">
        {reviews.length > 0 ? (
          <>
            {reviews.map((review) => (
              <Review key={review.id} starRating={review.rating} userName={review.writerName} content={review.content} date={review.date} likeCount={review.likeCount} />
            ))}
            <Link to="/detail/review" className="flex py-3 rounded-xl justify-center items-center gap-1">
              <p className="text-gray-500 typo-sub-01 md:text-inherit">더보기</p>
              <img src={rightArrowIcon} />
            </Link>
          </>
        ) : (
          <div className="text-sm mx-auto my-5 text-gray-02">작성된 리뷰가 없습니다.</div>
        )}
      </div>
    </section>
  );
}
