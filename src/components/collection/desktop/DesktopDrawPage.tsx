import leftArrowIcon from "@/assets/images/reviewDetailPage/left-arrow.svg";
import headerIcon from "@/assets/images/drawPage/header-star.svg";
import pointIcon from "@/assets/images/drawPage/point.svg";
import yellowStar from "@/assets/images/drawPage/yellow-star.svg";
import pinkStar from "@/assets/images/drawPage/pink-star.svg";
import orangeStar from "@/assets/images/drawPage/orange-star.svg";
import giftIcon from "@/assets/images/drawPage/gift.svg";
import { Link } from "react-router";
import DrawResult from "../common/DrawResult";

type MobileDrawPageProps = {
  isDrawResultOpen: boolean;
  onDraw: () => void;
  onCloseDrawResult: () => void;
};

export default function DesktopDrawPage({ isDrawResultOpen, onDraw, onCloseDrawResult }: MobileDrawPageProps) {
  return (
    <main className="max-w-104 mx-auto py-6 px-4 flex flex-col gap-12">
      <DrawHeader />
      <DrawContainer onDraw={onDraw} />
      {isDrawResultOpen && <DrawResult onClose={onCloseDrawResult} />}
    </main>
  );
}

function DrawHeader() {
  return (
    <section className="flex items-center">
      <Link to="/collection" className="flex gap-1 items-center">
        <img src={leftArrowIcon} />
        <p className=" text-gray-02 typo-body-03">돌아가기</p>
      </Link>
      <div className="ml-auto flex gap-2 items-center">
        <img src={pointIcon} />
        <p className="text-sub-01 typo-head-04">1250 P</p>
      </div>
    </section>
  );
}

function DrawContainer({ onDraw }: { onDraw: () => void }) {
  return (
    <section className="flex flex-col gap-13">
      <div className="flex flex-col items-center gap-3">
        <div className="flex gap-2">
          <img src={headerIcon} alt="" />
          <h2 className="text-3xl font-extrabold text-black-01">수집품 뽑기</h2>
        </div>
        <p className="text-gray-02 typo-body-02">100P를 사용해 새로운 빵집 수집품을 획득하세요!</p>
      </div>
      <DrawMainImage />
      <button onClick={onDraw} className="py-3 bg-sub-01 rounded-xl shadow-[0px_10px_15px_-3px_rgba(198,139,89,0.30)] text-white typo-head-03">
        100P로 뽑기
      </button>
    </section>
  );
}

function DrawMainImage() {
  return (
    <div className="flex justify-center items-center p-10">
      <div className="relative size-36 bg-white rounded-[20.44px] shadow-[0px_17px_21px_-4px_rgba(0,0,0,0.10)] border-[3.41px] border-sub-01 flex justify-center items-center">
        <img src={yellowStar} className="absolute right-36 bottom-36" />
        <img src={pinkStar} className="absolute left-40 top-17" />
        <img src={orangeStar} className="absolute left-35 top-30" />
        <img src={giftIcon} />
        <p className="absolute py-1 px-2.5 bg-[#101828] rounded-full text-white typo-body-05 top-32">MYSTERY</p>
      </div>
    </div>
  );
}
