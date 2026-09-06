import emptyCollectibleIcon from "@/assets/images/collectiblePage/empty-collectible.svg";

export default function TempEmptyCollectible({ collectibleId }: { collectibleId: number }) {
  return (
    <div className="bg-gray-04 rounded-2xl flex flex-col gap-1 justify-center items-center aspect-square border-2 border-dashed border-gray-03 md:h-60 md:aspect-auto">
      <img src={emptyCollectibleIcon} alt="" />
      <p className="text-gray-02 typo-body-04">No.{String(collectibleId).padStart(3, "0")}</p>
      <p className="text-gray-02 typo-sub-03">미획득</p>
    </div>
  );
}
