import { useState } from "react";
import type { DrawCollectibleResult } from "../../api/collectibles";
import collectibleImage from "../../assets/images/drawPage/temp-collectible.png";
import OriginalDrawResult from "../../components/collection/OriginalDrawResult";
import { COLLECTIBLE_RANK_STYLES } from "../../constants/collectibles";
import type { CollectibleRank } from "../../types/collectibles";

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

export default function OriginalDrawResultTestPage() {
  const [rank, setRank] = useState<CollectibleRank | null>(null);
  const [imageStatus, setImageStatus] = useState<"loading" | "loaded" | "error">("loading");

  const openPreview = (selectedRank: CollectibleRank) => {
    setImageStatus("loading");
    setRank(selectedRank);
  };

  return (
    <main className="min-h-dvh px-5 py-10 bg-gray-04">
      <section className="max-w-2xl mx-auto flex flex-col gap-8">
        <header className="flex flex-col gap-2">
          <p className="text-sub-01 typo-body-04">Git 기준 원본 백업</p>
          <h1 className="typo-head-02">기존 뽑기 결과 테스트</h1>
          <p className="text-gray-02 typo-body-03">현재 이펙트 작업 전의 카드와 최소 등장 애니메이션을 확인할 수 있습니다.</p>
        </header>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {RANKS.map((itemRank) => {
            const rankStyle = COLLECTIBLE_RANK_STYLES[itemRank];

            return (
              <button
                key={itemRank}
                type="button"
                onClick={() => openPreview(itemRank)}
                className={`flex items-center justify-between p-5 bg-white border-2 ${rankStyle.border} rounded-2xl shadow-sm transition-transform hover:-translate-y-1`}
              >
                <span className="typo-head-05">{rankStyle.label} 등급</span>
                <span className={`px-3 py-1 rounded-full typo-body-04 ${rankStyle.badge}`}>원본 확인</span>
              </button>
            );
          })}
        </div>
      </section>

      {rank && (
        <OriginalDrawResult
          result={createPreviewResult(rank)}
          imageStatus={imageStatus}
          onImageLoad={() => setImageStatus("loaded")}
          onImageError={() => setImageStatus("error")}
          onClose={() => setRank(null)}
        />
      )}
    </main>
  );
}
