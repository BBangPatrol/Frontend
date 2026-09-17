import coinImage from "@/assets/images/dashboardPage/coin.svg";
import grayGiftImage from "@/assets/images/dashboardPage/gray-gift.svg";
import reviewImage from "@/assets/images/dashboardPage/review.svg";
import rightBlackArrow from "@/assets/images/dashboardPage/right-black-arrow.svg";
import { Link } from "react-router-dom";
import type { DashboardData } from "../../api/users";

type PointAndReviewCardProps = {
  isMobile: boolean;
  point: number;
  reviews: DashboardData["reviews"];
};

export default function PointAndReviewCard({ isMobile, point, reviews }: PointAndReviewCardProps) {
  return (
    <section className="flex gap-4 md:gap-3 lg:gap-4">
      <Link to="/dashboard/point" className="flex min-w-0 flex-col gap-4 p-5 flex-1 bg-white border border-main-05 rounded-xl md:rounded-4xl md:p-4 lg:gap-6 lg:p-7">
        <div className="flex gap-1.5 items-center">
          <img src={coinImage} className="size-5 shrink-0 lg:size-7" />
          <h3 className={`${isMobile ? "typo-head-04" : "text-base font-extrabold leading-5 lg:text-xl lg:leading-5.5"} whitespace-nowrap`}>포인트</h3>
          <img src={rightBlackArrow} className="ml-auto size-4 shrink-0" />
        </div>
        <div className="flex flex-col gap-3">
          <p>
            <span className="text-2xl font-extrabold">{point}</span>
            <span className="typo-head-04 text-gray-02 font-extrabold ml-0.5">P</span>
          </p>
          <div className="flex gap-1 items-center whitespace-nowrap">
            <img src={grayGiftImage} className="shrink-0" />
            <p className="text-sm font-bold text-gray-01 md:text-xs lg:text-sm">
              뽑기 <span className="text-sub-01">{Math.floor(point / 100)}</span>회 가능
            </p>
          </div>
        </div>
      </Link>
      <Link to="/" className="flex min-w-0 flex-col gap-4 p-5 flex-1 bg-white border border-main-05 rounded-xl md:rounded-4xl md:p-4 lg:gap-6 lg:p-7">
        <div className="flex gap-1.5 items-center">
          <img src={reviewImage} className="size-5 shrink-0 lg:size-7" />
          <h3 className={`${isMobile ? "typo-head-04" : "text-base font-extrabold leading-5 lg:text-xl lg:leading-5.5"} whitespace-nowrap`}>나의 리뷰</h3>
          <img src={rightBlackArrow} className="ml-auto size-4 shrink-0" />
        </div>
        <div className="flex flex-col gap-3">
          <p>
            <span className="text-2xl font-extrabold">{reviews.reviewCount}</span>
            <span className="typo-head-04 text-gray-02 font-extrabold ml-0.5">건</span>
          </p>
          <p className="text-sm font-bold text-gray-01">
            받은 좋아요 <span className="text-sub-01">{reviews.reviewLikes}</span>
          </p>
        </div>
      </Link>
    </section>
  );
}
