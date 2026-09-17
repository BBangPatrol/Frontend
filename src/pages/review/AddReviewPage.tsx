import { isAxiosError } from "axios";
import { useState, type FormEvent } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import PageStatus from "../../components/common/PageStatus";
import AddImages from "../../components/review/AddImages";
import AddReviewButton from "../../components/review/AddReviewButton";
import AddReviewRating from "../../components/review/AddReviewRating";
import KeywordSelect from "../../components/review/KeywordSelect";
import ReviewCompleteModal from "../../components/review/ReviewCompleteModal";
import ReviewWrite from "../../components/review/ReviewWrite";
import { useCreateReview } from "../../hooks/api/useCreateReview";
import { useStoreDetail } from "../../hooks/api/useStoreDetail";
import { useUpdateReview } from "../../hooks/api/useUpdateReview";
import type { StoreApiErrorResponse, StoreReview } from "../../api/stores";
import { REVIEW_KEYWORDS } from "../../constants/reviews";

export default function AddReviewPage() {
  const { storeId = "", reviewId } = useParams<{ storeId: string; reviewId?: string }>();
  const location = useLocation();
  const reviewFromState = (location.state as { review?: StoreReview } | null)?.review;
  const isEdit = Boolean(reviewId);
  const review = isEdit && reviewFromState?.id === Number(reviewId) ? reviewFromState : null;
  const existingImages = review?.thumbnails.length ? review.thumbnails : (review?.images ?? []);
  const [score, setScore] = useState(review?.rating ?? 0);
  const [selectedKeywordIds, setSelectedKeywordIds] = useState<number[]>(review?.keywords ?? []);
  const [content, setContent] = useState(review?.content ?? "");
  const [images, setImages] = useState<File[]>([]);
  const [formError, setFormError] = useState<string | null>(null);
  const storeDetailQuery = useStoreDetail(storeId);
  const createReviewMutation = useCreateReview();
  const updateReviewMutation = useUpdateReview();
  const navigate = useNavigate();

  const handleKeywordToggle = (keywordId: number) => {
    setSelectedKeywordIds((current) => (current.includes(keywordId) ? current.filter((id) => id !== keywordId) : current.length < 5 ? [...current, keywordId] : current));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    if (score === 0 || !content.trim() || (!isEdit && selectedKeywordIds.length === 0)) {
      setFormError(isEdit ? "별점과 후기를 모두 입력해주세요." : "별점, 키워드, 후기를 모두 입력해주세요.");
      return;
    }

    if (isEdit && review && reviewId) {
      updateReviewMutation.mutate(
        {
          storeId,
          reviewId: Number(reviewId),
          rating: score,
          content: content.trim(),
          deleteKeywordIds: review.keywords.filter((keywordId) => !selectedKeywordIds.includes(keywordId)),
          keywordIds: selectedKeywordIds.filter((keywordId) => !review.keywords.includes(keywordId)),
          reviewImages: images,
        },
        {
          onError: (error) => {
            if (isAxiosError(error) && error.response?.status === 401) navigate("/", { replace: true });
          },
        },
      );
      return;
    }

    createReviewMutation.mutate(
      { storeId, rating: score, content: content.trim(), keywordIds: selectedKeywordIds, reviewImages: images },
      {
        onError: (error) => {
          if (isAxiosError(error) && error.response?.status === 401) navigate("/", { replace: true });
        },
      },
    );
  };

  const mutationError = isEdit ? updateReviewMutation.error : createReviewMutation.error;
  const mutationIsError = isEdit ? updateReviewMutation.isError : createReviewMutation.isError;
  const errorMessage = isEdit ? "리뷰 수정에 실패했습니다." : "리뷰 등록에 실패했습니다.";
  const requestError = isAxiosError<StoreApiErrorResponse>(mutationError)
    ? (mutationError.response?.data.message ?? errorMessage)
    : mutationIsError
      ? errorMessage
      : null;

  if (isEdit && !review) return <PageStatus message="수정할 리뷰 정보를 찾을 수 없습니다." showBackButton />;
  if (storeDetailQuery.isPending) return <PageStatus message="가게 정보를 불러오는 중입니다." isLoading />;
  if (storeDetailQuery.isError || !storeDetailQuery.data) return <PageStatus message="가게 정보를 불러오지 못했습니다." showBackButton={storeDetailQuery.isError} />;

  return (
    <main className="p-4 flex flex-col gap-5 md:w-213.5 md:mx-auto md:p-6 md:gap-8 md:text-lg md:font-extrabold md:leading-5 md:text-white">
      <PageHeader title={`${storeDetailQuery.data.bakery.name} 리뷰 ${isEdit ? "수정" : "작성"}`} />
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <AddReviewRating score={score} onScoreChange={setScore} />
        <KeywordSelect keywords={REVIEW_KEYWORDS} selectedKeywordIds={selectedKeywordIds} onKeywordToggle={handleKeywordToggle} />
        <ReviewWrite content={content} onContentChange={setContent} />
        <AddImages images={images} existingImages={existingImages} onImagesChange={setImages} />
        {(formError || requestError) && <p className="text-center text-red typo-body-04">{formError ?? requestError}</p>}
        <AddReviewButton isPending={isEdit ? updateReviewMutation.isPending : createReviewMutation.isPending} isEdit={isEdit} />
      </form>
      {(isEdit ? updateReviewMutation.isSuccess : createReviewMutation.isSuccess) && <ReviewCompleteModal storeId={storeId} isEdit={isEdit} />}
    </main>
  );
}
