import emptyStarIcon from "@/assets/images/ReviewDetailPage/empty-star.svg";
import fullStarIcon from "@/assets/images/ReviewDetailPage/full-star.svg";
import downArrowIcon from "@/assets/images/reviewDetailPage/down_arrow.svg";
import { useState } from "react";
import Review from "../components/review/Review";
import PageHeader from "../components/common/PageHeader";

const tempPercentage = [
  [5, 85],
  [4, 10],
  [3, 3],
  [2, 1],
  [1, 1],
];

export default function ReviewDetailPage() {
  const [sort, setSort] = useState("latest");

  return (
    <TempContainer>
      <PageHeader
        title="성심당 본점 리뷰"
        subTitle={
          <>
            총 <span className="text-black-01">1,234</span>개의 리뷰가 있습니다.
          </>
        }
      />
      <Rating />
      <Reviews setSort={setSort} />
    </TempContainer>
  );
}

function Rating() {
  return (
    <section className="bg-yellow-02 flex p-6 gap-8 w-full rounded-3xl border border-main-05">
      <div className="flex flex-col justify-center items-center pl-12 pr-14">
        <p className="text-black-01 text-5xl font-bold mb-2">4.8</p>
        <div className="flex gap-1 mb-1">
          <img src={fullStarIcon} />
          <img src={fullStarIcon} />
          <img src={fullStarIcon} />
          <img src={fullStarIcon} />
          <img src={emptyStarIcon} />
        </div>
        <p className="text-gray-02  text-sm font-bold">1,234명 참여</p>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        {tempPercentage.map((value) => {
          const percentage = Math.min(100, Math.max(0, value[1]));

          return (
            <div key={value[0]} className="flex gap-4 w-full items-center">
              <p className="w-6 text-gray-01 text-sm font-bold">{value[0]}점</p>
              <div className="flex-1 h-2 overflow-hidden rounded-full bg-gray-03">
                <div className="h-full rounded-full bg-sub-01" style={{ width: `${percentage}%` }} />
              </div>
              <p className="w-8.5 text-right text-gray-02 text-sm font-bold">{value[1]}%</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Reviews({ setSort }: { setSort: React.Dispatch<React.SetStateAction<string>> }) {
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
            className="appearance-none border border-gray-04 px-3 py-2 pr-9 cursor-pointer rounded-2xl shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.10)] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)]"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="latest">최신순</option>
            <option value="oldest">오래된순</option>
            <option value="rating-desc">평점 높은순</option>
            <option value="rating-asc">평점 낮은순</option>
          </select>

          <img src={downArrowIcon} alt="" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Review isDetail={true} starRating={4} />
        <Review isDetail={true} starRating={5} />
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

function TempContainer({ children }: { children: React.ReactNode }) {
  return <main className="mx-auto w-4xl px-6 py-8 flex flex-col justify-start items-start gap-6">{children}</main>;
}
