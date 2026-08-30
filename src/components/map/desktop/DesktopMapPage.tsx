import emptyHeartIcon from "@/assets/images/mapPage/empty-heart.svg";
import starIcon from "@/assets/images/mapPage/star.svg";
import visitIcon from "@/assets/images/mapPage/visit.svg";
import bakeryImage from "@/assets/images/detailPage/temp_1.jpeg";
import { useCallback, useEffect, useRef, useState } from "react";
import { Map, useKakaoLoader } from "react-kakao-maps-sdk";
import searchIcon from "@/assets/images/mapPage/search.svg";

const KAKAO_MAP_API_KEY = "83501e5d0eff88208e163bce3f9aa187";
const DEFAULT_MAP_CENTER = { lat: 36.3504, lng: 127.3845 };

export type Bakery = {
  id: number;
  name: string;
  rating: string;
  distance: string;
  selected: boolean;
};

type DesktopMapPageProps = {
  bakeries: Bakery[];
};

export default function DesktopMapPage({ bakeries }: DesktopMapPageProps) {
  return (
    <main className="h-[calc(100dvh-72px)] w-full overflow-hidden">
      <div className="flex h-full w-full">
        <SearchModal bakeries={bakeries} />
        <div className="relative min-w-0 flex-1">
          <MapView />
          <MapZoom />
        </div>
      </div>
    </main>
  );
}

function MapZoom() {
  return (
    <div className="z-2 absolute top-6 right-6.5 flex flex-col gap-2">
      <button className="text-gray-700 text-xl font-medium font-['Inter'] size-10 bg-white rounded-lg shadow-md">+</button>
      <button className="text-gray-700 text-xl font-medium font-['Inter'] size-10 bg-white rounded-lg shadow-md">-</button>
    </div>
  );
}

function MapView() {
  useKakaoLoader({
    appkey: KAKAO_MAP_API_KEY,
  });

  return <Map className="h-full w-full" center={DEFAULT_MAP_CENTER} level={3} />;
}

function SearchModal({ bakeries }: { bakeries: Bakery[] }) {
  const listRef = useRef<HTMLDivElement>(null);
  const [scrollbar, setScrollbar] = useState({ top: 0, height: 0, visible: false });

  const syncScrollbar = useCallback((list: HTMLDivElement) => {
    const { clientHeight, scrollHeight, scrollTop } = list;
    const scrollableHeight = scrollHeight - clientHeight;

    if (scrollableHeight <= 0) {
      setScrollbar({ top: 0, height: 0, visible: false });
      return;
    }

    const height = Math.min(clientHeight, Math.max(32, (clientHeight / scrollHeight) * clientHeight));
    const top = (scrollTop / scrollableHeight) * (clientHeight - height);

    setScrollbar({ top, height, visible: true });
  }, []);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    syncScrollbar(list);

    const resizeObserver = new ResizeObserver(() => syncScrollbar(list));
    resizeObserver.observe(list);

    return () => resizeObserver.disconnect();
  }, [bakeries.length, syncScrollbar]);

  return (
    <aside className="flex w-95 flex-col bg-white">
      <div className="flex flex-col gap-4 border-b border-gray-100 p-4">
        <div className="px-3 py-2.5 flex gap-2 rounded-2xl items-center bg-gray-04">
          <img src={searchIcon} />
          <input
            placeholder="상호명 검색"
            className="placeholder:text-black-02 text-black-01 typo-sub-01 w-full border-none outline-none focus-visible:border-gray-500 focus-visible:ring-2 focus-visible:ring-gray-200"
          />
        </div>
        <div className="flex items-center">
          <button className="px-3 py-2 bg-sub-01 rounded-2xl typo-body-04 text-white">저장됨 ♥️</button>
          <button className="ml-auto flex w-28 px-2.5 py-2 items-center rounded-2xl border border-gray-03 bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)]">
            <p className="typo-body-04">이름순</p>
            <svg viewBox="0 0 12 12" className="size-3 text-gray-02 ml-auto" fill="none">
              <path d="m3.5 4.75 2.5 2.5 2.5-2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex flex-col min-h-0">
        <div className="relative min-h-0">
          <div ref={listRef} onScroll={(event) => syncScrollbar(event.currentTarget)} className="no-scrollbar flex h-full flex-col gap-3 overflow-y-auto p-4">
            {bakeries.map((bakery) => (
              <BakeryCard key={bakery.id} bakery={bakery} />
            ))}
          </div>
          {scrollbar.visible && (
            <div className="pointer-events-none absolute inset-y-0 right-1 w-1 rounded-full bg-black/5">
              <div className="absolute inset-x-0 rounded-full bg-gray-400/70" style={{ height: scrollbar.height, transform: `translateY(${scrollbar.top}px)` }} />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

function BakeryCard({ bakery }: { bakery: Bakery }) {
  return (
    <article className="flex gap-2 p-4 bg-yellow-02 border border-sub-01 rounded-2xl shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)]">
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
          <div className="flex px-1 py-1 gap-0.5 bg-main-05 rounded-md text-sub-01 typo-body-05">
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
