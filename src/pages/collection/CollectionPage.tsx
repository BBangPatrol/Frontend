import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import PageStatus from "../../components/common/PageStatus";
import CollectItemList from "../../components/collection/CollectItemList";
import CollectibleDetailModal from "../../components/collection/CollectibleDetailModal";
import DesktopCollectionHeader from "../../components/collection/DesktopCollectionHeader";
import { useResponsive } from "../../contexts/ResponsiveContext";
import { useAllCollectibles, useCollectibles } from "../../hooks/api/useCollectibles";
import type { Collectible } from "../../api/collectibles";
import collectibleHeaderIcon from "@/assets/images/collectiblePage/gift.svg";

export default function CollectionPage() {
  const [selectedCollectible, setSelectedCollectible] = useState<Collectible | null>(null);
  const { isMobile } = useResponsive();
  const collectiblesQuery = useCollectibles();
  const allCollectiblesQuery = useAllCollectibles();

  if (collectiblesQuery.isPending || allCollectiblesQuery.isPending) return <PageStatus message="수집품을 불러오는 중입니다." isLoading />;
  if (collectiblesQuery.isError || allCollectiblesQuery.isError || !collectiblesQuery.data || !allCollectiblesQuery.data)
    return <PageStatus message="수집품을 불러오지 못했습니다." showBackButton={collectiblesQuery.isError || allCollectiblesQuery.isError} />;

  const collectibleById = new Map(collectiblesQuery.data.items.map((collectible) => [collectible.collectibleId, collectible]));
  const collectibles = allCollectiblesQuery.data.items.map((collectible) => ({ collectible, acquired: collectibleById.has(collectible.collectibleId) }));

  return (
    <main className="p-4 flex flex-col gap-5 md:p-6 md:gap-8 md:max-w-274.75 md:mx-auto">
      {isMobile ? (
        <PageHeader title="수집품 도감" subTitle="포인트로 뽑기를 진행하고 나만의 수집품 도감을 완성해보세요!" icon={collectibleHeaderIcon} />
      ) : (
        <DesktopCollectionHeader />
      )}
      <CollectItemList
        collectibles={collectibles}
        collectedCount={collectiblesQuery.data.length}
        isMobile={isMobile}
        onOpenDetailModal={setSelectedCollectible}
      />
      {selectedCollectible && <CollectibleDetailModal collectible={selectedCollectible} onClose={() => setSelectedCollectible(null)} />}
    </main>
  );
}
