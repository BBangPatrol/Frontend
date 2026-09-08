import Keyword from "./Keyword";

export default function KeywordSelect({ keywords }: { keywords: string[] }) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex gap-3 items-end">
        <h3 className="text-black-01 typo-head-04 md:text-xl! md:leading-5.5!">빠른 키워드</h3>
        <p className="text-gray-02 typo-body-04 md:mb-px md:text-sm!">5개까지 선택 가능</p>
      </div>
      <div className="flex flex-wrap gap-2 md:gap-3">
        {keywords.map((value) => (
          <Keyword key={value} title={value} />
        ))}
      </div>
    </section>
  );
}
