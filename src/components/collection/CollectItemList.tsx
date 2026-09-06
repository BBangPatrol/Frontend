import DrawLink from "./DrawLink";
import TempCollectible from "./TempCollectible";
import TempEmptyCollectible from "./TempEmptyCollectible";

type CollectItemListProps = {
  collectibles: boolean[];
  isMobile: boolean;
  onOpenDetailModal: () => void;
};

export default function CollectItemList({ collectibles, isMobile, onOpenDetailModal }: CollectItemListProps) {
  return (
    <section className="flex flex-col gap-3">
      {isMobile ? (
        <div className="flex justify-between items-center">
          <p className="px-3 text-gray-02 typo-body-04">
            <span className="text-black-01 typo-head-01">14</span> / 50 수집
          </p>
          <DrawLink />
        </div>
      ) : (
        <div className="flex px-5 py-3 self-start gap-2 bg-yellow-01 rounded-2xl border-2 border-main-05 items-center">
          <p className="text-sub-01 typo-body-03">수집 달성률</p>
          <p className="flex text-gray-02 typo-sub-01 items-center">
            <span className="text-black-01 text-xl font-bold">14</span>&nbsp;/ 50
          </p>
        </div>
      )}
      <div className="p-3 bg-yellow-02 rounded-xl shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)] border border-main-05 md:p-8 md:rounded-4xl">
        <div className="grid grid-cols-3 gap-3 md:grid-cols-5 md:gap-6">
          {collectibles.map((value, index) =>
            value ? <TempCollectible key={index} onOpenDetailModal={onOpenDetailModal} /> : <TempEmptyCollectible key={index} />,
          )}
        </div>
      </div>
    </section>
  );
}
