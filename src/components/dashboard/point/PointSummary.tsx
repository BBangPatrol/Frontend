import giftIcon from "@/assets/images/pointPage/gift.svg";
import { Link } from "react-router-dom";

type PointSummaryProps = {
  isMobile: boolean;
  point: number;
};

export default function PointSummary({ isMobile, point }: PointSummaryProps) {
  return (
    <section className="p-5 flex flex-col gap-3 rounded-2xl border border-main-05 bg-yellow-01">
      <div className="flex flex-col gap-1">
        <h3 className={isMobile ? "typo-body-03" : "typo-body-02"}>현재 보유 포인트</h3>
        <p className="typo-head-01 text-black-01">
          {point.toLocaleString("ko-KR")}
          <span className="typo-head-04 text-gray-02">P</span>
        </p>
      </div>
      {isMobile && (
        <Link to="/collection/draw" className="flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-sub-01 shadow-[0px_4px_6px_-1px_rgba(198,139,89,0.20)]">
          <img src={giftIcon} alt="" />
          <p className="typo-head-05 text-white">뽑기 하러가기</p>
        </Link>
      )}
    </section>
  );
}
