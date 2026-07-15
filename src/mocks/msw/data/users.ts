export const breadCollectionResponse = {
  isSuccess: true,
  code: "200",
  message: "요청이 성공적입니다.",
  data: {
    visits: [
      {
        bakery: {
          id: 1,
          name: "성심당 본점",
          region: "중구",
          date: "2026.06.06",
        },
        review: null,
      },
      {
        bakery: {
          id: 2,
          name: "하레하레",
          region: "서구",
          date: "2026.06.05",
        },
        review: {
          content: "리뷰 내용",
          date: "2026.06.06",
        },
      },
    ],
  },
};

export const myPageResponse = {
  isSuccess: true,
  code: "200",
  message: "요청이 성공적입니다.",
  data: {
    nickname: "testNickname",
    collectionBooks: {
      collected: 14,
      total: 50,
      items: [
        {
          id: 2,
          name: "성심당",
        },
        {
          id: 3,
          name: "하레하레",
        },
      ],
    },
    map: [
      {
        lat: 21.2521561,
        lon: 37.5564153,
      },
      {
        lat: 21.2521561,
        lon: 37.5564153,
      },
    ],
    point: 1250,
    reviews: {
      reviewCount: 7,
      reviewLikes: 42,
    },
    missions: [
      {
        missionId: 1,
        title: "중구 5개 클리어",
        count: 3,
        targetCount: 5,
      },
      {
        missionId: 2,
        title: "미션 2",
        count: 2,
        targetCount: 10,
      },
    ],
  },
};

export const myPointFirstResponse = {
  isSuccess: true,
  code: "200",
  message: "요청이 성공적입니다.",
  data: {
    point_history: [
      {
        type: "earn",
        content: "내용",
        amount: 100,
        date: "2026-06-25 08:00:00",
      },
      {
        type: "spend",
        content: "내용",
        amount: 100,
        date: "2026-06-26 07:50:00",
      },
    ],
    pageInfo: {
      size: 20,
      hasNext: true,
      nextCursor: 2,
    },
  },
};

export const myPointSecondResponse = {
  isSuccess: true,
  code: "200",
  message: "요청이 성공적입니다.",
  data: {
    point_history: [
      {
        type: "spend",
        content: "내용",
        amount: 300,
        date: "2026-06-25 08:00:00",
      },
      {
        type: "spend",
        content: "내용",
        amount: 500,
        date: "2026-06-26 07:50:00",
      },
    ],
    pageInfo: {
      size: 20,
      hasNext: true,
      nextCursor: 1,
    },
  },
};

export const myReviewsFirstResponse = {
  isSuccess: true,
  code: "200",
  message: "요청이 성공적입니다.",
  data: {
    reviews: [
      {
        bakeryId: 1,
        bakeryName: "성심당 본점",
        rating: 5,
        content: "튀소는 언제 먹어도 맛있어요. 사람 많지만 회전율 굿!",
        likeCount: 12,
        date: "2026-05-20 00:00:00",
      },
      {
        bakeryId: 2,
        bakeryName: "하레하레",
        rating: 5,
        content: "소금빵 겉바속촉 제대로입니다. 인생 소금빵 등극!",
        likeCount: 25,
        date: "2026-05-18 00:00:00",
      },
    ],
    pageInfo: {
      size: 20,
      hasNext: true,
      nextCursor: 2,
    },
  },
};

export const myReviewsSecondResponse = {
  isSuccess: true,
  code: "200",
  message: "요청이 성공적입니다.",
  data: {
    reviews: [
      {
        bakeryId: 3,
        bakeryName: "몽심",
        rating: 5,
        content: "디저트들이 너무 맛있고 특히 마들렌이 너무 맛있어요!!",
        likeCount: 57,
        date: "2026-04-19 00:00:00",
      },
      {
        bakeryId: 4,
        bakeryName: "시오네 베이크샵",
        rating: 5,
        content:
          "밑부분이 바삭한 소금빵이 대표적인 빵집이에요. 독특해서 맛있어요.",
        likeCount: 17,
        date: "2026-07-02 00:00:00",
      },
    ],
    pageInfo: {
      size: 20,
      hasNext: true,
      nextCursor: 1,
    },
  },
};
