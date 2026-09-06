import pointIcon from "@/assets/images/missionPage/point.svg";
import type { Mission as MissionData } from "../../api/missions";

type MissionProps = {
  mission: MissionData;
  isCollecting: boolean;
  onCollectPoint: (missionId: number) => void;
};

const MISSION_POINT = 100;

export default function Mission({ mission, isCollecting, onCollectPoint }: MissionProps) {
  const { id, title, description, count, targetCount, status } = mission;
  const percentage = (count / targetCount) * 100;
  const isCompleted = status === "completed";
  const isNotReceived = status === "notReceived";
  const isFail = status === "fail";
  const containerColor = isCompleted ? "bg-green-50/30 border-green-500/20" : isNotReceived ? "bg-yellow-02 border-sub-01/30" : "bg-white border-gray-04";
  const progressColor = isCompleted ? "text-green" : "text-sub-01";
  const progressBarColor = isCompleted ? "bg-green" : "bg-sub-01";

  return (
    <div className={`p-4 flex flex-col gap-4 md:p-5 md:gap-5 rounded-2xl border-2 ${containerColor} ${isFail ? "opacity-50" : "opacity-100"}`}>
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <h3 className={`typo-head-04 md:text-lg! md:font-extrabold! md:leading-5! text-black-01`}>{title}</h3>
          <p className={`typo-body-04 md:text-sm! md:leading-4! text-gray-02`}>{description}</p>
        </div>
        {isNotReceived ? (
          <button
            type="button"
            disabled={isCollecting}
            onClick={() => onCollectPoint(id)}
            className="typo-body-04 flex self-start items-center gap-1 rounded-lg bg-sub-01 p-1.5 text-white shadow-sm disabled:opacity-60 md:text-base! md:leading-5.5!"
          >
            <img src={pointIcon} alt="" />
            {MISSION_POINT}P 받기
          </button>
        ) : (
          <div className={`flex self-start items-center gap-1 rounded-lg p-1 md:items-center bg-gray-04`}>
            <img src={pointIcon} alt="" />
            <p className={`typo-body-04 md:text-base! md:leading-5.5! text-gray-01`}>{isFail ? "실패" : `${MISSION_POINT}P 적립${isCompleted ? " 완료!" : ""}`}</p>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between">
          <p className={`${progressColor} typo-sub-02 md:text-sm!`}>진행률</p>
          <p className="text-gray-01 typo-body-04 md:text-sm!">
            <span className={progressColor}>{count}</span> / {targetCount}
          </p>
        </div>
        <div className="h-2.5 bg-gray-04 rounded-full ">
          <div className={`h-full rounded-full ${progressBarColor}`} style={{ width: `${percentage}%` }} />
        </div>
      </div>
    </div>
  );
}
