import emptyStarIcon from "@/assets/images/reviewDetailPage/empty-star.svg";
import fullStarIcon from "@/assets/images/reviewDetailPage/full-star.svg";
import downArrowIcon from "@/assets/images/reviewDetailPage/down_arrow.svg";
import Review from "../common/Review";
import PageHeader from "../../common/PageHeader";

type DesktopReviewDetailPageProps = {
  ratingPercentages: number[][];
  sort: string;
  onSortChange: (sort: string) => void;
};

export default function MobileReviewDetailPage({ ratingPercentages, sort, onSortChange }: DesktopReviewDetailPageProps) {
  return (
    <main className="p-4 flex flex-col gap-5">
      <PageHeader
        title="성심당 본점 리뷰"
        subTitle={
          <>
            총 <span className="text-black-01">1,234</span>개의 리뷰가 있습니다.
          </>
        }
      />
      <Rating ratingPercentages={ratingPercentages} />
      <Reviews sort={sort} onSortChange={onSortChange} />
    </main>
  );
}

function Rating({ ratingPercentages }: { ratingPercentages: number[][] }) {
  return (
    <section className="bg-yellow-02 flex flex-col p-4 gap-4 w-full rounded-3xl border border-main-05">
      <div className="flex flex-col justify-center items-center pl-12 pr-14">
        <p className="text-black-01 text-3xl font-extrabold mb-2">4.8</p>
        <div className="flex gap-1 mb-1 h-4">
          <img src={fullStarIcon} />
          <img src={fullStarIcon} />
          <img src={fullStarIcon} />
          <img src={fullStarIcon} />
          <img src={emptyStarIcon} />
        </div>
        <p className="text-gray-02 typo-body-04">1,234명 참여</p>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        {ratingPercentages.map(([rating, value]) => {
          const percentage = Math.min(100, Math.max(0, value));
          return (
            <div key={rating} className="flex gap-4 w-full items-center">
              <p className="w-6 text-gray-01 typo-body-04">{rating}점</p>
              <div className="flex-1 h-2 overflow-hidden rounded-full bg-gray-03">
                <div className="h-full rounded-full bg-sub-01" style={{ width: `${percentage}%` }} />
              </div>
              <p className="w-8.5 text-right text-gray-02 typo-body-04">{value}%</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Reviews({ sort, onSortChange }: { sort: string; onSortChange: (sort: string) => void }) {
  return (
    <section className="flex flex-col gap-8">
      <div className="flex justify-end">
        <label htmlFor="sort" className="sr-only">
          정렬 기준
        </label>
        <div className="relative">
          <select
            id="sort"
            name="sort"
            value={sort}
            className="appearance-none typo-body-03 border border-gray-04 px-3 py-2 pr-9 cursor-pointer rounded-2xl shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)]"
            onChange={(event) => onSortChange(event.target.value)}
          >
            <option value="latest">최신순</option>
            <option value="oldest">추천순</option>
            <option value="rating-desc">별점 높은순</option>
            <option value="rating-asc">별점 낮은순</option>
          </select>
          <img src={downArrowIcon} alt="" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Review isDetail starRating={4} />
        <Review isDetail starRating={5} />
      </div>
      <div>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
      </div>
    </section>
  );
}
