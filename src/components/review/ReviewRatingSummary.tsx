import emptyStarIcon from "@/assets/images/reviewDetailPage/empty-star.svg";
import fullStarIcon from "@/assets/images/reviewDetailPage/full-star.svg";

export default function ReviewRatingSummary({ ratingPercentages }: { ratingPercentages: number[][] }) {
  return (
    <section className="bg-yellow-02 flex flex-col p-4 gap-4 w-full rounded-3xl border border-main-05 md:flex-row md:p-6 md:gap-8">
      <div className="flex flex-col justify-center items-center pl-12 pr-14">
        <p className="text-black-01 text-3xl font-extrabold mb-2 md:text-5xl md:font-bold">4.8</p>
        <div className="flex gap-1 mb-1 h-4 md:h-auto">
          <img src={fullStarIcon} />
          <img src={fullStarIcon} />
          <img src={fullStarIcon} />
          <img src={fullStarIcon} />
          <img src={emptyStarIcon} />
        </div>
        <p className="text-gray-02 typo-body-04 md:text-sm!">1,234명 참여</p>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        {ratingPercentages.map(([rating, value]) => {
          const percentage = Math.min(100, Math.max(0, value));

          return (
            <div key={rating} className="flex gap-4 w-full items-center">
              <p className="w-6 text-gray-01 typo-body-04 md:text-sm!">{rating}점</p>
              <div className="flex-1 h-2 overflow-hidden rounded-full bg-gray-03">
                <div className="h-full rounded-full bg-sub-01" style={{ width: `${percentage}%` }} />
              </div>
              <p className="w-8.5 text-right text-gray-02 typo-body-04 md:text-sm!">{value}%</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
