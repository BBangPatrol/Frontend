import { Link } from "react-router-dom";
import DrawPoint from "./DrawPoint";
import leftArrowIcon from "@/assets/images/reviewDetailPage/left-arrow.svg";
import headerIcon from "@/assets/images/drawPage/header-star.svg";

export default function MobileDrawHeader() {
  return (
    <section className="flex flex-col gap-3">
      <Link to="/collection" className="flex gap-1">
        <img src={leftArrowIcon} />
        <p className="text-gray-02 typo-body-03">돌아가기</p>
      </Link>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <img src={headerIcon} alt="" />
            <h2 className="typo-head-02 text-black-01">수집품 뽑기</h2>
          </div>
          <DrawPoint />
        </div>
        <p className="text-gray-01 typo-body-04">100P를 사용해 새로운 빵집 수집품을 획득하세요!</p>
      </div>
    </section>
  );
}
