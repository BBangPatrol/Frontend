import { useNavigate } from "react-router";
import DrawLink from "./DrawLink";
import collectibleHeaderIcon from "@/assets/images/collectiblePage/gift.svg";
import leftArrowIcon from "@/assets/images/reviewDetailPage/left-arrow.svg";

export default function DesktopCollectionHeader() {
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
            <img src={collectibleHeaderIcon} alt="" />
            <h2 className="text-3xl font-extrabold text-black-01">수집품 도감</h2>
          </div>
          <p className="text-gray-02 typo-body-02">포인트로 뽑기를 진행하고 나만의 수집품 도감을 완성해보세요!</p>
        </div>
        <DrawLink />
      </div>
    </section>
  );
}
