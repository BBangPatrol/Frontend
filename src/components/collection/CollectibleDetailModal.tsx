import type { Collectible } from "../../api/collectibles";
import { COLLECTIBLE_RANK_STYLES } from "../../constants/collectibles";

type CollectibleDetailModalProps = {
  collectible: Collectible;
  onClose: () => void;
};

export default function CollectibleDetailModal({ collectible, onClose }: CollectibleDetailModalProps) {
  return (
    <section
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 z-9999 px-5 bg-black/30 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-80 p-5 bg-white rounded-3xl border border-gray-03 shadow-dropdown md:max-w-84 md:p-6">
        <CollectibleImage collectible={collectible} />
        <CollectibleExplain collectible={collectible} />
        <button onClick={onClose} className="mt-5 w-full py-3 bg-sub-01 rounded-xl text-white typo-head-05 shadow-btn">
          닫기
        </button>
      </div>
    </section>
  );
}

function CollectibleImage({ collectible }: { collectible: Collectible }) {
  const rankStyle = COLLECTIBLE_RANK_STYLES[collectible.rank];

  return (
    <div className="relative h-52 p-5 bg-white rounded-2xl flex items-center justify-center overflow-hidden md:h-56 md:p-6">
      <div className="absolute size-44 rounded-full md:size-48" style={{ background: rankStyle.radialGradient }} />
      <img src={collectible.image} alt={collectible.name} className="relative size-full object-contain" />
    </div>
  );
}

function CollectibleExplain({ collectible }: { collectible: Collectible }) {
  const rankStyle = COLLECTIBLE_RANK_STYLES[collectible.rank];

  return (
    <div className="pt-4 flex flex-col items-center text-center">
      <span className={`px-2 py-1 rounded-full text-[10px] font-semibold md:text-xs ${rankStyle.badge}`}>{rankStyle.label}</span>
      <p className={`mt-2 typo-head-03 md:text-xl! ${rankStyle.text}`}>{collectible.name}</p>
      <div className="mt-2 text-gray-02 typo-sub-03 md:text-xs!">
        <p>No.{String(collectible.collectibleId).padStart(3, "0")}</p>
      </div>
    </div>
  );
}
