import giftImage from "@/assets/images/dashboardPage/gift.svg";
import rightBrownArrow from "@/assets/images/dashboardPage/right-brown-arrow.svg";
import { Link } from "react-router-dom";
import type { DashboardData } from "../../api/users";

type CollectiblesCardProps = {
  isMobile: boolean;
  collectionBooks: DashboardData["collectionBooks"];
};

export default function CollectiblesCard({ isMobile, collectionBooks }: CollectiblesCardProps) {
  const itemLimit = isMobile ? 3 : 8;
  const visibleItems = collectionBooks.items.slice(0, itemLimit);
  const emptyItemCount = itemLimit - visibleItems.length;

  return (
    <Link to="/dashboard/collection">
      <section className="flex flex-col gap-4 p-5 bg-yellow-02 border border-main-05 rounded-xl md:rounded-4xl md:p-7 md:gap-5">
        <div className="flex gap-1.5 items-center">
          <div>
            <img className="md:size-7" src={giftImage} />
          </div>
          <h3 className={`${isMobile ? "typo-head-04" : "typo-head-02"}`}>수집품 도감</h3>
          <div className={`flex text-sub-02 ml-auto ${isMobile ? "typo-sub-02" : "typo-body-04"}`}>
            전체보기 <img src={rightBrownArrow} />
          </div>
        </div>
        <div className="flex flex-col gap-3 md:gap-4">
          <div className="flex flex-col gap-1 md:gap-2">
            <p className={isMobile ? "typo-head-04" : "typo-head-03"}>{collectionBooks.collected}개의 수집품을 모았어요</p>
            <p className={`${isMobile ? "typo-sub-02" : "typo-body-03"} text-gray-02`}>수집품 뽑기로 {collectionBooks.total}가지의 수집품을 모아보세요</p>
          </div>
          <div className="grid grid-cols-3 grid-rows-1 gap-3 md:grid-cols-4 md:grid-rows-2 md:gap-2">
            {visibleItems.map((item) => (
              <div
                key={item.collectibleId}
                className="flex aspect-square items-center justify-center overflow-hidden rounded-xl border-2 border-gray-03 bg-white p-2 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)] md:rounded-lg"
              >
                <img className="size-full object-contain" src={item.image} alt={item.name} />
              </div>
            ))}
            {Array.from({ length: emptyItemCount }, (_, index) => (
              <div
                key={`empty-${index}`}
                className="flex aspect-square items-center justify-center overflow-hidden rounded-xl border-2 border-gray-03 bg-gray-05 p-2 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)] border-dashed md:rounded-lg text-2xl font-bold text-gray-03"
              >
                ?
              </div>
            ))}
          </div>
        </div>
      </section>
    </Link>
  );
}
