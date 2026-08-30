import tempCollectible from "@/assets/images/drawPage/temp-collectible.png";

export default function DrawResult({ onClose }: { onClose: () => void }) {
  return (
    <section className="fixed inset-0 bg-white/85 flex justify-center items-center">
      <div className="flex flex-col gap-6 md:gap-8 p-8 bg-white rounded-4xl shadow-2xl">
        <DrawResultItemImage />
        <DrawResultExplain />
        <DrawResultButtons onClose={onClose} />
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
      <p className="px-2 py-1 bg-label-bg-02 rounded-2xl text-label-text-02 typo-body-04 md:text-sm!">희귀도: 희귀</p>
      <h3 className="typo-head-03 md:text-2xl!">
        <span className="text-label-text-02">크림빵이 좋은 꿈돌이</span> 획득!
      </h3>
      <div className="text-gray-02 typo-sub-02 md:text-sm!">
        <p>새로운 수집품을 획득했습니다!</p>
        <p>수집품 도감에서 확인해보세요.</p>
      </div>
    </div>
  );
}

function DrawResultButtons({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-3">
      <button className="py-3 bg-sub-01 rounded-xl shadow-[0px_4px_6px_-1px_rgba(198,139,89,0.20)] text-white typo-head-05 md:order-2 md:flex-1">도감 확인</button>
      <button onClick={onClose} className="py-3 bg-gray-04 rounded-xl text-gray-01 typo-head-05 md:order-1 md:flex-1">
        닫기
      </button>
    </div>
  );
}
