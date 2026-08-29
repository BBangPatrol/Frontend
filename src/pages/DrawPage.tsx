import leftArrowIcon from "@/assets/images/ReviewDetailPage/left-arrow.svg";
import { Link } from "react-router";
import headerIcon from "@/assets/images/drawPage/header-star.svg";
import pointIcon from "@/assets/images/drawPage/point.svg";
import yellowStar from "@/assets/images/drawPage/yellow-star.svg";
import pinkStar from "@/assets/images/drawPage/pink-star.svg";
import orangeStar from "@/assets/images/drawPage/orange-star.svg";
import giftIcon from "@/assets/images/drawPage/gift.svg";
import { useState } from "react";
import DrawResult from "../components/draw/DrawResult";

export default function DrawPage() {
  const [draw, setDraw] = useState(false);

  return (
    <TempContainer>
      <DrawHeader />
      <DrawMainImage />
      <button onClick={() => setDraw(true)} className="py-3 bg-sub-01 rounded-xl shadow-[0px_10px_15px_-3px_rgba(198,139,89,0.30)] text-white text-sm font-extrabold">
        100P로 뽑기
      </button>
      {draw && <DrawResult setOpenModal={setDraw} />}
    </TempContainer>
  );
}

function DrawHeader() {
  return (
    <section className="flex flex-col gap-3 lg:gap-4">
      <Link to={"/detail"} className="flex gap-1">
        <img src={leftArrowIcon} />
        <p className=" text-gray-02 text-sm font-bold">돌아가기</p>
      </Link>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <img src={headerIcon} alt="" />
            <h2 className="text-xl font-extrabold text-black-01 lg:text-3xl lg:font-extrabold">수집품 뽑기</h2>
          </div>
          <div className="flex gap-2 items-center">
            <div>
              <img src={pointIcon} />
            </div>
            <p className="text-sub-01 text-base font-extrabold">1250 P</p>
          </div>
        </div>
        <p className="text-gray-01 text-xs lg:text-gray-02 lg:text-base font-bold">100P를 사용해 새로운 빵집 수집품을 획득하세요!</p>
      </div>
    </section>
  );
}

function DrawMainImage() {
  return (
    <section className="flex justify-center items-center p-10">
      <div className="relative size-36 bg-white rounded-[20.44px] shadow-[0px_17px_21px_-4px_rgba(0,0,0,0.10)] border-[3.41px] border-sub-01 flex justify-center items-center">
        <img src={yellowStar} className="absolute right-36 bottom-36" />
        <img src={pinkStar} className="absolute left-40 top-17" />
        <img src={orangeStar} className="absolute left-35 top-30" />
        <img src={giftIcon} />
        <p className="absolute py-1 px-2.5 bg-[#101828] rounded-full text-white text-[10px] font-bold top-32">MYSTERY</p>
      </div>
    </section>
  );
}

function TempContainer({ children }: { children: React.ReactNode }) {
  return <main className="p-4 flex flex-col gap-11">{children}</main>;
}
