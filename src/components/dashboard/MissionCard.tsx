import medalImage from "@/assets/images/dashboardPage/medal.svg";
import rightBlackArrow from "@/assets/images/dashboardPage/right-black-arrow.svg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { DashboardMission } from "../../api/users";

type MissionCardProps = {
  isMobile: boolean;
  missions: DashboardMission[];
};

export default function MissionCard({ isMobile, missions }: MissionCardProps) {
  const [missionIndex, setMissionIndex] = useState(0);
  const currentMission = missions.length > 0 ? missions[missionIndex % missions.length] : undefined;

  useEffect(() => {
    if (missions.length <= 1) return;

    const intervalId = window.setInterval(() => {
      setMissionIndex((currentIndex) => (currentIndex + 1) % missions.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [missions.length]);

  return (
    <Link to="/mission">
      <section className="flex flex-col p-5 gap-4 rounded-xl bg-white border border-main-05 md:rounded-4xl md:gap-5 md:p-7">
        <div className="flex gap-1.5 items-center">
          <div>
            <img src={medalImage} />
          </div>
          <h3 className={isMobile ? "typo-head-04" : "typo-head-02"}>진행 중 미션</h3>
          <img src={rightBlackArrow} className="ml-auto" />
        </div>
        {currentMission ? (
          <MissionProgress isMobile={isMobile} mission={currentMission} hasMultipleMissions={missions.length > 1} />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 py-3 md:py-5">
            <p className={`${isMobile ? "typo-sub-02" : "typo-sub-01"} text-gray-02`}>아직 진행 중인 미션이 없어요</p>
            <p className={`${isMobile ? "typo-body-04" : "typo-body-03"} text-sub-01 underline underline-offset-2`}>미션 목록 확인하기</p>
          </div>
        )}
      </section>
    </Link>
  );
}

function MissionProgress({ isMobile, mission, hasMultipleMissions }: { isMobile: boolean; mission: DashboardMission; hasMultipleMissions: boolean }) {
  const progressPercentage = mission.targetCount > 0 ? Math.min((mission.count / mission.targetCount) * 100, 100) : 0;
  const statusText = mission.status === "not_received" ? "보상 수령 가능" : "진행 중";
  const fadeClassName = hasMultipleMissions ? "dashboard-mission-fade" : "";

  return (
    <div className="flex flex-col gap-3 md:gap-4.5">
      <div key={mission.missionId} className={`flex flex-col gap-1 md:gap-2 ${fadeClassName}`}>
        <p className={isMobile ? "typo-head-04" : "typo-head-03"}>{mission.title}</p>
        <p className={`${isMobile ? "typo-sub-02" : "typo-body-03"} text-gray-02`}>{statusText}</p>
      </div>
      <div className="flex flex-col gap-1.5">
        <div className={`flex justify-between text-sub-01 ${isMobile ? "typo-body-04" : "typo-body-03"}`}>
          <p>진행률</p>
          <p key={mission.missionId} className={fadeClassName}>
            {mission.count}
            <span className="text-gray-01"> / {mission.targetCount}</span>
          </p>
        </div>
        <div
          className="h-2.5 w-full overflow-hidden rounded-full bg-gray-04"
          role="progressbar"
          aria-label="미션 진행률"
          aria-valuemin={0}
          aria-valuemax={mission.targetCount}
          aria-valuenow={mission.count}
        >
          <div className="h-full rounded-full bg-sub-01 transition-[width] duration-700 ease-in-out" style={{ width: `${progressPercentage}%` }} />
        </div>
      </div>
    </div>
  );
}
