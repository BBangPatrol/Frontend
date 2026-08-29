import type { Dispatch, SetStateAction } from "react";

import tempCollectible from "@/assets/images/drawPage/temp-collectible.png";

export default function DrawResult({ setOpenModal }: { setOpenModal: Dispatch<SetStateAction<boolean>> }) {
  return (
    <section className="fixed inset-0 bg-white/85 flex justify-center items-center">
      <div className="flex flex-col gap-6 p-8 bg-white rounded-[32px] shadow-2xl">
        <DrawResultItemImage />
        <DrawResultExplain />
        <DrawResultButtons />
      </div>
    </section>
  );
}

function DrawResultItemImage() {
  return (
    <div className="relative flex justify-center items-center">
      <div className="absolute size-40 opacity-80 bg-indigo-50 rounded-xl blur-xl" />
      <img className="size-40 z-10" src={tempCollectible} />
    </div>
  );
}

function DrawResultExplain() {
  return (
    <div className="flex flex-col gap-3 items-center">
      <p className="px-2 py-1 bg-label-bg-02 rounded-2xl text-label-text-02 text-xs font-bold">희귀도: 희귀</p>
      <h3 className="text-lg font-extrabold">
        <span className="text-label-text-02">크림빵이 좋은 꿈돌이</span> 획득!
      </h3>
      <div className="text-gray-02 text-xs font-normal">
        <p>새로운 수집품을 획득했습니다!</p>
        <p>수집품 도감에서 확인해보세요.</p>
      </div>
    </div>
  );
}

function DrawResultButtons() {
  return (
    <div className="flex flex-col gap-2">
      <button className="py-3 bg-sub-01 rounded-xl shadow-[0px_4px_6px_-1px_rgba(198,139,89,0.20)] text-white text-sm font-extrabold">도감 확인</button>
      <button className="py-3 bg-gray-04 rounded-xl text-gray-01 text-sm font-extrabold">닫기</button>
    </div>
  );
}
