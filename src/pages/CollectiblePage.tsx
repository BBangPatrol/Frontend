import PageHeader from "../components/common/PageHeader";

import collectibleHeaderIcon from "@/assets/images/collectiblePage/gift.svg";
import drawButtonIcon from "@/assets/images/collectiblePage/gift-white.svg";
import tempCollectibleIcon from "@/assets/images/collectiblePage/temp-collect.png";
import emptyCollectibleIcon from "@/assets/images/collectiblePage/empty-collectible.svg";
import { useState, type Dispatch, type SetStateAction } from "react";
import CollectibleDetailModal from "../components/collectible/collectibleDetailModal";

const tempCollectibleArr = Array.from({ length: 20 }, () => Math.random() < 0.5);

export default function CollectiblePage() {
  const [collectibleDetailModalOpen, setCollectibleDetailModalOpen] = useState(false);

  return (
    <TempContainer>
      <PageHeader title="수집품 도감" subTitle="포인트로 뽑기를 진행하고 나만의 수집품 도감을 완성해보세요!" icon={collectibleHeaderIcon} />
      <CollectItemList setOpen={setCollectibleDetailModalOpen} />
      {collectibleDetailModalOpen && <CollectibleDetailModal setOpen={setCollectibleDetailModalOpen} />}
    </TempContainer>
  );
}

function CollectItemList({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <p className="px-3 text-gray-02 text-xs font-bold">
          <span className="text-black-01 text-2xl font-extrabold">14</span> / 50 수집
        </p>
        <button className="flex items-center gap-1 px-3 py-2 bg-sub-01 rounded-xl shadow-[0px_4px_6px_-1px_rgba(198,139,89,0.20)]">
          <img src={drawButtonIcon} className="size-4" />
          <p className="text-white text-sm font-extrabold">뽑기 하러가기</p>
        </button>
      </div>
      <div className="p-3 bg-yellow-02 rounded-xl shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)] border border-main-05">
        <div className="grid grid-cols-3 gap-3">
          {tempCollectibleArr.map((value) => {
            if (value) {
              return <TempCollectible setOpen={setOpen} />;
            } else {
              return <TempEmptyCollectible />;
            }
          })}
        </div>
      </div>
    </section>
  );
}

function TempCollectible({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
  return (
    <button onClick={() => setOpen(true)} className="bg-white rounded-2xl shadow-md flex justify-center items-center aspect-square">
      <img src={tempCollectibleIcon} />
    </button>
  );
}

function TempEmptyCollectible() {
  return (
    <div className="bg-gray-04 rounded-2xl flex flex-col gap-1 justify-center items-center aspect-square border-2 border-dashed border-gray-03">
      <img src={emptyCollectibleIcon} />
      <p className="text-gray-02 text-xs font-bold">No.000</p>
      <p className="text-gray-02 text-[10px] font-normal">미획득</p>
    </div>
  );
}

const TempContainer = ({ children }: { children: React.ReactNode }) => {
  return <main className="p-4 flex flex-col gap-5">{children}</main>;
};
