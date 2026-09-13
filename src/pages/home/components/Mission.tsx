// components
import ProgressBar from "../../../components/ProgressBar";

type Props = {
  isMobile: boolean;
  onClick: () => void;
  title: string;
  count: number;
  targetCount: number;
  missionType: string;
};

export default function Mission({
  isMobile,
  onClick,
  title,
  count,
  targetCount,
  missionType,
}: Props) {
  const missionMockData = {
    missions: [
      {
        id: 1,
        title: "서구 마스터",
        description: "대전 서구의 빵집 5곳 방문하기",
        count: 5,
        targetCount: 5,
        startDate: null,
        endDate: null,
        completedDate: null,
        status: "notReceived",
        missionType: "bakery",
      },
      {
        id: 2,
        title: "중구 마스터",
        description: "대전 중구의 빵집 5곳 방문하기",
        count: 3,
        targetCount: 5,
        startDate: null,
        endDate: null,
        completedDate: null,
        status: "inProgress",
        missionType: "bakery",
      },
      {
        id: 5,
        title: "빵 평론가",
        description: "리뷰 10개 작성하기",
        count: 0,
        targetCount: 10,
        startDate: null,
        endDate: null,
        completedDate: null,
        status: "inProgress",
        missionType: "review",
      },
      {
        id: 3,
        title: "유성구 마스터",
        description: "대전 유성구의 빵집 5곳 방문하기",
        count: 5,
        targetCount: 5,
        startDate: null,
        endDate: null,
        completedDate: "2026-07-05 22:00:00",
        status: "completed",
        missionType: "bakery",
      },
    ],
  };

  return (
    <button
      className={`flex flex-col items-center justify-content border-gray-04 bg-white shadow-card
                  ${isMobile ? "w-49.5 gap-3 rounded-xl p-4" : "w-65 gap-4 rounded-3xl p-5"}`}
      onClick={onClick}
    >
      <div
        className={`flex flex-col w-full items-center justify-between ${isMobile ? "gap-1.5" : "gap-3"}`}
      >
        <div
          className={`rounded-md bg-yellow-02 text-sub-01 py-1 ${isMobile ? "px-1.5 typo-body-05" : "px-2 typo-body-04"}`}
        >
          {missionType}
        </div>
        <p
          className={`text-black-01 ${isMobile ? "typo-body-03" : "typo-body-01"}`}
        >
          {title}
        </p>
      </div>
      <div
        className={`flex w-full flex-col items-center justify-between ${isMobile ? "gap-1" : "gap-2"}`}
      >
        <div
          className={`flex w-full items-center justify-between ${isMobile ? "typo-sub-03" : "typo-sub-02"}`}
        >
          <p
            className={`text-gray-01 ${isMobile ? "typo-sub-02" : "typo-sub-01"}`}
          >
            진행률
          </p>
          <div>
            <span
              className={`text-black-01 ${isMobile ? "typo-body-05" : "typo-body-04"}`}
            >
              {count}
            </span>
            /
            <span
              className={`text-gray-01 ${isMobile ? "typo-sub-02" : "typo-sub-01"}`}
            >
              {targetCount}
            </span>
          </div>
        </div>
        <div>
          <ProgressBar current={count} total={targetCount} />
        </div>
      </div>
    </button>
  );
}
