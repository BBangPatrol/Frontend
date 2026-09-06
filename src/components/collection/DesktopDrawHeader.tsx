import { Link } from "react-router";
import DrawPoint from "./DrawPoint";
import leftArrowIcon from "@/assets/images/reviewDetailPage/left-arrow.svg";

export default function DesktopDrawHeader() {
  return (
    <section className="flex items-center">
      <Link to="/collection" className="flex gap-1 items-center">
        <img src={leftArrowIcon} />
        <p className="text-gray-02 typo-body-03">돌아가기</p>
      </Link>
      <div className="ml-auto">
        <DrawPoint />
      </div>
    </section>
  );
}
