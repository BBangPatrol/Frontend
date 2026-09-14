// assets
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// contexts
import { useResponsive } from "../../contexts/ResponsiveContext";
// utils
import { startKakaoLogin } from "../../utils/kakao";
// assets
import locarion from "../../assets/icon/location.svg";
import book from "../../assets/icon/book.svg";
import right from "../../assets/icon/right.svg";
import lock from "../../assets/icon/lock.svg";
// components
import Bakery from "./components/Bakery";
import Mission from "./components/Mission";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import LoginModal from "../../components/modal/LoginModal";
// hooks
import { useHotStores } from "../../hooks/api/useGetHotStore";
import { useMissions } from "../../hooks/api/useGetMissionAtHome";

export default function HomePage() {
  const navigate = useNavigate();

  const { isMobile } = useResponsive();

  const isLoggedIn = useIsLoggedIn();

  const [showLoginModal, setShowLoginModal] = useState(false);

  const { data: hotData } = useHotStores();
  const { data: missionData } = useMissions(isLoggedIn);

  const notLoginMissionData = {
    missions: [
      {
        id: 1,
        title: "첫 영수증 인증",
        description: "영수증 인증 1회 시도하기",
        count: 0,
        targetCount: 1,
        startDate: null,
        endDate: null,
        completedDate: null,
        status: "inProgress",
        missionType: "receipt",
      },
      {
        id: 2,
        title: "첫 리뷰 작성",
        description: "리뷰 1회 달기",
        count: 0,
        targetCount: 1,
        startDate: null,
        endDate: null,
        completedDate: null,
        status: "inProgress",
        missionType: "review",
      },
      {
        id: 3,
        title: "첫 가챠 뽑기",
        description: "꿈돌이 뽑기 1회 시도하기",
        count: 0,
        targetCount: 1,
        startDate: null,
        endDate: null,
        completedDate: null,
        status: "inProgress",
        missionType: "collection",
      },
      {
        id: 4,
        title: "빵지순례 시작하기",
        description: "첫 번째 빵집 방문 기록 남기기",
        count: 0,
        targetCount: 1,
        startDate: null,
        endDate: null,
        completedDate: null,
        status: "inProgress",
        missionType: "bakery",
      },
    ],
  };

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
          onClick={() => {
            navigate("/map");
          }}
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
            {missionData
              ? missionData.missions.map((mission) => (
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
                        navigate("/mission");
                      }}
                    />
                  </div>
                ))
              : notLoginMissionData.missions.map((mission) => (
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
                        navigate("/mission");
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
                  setShowLoginModal(true);
                }}
              >
                <div className={` ${isMobile ? "w-6 h-6" : "w-8 h-8"}`}>
                  <img src={lock} alt="lock" />
                </div>

                <span
                  className={`rounded-full shadow-btn bg-white text-gray-01
                    ${isMobile ? " px-2 py-1 typo-sub-03" : "px-3 py-1.5 typo-body-03"}`}
                >
                  로그인하고 참여하기
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
      {showLoginModal && (
        <LoginModal
          isMobile={isMobile}
          onClick={startKakaoLogin}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </div>
  );
}
