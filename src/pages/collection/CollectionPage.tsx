import { useState } from "react";
import MobileCollectionPage from "../../components/collection/mobile/MobileCollectionPage";
import { useResponsive } from "../../contexts/ResponsiveContext";
import DesktopCollectionPage from "../../components/collection/desktop/DesktopCollectionPage";

export default function CollectionPage() {
  const [collectibleDetailModalOpen, setCollectibleDetailModalOpen] = useState(false);
  const [collectibles] = useState(() => Array.from({ length: 20 }, () => Math.random() < 0.5));
  const { isMobile } = useResponsive();

  return isMobile ? (
    <MobileCollectionPage
      collectibles={collectibles}
      isDetailModalOpen={collectibleDetailModalOpen}
      onOpenDetailModal={() => setCollectibleDetailModalOpen(true)}
      onCloseDetailModal={() => setCollectibleDetailModalOpen(false)}
    />
  ) : (
    <DesktopCollectionPage
      collectibles={collectibles}
      isDetailModalOpen={collectibleDetailModalOpen}
      onOpenDetailModal={() => setCollectibleDetailModalOpen(true)}
      onCloseDetailModal={() => setCollectibleDetailModalOpen(false)}
    />
  );
}
