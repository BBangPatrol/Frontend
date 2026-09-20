import bakeryImage from "@/assets/images/detailPage/temp_1.jpeg";
import emptyHeartIcon from "@/assets/images/mapPage/empty-heart.svg";
import fullHeartIcon from "@/assets/images/mapPage/full-heart.svg";
import searchIcon from "@/assets/images/mapPage/search.svg";
import starIcon from "@/assets/images/mapPage/star.svg";
import visitIcon from "@/assets/images/mapPage/visit.svg";
import type { StoreSearchResult, StoreSearchSort } from "../../../api/stores";
import { DEFAULT_MAP_CENTER, KAKAO_MAP_API_KEY } from "../../../constants/map";
import Pagination from "../../common/Pagination";
import { useStoreSearch } from "../../../hooks/api/useStoreSearch";
import { useToggleStoreFavorite } from "../../../hooks/api/useToggleStoreFavorite";
import useIsLoggedIn from "../../../hooks/useIsLoggedIn";
import { startKakaoLogin } from "../../../utils/kakao";
import { useCallback, useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { CustomOverlayMap, Map, useKakaoLoader } from "react-kakao-maps-sdk";
import LoginModal from "../../modal/LoginModal";
import MapBakeryPopup from "../MapBakeryPopup";

export default function DesktopMapPage() {
  const [searchInput, setSearchInput] = useState("");
  const [searchName, setSearchName] = useState("");
  const [sort, setSort] = useState<StoreSearchSort>("visit");
  const [favoriteOnly, setFavoriteOnly] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [cursorHistory, setCursorHistory] = useState<Array<number | undefined>>([undefined]);
  const [selectedBakeryId, setSelectedBakeryId] = useState<number | null>(null);
  const isLoggedIn = useIsLoggedIn();
  const favoriteMutation = useToggleStoreFavorite();
  const isFavoriteFilterActive = isLoggedIn && favoriteOnly;
  const cursor = cursorHistory.at(-1);
  const searchQuery = useStoreSearch({
    sort,
    name: searchName || undefined,
    cursor,
    favoriteOnly: isFavoriteFilterActive || undefined,
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

  const handleFavoriteFilter = () => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }

    setFavoriteOnly((value) => !value);
    setCursorHistory([undefined]);
    setSelectedBakeryId(null);
  };

  const handleFavoriteToggle = (storeId: number) => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }

    favoriteMutation.mutate({ storeId });
  };

  const handlePageChange = (page: number) => {
    if (page <= cursorHistory.length) setCursorHistory((history) => history.slice(0, page));
    else {
      const nextCursor = searchQuery.data?.cursorPageInfo.nextCursor;
      if (nextCursor != null) setCursorHistory((history) => [...history, nextCursor]);
    }
    setSelectedBakeryId(null);
  };

  return (
    <main className="h-[calc(100dvh-72px)] w-full overflow-hidden">
      <div className="flex h-full w-full">
        <SearchPanel
          searchInput={searchInput}
          bakeries={bakeries}
          sort={sort}
          favoriteOnly={isFavoriteFilterActive}
          selectedBakeryId={selectedBakeryId}
          page={cursorHistory.length}
          hasNext={searchQuery.data?.cursorPageInfo.hasNext ?? false}
          isLoading={searchQuery.isFetching}
          isError={searchQuery.isError}
          onSearchInputChange={setSearchInput}
          onSearch={handleSearch}
          onSortChange={handleSortChange}
          onFavoriteFilter={handleFavoriteFilter}
          onFavoriteToggle={handleFavoriteToggle}
          favoritePendingId={favoriteMutation.isPending ? favoriteMutation.variables.storeId : null}
          onBakerySelect={(bakery) => setSelectedBakeryId(bakery.bakery.id)}
          onPageChange={handlePageChange}
        />
        <div className="relative min-w-0 flex-1">
          <MapView bakeries={bakeries} selectedBakery={selectedBakery} onBakerySelect={(bakery) => setSelectedBakeryId(bakery.bakery.id)} />
          <MapZoom />
        </div>
      </div>
      {isLoginModalOpen && <LoginModal onClick={startKakaoLogin} onClose={() => setIsLoginModalOpen(false)} />}
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
        <CustomOverlayMap key={`popup-${selectedBakery.bakery.id}`} position={{ lat: selectedBakery.bakery.lat, lng: selectedBakery.bakery.lon }} xAnchor={0.5} yAnchor={1} zIndex={3}>
          <MapBakeryPopup bakery={selectedBakery.bakery} />
        </CustomOverlayMap>
      )}
    </Map>
  );
}

