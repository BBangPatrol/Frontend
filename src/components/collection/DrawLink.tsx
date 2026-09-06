import { Link } from "react-router";
import drawButtonIcon from "@/assets/images/collectiblePage/gift-white.svg";

export default function DrawLink() {
  return (
    <Link
      to="/collection/draw"
      className="flex items-center gap-1 px-3 py-2 bg-sub-01 rounded-xl shadow-[0px_4px_6px_-1px_rgba(198,139,89,0.20)] md:ml-auto md:gap-2 md:px-8 md:py-4 md:self-center md:rounded-2xl"
    >
      <img src={drawButtonIcon} className="size-4 md:size-5" />
      <p className="text-white typo-head-05 md:text-lg! md:leading-5!">뽑기 하러가기</p>
    </Link>
  );
}
