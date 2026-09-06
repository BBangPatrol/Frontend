import Review from "./Review";
import downArrowIcon from "@/assets/images/reviewDetailPage/down_arrow.svg";

type ReviewDetailListProps = {
  sort: string;
  onSortChange: (sort: string) => void;
};

export default function ReviewDetailList({ sort, onSortChange }: ReviewDetailListProps) {
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
            className="appearance-none typo-body-03 border border-gray-04 px-3 py-2 pr-9 cursor-pointer rounded-2xl shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)] md:text-base! md:font-normal! md:leading-normal! md:shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)]"
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
