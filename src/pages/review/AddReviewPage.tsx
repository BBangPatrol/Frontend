import { useState } from "react";
import DesktopAddReviewPage from "../../components/review/desktop/DesktopAddReviewPage";
import { useResponsive } from "../../contexts/ResponsiveContext";
import MobileAddReviewPage from "../../components/review/mobile/MobileAddReviewPage";

const keywords = ["커피가 맛있어요", "디저트가 맛있어요", "메뉴가 다양해요", "가성비가 좋아요", "인테리어가 감성적이에요", "뷰가 좋아요", "조용해요"];

export default function AddReviewPage() {
  const [score, setScore] = useState(0);
  const { isMobile } = useResponsive();

  return isMobile ? <MobileAddReviewPage score={score} keywords={keywords} onScoreChange={setScore} /> : <DesktopAddReviewPage score={score} keywords={keywords} onScoreChange={setScore} />;
}
