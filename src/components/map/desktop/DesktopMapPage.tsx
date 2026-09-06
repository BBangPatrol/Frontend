import bakeryImage from "@/assets/images/detailPage/temp_1.jpeg";
import emptyHeartIcon from "@/assets/images/mapPage/empty-heart.svg";
import fullHeartIcon from "@/assets/images/mapPage/full-heart.svg";
import searchIcon from "@/assets/images/mapPage/search.svg";
import starIcon from "@/assets/images/mapPage/star.svg";
import visitIcon from "@/assets/images/mapPage/visit.svg";
import type { StoreSearchResult, StoreSearchSort } from "../../../api/stores";
import { useStoreSearch } from "../../../hooks/useStoreSearch";
import { useCallback, useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { CustomOverlayMap, Map, useKakaoLoader } from "react-kakao-maps-sdk";

const KAKAO_MAP_API_KEY = import.meta.env.VITE_KAKAO_MAP_API_KEY?.trim() ?? "";
const DEFAULT_MAP_CENTER = { lat: 36.3504, lng: 127.3845 };

export default function DesktopMapPage() {
  const [searchInput, setSearchInput] = useState("");
  const [searchName, setSearchName] = useState("");
  const [sort, setSort] = useState<StoreSearchSort>("visit");
  const [cursorHistory, setCursorHistory] = useState<Array<number | undefined>>([undefined]);
  const [selectedBakeryId, setSelectedBakeryId] = useState<number | null>(null);
  const cursor = cursorHistory.at(-1);
  const searchQuery = useStoreSearch({
    sort,
    name: searchName || undefined,
    cursor,
    ...(sort === "distance" ? { lat: DEFAULT_MAP_CENTER.lat, lon: DEFAULT_MAP_CENTER.lng } : {}),
  });
  const bakeries = searchQuery.data?.result ?? [];
  const selectedBakery = bakeries.find(({ bakery }) => bakery.id === selectedBakeryId) ?? null;

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextName = searchInput.trim();

    setSelectedBakeryId(null);
    setCursorHistory([undefined]);

    if (nextName === searchName && cursorHistory.length === 1) void searchQuery.refetch();
    else setSearchName(nextName);
  };

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value as StoreSearchSort);
    setCursorHistory([undefined]);
    setSelectedBakeryId(null);
  };

  const handleNextPage = () => {
    const nextCursor = searchQuery.data?.pageInfo.nextCursor;
    if (nextCursor == null) return;

    setCursorHistory((history) => [...history, nextCursor]);
    setSelectedBakeryId(null);
  };

  const handlePreviousPage = () => {
    setCursorHistory((history) => history.slice(0, -1));
    setSelectedBakeryId(null);
  };

  return (
    <main className="h-[calc(100dvh-72px)] w-full overflow-hidden">
      <div className="flex h-full w-full">
        <SearchPanel
          searchInput={searchInput}
          bakeries={bakeries}
          sort={sort}
          selectedBakeryId={selectedBakeryId}
          page={cursorHistory.length}
          hasNext={searchQuery.data?.pageInfo.hasNext ?? false}
          isLoading={searchQuery.isFetching}
          isError={searchQuery.isError}
          onSearchInputChange={setSearchInput}
          onSearch={handleSearch}
          onSortChange={handleSortChange}
          onBakerySelect={(bakery) => setSelectedBakeryId(bakery.bakery.id)}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
        />
        <div className="relative min-w-0 flex-1">
          <MapView bakeries={bakeries} selectedBakery={selectedBakery} onBakerySelect={(bakery) => setSelectedBakeryId(bakery.bakery.id)} />
          <MapZoom />
        </div>
      </div>
    </main>
  );
}

function MapZoom() {
  return (
    <div className="z-2 absolute top-6 right-6.5 flex flex-col gap-2">
      <button className="size-10 rounded-lg bg-white font-['Inter'] text-xl font-medium text-gray-700 shadow-md">+</button>
      <button className="size-10 rounded-lg bg-white font-['Inter'] text-xl font-medium text-gray-700 shadow-md">-</button>
    </div>
  );
}

