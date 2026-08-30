import mainImage from "@/assets/images/detailPage/temp_1.jpeg";
import locationIcon from "@/assets/images/detailPage/location.svg";
import timeIcon from "@/assets/images/detailPage/time.svg";
import phoneIcon from "@/assets/images/detailPage/phone.svg";
import aiIcon from "@/assets/images/detailPage/ai.svg";
import recommendationImage from "@/assets/images/detailPage/temp2.webp";
import cameraIcon from "@/assets/images/detailPage/camera.svg";
import shareIcon from "@/assets/images/detailPage/share.svg";
import rightArrowIcon from "@/assets/images/detailPage/right-arrow.svg";
import Review from "../../review/common/Review";
import { Link } from "react-router";

export default function DesktopDetailPage({ reviewPercentages }: { reviewPercentages: number[] }) {
  return (
    <main className="mx-auto w-274.75 p-6 gap-8 flex">
      <div className="flex-1 min-w-0 flex flex-col gap-8">
        <div className="h-66.25 rounded-3xl overflow-hidden">
          <img src={mainImage} alt="상세페이지 대표 이미지" className="w-full h-full object-cover" />
        </div>
        <Summary />
        <ReviewSummary reviewPercentages={reviewPercentages} />
        <Recommendation />
      </div>
      <div className="w-100 shrink-0 flex flex-col gap-6">
        <FunctionButtons />
        <Reviews />
      </div>
    </main>
  );
}

function Recommendation() {
  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-black-01 text-lg font-bold leading-7">주변 둘러보기</h3>
      <ul className="flex gap-2.5">
        {[1, 2, 3].map((value) => (
          <li key={value} className="flex flex-col items-center gap-2">
            <div className="h-48 w-48 rounded-2xl overflow-hidden">
              <img className="h-full w-full object-cover" src={recommendationImage} />
            </div>
            <p className="text-black-01 text-base font-normal leading-6">대전역</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Reviews() {
  return (
    <section className="flex flex-col gap-4">
      <h3>
        <span className="font-bold text-lg text-black-01">리뷰</span> <span className="font-normal text-lg text-[#99A1AF]">1,234</span>
      </h3>
      <Review starRating={4} />
      <Review starRating={5} />
      <Review starRating={5} />
      <Link to="/detail/review" className="flex py-3 rounded-xl justify-center items-center gap-1">
        <p className="test-gray-500 typo-sub-01">더보기</p>
        <img src={rightArrowIcon} />
      </Link>
    </section>
  );
}

function FunctionButtons() {
  return (
    <div className="p-6 w-full bg-white rounded-3xl shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)] inline-flex flex-col gap-4">
      <button className="py-4 w-full bg-sub-01 rounded-2xl shadow-[0px_4px_6px_-1px_rgba(198,139,89,0.20)] inline-flex justify-center items-center gap-2">
        <img src={cameraIcon} />
        <p className="text-white shadow-[0px_4px_6px_-1px_rgba(198,139,89,0.20)] text-lg font-bold leading-5">로그인하고 방문 인증하기</p>
      </button>
      <button className="w-full py-4 rounded-2xl border border-offset-[-1px] border-gray-03 inline-flex justify-center items-center gap-2">
        <img src={shareIcon} />
        <p className="typo-body-02 text-gray-02">공유</p>
      </button>
    </div>
  );
}

function Summary() {
  return (
    <div>
      <article className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <h2 className="text-black-01 text-4xl font-extrabold">성심당 본점</h2>
          <p className="text-gray-01 typo-body-03">성심당 한 번도 안가봤지만 고로케가 맛있다는 소문을 들었습니다~</p>
        </div>
        <ul className="flex flex-col gap-2 text-gray-700 typo-sub-01">
          <li>
            <div className="flex gap-2 text-gray-01 typo-sub-01">
              <img src={locationIcon} />
              중구 대종로 480번길 15
            </div>
          </li>
          <li>
            <div className="flex gap-2 text-gray-01 typo-sub-01">
              <img src={timeIcon} />
              08:00 - 22:00
            </div>
          </li>
          <li>
            <div className="flex gap-2 text-gray-01 typo-sub-01">
              <img src={phoneIcon} />
              1588-8069
            </div>
          </li>
        </ul>
      </article>
    </div>
  );
}

function ReviewSummary({ reviewPercentages }: { reviewPercentages: number[] }) {
  return (
    <div className="flex flex-col p-5 gap-3 border border-main-05 bg-yellow-02 rounded-2xl">
      <h3 className="flex gap-2 text-black-01 typo-body-02">
        <img src={aiIcon} />
        AI 리뷰 요약
      </h3>
      <ul className="flex gap-2">
        {reviewPercentages.map((value) => (
          <li key={value} className="px-3 py-2 bg-white rounded-[20px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)] border border-sub-01 inline-flex justify-center items-center gap-1">
            <span className="typo-body-03 text-sub-01">속성</span>
            <span className="typo-body-03 text-KUMDORI-01">{value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
