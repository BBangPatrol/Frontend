import emptyCollectibleIcon from "@/assets/images/collectiblePage/empty-collectible.svg";
import { COLLECTIBLE_RANK_STYLES } from "../../constants/collectibles";
import type { CollectibleRank } from "../../types/collectibles";

type TempEmptyCollectibleProps = {
  collectibleId: number;
  rank: CollectibleRank;
};

export default function TempEmptyCollectible({ collectibleId, rank }: TempEmptyCollectibleProps) {
  const rankStyle = COLLECTIBLE_RANK_STYLES[rank];

  return (
    <div className={`relative bg-gray-05 rounded-xl flex flex-col gap-1 justify-center items-center aspect-square border border-dashed ${rankStyle.border}`}>
      <span className={`absolute top-3 left-3 z-10 hidden px-2 py-0.5 rounded-full font-semibold md:inline-block md:text-xs ${rankStyle.badge}`}>{rankStyle.label}</span>
      <img src={emptyCollectibleIcon} alt="" />
      <p className="text-gray-02 typo-body-04">No.{String(collectibleId).padStart(3, "0")}</p>
      <p className="text-gray-02 typo-sub-03">미획득</p>
    </div>
  );
}
