import usePageTitle from "../../hooks/usePageTitle";
import { useParams } from "react-router-dom";
import { isAxiosError } from "axios";
import PageStatus from "../../components/common/PageStatus";
import DetailFunctionButtons from "../../components/detail/DetailFunctionButtons";
import DetailReviews from "../../components/detail/DetailReviews";
import DetailSummary from "../../components/detail/DetailSummary";
import Recommendation from "../../components/detail/Recommendation";
import ReviewSummary from "../../components/detail/ReviewSummary";
import { useResponsive } from "../../contexts/ResponsiveContext";
import { useStoreAttractions } from "../../hooks/api/useStoreAttractions";
import { useStoreDetail } from "../../hooks/api/useStoreDetail";
import { useStoreReviews } from "../../hooks/api/useStoreReviews";
import type { StoreDetailErrorResponse } from "../../api/stores";
import mainImage from "@/assets/images/detailPage/temp_1.jpeg";

export default function DetailPage() {
  usePageTitle("빵집 상세");

  const { isMobile } = useResponsive();
  const { storeId = "" } = useParams<{ storeId: string }>();

  const storeDetailQuery = useStoreDetail(storeId);
  const storeReviewsQuery = useStoreReviews(storeId);
  const storeAttractionsQuery = useStoreAttractions(storeId);

  if (!storeId) return <PageStatus message="가게 정보를 찾을 수 없습니다." />;

  const bakery = storeDetailQuery.data?.bakery;
  const detailErrorMessage = isAxiosError<StoreDetailErrorResponse>(storeDetailQuery.error)
    ? storeDetailQuery.error.response?.data.message ?? "가게 정보를 불러오지 못했습니다."
    : "가게 정보를 불러오지 못했습니다.";

  if (!bakery && isAxiosError(storeDetailQuery.error) && storeDetailQuery.error.response?.status === 404)
    return <PageStatus message={detailErrorMessage} showBackButton />;

  const summaryContent = bakery?.summary ? (
    <ReviewSummary key={storeId} summary={bakery.summary} storeId={storeId} />
  ) : !bakery && storeDetailQuery.isPending ? (
    <div role="status" className="rounded-xl border border-main-05 bg-yellow-02 p-3 md:p-5">
      <span className="sr-only">AI 리뷰 요약을 불러오는 중입니다.</span>
      <div aria-hidden="true" className="flex flex-col gap-3 motion-safe:animate-pulse">
        <div className="h-5 w-28 rounded bg-gray-03" />
        <div className="h-20 rounded-xl bg-white/70" />
      </div>
    </div>
  ) : null;

  const reviewsContent = (
    <DetailReviews
      storeId={storeId}
      data={storeReviewsQuery.data}
      isPending={storeReviewsQuery.isPending}
      summary={isMobile ? summaryContent : undefined}
    />
  );

  return (
    <main className="p-4 gap-8 flex flex-col md:mx-auto md:w-274.75 md:p-6 md:flex-row">
      <div className="flex flex-col gap-8 md:flex-1 md:min-w-0">
        <div className="flex flex-col gap-5 md:gap-8">
          {bakery ? (
            <>
              <div className="h-48 rounded-3xl overflow-hidden md:h-66.25">
                <img src={bakery.image ?? mainImage} alt={`${bakery.name} 대표 사진`} fetchPriority="high" className="w-full h-full object-cover" />
              </div>
              <DetailSummary bakery={bakery} />
            </>
          ) : storeDetailQuery.isPending ? (
            <div role="status" className="flex flex-col gap-5 md:gap-8">
              <span className="sr-only">가게 정보를 불러오는 중입니다.</span>
              <div aria-hidden="true" className="h-48 rounded-3xl bg-gray-04 motion-safe:animate-pulse md:h-66.25" />
              <div aria-hidden="true" className="flex flex-col gap-4 motion-safe:animate-pulse">
                <div className="h-8 w-1/2 rounded bg-gray-04 md:h-10" />
                <div className="h-5 w-full rounded bg-gray-04" />
                <div className="flex flex-col gap-2">
                  <div className="h-4 w-3/4 rounded bg-gray-04" />
                  <div className="h-4 w-1/2 rounded bg-gray-04" />
                  <div className="h-4 w-1/3 rounded bg-gray-04" />
                </div>
              </div>
            </div>
          ) : (
            <p role="alert" className="py-8 text-gray-02 typo-body-03">{detailErrorMessage}</p>
          )}
          {isMobile && <DetailFunctionButtons storeId={storeId} />}
        </div>
        {isMobile ? reviewsContent : summaryContent}
        <Recommendation data={storeAttractionsQuery.data} isPending={storeAttractionsQuery.isPending} />
      </div>
      {!isMobile && (
        <div className="w-100 shrink-0 flex flex-col gap-6">
          <DetailFunctionButtons storeId={storeId} />
          {reviewsContent}
        </div>
      )}
    </main>
  );
}
