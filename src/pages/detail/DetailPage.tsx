import { useParams } from "react-router-dom";
import { isAxiosError } from "axios";
import PageStatus from "../../components/common/PageStatus";
import DetailFunctionButtons from "../../components/detail/DetailFunctionButtons";
import DetailReviews from "../../components/detail/DetailReviews";
import DetailSummary from "../../components/detail/DetailSummary";
import Recommendation from "../../components/detail/Recommendation";
import ReviewSummary from "../../components/detail/ReviewSummary";
import { useResponsive } from "../../contexts/ResponsiveContext";
import { useStoreAttractions } from "../../hooks/useStoreAttractions";
import { useStoreDetail } from "../../hooks/useStoreDetail";
import { useStoreReviews } from "../../hooks/useStoreReviews";
import type { StoreDetailErrorResponse } from "../../api/stores";
import mainImage from "@/assets/images/detailPage/temp_1.jpeg";

const reviewPercentages = [0, 25, 50, 75, 100];

export default function DetailPage() {
  const { isMobile } = useResponsive();
  const { storeId = "" } = useParams<{ storeId: string }>();

  const storeDetailQuery = useStoreDetail(storeId);
  const storeReviewsQuery = useStoreReviews(storeId);
  const storeAttractionsQuery = useStoreAttractions(storeId);

  if (!storeId) return <PageStatus message="가게 정보를 찾을 수 없습니다." />;

  const queryError = storeDetailQuery.error ?? storeReviewsQuery.error ?? storeAttractionsQuery.error;

  if (queryError) {
    const message = isAxiosError<StoreDetailErrorResponse>(queryError) ? queryError.response?.data.message : undefined;
    return <PageStatus message={message ?? "가게 정보를 불러오지 못했습니다."} />;
  }

  if (storeDetailQuery.isPending || storeReviewsQuery.isPending || storeAttractionsQuery.isPending) return <PageStatus message="가게 정보를 불러오는 중입니다." />;
  if (!storeDetailQuery.data || !storeReviewsQuery.data || !storeAttractionsQuery.data) return null;

  const { bakery } = storeDetailQuery.data;
  const { reviews } = storeReviewsQuery.data;
  const { attractions } = storeAttractionsQuery.data;

  // 시그니처 메뉴 이미지를 우선 사용하고 나머지 fallback
  const bakeryImage = bakery.signatureImages[0] ?? bakery.images[0] ?? mainImage;

  return (
    <main className="p-4 gap-8 flex flex-col md:mx-auto md:w-274.75 md:p-6 md:flex-row">
      <div className="flex flex-col gap-8 md:flex-1 md:min-w-0">
        <div className="flex flex-col gap-5 md:gap-8">
          <div className="h-48 rounded-3xl overflow-hidden md:h-66.25">
            <img src={bakeryImage} alt={`${bakery.signatureMenu} 시그니처 메뉴`} className="w-full h-full object-cover" />
          </div>
          <DetailSummary bakery={bakery} />
          {isMobile && <DetailFunctionButtons />}
        </div>
        {isMobile ? <DetailReviews reviews={reviews} reviewPercentages={reviewPercentages} /> : <ReviewSummary reviewPercentages={reviewPercentages} />}
        <Recommendation attractions={attractions} />
      </div>
      {!isMobile && (
        <div className="w-100 shrink-0 flex flex-col gap-6">
          <DetailFunctionButtons />
          <DetailReviews reviews={reviews} />
        </div>
      )}
    </main>
  );
}
