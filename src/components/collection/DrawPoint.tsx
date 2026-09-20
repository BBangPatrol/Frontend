import pointIcon from "@/assets/images/drawPage/point.svg";
import { useMe } from "../../hooks/api/useMe";

export default function DrawPoint() {
  const meQuery = useMe();

  return (
    <div className="flex gap-2 items-center">
      <div>
        <img src={pointIcon} />
      </div>
      <p className="text-sub-01 typo-head-04">{meQuery.data ? meQuery.data.point.toLocaleString("ko-KR") : "-"} P</p>
    </div>
  );
}
