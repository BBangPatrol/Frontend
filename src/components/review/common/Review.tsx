import starIcon from "@/assets/images/detailPage/star.svg";
import likeIcon from "@/assets/images/detailPage/like.svg";
import fullStarIcon from "@/assets/images/reviewDetailPage/review-full-star.svg";
import { useResponsive } from "../../../contexts/ResponsiveContext";

type ReviewProps = {
  isDetail?: boolean;
  starRating: number;
};

export default function Review({ isDetail = false, starRating }: ReviewProps) {
  const { isMobile } = useResponsive();
  return (
    <article className="flex flex-col py-2 gap-3 border-b border-gray-04">
      <header className="flex gap-2 items-center">
        <button className="size-7 md:size-8 bg-main-03 rounded-full justify-center items-center">
          <p className="text-gray-01 typo-body-04">김</p>
        </button>
        <p className="text-black-01 typo-body-03 md:text-base!">빵순이</p>
        {isDetail && !isMobile ? (
          <p className="flex gap-0.5 items-center">
            {Array.from({ length: starRating }).map((_, index) => (
              <img key={index} src={fullStarIcon} />
            ))}
          </p>
        ) : (
          <p className="flex gap-0.5 items-center">
            <img src={starIcon} />
            <span className="text-KUMDORI-01 typo-sub-02 md:text-sm!">{starRating}</span>
          </p>
        )}
        <p className="ml-auto md:self-start text-gray-02 typo-sub-03 md:text-xs!">1일 전</p>
      </header>
      <div className={`flex flex-col ${isDetail && "gap-2"}`}>
        <div className="h-5 flex gap-1">
          <div className="h-5 px-1 py-2 rounded-lg border border-sub-01 flex justify-center items-center typo-sub-02 md:typo-body-03 text-sub-01">디저트가 맛있어요</div>
          <div className="h-5 px-1 py-2 rounded-lg border border-sub-01 flex justify-center items-center typo-sub-02 md:typo-body-03 text-sub-01">뷰가 좋아요</div>
        </div>
        <p className="text-gray-01 typo-sub-01 mt-1">
          성심당은 역시 대전의 명물! 오전에 갔는데도 줄이 조금 있었지만 금방 빠졌어요. 빵 종류도 많고 회전율이 좋아서 원하는 빵을 먹을 수 있어서 좋았습니다.
        </p>
      </div>
      <div className="flex">
        <button className="flex self-start bg-gray-04 gap-2 h-7 px-3 py-1.5 rounded-lg justify-start items-center">
          <img src={likeIcon} />
          <div className="flex gap-1 text-gray-02 typo-body-04">
            <p>도움이 돼요</p>
            <p>3</p>
          </div>
        </button>
        {isDetail && (
          <>
            <button className="ml-5 text-black-02 typo-body-03 underline">리뷰 수정</button>
            <button className="ml-3 text-black-02 typo-body-03 underline">리뷰 삭제</button>
          </>
        )}
      </div>
    </article>
  );
}
