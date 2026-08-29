import PageHeader from "../components/common/PageHeader";

import medalIcon from "@/assets/images/missionPage/medal.svg";
import pointIcon from "@/assets/images/missionPage/point.svg";

const tempMissionArr = [
  [3, 5],
  [0, 5],
  [4, 5],
  [5, 5],
  [1, 5],
  [0, 5],
];

export default function MissionPage() {
  return (
    <TempContainer>
      <PageHeader title="미션 현황" subTitle="다양한 미션 수행으로 포인트를 얻어보세요!" icon={medalIcon} />
      <MissionList />
    </TempContainer>
  );
}

function MissionList() {
  return (
    <div className="flex flex-col gap-4">
      {tempMissionArr.map((value) => {
        return <Mission a={value[0]} b={value[1]} />;
      })}
    </div>
  );
}

function Mission({ a, b }: { a: number; b: number }) {
  const percentage = (a / b) * 100;
  const isSuccess = a == b;

  return (
    <div className={`p-4 flex flex-col gap-4 ${isSuccess ? "bg-green-50/30" : "bg-white"} rounded-2xl border-2 ${isSuccess ? "border-green-500/20" : "border-gray-04"}`}>
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="text-black-01 text-base font-extrabold">중구 마스터</h3>
          <p className="text-gray-02 text-xs font-bold">대전 중구의 빵집 5곳 방문하기</p>
        </div>
        <div className="flex p-1 gap-1 bg-gray-04 rounded-lg self-start">
          <div>
            <img src={pointIcon} />
          </div>
          <p className="text-gray-01 text-xs font-bold">100P 적립{isSuccess && " 완료!"}</p>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between">
          <p className={`${isSuccess ? "text-green" : "text-sub-01"} text-xs font-normal`}>진행률</p>
          <p className="text-gray-01 text-xs font-bold">
            <span className={`${isSuccess ? "text-green" : "text-sub-01"}`}>{a}</span> / {b}
          </p>
        </div>
        <div className="h-2.5 bg-gray-04 rounded-full ">
          <div className={`h-full rounded-full ${isSuccess ? "bg-green" : "bg-sub-01"}`} style={{ width: `${percentage}%` }} />
        </div>
      </div>
    </div>
  );
}

function TempContainer({ children }: { children: React.ReactNode }) {
  return <main className="p-4 flex flex-col gap-5">{children}</main>;
}