function MapView({ bakeries, selectedBakery, onBakerySelect }: { bakeries: StoreSearchResult[]; selectedBakery: StoreSearchResult | null; onBakerySelect: (bakery: StoreSearchResult) => void }) {
  useKakaoLoader({ appkey: KAKAO_MAP_API_KEY });
  const center = selectedBakery ? { lat: selectedBakery.bakery.lat, lng: selectedBakery.bakery.lon } : DEFAULT_MAP_CENTER;

  return (
    <Map className="h-full w-full" center={center} level={3} isPanto={Boolean(selectedBakery)}>
      {bakeries.map((result) => {
        const { bakery } = result;
        const isSelected = bakery.id === selectedBakery?.bakery.id;

        return (
          <CustomOverlayMap key={bakery.id} position={{ lat: bakery.lat, lng: bakery.lon }} yAnchor={1} zIndex={isSelected ? 2 : 1}>
            <button
              type="button"
              aria-label={`${bakery.name} 선택`}
              onClick={() => onBakerySelect(result)}
              className={`flex rotate-45 items-center justify-center rounded-full rounded-br-none border-2 border-sub-01 shadow-md ${
                isSelected ? "size-9 bg-sub-01 ring-4 ring-white/80" : "size-7 bg-white"
              }`}
            >
              <span className={`block size-2 rounded-full ${isSelected ? "bg-white" : "bg-sub-01"}`} />
            </button>
          </CustomOverlayMap>
        );
      })}
      {selectedBakery && (
        <CustomOverlayMap position={{ lat: selectedBakery.bakery.lat, lng: selectedBakery.bakery.lon }} yAnchor={1.65} zIndex={3}>
          <div className="flex items-center gap-3 whitespace-nowrap rounded-xl bg-white px-3 py-2 shadow-lg">
            <strong className="typo-head-05 text-black-01">{selectedBakery.bakery.name}</strong>
            <Link to={`/detail/${selectedBakery.bakery.id}`} className="typo-body-04 rounded-lg bg-sub-01 px-2 py-1.5 text-white">
              상세보기
            </Link>
          </div>
        </CustomOverlayMap>
      )}
    </Map>
  );
}

type SearchPanelProps = {
  searchInput: string;
  bakeries: StoreSearchResult[];
  sort: StoreSearchSort;
  selectedBakeryId: number | null;
  page: number;
  hasNext: boolean;
  isLoading: boolean;
  isError: boolean;
  onSearchInputChange: (value: string) => void;
  onSearch: (event: FormEvent<HTMLFormElement>) => void;
  onSortChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onBakerySelect: (bakery: StoreSearchResult) => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
};

function SearchPanel({
  searchInput,
  bakeries,
  sort,
  selectedBakeryId,
  page,
  hasNext,
  isLoading,
  isError,
  onSearchInputChange,
  onSearch,
  onSortChange,
  onBakerySelect,
  onNextPage,
  onPreviousPage,
}: SearchPanelProps) {
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
  }, [bakeries.length, isLoading, syncScrollbar]);

  return (
    <aside className="flex w-95 shrink-0 flex-col bg-white">
      <div className="flex flex-col gap-4 border-b border-gray-100 p-4">
        <form onSubmit={onSearch} className="flex items-center gap-2 rounded-2xl bg-gray-04 px-3 py-2.5">
          <img src={searchIcon} alt="" />
          <input
            value={searchInput}
            onChange={(event) => onSearchInputChange(event.target.value)}
            placeholder="상호명 검색"
            className="typo-sub-01 text-black-01 placeholder:text-black-02 w-full border-none outline-none focus-visible:border-gray-500 focus-visible:ring-2 focus-visible:ring-gray-200"
          />
        </form>
        <div className="flex items-center">
          <button className="typo-body-04 rounded-2xl bg-sub-01 px-3 py-2 text-white">저장됨 ♥️</button>
          <SortSelect value={sort} onChange={onSortChange} />
        </div>
      </div>
      <div className="relative min-h-0 flex-1">
        <div ref={listRef} onScroll={(event) => syncScrollbar(event.currentTarget)} className="no-scrollbar flex h-full flex-col gap-3 overflow-y-auto p-4">
          <SearchResultContent
            bakeries={bakeries}
            selectedBakeryId={selectedBakeryId}
            page={page}
            hasNext={hasNext}
            isLoading={isLoading}
            isError={isError}
            onBakerySelect={onBakerySelect}
            onNextPage={onNextPage}
            onPreviousPage={onPreviousPage}
          />
        </div>
        {scrollbar.visible && (
          <div className="pointer-events-none absolute inset-y-0 right-1 w-1 rounded-full bg-black/5">
            <div className="absolute inset-x-0 rounded-full bg-gray-400/70" style={{ height: scrollbar.height, transform: `translateY(${scrollbar.top}px)` }} />
          </div>
        )}
      </div>
    </aside>
  );
}

