import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import AddImages from "../../components/review/AddImages";
import AddReviewButton from "../../components/review/AddReviewButton";
import AddReviewRating from "../../components/review/AddReviewRating";
import KeywordSelect from "../../components/review/KeywordSelect";
import ReviewWrite from "../../components/review/ReviewWrite";

const keywords = ["커피가 맛있어요", "디저트가 맛있어요", "메뉴가 다양해요", "가성비가 좋아요", "인테리어가 감성적이에요", "뷰가 좋아요", "조용해요"];

export default function AddReviewPage() {
  const [score, setScore] = useState(0);

  return (
    <main className="p-4 flex flex-col gap-5 md:w-213.5 md:mx-auto md:p-6 md:gap-8 md:text-lg md:font-extrabold md:leading-5 md:text-white">
      <PageHeader title="하레하레 리뷰 작성" />
      <form className="flex flex-col gap-8">
        <AddReviewRating score={score} onScoreChange={setScore} />
        <KeywordSelect keywords={keywords} />
        <ReviewWrite />
        <AddImages />
        <AddReviewButton />
      </form>
    </main>
  );
}
