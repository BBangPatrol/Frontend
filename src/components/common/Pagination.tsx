import nextPageIcon from "@/assets/images/reviewDetailPage/next-page.svg";
import prevPageIcon from "@/assets/images/reviewDetailPage/prev-page.svg";

type PaginationProps = {
  page: number;
  totalPages?: number;
  hasNext?: boolean;
  onPageChange: (page: number) => void;
};

export default function Pagination({ page, totalPages, hasNext = false, onPageChange }: PaginationProps) {
  const pageCount = totalPages ?? page + (hasNext ? 1 : 0);
  const isLastPage = totalPages != null ? page === totalPages : !hasNext;

  if (pageCount <= 1) return null;

  return (
    <div className="flex justify-center gap-3">
      <button type="button" aria-label="이전 페이지" disabled={page === 1} className="size-8 flex items-center justify-center disabled:opacity-30" onClick={() => onPageChange(page - 1)}>
        <img src={prevPageIcon} alt="" />
      </button>
      {Array.from({ length: pageCount }).map((_, index) => {
        const pageNumber = index + 1;

        return (
          <button
            key={pageNumber}
            type="button"
            aria-current={page === pageNumber ? "page" : undefined}
            className={`size-8 typo-body-02 ${page === pageNumber ? "text-sub-01" : "text-black-01"}`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}
      <button type="button" aria-label="다음 페이지" disabled={isLastPage} className="size-8 flex items-center justify-center disabled:opacity-30" onClick={() => onPageChange(page + 1)}>
        <img src={nextPageIcon} alt="" />
      </button>
    </div>
  );
}