function SortSelect({ value, onChange }: { value: StoreSearchSort; onChange: (event: ChangeEvent<HTMLSelectElement>) => void }) {
  return (
    <div className="relative ml-auto">
      <select
        value={value}
        onChange={onChange}
        aria-label="정렬 기준"
        className="typo-body-04 w-28 appearance-none rounded-2xl border border-gray-03 bg-white px-2.5 py-2 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)] outline-none"
      >
        <option value="visit">방문자순</option>
        <option value="rating">평점순</option>
        <option value="distance">거리순</option>
      </select>
      <svg viewBox="0 0 12 12" className="pointer-events-none absolute top-1/2 right-2.5 size-3 -translate-y-1/2 text-gray-02" fill="none">
        <path d="m3.5 4.75 2.5 2.5 2.5-2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

type SearchResultContentProps = {
  bakeries: StoreSearchResult[];
  selectedBakeryId: number | null;
  page: number;
  hasNext: boolean;
  isLoading: boolean;
  isError: boolean;
  onBakerySelect: (bakery: StoreSearchResult) => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
};

function SearchResultContent({ bakeries, selectedBakeryId, page, hasNext, isLoading, isError, onBakerySelect, onNextPage, onPreviousPage }: SearchResultContentProps) {
  if (isLoading) return <SearchFallback message="검색 결과를 불러오는 중이에요" />;
  if (isError) return <SearchFallback message="검색 결과를 불러오지 못했어요" />;
  if (bakeries.length === 0) return <SearchFallback message="검색 결과가 없어요" />;

  return (
    <>
      {bakeries.map((bakery) => (
        <BakeryCard key={bakery.bakery.id} bakery={bakery} selected={bakery.bakery.id === selectedBakeryId} onClick={() => onBakerySelect(bakery)} />
      ))}
      <Pagination page={page} hasNext={hasNext} onPrevious={onPreviousPage} onNext={onNextPage} />
    </>
  );
}

function SearchFallback({ message }: { message: string }) {
  return <div className="typo-body-03 flex min-h-32 flex-1 items-center justify-center text-gray-02">{message}</div>;
}

function Pagination({ page, hasNext, onPrevious, onNext }: { page: number; hasNext: boolean; onPrevious: () => void; onNext: () => void }) {
  return (
    <div className="flex items-center justify-center gap-4 py-2">
      <button type="button" aria-label="이전 페이지" disabled={page === 1} onClick={onPrevious} className="size-8 rounded-full border border-gray-03 disabled:opacity-30">
        ←
      </button>
      <span className="typo-body-04 text-gray-02">{page}</span>
      <button type="button" aria-label="다음 페이지" disabled={!hasNext} onClick={onNext} className="size-8 rounded-full border border-gray-03 disabled:opacity-30">
        →
      </button>
    </div>
  );
}

function BakeryCard({ bakery: result, selected, onClick }: { bakery: StoreSearchResult; selected: boolean; onClick: () => void }) {
  const { bakery, likes, visitCnt } = result;
  const menus = bakery.signatureMenu
    .split(",")
    .map((menu) => menu.trim())
    .filter(Boolean);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full shrink-0 gap-2 rounded-2xl border border-sub-01 p-4 text-left shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)] ${selected ? "bg-yellow-02" : "bg-white"} ${selected ? "border-sub-01" : "border-gray-04"}`}
    >
      <img src={bakery.image || bakery.signatureImages[0] || bakeryImage} alt="" className="h-21 w-22 rounded-xl object-cover" />
      <div className="flex w-full min-w-0 flex-col justify-center gap-2">
        <div className="flex items-center">
          <h3 className="typo-head-04 text-black-01 truncate">{bakery.name}</h3>
          <img src={likes ? fullHeartIcon : emptyHeartIcon} alt={likes ? "저장됨" : "저장 안 됨"} className="ml-auto size-5" />
        </div>
        <div className="typo-body-04 flex items-center gap-2">
          <span className="flex items-center gap-0.5">
            <img src={starIcon} alt="평점" className="size-3" />
            {bakery.avgRating ?? "-"}
          </span>
          <span>·</span>
          <div className="typo-body-05 flex gap-0.5 rounded-md bg-main-05 px-1 py-1 text-sub-01">
            <img src={visitIcon} alt="" />
            <span>{visitCnt}회 방문</span>
          </div>
        </div>
        <div className="flex gap-1.5 overflow-hidden">
          {menus.map((menu) => (
            <span key={menu} className="typo-sub-03 shrink-0 rounded-md bg-gray-04 p-1 text-gray-01">
              #{menu}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
