import closeButtonIcon from "@/assets/images/collectiblePage/collectible-detail-close.svg";
import tempCollectible from "@/assets/images/collectiblePage/temp-collect.png";
import type { Dispatch, SetStateAction } from "react";

export default function CollectibleDetailModal({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
  return (
    <TempContainer>
      <CollectibleImage setOpen={setOpen} />
      <CollectibleExplain />
    </TempContainer>
  );
}

function CollectibleImage({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute size-60 bg-[#C68B594D] blur-lg" />
      <div className="relative size-56 rounded-2xl border-[2.8px] border-white">
        <button onClick={() => setOpen(false)} className="absolute right-2 top-2 z-10">
          <img src={closeButtonIcon} />
        </button>
        <img src={tempCollectible} className="size-full rounded-2xl object-cover" />
      </div>
    </div>
  );
}

function CollectibleExplain() {
  return (
    <div className="px-4 py-2 bg-black/60 rounded-xl flex flex-col items-center gap-[2.8px]">
      <p className="text-sub-01 text-[9.80px] font-bold">No.001</p>
      <p className="text-white text-base font-bold">나는야 꿈순이</p>
    </div>
  );
}

function TempContainer({ children }: { children: React.ReactNode }) {
  return <section className="fixed inset-0 bg-white/85 flex flex-col gap-5 items-center justify-center">{children}</section>;
}
