import PageHeader from "../../common/PageHeader";
import emptyStarIcon from "@/assets/images/reviewPage/star-empty.svg";
import fullStarIcon from "@/assets/images/reviewPage/star-full.svg";
import cameraIcon from "@/assets/images/reviewPage/camera.svg";

type DesktopAddReviewPageProps = {
  score: number;
  keywords: string[];
  onScoreChange: (score: number) => void;
};

export default function MobileAddReviewPage({ score, keywords, onScoreChange }: DesktopAddReviewPageProps) {
  return (
    <main className="p-4 flex flex-col gap-5">
      <PageHeader title="하레하레 리뷰 작성" />
      <form className="flex flex-col gap-8">
        <Rating score={score} onScoreChange={onScoreChange} />
        <KeywordSelect keywords={keywords} />
        <ReviewWrite />
        <AddImages />
        <AddReviewButton />
      </form>
    </main>
  );
}

function Rating({ score, onScoreChange }: { score: number; onScoreChange: (score: number) => void }) {
  return (
    <section className="flex flex-col p-6 gap-2 justify-center items-center">
      <h3 className="text-gray-900 typo-head-04">빵집은 만족스러웠나요?</h3>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            className="relative flex size-7 touch-manipulation items-center justify-center transition-transform duration-150 hover:scale-110 active:scale-90"
            onClick={() => onScoreChange(value)}
          >
            <img src={emptyStarIcon} alt="" draggable={false} />
            <img src={fullStarIcon} alt="" draggable={false} className={`absolute size-6 transition-opacity duration-200 ease-out ${value <= score ? "opacity-100" : "opacity-0"}`} />
          </button>
        ))}
      </div>
    </section>
  );
}

function KeywordSelect({ keywords }: { keywords: string[] }) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex gap-3 items-end">
        <h3 className="text-black-01 typo-head-04">빠른 키워드</h3>
        <p className="text-gray-02 typo-body-04">5개까지 선택 가능</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {keywords.map((value) => (
          <Keyword key={value} title={value} />
        ))}
      </div>
    </section>
  );
}

function Keyword({ title }: { title: string }) {
  return <button className="shrink-0 whitespace-nowrap px-2 py-1 bg-white rounded-[20px] border border-gray-03 text-gray-02 typo-body-04">{title}</button>;
}

function ReviewWrite() {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex gap-3 items-end">
        <h3 className="text-black-01 typo-head-04">한 줄 후기</h3>
        <p className="text-gray-02 typo-body-04">5개까지 사진 첨부 가능</p>
      </div>
      <textarea className="h-32 min-h-17 p-4 rounded-2xl border-2 border-gray-03 text-black-01 typo-sub-01 placeholder:text-black-02" placeholder="가게에 대한 솔직한 후기를 남겨주세요."></textarea>
    </section>
  );
}

function AddImages() {
  return (
    <section>
      <button className="size-24 rounded-xl border-dashed border-2 border-gray-03 flex justify-center items-center">
        <img src={cameraIcon} />
      </button>
    </section>
  );
}

function AddReviewButton() {
  return <button className="py-3 bg-sub-01 rounded-xl flex justify-center items-center typo-head-05 text-white">등록</button>;
}
