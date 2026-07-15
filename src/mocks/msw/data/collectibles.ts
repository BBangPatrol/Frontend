export const collectionListResponse = {
  isSuccess: true,
  code: "200",
  message: "요청이 성공적입니다.",
  data: {
    items: [
      {
        collectibleId: 1,
        name: "황금 컵",
        image: "황금 컵 이미지",
      },
      {
        collectibleId: 2,
        name: "은빛 열쇠",
        image: "은빛 열쇠 이미지",
      },
    ],
    length: 2,
  },
  errors: null,
};

export const collectionDrawResponse = {
  isSuccess: true,
  code: "201",
  message: "뽑기에 성공했습니다.",
  data: {
    itemId: 1,
    currentPoint: 1250,
  },
};

export const collectionDrawDuplicateResponse = {
  isSuccess: true,
  code: "200",
  message:
    "요청은 성공적이나, 중복 아이템이 뽑혀 소량의 포인트를 환불해드립니다.",
  data: {
    itemId: 1,
    currentPoint: 1255,
  },
};
