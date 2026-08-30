import PageHeader from "../../common/PageHeader";
import medalIcon from "@/assets/images/missionPage/medal.svg";
import pointIcon from "@/assets/images/missionPage/point.svg";

export type MissionProgress = [current: number, goal: number];

export default function DesktopMissionPage({ missions }: { missions: MissionProgress[] }) {
  return (
    <main className="max-w-213 mx-auto p-4 flex flex-col gap-8">
      <PageHeader title="미션 현황" subTitle="다양한 미션 수행으로 포인트를 얻어보세요!" icon={medalIcon} />
      <MissionList missions={missions} />
    </main>
  );
}

function MissionList({ missions }: { missions: MissionProgress[] }) {
  return (
    <div className="flex flex-col gap-4">
      {missions.map(([current, goal], index) => (
        <Mission key={index} current={current} goal={goal} />
      ))}
    </div>
  );
}

function Mission({ current, goal }: { current: number; goal: number }) {
  const percentage = (current / goal) * 100;
  const isSuccess = current === goal;

  return (
    <div className={`p-5 flex flex-col gap-5 ${isSuccess ? "bg-green-50/30" : "bg-white"} rounded-2xl border-2 ${isSuccess ? "border-green-500/20" : "border-gray-04"}`}>
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="text-black-01 typo-head-03">중구 마스터</h3>
          <p className="text-gray-02 typo-body-03">대전 중구의 빵집 5곳 방문하기</p>
        </div>
        <div className="flex items-center p-1 gap-1 bg-gray-04 rounded-lg self-start">
          <div>
            <img src={pointIcon} />
          </div>
          <p className="text-gray-01 typo-body-02">100P 적립{isSuccess && " 완료!"}</p>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between">
          <p className={`${isSuccess ? "text-green" : "text-sub-01"} typo-sub-01`}>진행률</p>
          <p className="text-gray-01 typo-body-03">
            <span className={isSuccess ? "text-green" : "text-sub-01"}>{current}</span> / {goal}
          </p>
        </div>
        <div className="h-2.5 bg-gray-04 rounded-full ">
          <div className={`h-full rounded-full ${isSuccess ? "bg-green" : "bg-sub-01"}`} style={{ width: `${percentage}%` }} />
        </div>
      </div>
    </div>
  );
}
