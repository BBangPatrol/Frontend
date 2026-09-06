import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import ReviewDetailList from "../../components/review/ReviewDetailList";
import ReviewRatingSummary from "../../components/review/ReviewRatingSummary";

const ratingPercentages = [
  [5, 85],
  [4, 10],
  [3, 3],
  [2, 1],
  [1, 1],
];

export default function ReviewDetailPage() {
  const [sort, setSort] = useState("latest");

  return (
    <main className="p-4 flex flex-col gap-5 md:mx-auto md:w-4xl md:px-6 md:py-8 md:gap-6 md:justify-start md:items-start">
      <PageHeader
        title="성심당 본점 리뷰"
        subTitle={
          <>
            총 <span className="text-black-01">1,234</span>개의 리뷰가 있습니다.
          </>
        }
      />
      <ReviewRatingSummary ratingPercentages={ratingPercentages} />
      <ReviewDetailList sort={sort} onSortChange={setSort} />
    </main>
  );
}
