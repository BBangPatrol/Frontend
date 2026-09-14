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

const missionTypeToText: Record<string, string> = {
  receipt: "영수증",
  review: "리뷰",
  bakery: "빵집",
  collection: "컬렉션",
};

export default function Mission({
  isMobile,
  onClick,
  title,
  count,
  targetCount,
  missionType,
}: Props) {
  return (
    <button
      className={`flex flex-col border-gray-04 bg-white shadow-card
                  ${isMobile ? "w-49.5 gap-3 rounded-xl p-4" : "w-65 gap-4 rounded-3xl p-5"}`}
      onClick={onClick}
    >
      <div
        className={`flex flex-col w-full items-start justify-between ${isMobile ? "gap-1.5" : "gap-3"}`}
      >
        <div
          className={`rounded-md bg-yellow-01 text-sub-01 py-1 ${isMobile ? "px-1.5 typo-body-05" : "px-2 typo-body-04"}`}
        >
          {missionTypeToText[missionType] || "미션"}
        </div>
        <p
          className={`text-black-01 truncate  ${isMobile ? "typo-body-03" : "typo-body-01"}`}
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
              className={`text-gray-01 ${isMobile ? "typo-sub-03" : "typo-sub-02"}`}
            >
              {targetCount}
            </span>
          </div>
        </div>
        <ProgressBar current={count} total={targetCount} />
      </div>
    </button>
  );
}
