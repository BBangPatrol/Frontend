import { useState } from "react";
import type { DrawCollectibleResult } from "../../api/collectibles";
import DrawResult from "../../components/collection/DrawResult";
import { COLLECTIBLE_RANK_STYLES } from "../../constants/collectibles";
import type { CollectibleRank } from "../../types/collectibles";
import collectibleImage from "../../assets/images/drawPage/temp-collectible.png";

type Preview = {
  rank: CollectibleRank;
  effectMode: "default" | "flashy";
};

const RANKS: CollectibleRank[] = ["NORMAL", "RARE", "EPIC", "LEGENDARY"];

function createPreviewResult(rank: CollectibleRank): DrawCollectibleResult {
  return {
    collectibleId: 0,
    name: `${COLLECTIBLE_RANK_STYLES[rank].label} 수집품`,
    rank,
    image: collectibleImage,
    duplicated: false,
    refundPoint: 0,
    currentPoint: 1200,
  };
}

export default function DrawEffectTestPage() {
  const [preview, setPreview] = useState<Preview | null>(null);
  const [imageStatus, setImageStatus] = useState<"loading" | "loaded" | "error">("loading");

  const openPreview = (rank: CollectibleRank, effectMode: Preview["effectMode"] = "default") => {
    setImageStatus("loading");
    setPreview({ rank, effectMode });
  };

  return (
    <main className="min-h-dvh px-5 py-10 bg-gray-04">
      <section className="max-w-2xl mx-auto flex flex-col gap-8">
        <header className="flex flex-col gap-2">
          <p className="text-sub-01 typo-body-04">개발용 미리보기</p>
          <h1 className="typo-head-02">뽑기 결과 이펙트 테스트</h1>
          <p className="text-gray-02 typo-body-03">
            버튼을 눌러 등급별 등장 애니메이션과 카드 반짝임을 확인할 수 있습니다.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {RANKS.map((rank) => {
            const rankStyle = COLLECTIBLE_RANK_STYLES[rank];

            return (
              <button
                key={rank}
                type="button"
                onClick={() => openPreview(rank)}
                className={`flex items-center justify-between p-5 bg-white border-2 ${rankStyle.border} rounded-2xl shadow-sm transition-transform hover:-translate-y-1`}
              >
                <span className="typo-head-05">{rankStyle.label} 등급</span>
                <span className={`px-3 py-1 rounded-full typo-body-04 ${rankStyle.badge}`}>
                  미리보기
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => openPreview("LEGENDARY", "flashy")}
          className="p-5 bg-gradient-to-r from-amber-400 via-pink-500 to-violet-500 rounded-2xl text-white typo-head-04 shadow-lg transition-transform hover:-translate-y-1"
        >
          화려한 전설 이펙트 확인
        </button>
      </section>

      {preview && (
        <DrawResult
          result={createPreviewResult(preview.rank)}
          effectMode={preview.effectMode}
          imageStatus={imageStatus}
          onImageLoad={() => setImageStatus("loaded")}
          onImageError={() => setImageStatus("error")}
          onClose={() => setPreview(null)}
        />
      )}
    </main>
  );
}
