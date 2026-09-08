import collectionBackground from "@/assets/images/collectiblePage/background.png";
import type { Collectible } from "../../api/collectibles";

type TempCollectibleProps = {
  collectible: Collectible;
  onOpenDetailModal: (collectible: Collectible) => void;
};

export default function TempCollectible({ collectible, onOpenDetailModal }: TempCollectibleProps) {
  return (
    <button
      onClick={() => onOpenDetailModal(collectible)}
      className="bg-white rounded-2xl shadow-md flex justify-center items-center aspect-square md:relative md:h-60 md:aspect-auto md:overflow-hidden"
    >
      <img src={collectionBackground} alt="" className="hidden md:block md:w-full md:h-full md:object-cover" />
      <img src={collectible.image} alt={collectible.name} className="md:absolute" />
    </button>
  );
}
