// assets
import star from "../../../assets/icon/star.svg";

type Props = {
  isMobile: boolean;
  storeName: string;
  rating: number;
  region: string;
  imageUrl: string;
  onClick: () => void;
};

export default function Bakery({
  isMobile,
  storeName,
  rating,
  region,
  imageUrl,
  onClick,
}: Props) {
  return (
    <button className={`flex flex-col gap-3`} onClick={onClick}>
      <div
        className={`overflow-hidden ${isMobile ? "w-40 h-35 rounded-xl" : "w-100 h-75 rounded-2xl"}`}
      >
        <img
          src={imageUrl}
          alt={storeName}
          className={`w-full h-full object-cover`}
        />
      </div>
      <div
        className={`flex flex-col items-start ${isMobile ? "gap-1" : "gap-2"}`}
      >
        <p
          className={`text-black-01 ${isMobile ? "typo-body-03" : "typo-head-03"}`}
        >
          {storeName}
        </p>
        <div
          className={`flex items-center ${isMobile ? "typo-sub-02 gap-0.5" : "typo-body-03 gap-1"}`}
        >
          <img src={star} alt="star" className="w-3.5 h-3.5" />
          <div
            className={`text-gray-01 ${isMobile ? "typo-sub-02" : "typo-body-03"}`}
          >
            {rating}
          </div>
          <div
            className={`text-gray-01 ${isMobile ? "typo-sub-02" : "typo-body-03"}`}
          >
            ·
          </div>
          <div
            className={`text-gray-01 ${isMobile ? "typo-sub-02" : "typo-body-03"}`}
          >
            {region}
          </div>
        </div>
      </div>
    </button>
  );
}
