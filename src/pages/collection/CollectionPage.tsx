import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import CollectItemList from "../../components/collection/CollectItemList";
import CollectibleDetailModal from "../../components/collection/CollectibleDetailModal";
import DesktopCollectionHeader from "../../components/collection/DesktopCollectionHeader";
import { useResponsive } from "../../contexts/ResponsiveContext";
import collectibleHeaderIcon from "@/assets/images/collectiblePage/gift.svg";

export default function CollectionPage() {
  const [collectibleDetailModalOpen, setCollectibleDetailModalOpen] = useState(false);
  const [collectibles] = useState(() => Array.from({ length: 20 }, () => Math.random() < 0.5));
  const { isMobile } = useResponsive();

  return (
    <main className="p-4 flex flex-col gap-5 md:p-6 md:gap-8 md:max-w-274.75 md:mx-auto">
      {isMobile ? (
        <PageHeader title="수집품 도감" subTitle="포인트로 뽑기를 진행하고 나만의 수집품 도감을 완성해보세요!" icon={collectibleHeaderIcon} />
      ) : (
        <DesktopCollectionHeader />
      )}
      <CollectItemList collectibles={collectibles} isMobile={isMobile} onOpenDetailModal={() => setCollectibleDetailModalOpen(true)} />
      {collectibleDetailModalOpen && <CollectibleDetailModal onClose={() => setCollectibleDetailModalOpen(false)} />}
    </main>
  );
}
