export const searchResultFirstResponse = {
  isSuccess: true,
  code: "200",
  message: "요청이 성공적입니다.",
  data: {
    result: [
      {
        bakery: {
          id: 1,
          name: "성심당 본점",
          image: "이미지 주소 1",
          avgRating: 4.8,
          lat: 0.0,
          lon: 0.0,
          signatureMenu: "소금빵, 튀김소보로",
          signatureImages: "시그니쳐 이미지1",
        },
        visitCnt: 12,
        likes: true,
      },
      {
        bakery: {
          id: 2,
          name: "하레하레",
          image: "이미지 주소 2",
          avgRating: 4.7,
          lat: 0.0,
          lon: 0.0,
          signatureMenu: "소금빵, 식빵",
          signatureImages: "시그니쳐 이미지2",
        },
        visitCnt: 3,
        likes: false,
      },
      {
        bakery: {
          id: 3,
          name: "콜마르브레드",
          image: "이미지 주소 3",
          avgRating: 4.6,
          lat: 0.0,
          lon: 0.0,
          signatureMenu: "케이크, 소금빵",
          signatureImages: "시그니쳐 이미지3",
        },
        visitCnt: 0,
        likes: true,
      },
      {
        bakery: {
          id: 4,
          name: "성심당 DCC점",
          image: "이미지 주소 4",
          avgRating: 4.5,
          lat: 0.0,
          lon: 0.0,
          signatureMenu: "튀김소보로, 소금빵",
          signatureImages: "시그니쳐 이미지4",
        },
        visitCnt: 0,
        likes: false,
      },
    ],
    pageInfo: {
      size: 20,
      hasNext: true,
      nextCursor: 2, // 마지막 조회된 데이터 id
    },
  },
};

export const searchResultSecondResponse = {
  isSuccess: true,
  code: "200",
  message: "요청이 성공적입니다.",
  data: {
    result: [
      {
        bakery: {
          id: 5,
          name: "성심당 본점22",
          image: "이미지 주소 1",
          avgRating: 4.8,
          lat: 0.0,
          lon: 0.0,
          signatureMenu: "소금빵, 튀김소보로",
          signatureImages: "시그니쳐 이미지1",
        },
        visitCnt: 12,
        likes: true,
      },
      {
        bakery: {
          id: 6,
          name: "하레하레22",
          image: "이미지 주소 2",
          avgRating: 4.7,
          lat: 0.0,
          lon: 0.0,
          signatureMenu: "소금빵, 식빵",
          signatureImages: "시그니쳐 이미지2",
        },
        visitCnt: 3,
        likes: false,
      },
      {
        bakery: {
          id: 7,
          name: "콜마르브레드22",
          image: "이미지 주소 3",
          avgRating: 4.6,
          lat: 0.0,
          lon: 0.0,
          signatureMenu: "케이크, 소금빵",
          signatureImages: "시그니쳐 이미지3",
        },
        visitCnt: 0,
        likes: true,
      },
      {
        bakery: {
          id: 8,
          name: "성심당 DCC점22",
          image: "이미지 주소 4",
          avgRating: 4.5,
          lat: 0.0,
          lon: 0.0,
          signatureMenu: "튀김소보로, 소금빵",
          signatureImages: "시그니쳐 이미지4",
        },
        visitCnt: 0,
        likes: false,
      },
    ],
    pageInfo: {
      size: 20,
      hasNext: true,
      nextCursor: 1,
    },
  },
};

export const storeDetailResponse = {
  isSuccess: true,
  code: "200",
  message: "요청이 성공적입니다.",
  data: {
    bakery: {
      name: "성심당 본점",
      district: "중구",
      address: "중구 대종로 480번길 15",
      phone: "1588-8069",
      hours: "08:00~22:00",
    },
    ai: "string",
    signature: {
      menu: "소금빵, ...",
      image: "시그니처 이미지1",
    },
    reviewCnt: 1234,
    reviews: [
      {
        userName: "빵순이1",
        rating: 4,
        content: "성심당은 역시 튀소!...",
        date: "2026-06-26",
      },
      {
        userName: "빵순이2",
        rating: 5,
        content: "성심당은 역시 튀소!...",
        date: "2026-06-25",
      },
      {
        userName: "빵순이3",
        rating: 5,
        content: "성심당은 역시 튀소!...",
        date: "2026-06-24",
      },
    ], // 3개만
  },
};

export const myFavoriteResponse = {
  isSuccess: true,
  code: "201",
  message: "요청이 성공적입니다.",
  data: {
    likes: true,
  },
};

export const visitVerificationResponse = {
  isSuccess: true,
  code: "201",
  message: "요청이 성공적입니다.",
  data: {
    visitId: 1,
    point: 120,
  },
};

export const getStoreReviewsFirstResponse = {
  isSuccess: true,
  code: "200",
  message: "요청이 성공적입니다.",
  data: {
    reviews: [
      {
        reviewId: 2,
        writerId: 2,
        writerName: "빵순이1",
        rating: 5,
        content: "성심당은 역시 튀소!...",
        keywords: [1, 2, 6],
        images: ["이미지 주소 1", "이미지 주소 2"],
        likeCount: 12,
        date: "2026-05-28 00:00:00",
      },
      {
        reviewId: 1,
        writerId: 1,
        writerName: "빵돌이",
        rating: 4,
        content: "명란바게트가 짭조름하니...",
        keywords: [7],
        images: ["이미지 주소 6"],
        likeCount: 4,
        date: "2026-05-27 00:00:00",
      },
    ],
    pageInfo: {
      size: 20,
      hasNext: true,
      nextCursor: 2,
    },
  },
};

export const getStoreReviewsSecondResponse = {
  isSuccess: true,
  code: "200",
  message: "요청이 성공적입니다.",
  data: {
    reviews: [
      {
        reviewId: 3,
        writerId: 6,
        writerName: "작성자3",
        rating: 5,
        content: "3번째 리뷰 내용 테스트",
        keywords: [1, 2, 6],
        images: ["이미지 주소 1", "이미지 주소 2"],
        likeCount: 12,
        date: "2026-05-28 00:00:00",
      },
      {
        reviewId: 4,
        writerId: 12,
        writerName: "작성자4",
        rating: 4,
        content: "4번째 리뷰 내용 테스트",
        keywords: [7],
        images: ["이미지 주소 6"],
        likeCount: 4,
        date: "2026-05-27 00:00:00",
      },
    ],
    pageInfo: {
      size: 20,
      hasNext: false,
      nextCursor: null,
    },
  },
};
