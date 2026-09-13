import { isAxiosError } from "axios";
import { useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import type { StoreApiErrorResponse } from "../../api/stores";
import { REVIEW_KEYWORDS } from "../../constants/reviews";

export default function AddReviewPage() {
  const [score, setScore] = useState(0);
  const [selectedKeywordIds, setSelectedKeywordIds] = useState<number[]>([]);
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [formError, setFormError] = useState<string | null>(null);
  const { storeId = "" } = useParams<{ storeId: string }>();
  const storeDetailQuery = useStoreDetail(storeId);
  const createReviewMutation = useCreateReview();
  const navigate = useNavigate();

  const handleKeywordToggle = (keywordId: number) => {
    setSelectedKeywordIds((current) => (current.includes(keywordId) ? current.filter((id) => id !== keywordId) : current.length < 5 ? [...current, keywordId] : current));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    if (score === 0 || selectedKeywordIds.length === 0 || !content.trim()) {
      setFormError("별점, 키워드, 후기를 모두 입력해주세요.");
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

  const requestError = isAxiosError<StoreApiErrorResponse>(createReviewMutation.error)
    ? (createReviewMutation.error.response?.data.message ?? "리뷰 등록에 실패했습니다.")
    : createReviewMutation.isError
      ? "리뷰 등록에 실패했습니다."
      : null;

  if (storeDetailQuery.isPending) return <PageStatus message="가게 정보를 불러오는 중입니다." />;
  if (storeDetailQuery.isError || !storeDetailQuery.data) return <PageStatus message="가게 정보를 불러오지 못했습니다." showBackButton={storeDetailQuery.isError} />;

  return (
    <main className="p-4 flex flex-col gap-5 md:w-213.5 md:mx-auto md:p-6 md:gap-8 md:text-lg md:font-extrabold md:leading-5 md:text-white">
      <PageHeader title={`${storeDetailQuery.data.bakery.name} 리뷰 작성`} />
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <AddReviewRating score={score} onScoreChange={setScore} />
        <KeywordSelect keywords={REVIEW_KEYWORDS} selectedKeywordIds={selectedKeywordIds} onKeywordToggle={handleKeywordToggle} />
        <ReviewWrite content={content} onContentChange={setContent} />
        <AddImages images={images} onImagesChange={setImages} />
        {(formError || requestError) && <p className="text-center text-red typo-body-04">{formError ?? requestError}</p>}
        <AddReviewButton isPending={createReviewMutation.isPending} />
      </form>
      {createReviewMutation.isSuccess && <ReviewCompleteModal storeId={storeId} />}
    </main>
  );
}
