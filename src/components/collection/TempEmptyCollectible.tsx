import emptyCollectibleIcon from "@/assets/images/collectiblePage/empty-collectible.svg";

export default function TempEmptyCollectible() {
  return (
    <div className="bg-gray-04 rounded-2xl flex flex-col gap-1 justify-center items-center aspect-square border-2 border-dashed border-gray-03 md:h-60 md:aspect-auto">
      <img src={emptyCollectibleIcon} />
      <p className="text-gray-02 typo-body-04">No.000</p>
      <p className="text-gray-02 typo-sub-03">미획득</p>
    </div>
  );
}
