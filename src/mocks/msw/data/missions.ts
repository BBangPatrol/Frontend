export const missionFirstResponse = {
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
      },
      {
        id: 1,
        title: "중구 마스터",
        description: "대전 중구의 빵집 5곳 방문하기",
        count: 3,
        targetCount: 5,
        startDate: null,
        endDate: null,
        completedDate: null,
        status: "inProgress",
      },
      {
        id: 1,
        title: "유성구 마스터",
        description: "대전 유성구의 빵집 5곳 방문하기",
        count: 3,
        targetCount: 5,
        startDate: null,
        endDate: null,
        completedDate: "2026-07-05 22:00:00",
        status: "completed",
      },
    ],
    pageInfo: {
      size: 20,
      hasNext: true,
      nextCursor: 2,
    },
  },
};

export const missionSecondResponse = {
  isSuccess: true,
  code: "200",
  message: "요청이 성공적입니다.",
  data: {
    missions: [
      {
        id: 4,
        title: "미션명 4",
        description: "대전 서구의 빵집 5곳 방문하기",
        count: 5,
        targetCount: 5,
        startDate: null,
        endDate: null,
        completedDate: null,
        status: "notReceived",
      },
      {
        id: 5,
        title: "미션명 5",
        description: "대전 중구의 빵집 5곳 방문하기",
        count: 3,
        targetCount: 5,
        startDate: null,
        endDate: null,
        completedDate: null,
        status: "inProgress",
      },
      {
        id: 6,
        title: "미션명 6",
        description: "대전 유성구의 빵집 5곳 방문하기",
        count: 3,
        targetCount: 5,
        startDate: null,
        endDate: null,
        completedDate: "2026-07-05 22:00:00",
        status: "completed",
      },
    ],
    pageInfo: {
      size: 20,
      hasNext: false,
      nextCursor: null,
    },
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
