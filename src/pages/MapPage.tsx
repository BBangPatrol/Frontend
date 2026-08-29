import searchIcon from "@/assets/images/mapPage/search.svg";
import menuIcon from "@/assets/images/mapPage/menu.svg";
import emptyHeartIcon from "@/assets/images/mapPage/empty-heart.svg";
import starIcon from "@/assets/images/mapPage/star.svg";
import bakeryImage from "@/assets/images/detailPage/temp_1.jpeg";
import { useRef, useState, type PointerEvent } from "react";
import { Map, useKakaoLoader } from "react-kakao-maps-sdk";

const KAKAO_MAP_API_KEY = "83501e5d0eff88208e163bce3f9aa187";
const HALF_SHEET_HEIGHT = "54%";
const DRAG_THRESHOLD = 60;

type SheetPosition = "closed" | "half" | "full";
type Bakery = {
  id: number;
  name: string;
  rating: string;
  distance: string;
  selected: boolean;
};

const tempBakeries: Bakery[] = [
  { id: 1, name: "성심당 본점", rating: "4.8", distance: "1.2km", selected: true },
  { id: 2, name: "성심당 본점", rating: "4.8", distance: "1.2km", selected: false },
  { id: 3, name: "성심당 본점", rating: "4.8", distance: "1.2km", selected: false },
  { id: 4, name: "성심당 본점", rating: "4.8", distance: "1.2km", selected: false },
  { id: 5, name: "성심당 본점", rating: "4.8", distance: "1.2km", selected: false },
  { id: 6, name: "성심당 본점", rating: "4.8", distance: "1.2km", selected: false },
  { id: 7, name: "성심당 본점", rating: "4.8", distance: "1.2km", selected: false },
  { id: 8, name: "성심당 본점", rating: "4.8", distance: "1.2km", selected: false },
  { id: 9, name: "성심당 본점", rating: "4.8", distance: "1.2km", selected: false },
  { id: 10, name: "성심당 본점", rating: "4.8", distance: "1.2km", selected: false },
];
const DEFAULT_MAP_CENTER = { lat: 36.3504, lng: 127.3845 }; // 초기 맵 위치

export default function MapPage() {
  const [sheetPosition, setSheetPosition] = useState<SheetPosition>("closed");

  return (
    <TempContainer>
      {/* <MapOverlay /> */}
      <SearchBar />
      <MapZoom />
      {sheetPosition === "closed" && <MenuButton onClick={() => setSheetPosition("half")} />}
      <MapView />
      <SearchModal position={sheetPosition} onPositionChange={setSheetPosition} />
    </TempContainer>
  );
}

function SearchBar() {
  return (
    <div className="z-2 absolute top-4 left-4 right-4 px-3 py-2.5 flex gap-2 bg-white rounded-2xl">
      <img src={searchIcon} />
      <input
        placeholder="상호명 검색"
        className="placeholder:text-black-02 text-black-01 text-sm w-full font-normal border-none outline-none focus-visible:border-gray-500 focus-visible:ring-2 focus-visible:ring-gray-200"
      />
    </div>
  );
}

function MapZoom() {
  return (
    <div className="z-2 absolute bottom-6 left-6.5 flex flex-col gap-2">
      <button className="text-gray-700 text-xl font-medium font-['Inter'] size-10 bg-white rounded-lg shadow-md">
        +
      </button>
      <button className="text-gray-700 text-xl font-medium font-['Inter'] size-10 bg-white rounded-lg shadow-md">
        -
      </button>
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

  return (
    <Map className="z-1 absolute inset-0 h-full w-full" center={DEFAULT_MAP_CENTER} level={3} />
  );
}

function SearchModal({
  position,
  onPositionChange,
}: {
  position: SheetPosition;
  onPositionChange: (position: SheetPosition) => void;
}) {
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
    <div
      className={`absolute inset-0 z-10 transition-colors duration-300 ${
        isClosed ? "pointer-events-none bg-transparent" : "bg-black/15"
      }`}
    >
      <div
        ref={sheetRef}
        className={`absolute inset-x-0 bottom-0 flex flex-col overflow-hidden bg-white shadow-[0_-4px_24px_rgba(0,0,0,0.12)] ${
          isFull ? "rounded-none pt-[env(safe-area-inset-top)]" : "rounded-t-3xl"
        } ${!isDragging ? "transition-[height,transform] duration-300 ease-out" : ""}`}
        style={{
          height,
          transform,
        }}
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
          {/* <h2 className="typo-head-05 flex h-11 shrink-0 items-center border-b border-gray-03 px-3 text-black-01">
            빵집 목록
          </h2> */}
          <div className="flex h-11 shrink-0 items-center justify-end px-3">
            <button className="flex h-6 w-22 items-center justify-end rounded-full border border-gray-03 bg-white px-2.5 shadow-sm">
              <svg viewBox="0 0 12 12" className="size-3 text-gray-02" fill="none">
                <path
                  d="m3.5 4.75 2.5 2.5 2.5-2.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="min-h-0 flex-1 space-y-2 overflow-y-auto px-3 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            {tempBakeries.map((bakery) => (
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
    <article
      className={`relative flex min-h-21 items-center gap-2.5 rounded-2xl border bg-white p-2.5 border-sub-03`}
    >
      <img src={bakeryImage} className="size-16 shrink-0 rounded-xl object-cover" />
      <div className="min-w-0 flex-1 pr-7">
        <h3 className="typo-body-03 truncate text-black-01">{bakery.name}</h3>
        <div className="mt-0.5 flex items-center gap-1 typo-sub-03 text-gray-01">
          <span className="flex items-center gap-0.5">
            <img src={starIcon} className="size-3.5" />
            {bakery.rating}
          </span>
          <span>·</span>
          <span>{bakery.distance}</span>
        </div>
        <div className="mt-1 flex gap-1">
          <span className="rounded bg-gray-04 px-1 py-0.5 text-[8px] leading-3 text-gray-02">
            #소금빵
          </span>
          <span className="rounded bg-gray-04 px-1 py-0.5 text-[8px] leading-3 text-gray-02">
            #튀김소보로
          </span>
        </div>
      </div>
      <button className="absolute right-3 top-3 flex size-6 items-center justify-center">
        <img src={emptyHeartIcon} className="size-5" />
      </button>
    </article>
  );
}

function TempContainer({ children }: { children: React.ReactNode }) {
  return <main className="relative h-dvh w-full overflow-hidden">{children}</main>;
}
