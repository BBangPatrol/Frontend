import type { StoreAttraction } from "../../api/stores";

export default function Recommendation({ attractions }: { attractions: StoreAttraction[] }) {
  const visibleAttractions = attractions.slice(0, 3);
  const emptyAttractionCount = 3 - visibleAttractions.length;

  return (
    <section className="flex flex-col gap-3 md:gap-4">
      <h3 className="text-black-01 typo-body-01 md:text-lg! md:font-bold! md:leading-7!">주변 둘러보기</h3>
      <ul className="grid grid-cols-3 gap-2.5">
        {visibleAttractions.map((attraction) => (
          <li key={attraction.contentId} className="min-w-0">
            <a href={`https://map.kakao.com/link/search/${attraction.name}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2">
              <div className="aspect-square w-full rounded-2xl overflow-hidden">
                <img className="h-full w-full object-cover" src={attraction.imageUrl} alt={attraction.name} />
              </div>
              <p className="text-black-01 text-sm font-normal leading-6">{attraction.name}</p>
            </a>
          </li>
        ))}
        {Array.from({ length: emptyAttractionCount }, (_, index) => (
          <li key={`empty-${index}`} className="min-w-0">
            <div className="flex aspect-square w-full justify-center items-center border-gray-03 bg-gray-05 p-2 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)] border-dashed text-2xl font-bold text-gray-03 rounded-2xl overflow-hidden border-2">
              ?
            </div>
          </li>
        ))}
      </ul>
      <p className="text-gray-02 text-xs leading-5">주변 관광지 정보·사진 출처: ⓒ한국관광공사</p>
    </section>
  );
}
