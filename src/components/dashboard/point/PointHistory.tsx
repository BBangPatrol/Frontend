import type { PointHistoryItem } from "../../../api/users";
import Pagination from "../../common/Pagination";

type PointHistoryProps = {
  isMobile: boolean;
  history: PointHistoryItem[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function formatDate(date: string) {
  return date.replace("T", " ").replaceAll("-", ".").slice(0, 16);
}

export default function PointHistory({ isMobile, history, page, totalPages, onPageChange }: PointHistoryProps) {
  return (
    <section className="flex flex-col gap-3">
      {history.length > 0 ? (
        history.map((item, index) => {
          const isEarned = item.type === "earn";

          return (
            <div key={`${item.date}-${index}`} className="px-5 py-4 flex items-center justify-between border border-gray-04 rounded-xl">
              <div className={`flex flex-col ${isMobile ? "gap-1" : "gap-1.5"}`}>
                <p className={isMobile ? "typo-head-05" : "typo-head-04"}>{item.content}</p>
                <p className={`${isMobile ? "typo-sub-02" : "typo-sub-01"} text-gray-02`}>{formatDate(item.date)}</p>
              </div>
              <div className={`${isMobile ? "typo-body-02" : "typo-body-01"} ${isEarned ? "text-green" : "text-red"}`}>
                {isEarned ? "+" : "-"}
                {Math.abs(item.amount).toLocaleString("ko-KR")}P
              </div>
            </div>
          );
        })
      ) : (
        <p className="py-8 text-center text-gray-02 typo-body-03">포인트 내역이 없습니다.</p>
      )}
      <Pagination page={page + 1} totalPages={totalPages} onPageChange={(pageNumber) => onPageChange(pageNumber - 1)} />
    </section>
  );
}
