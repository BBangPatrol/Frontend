import bakeryFallbackImage from "@/assets/images/detailPage/temp_1.jpeg";
import { Link } from "react-router-dom";
import type { StoreSearchBakery } from "../../api/stores";

export default function MapBakeryPopup({ bakery }: { bakery: StoreSearchBakery }) {
  const tags = [...new Set(bakery.signatureMenu.split(",").map((menu) => menu.trim()).filter(Boolean))].slice(0, 3);

  return (
    <div className="pb-12">
      <article className="map-popup-enter w-64 overflow-hidden rounded-2xl border border-gray-03 bg-white p-2.5 shadow-[0_12px_32px_rgba(33,33,33,0.36),0_3px_10px_rgba(33,33,33,0.2)] md:w-72 md:p-3">
        <div className="flex min-w-0 gap-3">
          <img src={bakery.image || bakeryFallbackImage} alt={`${bakery.name} 대표 이미지`} className="size-16 shrink-0 rounded-xl bg-gray-04 object-cover md:size-18" />
          <div className="flex min-w-0 flex-1 flex-col justify-center">
            <strong className="typo-head-05 text-black-01 truncate md:typo-head-04">{bakery.name}</strong>
            {tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {tags.map((tag) => (
                  <span key={tag} className="typo-sub-03 max-w-24 truncate rounded-md bg-main-05 px-1.5 py-1 text-sub-01">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <Link to={`/detail/${bakery.id}`} className="typo-body-04 mt-2.5 flex w-full items-center justify-center gap-1 rounded-xl bg-sub-01 px-3 py-2 text-white shadow-btn transition-colors hover:bg-sub-02">
          상세보기
          <span aria-hidden="true">›</span>
        </Link>
      </article>
    </div>
  );
}
