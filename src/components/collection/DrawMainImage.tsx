import yellowStar from "@/assets/images/drawPage/yellow-star.svg";
import pinkStar from "@/assets/images/drawPage/pink-star.svg";
import orangeStar from "@/assets/images/drawPage/orange-star.svg";
import giftIcon from "@/assets/images/drawPage/gift.svg";

export default function DrawMainImage() {
  return (
    <div className="flex justify-center items-center p-10">
      <div className="relative size-36 bg-white rounded-[20.44px] shadow-[0px_17px_21px_-4px_rgba(0,0,0,0.10)] border-[3.41px] border-sub-01 flex justify-center items-center">
        <img src={yellowStar} className="absolute right-36 bottom-36" />
        <img src={pinkStar} className="absolute left-40 top-17" />
        <img src={orangeStar} className="absolute left-35 top-30" />
        <img src={giftIcon} />
        <p className="absolute py-1 px-2.5 bg-[#101828] rounded-full text-white typo-body-05 top-32">MYSTERY</p>
      </div>
    </div>
  );
}
