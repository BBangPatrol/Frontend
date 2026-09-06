import type { StoreAttraction } from "../../api/stores";

export default function Recommendation({ attractions }: { attractions: StoreAttraction[] }) {
  return (
    <section className="flex flex-col gap-3 md:gap-4">
      <h3 className="text-black-01 typo-body-01 md:text-lg! md:font-bold! md:leading-7!">주변 둘러보기</h3>
      <ul className="flex gap-2.5">
        {attractions.map((attraction) => (
          <li key={attraction.contentId}>
            <a href={`https://map.kakao.com/link/search/${attraction.name}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 flex-1 md:flex-none">
              <div className="rounded-2xl overflow-hidden md:h-48 md:w-48">
                <img className="h-full w-full object-cover" src={attraction.imageUrl} alt={attraction.name} />
              </div>
              <p className="text-black-01 text-sm font-normal leading-6">{attraction.name}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
