import { useState } from "react";
import DrawLink from "./DrawLink";
import TempCollectible from "./TempCollectible";
import TempEmptyCollectible from "./TempEmptyCollectible";
import type { Collectible } from "../../api/collectibles";

const COLLECTION_FILTERS = [
  { value: "ALL", label: "전체" },
  { value: "COLLECTED", label: "수집 완료" },
] as const;

const RANK_FILTERS = [
  { value: "NORMAL", label: "일반" },
  { value: "RARE", label: "희귀" },
  { value: "EPIC", label: "영웅" },
  { value: "LEGENDARY", label: "전설" },
] as const;

type CollectionFilter = (typeof COLLECTION_FILTERS)[number]["value"];
type RankFilter = (typeof RANK_FILTERS)[number]["value"];

type CollectItemListProps = {
  collectibles: Array<{ collectible: Collectible; acquired: boolean }>;
  collectedCount: number;
  isMobile: boolean;
  onOpenDetailModal: (collectible: Collectible) => void;
};

export default function CollectItemList({ collectibles, collectedCount, isMobile, onOpenDetailModal }: CollectItemListProps) {
  const [collectionFilter, setCollectionFilter] = useState<CollectionFilter>("ALL");
  const [rankFilter, setRankFilter] = useState<RankFilter | null>(null);
  const filteredCollectibles = collectibles.filter(({ collectible, acquired }) => {
    if (collectionFilter === "COLLECTED" && !acquired) return false;
    if (rankFilter && collectible.rank !== rankFilter) return false;
    return true;
  });

  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {isMobile ? (
          <div className="flex justify-between items-center">
            <p className="px-3 text-gray-02 typo-body-04">
              <span className="text-black-01 typo-head-01">{collectedCount}</span> / 92 수집
            </p>
            <DrawLink />
          </div>
        ) : (
          <div className="flex px-5 py-3 self-start gap-2 bg-yellow-01 rounded-2xl border-2 border-main-05 items-center">
            <p className="text-sub-01 typo-body-03">수집 달성률</p>
            <p className="flex text-gray-02 typo-sub-01 items-center">
              <span className="text-black-01 text-xl font-bold">{collectedCount}</span>&nbsp;/ 92
            </p>
          </div>
        )}
        <div className="no-scrollbar flex max-w-full self-end gap-2 overflow-x-auto pb-1">
          <div className="flex gap-2">
            {COLLECTION_FILTERS.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setCollectionFilter(value)}
                aria-pressed={collectionFilter === value}
                className={`shrink-0 rounded-full border px-3 py-2 typo-body-04 transition-colors md:px-4 ${collectionFilter === value ? "border-sub-01 bg-sub-01 text-white" : "border-gray-03 bg-white text-gray-02 hover:border-main-01"}`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="my-1 w-px shrink-0 bg-gray-03" />
          <div className="flex gap-2">
            {RANK_FILTERS.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setRankFilter((current) => (current === value ? null : value))}
                aria-pressed={rankFilter === value}
                className={`shrink-0 rounded-full border px-3 py-2 typo-body-04 transition-colors md:px-4 ${rankFilter === value ? "border-sub-01 bg-sub-01 text-white" : "border-gray-03 bg-white text-gray-02 hover:border-main-01"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="p-3 bg-yellow-02 rounded-xl shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)] border border-main-05 md:p-8 md:rounded-4xl">
        <div className="grid grid-cols-3 gap-3 md:grid-cols-5 md:gap-6">
          {filteredCollectibles.length > 0 ? (
            filteredCollectibles.map(({ collectible, acquired }) =>
              acquired ? (
                <TempCollectible key={collectible.collectibleId} collectible={collectible} onOpenDetailModal={onOpenDetailModal} />
              ) : (
                <TempEmptyCollectible key={collectible.collectibleId} collectibleId={collectible.collectibleId} rank={collectible.rank} />
              ),
            )
          ) : (
            <p className="col-span-3 py-12 text-center text-gray-02 typo-sub-01 md:col-span-5">조건에 맞는 수집품이 없습니다.</p>
          )}
        </div>
      </div>
    </section>
  );
}
