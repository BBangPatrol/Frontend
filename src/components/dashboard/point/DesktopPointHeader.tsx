import { Link, useNavigate } from "react-router-dom";
import pointIcon from "@/assets/images/pointPage/coin.svg";
import leftArrowIcon from "@/assets/images/reviewDetailPage/left-arrow.svg";
import giftIcon from "@/assets/images/pointPage/gift.svg";

export default function DesktopPointHeader() {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col gap-4">
      <button onClick={() => navigate(-1)} className="flex gap-1">
        <img src={leftArrowIcon} />
        <p className="text-gray-02 typo-body-03">돌아가기</p>
      </button>
      <div className="flex">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <img src={pointIcon} alt="" />
            <h2 className="text-3xl font-extrabold text-black-01">포인트 내역</h2>
          </div>
          <p className="text-gray-02 typo-body-02">포인트 내역을 확인하고 모은 포인트로 수집품을 뽑아보세요!</p>
        </div>
        <Link
          to="/collection/draw"
          className="flex items-center gap-1 px-3 py-2 bg-sub-01 rounded-xl shadow-[0px_4px_6px_-1px_rgba(198,139,89,0.20)] md:ml-auto md:gap-2 md:px-8 md:py-4 md:self-center md:rounded-2xl"
        >
          <img src={giftIcon} className="size-4 md:size-5" />
          <p className="text-white typo-head-05 md:text-lg! md:leading-5!">뽑기 하러가기</p>
        </Link>
      </div>
    </section>
  );
}
