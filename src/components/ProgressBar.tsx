type ProgressBarProps = {
  current: number;
  total: number;
};

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const safeCurrent = Math.min(Math.max(current, 0), total);
  const progress = total > 0 ? (safeCurrent / total) * 100 : 0;

  return (
    <div className="w-full">
      {/* <div className="mb-3 flex items-center justify-between">
        <span className="text-[18px] text-gray-01">진행률</span>

        <span className="text-[18px]">
          <span className="text-black-01">{safeCurrent}</span>
          <span className="text-gray-01"> / {total}</span>
        </span>
      </div> */}

      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={safeCurrent}
        className="h-3 w-full overflow-hidden rounded-full bg-gray-100"
      >
        <div
          className="h-full rounded-full bg-sub-01 transition-[width] duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
