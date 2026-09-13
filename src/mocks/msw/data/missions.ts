export const missionsResponse = {
  isSuccess: true,
  code: "200",
  message: "요청이 성공적입니다.",
  data: {
    missions: [
      {
        id: 1,
        title: "서구 마스터",
        description: "대전 서구의 빵집 5곳 방문하기",
        count: 5,
        targetCount: 5,
        startDate: null,
        endDate: null,
        completedDate: null,
        status: "notReceived",
        missionType: "bakery",
      },
      {
        id: 2,
        title: "중구 마스터",
        description: "대전 중구의 빵집 5곳 방문하기",
        count: 3,
        targetCount: 5,
        startDate: null,
        endDate: null,
        completedDate: null,
        status: "inProgress",
        missionType: "bakery",
      },
      {
        id: 3,
        title: "유성구 마스터",
        description: "대전 유성구의 빵집 5곳 방문하기",
        count: 5,
        targetCount: 5,
        startDate: null,
        endDate: null,
        completedDate: "2026-07-05T22:00:00",
        status: "completed",
        missionType: "bakery",
      },
      {
        id: 4,
        title: "대덕구 마스터",
        description: "대전 대덕구의 빵집 5곳 방문하기",
        count: 2,
        targetCount: 5,
        startDate: null,
        endDate: "2026-08-31",
        completedDate: null,
        status: "failed",
        missionType: "bakery",
      },
      ...Array.from({ length: 20 }, (_, index) => {
        const isNotReceived = index % 6 === 0;

        return {
          id: index + 5,
          title: `추가 미션 ${index + 1}`,
          description: "다양한 빵지순례 활동을 완료해보세요.",
          count: isNotReceived ? 5 : index % 5,
          targetCount: 5,
          startDate: null,
          endDate: null,
          completedDate: isNotReceived ? "2026-08-15T12:00:00" : null,
          status: isNotReceived ? "notReceived" : "inProgress",
          missionType: index % 2 === 0 ? "receipt" : "collection",
        };
      }),
    ],
    cursorPageInfo: {
      size: 20,
      hasNext: true,
      nextCursor: 20,
    },
  },
};

export const mainMissionsResponse = {
  isSuccess: true,
  code: "200",
  message: "요청이 성공적입니다.",
  data: {
    missions: missionsResponse.data.missions.slice(0, 4),
  },
};

export const missionRewardResponse = {
  isSuccess: true,
  code: "200",
  message: "요청이 성공적입니다.",
  data: {
    earnPoint: 500,
    totalPoint: 2450,
  },
};
