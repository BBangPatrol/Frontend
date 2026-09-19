import "@/styles/draw.css";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import type { DrawCollectibleResult } from "../../api/collectibles";
import { COLLECTIBLE_RANK_STYLES } from "../../constants/collectibles";

const CARD_SPARKLES = Array.from({ length: 20 }, (_, index) => ({
  left: 6 + ((index * 29) % 88),
  top: 5 + ((index * 43) % 90),
  delay: (index % 8) * 0.18,
  size: 5 + (index % 4) * 3,
}));

const FLASHY_COLORS = ["#FFD84D", "#FF5E9B", "#7C6CFF", "#45D9FF", "#72F2A7", "#FF8A3D"];
const FLASHY_CONFETTI = Array.from({ length: 42 }, (_, index) => ({
  left: (index * 37) % 100,
  delay: (index % 12) * 0.08,
  duration: 1.8 + (index % 7) * 0.16,
  drift: ((index % 9) - 4) * 24,
  rotation: 360 + (index % 5) * 180,
  color: FLASHY_COLORS[index % FLASHY_COLORS.length],
}));
const FLASHY_STARS = Array.from({ length: 18 }, (_, index) => ({
  left: 4 + ((index * 31) % 92),
  top: 6 + ((index * 47) % 88),
  delay: (index % 9) * 0.16,
  duration: 1.2 + (index % 5) * 0.22,
  size: 12 + (index % 4) * 6,
}));

type DrawResultProps = {
  result: DrawCollectibleResult;
  onClose: () => void;
  imageStatus: "loading" | "loaded" | "error";
  onImageLoad: () => void;
  onImageError: () => void;
  effectMode?: "default" | "flashy";
};

export default function DrawResult({ result, onClose, imageStatus, onImageLoad, onImageError, effectMode = "default" }: DrawResultProps) {
  const isReady = imageStatus !== "loading";
  return (
    <section
      aria-hidden={!isReady}
      data-rank={result.rank}
      className={`${isReady ? "draw-result-overlay" : "invisible pointer-events-none"} ${effectMode === "flashy" ? "draw-result-overlay--flashy" : ""} fixed inset-0 z-50 px-5 flex justify-center items-center`}
    >
      {effectMode === "flashy" && <DrawResultFlashyEffects />}
      <div className="draw-result-card relative z-10 w-full max-w-80 md:max-w-96 flex flex-col gap-6 md:gap-8 p-8 bg-white rounded-4xl shadow-2xl">
        <div aria-hidden="true" className="draw-result-card-shine" />
        <div aria-hidden="true" className="draw-result-card-sparkles">
          {CARD_SPARKLES.map((sparkle, index) => (
            <i
              key={index}
              style={{
                left: `${sparkle.left}%`,
                top: `${sparkle.top}%`,
                width: sparkle.size,
                height: sparkle.size,
                animationDelay: `${sparkle.delay}s`,
              }}
            />
          ))}
        </div>
        <DrawResultItemImage result={result} imageStatus={imageStatus} onImageLoad={onImageLoad} onImageError={onImageError} />
        <DrawResultExplain result={result} />
        <DrawResultButtons onClose={onClose} />
      </div>
    </section>
  );
}

function DrawResultFlashyEffects() {
  return (
    <div aria-hidden="true" className="draw-flashy-effects">
      <div className="draw-flashy-flash" />
      <div className="draw-flashy-aurora" />
      <div className="draw-flashy-rays" />
      <div className="draw-flashy-burst" />
      <div className="draw-flashy-ring" />
      <div className="draw-flashy-ring draw-flashy-ring-second" />
      <div className="draw-flashy-ring draw-flashy-ring-third" />
      {FLASHY_STARS.map((star, index) => (
        <i
          key={`star-${index}`}
          className="draw-flashy-star"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
      {FLASHY_CONFETTI.map((piece, index) => (
        <i
          key={index}
          className="draw-flashy-confetti"
          style={{
            left: `${piece.left}%`,
            color: piece.color,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            "--draw-flashy-x": `${piece.drift}px`,
            "--draw-flashy-rotate": `${piece.rotation}deg`,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}

function DrawResultItemImage({ result, imageStatus, onImageLoad, onImageError }: Omit<DrawResultProps, "onClose">) {
  return (
    <div className="draw-result-image-stage relative flex justify-center items-center">
      <div aria-hidden="true" className="draw-result-item-halo" />
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
        className={`draw-result-rank px-2 py-1 rounded-2xl typo-body-04 md:text-sm! ${rankStyle.badge}`}
      >
        희귀도: {rankStyle.label}
      </p>
      <h3 className="draw-result-title typo-head-03 md:text-2xl!">
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
    <div className="draw-result-buttons flex flex-col md:flex-row gap-2 md:gap-3">
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
