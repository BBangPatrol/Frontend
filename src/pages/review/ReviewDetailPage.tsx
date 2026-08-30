import { useState } from "react";
import DesktopReviewDetailPage from "../../components/review/desktop/DesktopReviewDetailPage";
import { useResponsive } from "../../contexts/ResponsiveContext";
import MobileReviewDetailPage from "../../components/review/mobile/MobileReviewDetailPage";

const ratingPercentages = [
  [5, 85],
  [4, 10],
  [3, 3],
  [2, 1],
  [1, 1],
];

export default function ReviewDetailPage() {
  const [sort, setSort] = useState("latest");
  const { isMobile } = useResponsive();

  return isMobile ? (
    <MobileReviewDetailPage ratingPercentages={ratingPercentages} sort={sort} onSortChange={setSort} />
  ) : (
    <DesktopReviewDetailPage ratingPercentages={ratingPercentages} sort={sort} onSortChange={setSort} />
  );
}
