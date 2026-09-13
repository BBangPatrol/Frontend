import pointIcon from "@/assets/images/drawPage/point.svg";

export default function DrawPoint() {
  return (
    <div className="flex gap-2 items-center">
      <div>
        <img src={pointIcon} />
      </div>
      <p className="text-sub-01 typo-head-04">1250 P</p>
    </div>
  );
}
