// assets
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
// contexts
import { useResponsive } from "../../contexts/ResponsiveContext";
// assets
import locarion from "../../assets/icon/location.svg";
import book from "../../assets/icon/book.svg";
import right from "../../assets/icon/right.svg";
// components
import Bakery from "./components/Bakery";
import Mission from "./components/Mission";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
// hooks
import { useHotStores } from "../../hooks/api/useGetHotStore";
import { useMissions } from "../../hooks/api/useGetMissionAtHome";

export default function HomePage() {
  const navigate = useNavigate();

  const { isMobile } = useResponsive();

  const isLoggedIn = useIsLoggedIn();

  const { data: hotData } = useHotStores();
  const { data: missionData } = useMissions();

  // const hotData = {
  //   stores: [
  //     {
  //       storeId: 1,
  //       storeName: "성심당 본점",
  //       rating: 4.8,
  //       region: "서구",
  //       imageUrl:
  //         "https://i.namu.wiki/i/8MZZehLGZ1TCO4G7sBivu6GwEpFxajfYyXJ-m-2SIdrIH-4_1amvSyW-6fWykumnu0koFi6LZGNMJLV1O9k7sg.webp",
  //     },
  //     {
  //       storeId: 2,
  //       storeName: "성심당 서구점",
  //       rating: 4.3,
  //       region: "서구",
  //       imageUrl:
  //         "https://image.wiselycompany.co.kr/prod/products/2952/1X1_4ba87d44.webp?w=1500&q=90&f=webp",
  //     },
  //     {
  //       storeId: 3,
  //       storeName: "성심당 동구점",
  //       rating: 4.1,
  //       region: "동구",
  //       imageUrl:
  //         "https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/cf80/live/a2d43f00-7087-11f0-8dbd-f3d32ebd3327.jpg.webp",
  //     },
  //     {
  //       storeId: 4,
  //       storeName: "성심당 유성점",
  //       rating: 3.5,
  //       region: "유성구",
  //       imageUrl:
  //         "https://minio.nculture.org/amsweb-opt/multimedia_assets/197/85642/92264/c/%EA%B2%BD%EC%A3%BC-%ED%99%A9%EB%82%A8%EB%B9%B5-%281%29-medium-size.jpg",
  //     },
  //     {
  //       storeId: 5,
  //       storeName: "성심당 대전역점",
  //       rating: 2.1,
  //       region: "대전역구",
  //       imageUrl:
  //         "https://thebreadbag.co.kr/wp-content/uploads/2025/05/%EB%B9%B5%EB%B0%B1%ED%99%94%EC%A0%90_1.jpg",
  //     },
  //   ],
  // };

  // const missionData = {
  //   missions: [
  //     {
  //       id: 1,
  //       title: "서구 마스터",
  //       description: "대전 서구의 빵집 5곳 방문하기",
  //       count: 5,
  //       targetCount: 5,
  //       startDate: null,
  //       endDate: null,
  //       completedDate: null,
  //       status: "notReceived",
  //       missionType: "bakery",
  //     },
  //     {
  //       id: 2,
  //       title: "중구 마스터",
  //       description: "대전 중구의 빵집 5곳 방문하기",
  //       count: 3,
  //       targetCount: 5,
  //       startDate: null,
  //       endDate: null,
  //       completedDate: null,
  //       status: "inProgress",
  //       missionType: "bakery",
  //     },
  //     {
  //       id: 5,
  //       title: "빵 평론가",
  //       description: "리뷰 10개 작성하기",
  //       count: 0,
  //       targetCount: 10,
  //       startDate: null,
  //       endDate: null,
  //       completedDate: null,
  //       status: "inProgress",
  //       missionType: "review",
  //     },
  //     {
  //       id: 3,
  //       title: "유성구 마스터",
  //       description: "대전 유성구의 빵집 5곳 방문하기",
  //       count: 5,
  //       targetCount: 5,
  //       startDate: null,
  //       endDate: null,
  //       completedDate: "2026-07-05 22:00:00",
  //       status: "completed",
  //       missionType: "bakery",
  //     },
  //   ],
  // };

  return (
    <div
      className={`flex flex-col items-start justify-center max-w-7xl mx-auto ${isMobile ? "p-4 gap-8" : "p-6 gap-12"} mb-40`}
    >
      {/* Banner */}
      <section
        className={`flex flex-col items-start justify-center w-full bg-main-05 ${isMobile ? "p-8 gap-4 rounded-xl" : "p-14 gap-8 rounded-4xl h-120"}`}
      >
        <div
          className={`flex flex-col items-start justify-center ${isMobile ? "gap-2" : "gap-4"}`}
        >
          <p
            className={`text-black-01 ${isMobile ? "typo-head-01" : "font-extrabold text-[60px] leading-15"}`}
          >
            대전을 굽다
          </p>
          <p
            className={`text-gray-01 ${isMobile ? "typo-body-04" : "font-bold text-[20px]"}`}
          >
            내가 다녀온 빵집을 도감으로 채워보세요
          </p>
        </div>
        <button
          className={`flex items-center justify-center rounded-full bg-black-01 text-white ${isMobile ? "typo-body-04  py-2 px-4" : "typo-body-02 py-3.5 px-8"}`}
        >
          지금 둘러보기
        </button>
      </section>
      {/* Hot Bakery List */}
      <div
        className={`flex flex-col items-center justify-center w-full ${isMobile ? "gap-4" : "gap-6"}`}
      >
        <div className={`flex w-full items-center justify-between`}>
          {/* 내 위치에서 가까운 빵집 */}
          <div
            className={`flex w-full flex-1 items-center justify-start ${isMobile ? "gap-1" : "gap-2"}`}
          >
            <div className={` ${isMobile ? "w-5 h-5" : "w-6 h-6"}`}>
              <img src={locarion} alt="location" />
            </div>
            <p
              className={`text-black-01 ${isMobile ? "typo-head-04" : "typo-head-01"}`}
            >
              내 위치에서 가까운
            </p>
          </div>
          <div
            className={`flex items-center justify-center ${isMobile ? "gap-1" : "gap-1"}`}
          >
            <p
              className={`text-gray-02 ${isMobile ? "typo-sub-03" : "typo-sub-01"}`}
            >
              전체보기
            </p>
            <div className={` ${isMobile ? "w-3 h-3" : "w-4 h-4"}`}>
              <img src={right} alt="right" />
            </div>
          </div>
        </div>
        <div
          className={`no-scrollbar flex w-full min-w-0 max-w-full items-start justify-start overflow-x-auto ${
            isMobile ? "gap-4" : "gap-6"
          }`}
        >
          {/* isMobile이 false면 0~2번 인덱스까지만 자릅니다 */}
          {hotData &&
            hotData.stores.slice(0, isMobile ? undefined : 3).map((store) => (
              <div key={store.storeId} className="shrink-0">
                <Bakery
                  isMobile={isMobile}
                  storeName={store.storeName}
                  rating={store.rating}
                  region={store.region}
                  imageUrl={store.imageUrl}
                  onClick={() => {}}
                />
              </div>
            ))}
        </div>
      </div>
      {/* Mission List */}
      <div
        className={`flex flex-col items-center justify-center w-full ${isMobile ? "gap-4" : "gap-6"}`}
      >
        <div className={`flex w-full items-center justify-between`}>
          <div
            className={`flex w-full flex-1 items-center justify-start ${isMobile ? "gap-1" : "gap-2"}`}
          >
            <div className={` ${isMobile ? "w-5 h-5" : "w-6 h-6"}`}>
              <img src={book} alt="book" />
            </div>
            <p
              className={`text-black-01 ${isMobile ? "typo-head-04" : "typo-head-01"}`}
            >
              미션 수행하러 가기
            </p>
          </div>
          {isLoggedIn && (
            <button
              className={`flex items-center justify-center ${isMobile ? "gap-1" : "gap-1"}`}
              onClick={() => {
                navigate("/mission");
                // 전체보기 버튼 클릭 시 동작
              }}
            >
              <p
                className={`text-gray-02 ${isMobile ? "typo-sub-03" : "typo-sub-01"}`}
              >
                전체보기
              </p>
              <div className={` ${isMobile ? "w-3 h-3" : "w-4 h-4"}`}>
                <img src={right} alt="right" />
              </div>
            </button>
          )}
        </div>
        <div className="relative w-full overflow-hidden">
          {/* 미션 목록 */}
          <div
            className={`no-scrollbar flex w-full min-w-0 max-w-full items-start justify-start overflow-x-auto ${
              isMobile ? "gap-4" : "gap-6"
            } ${!isLoggedIn ? "pointer-events-none select-none" : ""}`}
            aria-disabled={!isLoggedIn}
          >
            {missionData &&
              missionData.missions.map((mission) => (
                <div key={mission.id} className="shrink-0">
                  <Mission
                    isMobile={isMobile}
                    title={mission.title}
                    count={mission.count}
                    targetCount={mission.targetCount}
                    missionType={mission.missionType}
                    onClick={() => {
                      if (!isLoggedIn) return;

                      // 로그인 상태에서 실행할 동작
                    }}
                  />
                </div>
              ))}
          </div>

          {/* 비로그인 오버레이 */}
          {!isLoggedIn && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/65">
              <button
                type="button"
                className="flex flex-col items-center gap-1"
                onClick={() => {
                  // 실제 로그인 페이지로 보낼 경우
                  // navigate("/login");
                }}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className={`${isMobile ? "h-7 w-7" : "h-8 w-8"} text-gray-02`}
                >
                  <rect
                    x="5"
                    y="10"
                    width="14"
                    height="11"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M8 10V7a4 4 0 0 1 8 0v3"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>

                <span
                  className={`rounded-full border border-gray-03 bg-white px-3 py-1 text-black-01 shadow-sm ${
                    isMobile ? "typo-sub-03" : "typo-body-04"
                  }`}
                >
                  로그인하고 참여하기
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