type SearchPanelProps = {
  searchInput: string;
  bakeries: StoreSearchResult[];
  sort: StoreSearchSort;
  favoriteOnly: boolean;
  selectedBakeryId: number | null;
  page: number;
  hasNext: boolean;
  isLoading: boolean;
  isError: boolean;
  onSearchInputChange: (value: string) => void;
  onSearch: (event: FormEvent<HTMLFormElement>) => void;
  onSortChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onFavoriteFilter: () => void;
  onFavoriteToggle: (storeId: number) => void;
  favoritePendingId: number | null;
  onBakerySelect: (bakery: StoreSearchResult) => void;
  onPageChange: (page: number) => void;
};

function SearchPanel({
  searchInput,
  bakeries,
  sort,
  favoriteOnly,
  selectedBakeryId,
  page,
  hasNext,
  isLoading,
  isError,
  onSearchInputChange,
  onSearch,
  onSortChange,
  onFavoriteFilter,
  onFavoriteToggle,
  favoritePendingId,
  onBakerySelect,
  onPageChange,
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
          <button type="button" onClick={onFavoriteFilter} className={`typo-body-04 rounded-2xl border px-3 py-2 ${favoriteOnly ? "border-sub-01 bg-sub-01 text-white" : "border-gray-03 bg-white text-gray-02"}`}>저장됨 ♥️</button>
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
            onFavoriteToggle={onFavoriteToggle}
            favoritePendingId={favoritePendingId}
            onBakerySelect={onBakerySelect}
            onPageChange={onPageChange}
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
  onFavoriteToggle: (storeId: number) => void;
  favoritePendingId: number | null;
  onBakerySelect: (bakery: StoreSearchResult) => void;
  onPageChange: (page: number) => void;
};

function SearchResultContent({ bakeries, selectedBakeryId, page, hasNext, isLoading, isError, onFavoriteToggle, favoritePendingId, onBakerySelect, onPageChange }: SearchResultContentProps) {
  if (isLoading) return <SearchFallback message="검색 결과를 불러오는 중이에요" />;
  if (isError) return <SearchFallback message="검색 결과를 불러오지 못했어요" />;
  if (bakeries.length === 0) return <SearchFallback message="검색 결과가 없어요" />;

  return (
    <>
      {bakeries.map((bakery) => (
        <BakeryCard key={bakery.bakery.id} bakery={bakery} selected={bakery.bakery.id === selectedBakeryId} isFavoritePending={favoritePendingId === bakery.bakery.id} onClick={() => onBakerySelect(bakery)} onFavoriteToggle={() => onFavoriteToggle(bakery.bakery.id)} />
      ))}
      <Pagination page={page} hasNext={hasNext} onPageChange={onPageChange} />
    </>
  );
}

function SearchFallback({ message }: { message: string }) {
  return <div className="typo-body-03 flex min-h-32 flex-1 items-center justify-center text-gray-02">{message}</div>;
}

function BakeryCard({ bakery: result, selected, isFavoritePending, onClick, onFavoriteToggle }: { bakery: StoreSearchResult; selected: boolean; isFavoritePending: boolean; onClick: () => void; onFavoriteToggle: () => void }) {
  const { bakery, likes, visitCnt } = result;
  const menus = bakery.signatureMenu
    .split(",")
    .map((menu) => menu.trim())
    .filter(Boolean);

  return (
    <div className="relative w-full shrink-0">
      <button
        type="button"
        onClick={onClick}
        className={`flex w-full gap-2 rounded-2xl border border-sub-01 p-4 text-left shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)] ${selected ? "bg-yellow-02" : "bg-white"} ${selected ? "border-sub-01" : "border-gray-04"}`}
      >
        <img src={bakery.image || bakeryImage} alt="" className="h-21 w-22 rounded-xl object-cover" />
        <div className="flex w-full min-w-0 flex-col justify-center gap-2">
          <div className="flex items-center">
            <h3 className="typo-head-04 text-black-01 truncate pr-7">{bakery.name}</h3>
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
      <button type="button" onClick={onFavoriteToggle} disabled={isFavoritePending} className="absolute right-6 top-6 disabled:opacity-50">
        <img src={likes ? fullHeartIcon : emptyHeartIcon} alt={likes ? "저장됨" : "저장 안 됨"} className="size-5" />
      </button>
    </div>
  );
}
