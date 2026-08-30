import searchIcon from "@/assets/images/mapPage/search.svg";
import menuIcon from "@/assets/images/mapPage/menu.svg";
import emptyHeartIcon from "@/assets/images/mapPage/empty-heart.svg";
import starIcon from "@/assets/images/mapPage/star.svg";
import visitIcon from "@/assets/images/mapPage/visit.svg";
import bakeryImage from "@/assets/images/detailPage/temp_1.jpeg";
import { useRef, useState, type PointerEvent } from "react";
import { Map, useKakaoLoader } from "react-kakao-maps-sdk";

const KAKAO_MAP_API_KEY = "83501e5d0eff88208e163bce3f9aa187";
const HALF_SHEET_HEIGHT = "54%";
const DRAG_THRESHOLD = 60;
const DEFAULT_MAP_CENTER = { lat: 36.3504, lng: 127.3845 };

export type SheetPosition = "closed" | "half" | "full";

export type Bakery = {
  id: number;
  name: string;
  rating: string;
  distance: string;
  selected: boolean;
};

type MobileMapPageProps = {
  bakeries: Bakery[];
  sheetPosition: SheetPosition;
  onSheetPositionChange: (position: SheetPosition) => void;
};

export default function MobileMapPage({ bakeries, sheetPosition, onSheetPositionChange }: MobileMapPageProps) {
  return (
    <main className="relative h-[calc(100dvh-60px)] w-full overflow-hidden">
      <SearchBar />
      <MapZoom />
      {sheetPosition === "closed" && <MenuButton onClick={() => onSheetPositionChange("half")} />}
      <MapView />
      <SearchModal bakeries={bakeries} position={sheetPosition} onPositionChange={onSheetPositionChange} />
    </main>
  );
}

function SearchBar() {
  return (
    <div className="z-2 absolute top-4 left-4 right-4 px-3 py-2.5 flex gap-2 bg-white rounded-2xl">
      <img src={searchIcon} />
      <input
        placeholder="상호명 검색"
        className="placeholder:text-black-02 text-black-01 typo-sub-01 w-full border-none outline-none focus-visible:border-gray-500 focus-visible:ring-2 focus-visible:ring-gray-200"
      />
    </div>
  );
}

function MapZoom() {
  return (
    <div className="z-2 absolute bottom-6 left-6.5 flex flex-col gap-2">
      <button className="text-gray-700 text-xl font-medium font-['Inter'] size-10 bg-white rounded-lg shadow-md">+</button>
      <button className="text-gray-700 text-xl font-medium font-['Inter'] size-10 bg-white rounded-lg shadow-md">-</button>
    </div>
  );
}

function MenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="z-2 absolute right-7 bottom-7 rounded-full bg-sub-01 p-2">
      <img src={menuIcon} />
    </button>
  );
}

function MapView() {
  useKakaoLoader({
    appkey: KAKAO_MAP_API_KEY,
  });

  return <Map className="z-1 absolute inset-0 h-full w-full" center={DEFAULT_MAP_CENTER} level={3} />;
}

