import emptyStarIcon from "@/assets/images/reviewPage/star-empty.svg";
import fullStarIcon from "@/assets/images/reviewPage/star-full.svg";

type AddReviewRatingProps = {
  score: number;
  onScoreChange: (score: number) => void;
};

export default function AddReviewRating({ score, onScoreChange }: AddReviewRatingProps) {
  return (
    <section className="flex flex-col p-6 gap-2 justify-center items-center md:gap-4">
      <h3 className="text-gray-900 typo-head-04 md:text-lg! md:leading-5!">빵집은 만족스러웠나요?</h3>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            className="relative flex size-7 touch-manipulation items-center justify-center transition-transform duration-150 hover:scale-110 active:scale-90 md:size-10"
            onClick={() => onScoreChange(value)}
          >
            <img src={emptyStarIcon} alt="" draggable={false} />
            <img
              src={fullStarIcon}
              alt=""
              draggable={false}
              className={`absolute size-6 transition-opacity duration-200 ease-out md:size-auto md:transition-[opacity,transform] ${
                value <= score ? "opacity-100 md:scale-100" : "opacity-0 md:scale-75"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
