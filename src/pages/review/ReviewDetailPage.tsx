import { isAxiosError } from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import PageStatus from "../../components/common/PageStatus";
import ReviewDetailList from "../../components/review/ReviewDetailList";
import ReviewRatingSummary from "../../components/review/ReviewRatingSummary";
import { useStoreDetail } from "../../hooks/api/useStoreDetail";
import { useStoreReviews } from "../../hooks/api/useStoreReviews";
import type { StoreApiErrorResponse } from "../../api/stores";

export default function ReviewDetailPage() {
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(0);
  const { storeId = "" } = useParams<{ storeId: string }>();
  const storeDetailQuery = useStoreDetail(storeId);
  const storeReviewsQuery = useStoreReviews(storeId, page);

  if (!storeId) return <PageStatus message="가게 정보를 찾을 수 없습니다." />;

  const queryError = storeDetailQuery.error ?? storeReviewsQuery.error;
  if (queryError) {
    const message = isAxiosError<StoreApiErrorResponse>(queryError) ? queryError.response?.data.message : undefined;
    return <PageStatus message={message ?? "리뷰를 불러오지 못했습니다."} showBackButton />;
  }

  if (storeDetailQuery.isPending || storeReviewsQuery.isPending) return <PageStatus message="리뷰를 불러오는 중입니다." />;
  if (!storeDetailQuery.data || !storeReviewsQuery.data) return null;

  const { bakery } = storeDetailQuery.data;
  const { reviews, count, pageInfo } = storeReviewsQuery.data;
  const averageRating = bakery.avgRating ?? (reviews.length > 0 ? reviews.reduce((total, review) => total + review.rating, 0) / reviews.length : 0);
  const ratingPercentages = [5, 4, 3, 2, 1].map((rating) => [rating, reviews.length > 0 ? Math.round((reviews.filter((review) => review.rating === rating).length / reviews.length) * 100) : 0]);

  return (
    <main className="p-4 flex flex-col gap-5 md:mx-auto md:w-4xl md:px-6 md:py-8 md:gap-6 md:justify-start md:items-start">
      <PageHeader
        title={`${bakery.name} 리뷰`}
        subTitle={
          <>
            총 <span className="text-black-01">{count.toLocaleString()}</span>개의 리뷰가 있습니다.
          </>
        }
      />
      <ReviewRatingSummary rating={averageRating} reviewCount={count} ratingPercentages={ratingPercentages} />
      <ReviewDetailList reviews={reviews} sort={sort} page={pageInfo.page} totalPages={pageInfo.totalPages} onSortChange={setSort} onPageChange={setPage} />
    </main>
  );
}
