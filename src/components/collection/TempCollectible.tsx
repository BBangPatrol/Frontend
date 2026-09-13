import type { Collectible } from "../../api/collectibles";
import { COLLECTIBLE_RANK_STYLES } from "../../constants/collectibles";

type TempCollectibleProps = {
  collectible: Collectible;
  onOpenDetailModal: (collectible: Collectible) => void;
};

export default function TempCollectible({ collectible, onOpenDetailModal }: TempCollectibleProps) {
  const rankStyle = COLLECTIBLE_RANK_STYLES[collectible.rank];

  return (
    <button
      onClick={() => onOpenDetailModal(collectible)}
      className={`relative p-2 bg-white rounded-xl border shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)] flex justify-center items-center aspect-square overflow-hidden md:p-6 ${rankStyle.border}`}
    >
      <span className={`absolute top-3 left-3 z-10 hidden px-2 py-0.5 rounded-full font-semibold md:inline-block md:text-xs ${rankStyle.badge}`}>{rankStyle.label}</span>
      <img src={collectible.image} alt={collectible.name} className="size-full object-contain" />
    </button>
  );
}