function SearchModal({ bakeries, position, onPositionChange }: { bakeries: Bakery[]; position: SheetPosition; onPositionChange: (position: SheetPosition) => void }) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ y: 0, offset: 0, position });
  const [dragOffset, setDragOffset] = useState<number | null>(null);

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    const offset = sheetRef.current?.getBoundingClientRect().top ?? 0;

    dragStart.current = { y: event.clientY, offset, position };
    setDragOffset(offset);
  };

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (dragOffset === null) return;

    const { y, offset } = dragStart.current;
    const nextOffset = offset + event.clientY - y;
    setDragOffset(Math.min(Math.max(nextOffset, 0), window.innerHeight));
  };

  const handlePointerEnd = (event: PointerEvent<HTMLButtonElement>) => {
    if (dragOffset === null) return;

    const { y, position: startPosition } = dragStart.current;
    const distance = event.clientY - y;
    let nextPosition = startPosition;

    if (Math.abs(distance) >= DRAG_THRESHOLD) {
      if (distance < 0) nextPosition = "full";
      else if (startPosition === "full") nextPosition = "half";
      else nextPosition = "closed";
    }

    setDragOffset(null);
    onPositionChange(nextPosition);
  };

  const isClosed = position === "closed";
  const isFull = position === "full";
  const isDragging = dragOffset !== null;
  const restingHeight = isFull ? "100%" : HALF_SHEET_HEIGHT;
  const height = isDragging ? `calc(100dvh - ${dragOffset}px)` : restingHeight;
  const transform = !isDragging && isClosed ? "translateY(100%)" : "translateY(0)";

  return (
    <div className={`absolute inset-0 z-10 transition-colors duration-300 ${isClosed ? "pointer-events-none bg-transparent" : "bg-black/15"}`}>
      <div
        ref={sheetRef}
        className={`absolute inset-x-0 bottom-0 flex flex-col overflow-hidden bg-white shadow-[0_-4px_24px_rgba(0,0,0,0.12)] ${
          isFull ? "rounded-none pt-[env(safe-area-inset-top)]" : "rounded-t-3xl"
        } ${!isDragging ? "transition-[height,transform] duration-300 ease-out" : ""}`}
        style={{ height, transform }}
      >
        <button
          className="flex flex-col p-4 w-full touch-none cursor-grab items-center justify-center active:cursor-grabbing border-b-[0.72px] border-gray-100 px-3"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={() => setDragOffset(null)}
        >
          <span className="h-1.5 w-12 rounded-full bg-gray-300" />
          <h2 className="mt-4 w-full flex typo-head-03 text-black-01">빵집 목록</h2>
        </button>
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex h-11 shrink-0 items-center px-4 pt-4">
            <button className="px-3 py-2 bg-sub-01 rounded-2xl typo-body-04 text-white">저장됨 ♥️</button>
            <button className="ml-auto flex w-28 px-2.5 py-2 items-center rounded-2xl border border-gray-03 bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)]">
              <p className="typo-body-04">이름순</p>
              <svg viewBox="0 0 12 12" className="size-3 text-gray-02 ml-auto" fill="none">
                <path d="m3.5 4.75 2.5 2.5 2.5-2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="px-4 pb-4 mt-4 flex flex-col gap-3 overflow-scroll">
            {bakeries.map((bakery) => (
              <BakeryCard key={bakery.id} bakery={bakery} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BakeryCard({ bakery }: { bakery: Bakery }) {
  return (
    <article className="flex gap-2 p-3 bg-yellow-02 border border-sub-01 rounded-2xl shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)]">
      <img src={bakeryImage} className="w-22 h-21 rounded-xl object-cover" />
      <div className="w-full flex flex-col justify-center gap-2">
        <div className="flex items-center">
          <h3 className="typo-head-04 text-black-01">{bakery.name}</h3>
          <button className="ml-auto">
            <img src={emptyHeartIcon} className="size-5" />
          </button>
        </div>
        <div className="flex gap-2 typo-body-04 items-center">
          <span className="flex gap-0.5 items-center">
            <img src={starIcon} className="size-3" />
            {bakery.rating}
          </span>
          <span>·</span>
          <span>{bakery.distance}</span>
          <span>·</span>
          <div className="flex px-1 py-0.5 gap-0.5 bg-main-05 rounded-md text-sub-01 typo-body-05">
            <img src={visitIcon} />
            <p>12회 방문</p>
          </div>
        </div>
        <div className="flex gap-1.5">
          <span className="p-1 typo-sub-03 text-gray-01 bg-gray-04 rounded-md">#소금빵</span>
          <span className="p-1 typo-sub-03 text-gray-01 bg-gray-04 rounded-md">#튀김소보로</span>
        </div>
      </div>
    </article>
  );
}
