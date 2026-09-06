import locationIcon from "@/assets/images/detailPage/location.svg";
import timeIcon from "@/assets/images/detailPage/time.svg";
import phoneIcon from "@/assets/images/detailPage/phone.svg";
import type { StoreBakery } from "../../api/stores";

export default function DetailSummary({ bakery }: { bakery: StoreBakery }) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 md:gap-3">
        <h2 className="text-black-01 typo-head-01 md:text-4xl! md:font-extrabold! md:leading-10!">{bakery.name}</h2>
        <p className="text-gray-01 typo-body-03">{bakery.content}</p>
      </div>
      <ul className="flex flex-col gap-1.5 text-gray-01 typo-sub-02 md:gap-2 md:text-sm!">
        <li>
          <div className="flex gap-1 md:gap-2">
            <img src={locationIcon} />
            {bakery.address}
          </div>
        </li>
        <li>
          <div className="flex gap-1 md:gap-2">
            <img src={timeIcon} />
            {bakery.hours}
          </div>
        </li>
        <li>
          <div className="flex gap-1 md:gap-2">
            <img src={phoneIcon} />
            {bakery.phone}
          </div>
        </li>
      </ul>
    </section>
  );
}
