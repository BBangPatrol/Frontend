import { Link } from "react-router";
import CollectibleDetailModal from "../common/CollectibleDetailModal";

import collectibleHeaderIcon from "@/assets/images/collectiblePage/gift.svg";
import drawButtonIcon from "@/assets/images/collectiblePage/gift-white.svg";
import collectionBackground from "@/assets/images/collectiblePage/background.png";
import tempCollectibleIcon from "@/assets/images/collectiblePage/temp-collect.png";
import emptyCollectibleIcon from "@/assets/images/collectiblePage/empty-collectible.svg";
import leftArrowIcon from "@/assets/images/reviewDetailPage/left-arrow.svg";

type MobileCollectionPageProps = {
  collectibles: boolean[];
  isDetailModalOpen: boolean;
  onOpenDetailModal: () => void;
  onCloseDetailModal: () => void;
};

export default function DesktopCollectionPage({ collectibles, isDetailModalOpen, onOpenDetailModal, onCloseDetailModal }: MobileCollectionPageProps) {
  return (
    <main className="p-6 flex flex-col gap-8 max-w-274.75 mx-auto">
      <DesktopCollectionHeader />
      <CollectItemList collectibles={collectibles} onOpenDetailModal={onOpenDetailModal} />
      {isDetailModalOpen && <CollectibleDetailModal onClose={onCloseDetailModal} />}
    </main>
  );
}

function DesktopCollectionHeader() {
  return (
    <section className="flex flex-col gap-4">
      <Link to={"/detail"} className="flex gap-1">
        <img src={leftArrowIcon} />
        <p className=" text-gray-02 typo-body-03">돌아가기</p>
      </Link>
      <div className="flex">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <img src={collectibleHeaderIcon} alt="" />
            <h2 className="text-3xl font-extrabold text-black-01">수집품 도감</h2>
          </div>
          <p className="text-gray-02 typo-body-02">포인트로 뽑기를 진행하고 나만의 수집품 도감을 완성해보세요!</p>
        </div>
        <Link to="/collection/draw" className="ml-auto flex items-center gap-2 px-8 py-4 self-center bg-sub-01 rounded-2xl shadow-[0px_4px_6px_-1px_rgba(198,139,89,0.20)]">
          <img src={drawButtonIcon} className="size-5" />
          <p className="text-white typo-head-03">뽑기 하러가기</p>
        </Link>
      </div>
    </section>
  );
}

function CollectItemList({ collectibles, onOpenDetailModal }: { collectibles: boolean[]; onOpenDetailModal: () => void }) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex px-5 py-3 self-start gap-2 bg-yellow-01 rounded-2xl border-2 border-main-05 items-center">
        <p className="text-sub-01 typo-body-03">수집 달성률</p>
        <p className="flex text-gray-02 typo-sub-01 items-center">
          <span className="text-black-01 text-xl font-bold">14</span>&nbsp;/ 50
        </p>
      </div>
      <div className="p-8 bg-yellow-02 rounded-4xl shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)] border border-main-05">
        <div className="grid grid-cols-5 gap-6">
          {collectibles.map((value, index) => {
            if (value) {
              return <TempCollectible key={index} onOpenDetailModal={onOpenDetailModal} />;
            } else {
              return <TempEmptyCollectible key={index} />;
            }
          })}
        </div>
      </div>
    </section>
  );
}

function TempCollectible({ onOpenDetailModal }: { onOpenDetailModal: () => void }) {
  return (
    <button onClick={onOpenDetailModal} className="relative h-60 bg-white rounded-2xl shadow-md flex justify-center items-center overflow-hidden">
      <img src={collectionBackground} className="w-full h-full object-cover" />
      <img src={tempCollectibleIcon} className="absolute" />
    </button>
  );
}

function TempEmptyCollectible() {
  return (
    <div className="h-60 bg-gray-04 rounded-2xl flex flex-col gap-1 justify-center items-center border-2 border-dashed border-gray-03">
      <img src={emptyCollectibleIcon} />
      <p className="text-gray-02 typo-body-04">No.000</p>
      <p className="text-gray-02 typo-sub-03">미획득</p>
    </div>
  );
}
