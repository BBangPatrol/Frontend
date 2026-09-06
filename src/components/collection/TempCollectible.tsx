import collectionBackground from "@/assets/images/collectiblePage/background.png";
import tempCollectibleIcon from "@/assets/images/collectiblePage/temp-collect.png";

export default function TempCollectible({ onOpenDetailModal }: { onOpenDetailModal: () => void }) {
  return (
    <button
      onClick={onOpenDetailModal}
      className="bg-white rounded-2xl shadow-md flex justify-center items-center aspect-square md:relative md:h-60 md:aspect-auto md:overflow-hidden"
    >
      <img src={collectionBackground} className="hidden md:block md:w-full md:h-full md:object-cover" />
      <img src={tempCollectibleIcon} className="md:absolute" />
    </button>
  );
}
