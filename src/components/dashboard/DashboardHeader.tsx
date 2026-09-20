import cameraImage from "@/assets/images/dashboardPage/camera.svg";
import logoImage from "@/assets/icon/d.png";
import { Link } from "react-router-dom";

type DashboardHeaderProps = {
  isMobile: boolean;
  nickname: string;
  profileImageUrl: string | null;
};

export default function DashboardHeader({
  isMobile,
  nickname,
  profileImageUrl,
}: DashboardHeaderProps) {
  return (
    <section className="flex">
      <div className="flex gap-3 items-center">
        <div className="size-10 rounded-full overflow-hidden">
          <img
            className="size-full object-cover"
            src={profileImageUrl ?? logoImage}
            alt={`${nickname} 프로필`}
          />
        </div>
        <h2 className="text-2xl font-extrabold text-bl ack-01">
          안녕, <span className="text-sub-01">{nickname}</span>!
        </h2>
      </div>
      {!isMobile && (
        <Link
          to="/receipt/verify"
          className="flex gap-2 ml-auto px-8 py-4 bg-sub-01 text-white rounded-2xl typo-head-03"
        >
          <img src={cameraImage} />
          <p>영수증으로 방문 인증</p>
        </Link>
      )}
    </section>
  );
}
