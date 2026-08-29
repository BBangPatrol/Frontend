import starIcon from "@/assets/images/detailPage/star.svg";
import likeIcon from "@/assets/images/detailPage/like.svg";
import fullStarIcon from "@/assets/images/reviewDetailPage/review-full-star.svg";

type ReviewProps = {
  isDetail?: boolean;
  starRating: number;
};

export default function Review({ isDetail = false, starRating }: ReviewProps) {
  return (
    <article className="flex flex-col py-2 gap-3 border-b border-gray-04">
      <header className="flex gap-2 items-center">
        <button className="size-8 bg-main-03 rounded-full justify-center items-center">
          <p className="text-gray-01 text-xs font-bold">김</p>
        </button>
        <p className="text-black-0 text-base font-bold">빵순이1</p>
        {isDetail ? (
          <p className="flex gap-0.5 items-center">
            {Array.from({ length: starRating }).map(() => {
              return <img src={fullStarIcon} />;
            })}
          </p>
        ) : (
          <p className="flex gap-0.5 items-center">
            <img src={starIcon} />
            <p className="text-KUMDORI-01 text-sm font-normal">{starRating}</p>
          </p>
        )}
        <p className="ml-auto self-start text-gray-02 text-xs font-normal">1일 전</p>
      </header>
      <div className={`flex flex-col ${isDetail && "gap-2"}`}>
        <div className="h-5 flex gap-1">
          <div className="h-5 px-1 py-2 rounded-lg border border-sub-01 flex justify-center items-center typo-body-03 text-sub-01">
            디저트가 맛있어요
          </div>
          <div className="h-5 px-1 py-2 rounded-lg border border-sub-01 flex justify-center items-center typo-body-03 text-sub-01">
            뷰가 좋아요
          </div>
        </div>
        <p className="text-gray-01 text-sm font-normal mt-1">
          성심당은 역시 튀소! 평일 오전에 갔는데도 줄이 조금 있었지만 금방 빠졌어요. 빵 종류도 많고
          회전율이 좋아서 따뜻한 빵을 먹을 수 있어서 좋았습니다.
        </p>
      </div>
      <div className="flex">
        <button className="flex self-start bg-gray-04 gap-2 h-7 px-3 py-1.5 rounded-lg justify-start items-center">
          <img src={likeIcon} />
          <div className="flex gap-1 text-gray-02 text-xs font-bold">
            <p className="">도움이 돼요</p>
            <p>3</p>
          </div>
        </button>
        {isDetail && (
          <>
            <button className="ml-5 text-black-02 text-sm underline font-bold">리뷰 수정</button>
            <button className="ml-3 text-black-02 text-sm underline font-bold">리뷰 삭제</button>
          </>
        )}
      </div>
    </article>
  );
}
