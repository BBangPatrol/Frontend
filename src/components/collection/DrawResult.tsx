import "@/styles/draw.css";
import { Link } from "react-router-dom";
import type { DrawCollectibleResult } from "../../api/collectibles";
import { COLLECTIBLE_RANK_STYLES } from "../../constants/collectibles";

type DrawResultProps = {
  result: DrawCollectibleResult;
  onClose: () => void;
  imageStatus: "loading" | "loaded" | "error";
  onImageLoad: () => void;
  onImageError: () => void;
};

export default function DrawResult({ result, onClose, imageStatus, onImageLoad, onImageError }: DrawResultProps) {
  const isReady = imageStatus !== "loading";
  return (
    <section aria-hidden={!isReady} className={`${isReady ? "draw-result-overlay" : "invisible pointer-events-none"} fixed inset-0 z-50 px-5 bg-white/85 flex justify-center items-center`}>
      <div className="draw-result-card w-full max-w-80 md:max-w-96 flex flex-col gap-6 md:gap-8 p-8 bg-white rounded-4xl shadow-2xl">
        <DrawResultItemImage result={result} imageStatus={imageStatus} onImageLoad={onImageLoad} onImageError={onImageError} />
        <DrawResultExplain result={result} />
        <DrawResultButtons onClose={onClose} />
      </div>
    </section>
  );
}

function DrawResultItemImage({ result, imageStatus, onImageLoad, onImageError }: Omit<DrawResultProps, "onClose">) {
  return (
    <div className="relative flex justify-center items-center">
      <div aria-hidden="true" className="absolute size-40 opacity-80 bg-indigo-50 rounded-xl blur-xl" />
      {imageStatus === "error" ? <p className="relative size-40 flex items-center justify-center text-gray-02 typo-sub-02">이미지를 불러오지 못했어요</p> : (
      <img
        className="draw-result-item size-40 z-10 object-contain"
        src={result.image}
        alt={result.name}
        onLoad={onImageLoad}
        onError={onImageError}
      />
      )}
    </div>
  );
}

function DrawResultExplain({ result }: { result: DrawCollectibleResult }) {
  const rankStyle = COLLECTIBLE_RANK_STYLES[result.rank];

  return (
    <div className="draw-result-details flex flex-col gap-3 items-center">
      <p
        className={`px-2 py-1 rounded-2xl typo-body-04 md:text-sm! ${rankStyle.badge}`}
      >
        희귀도: {rankStyle.label}
      </p>
      <h3 className="typo-head-03 md:text-2xl!">
        <span className="text-label-text-02">{result.name}</span> 획득!
      </h3>
      <div className="text-center text-gray-02 typo-sub-02 md:text-sm!">
        {result.duplicated ? (
          <p>중복 수집품으로 {result.refundPoint}P가 반환되었습니다.</p>
        ) : (
          <p>새로운 수집품을 획득했습니다!</p>
        )}
        <p>현재 포인트는 {result.currentPoint}P입니다.</p>
      </div>
    </div>
  );
}

function DrawResultButtons({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-3">
      <Link
        to="/dashboard/collection"
        className="py-3 text-center bg-sub-01 rounded-xl shadow-[0px_4px_6px_-1px_rgba(198,139,89,0.20)] text-white typo-head-05 md:order-2 md:flex-1"
      >
        도감 확인
      </Link>
      <button
        onClick={onClose}
        className="py-3 bg-gray-04 rounded-xl text-gray-01 typo-head-05 md:order-1 md:flex-1"
      >
        닫기
      </button>
    </div>
  );
}
