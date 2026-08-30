import PageHeader from "../../common/PageHeader";
import emptyStarIcon from "@/assets/images/reviewPage/star-empty.svg";
import fullStarIcon from "@/assets/images/reviewPage/star-full.svg";
import cameraIcon from "@/assets/images/reviewPage/camera.svg";

type DesktopAddReviewPageProps = {
  score: number;
  keywords: string[];
  onScoreChange: (score: number) => void;
};

export default function DesktopAddReviewPage({ score, keywords, onScoreChange }: DesktopAddReviewPageProps) {
  return (
    <main className="w-213.5 mx-auto p-6 flex flex-col gap-8 text-white typo-head-03">
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
    <section className="flex flex-col p-6 gap-4 justify-center items-center">
      <h3 className="text-gray-900 typo-head-03">빵집은 만족스러웠나요?</h3>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            className="relative flex size-10 touch-manipulation items-center justify-center transition-transform duration-150 hover:scale-110 active:scale-90"
            onClick={() => onScoreChange(value)}
          >
            <img src={emptyStarIcon} alt="" draggable={false} />
            <img
              src={fullStarIcon}
              alt=""
              draggable={false}
              className={`absolute transition-[opacity,transform] duration-200 ease-out ${value <= score ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}
            />
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
        <h3 className="text-black-01 typo-head-02">빠른 키워드</h3>
        <p className="text-gray-02 typo-body-03 mb-px">5개까지 선택 가능</p>
      </div>
      <div className="flex flex-wrap gap-3">
        {keywords.map((value) => (
          <Keyword key={value} title={value} />
        ))}
      </div>
    </section>
  );
}

function Keyword({ title }: { title: string }) {
  return <button className="shrink-0 whitespace-nowrap px-3 py-2 bg-white rounded-[20px] border border-gray-03 text-gray-02 typo-body-03">{title}</button>;
}

function ReviewWrite() {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex gap-3 items-end">
        <h3 className="text-black-01 typo-head-02">한 줄 후기</h3>
        <p className="text-gray-02 typo-body-03 mb-px">5개까지 사진 첨부 가능</p>
      </div>
      <textarea className="h-48 min-h-17 p-4 rounded-2xl border-2 border-gray-03 text-black-01 font-normal placeholder:text-black-02" placeholder="가게에 대한 솔직한 후기를 남겨주세요."></textarea>
    </section>
  );
}

function AddImages() {
  return (
    <section>
      <button className="size-28 rounded-xl border-dashed border-2 border-gray-03 flex justify-center items-center">
        <img src={cameraIcon} />
      </button>
    </section>
  );
}

function AddReviewButton() {
  return <button className="py-4 bg-sub-01 rounded-xl flex justify-center items-center">등록</button>;
}
