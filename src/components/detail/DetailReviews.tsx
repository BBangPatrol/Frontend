import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import Review from "../review/Review";
import rightArrowIcon from "@/assets/images/detailPage/right-arrow.svg";
import type { StoreReviews } from "../../api/stores";

type DetailReviewsProps = {
  storeId: string;
  data?: StoreReviews;
  isPending: boolean;
  summary?: ReactNode;
};

export default function DetailReviews({ storeId, data, isPending, summary }: DetailReviewsProps) {
  return (
    <section className="flex flex-col gap-3 md:gap-4">
      <h3>
        <span className="text-black-01 typo-body-01 md:text-lg! md:font-bold! md:leading-7!">리뷰</span>{" "}
        {data ? (
          <span className="text-[#99A1AF] typo-body-01 md:text-lg! md:font-normal! md:leading-7!">{data.count.toLocaleString()}</span>
        ) : isPending ? (
          <span aria-hidden="true" className="inline-block h-5 w-8 rounded bg-gray-04 motion-safe:animate-pulse" />
        ) : null}
      </h3>
      {summary}
      <div className="flex flex-col gap-2 md:gap-4">
        {data && data.reviews.length > 0 ? (
          <>
            {data.reviews.slice(0, 3).map((review) => (
              <Review key={review.id} storeId={storeId} reviewId={review.id} starRating={review.rating} userName={review.writerName} content={review.content} date={review.date} likeCount={review.likeCount} isLike={review.isLike} keywords={review.keywords} images={review.images} thumbnails={review.thumbnails} />
            ))}
            <Link to={`/detail/review/${storeId}`} className="flex py-3 rounded-xl justify-center items-center gap-1">
              <p className="text-gray-500 typo-sub-01 md:text-inherit">더보기</p>
              <img src={rightArrowIcon} alt="" />
            </Link>
          </>
        ) : data ? (
          <div className="text-sm mx-auto my-5 text-gray-02">작성된 리뷰가 없습니다.</div>
        ) : isPending ? (
          <div role="status" className="flex flex-col gap-4">
            <span className="sr-only">리뷰를 불러오는 중입니다.</span>
            {Array.from({ length: 3 }, (_, index) => (
              <div key={index} aria-hidden="true" className="flex flex-col gap-3 border-b border-gray-04 py-2 motion-safe:animate-pulse">
                <div className="h-7 w-1/2 rounded bg-gray-04" />
                <div className="h-4 w-full rounded bg-gray-04" />
                <div className="h-4 w-3/4 rounded bg-gray-04" />
                <div className="h-7 w-28 rounded bg-gray-04" />
              </div>
            ))}
          </div>
        ) : (
          <p role="alert" className="py-5 text-gray-02 typo-body-03">리뷰를 불러오지 못했습니다.</p>
        )}
      </div>
    </section>
  );
}
