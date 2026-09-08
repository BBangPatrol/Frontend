import aiIcon from "@/assets/images/detailPage/ai.svg";

export default function ReviewSummary({ reviewPercentages }: { reviewPercentages: number[] }) {
  return (
    <div className="flex flex-col p-3 gap-3 border border-main-05 bg-yellow-02 rounded-xl md:p-5 md:rounded-2xl">
      <h3 className="flex gap-1 text-black-01 typo-body-03 md:gap-2 md:text-base! md:leading-5.5!">
        <img src={aiIcon} className="size-4 md:size-auto" />
        AI 리뷰 요약
      </h3>
      <ul className="flex gap-2 flex-wrap md:flex-nowrap">
        {reviewPercentages.map((value) => (
          <li key={value} className="px-2 py-1.5 bg-white rounded-[20px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)] border border-sub-01 inline-flex justify-center items-center gap-1 md:px-3 md:py-2">
            <span className="typo-body-04 text-sub-01 md:text-sm!">속성</span>
            <span className="typo-body-04 text-KUMDORI-01 md:text-sm!">{value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
