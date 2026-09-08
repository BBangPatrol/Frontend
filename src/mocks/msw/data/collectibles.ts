const collectibleNames = [
  "꿈돌이 오리지널",
  "꿈돌이 소보로빵",
  "꿈돌이 단팥빵",
  "꿈돌이 크림빵",
  "꿈돌이 소금빵",
  "꿈돌이 식빵",
  "꿈돌이 베이글",
  "꿈돌이 크루아상",
  "꿈돌이 카스텔라",
  "꿈돌이 꽈배기",
  "꿈돌이 프레첼",
  "꿈돌이 바게트",
  "꿈순이 오리지널",
  "꿈순이 소보로빵",
  "꿈순이 소금빵",
  "꿈순이 식빵",
  "꿈순이 베이글",
  "꿈순이 크루아상",
  "꿈순이 카스텔라",
  "꿈순이 꽈배기",
  "꿈순이 프레첼",
  "꿈순이 바게트",
  "네브 오리지널",
  "네브 소보로빵",
  "네브 단팥빵",
  "네브 소금빵",
  "네브 식빵",
  "네브 베이글",
  "네브 크루아상",
  "네브 카스텔라",
  "네브 꽈배기",
  "네브 프레첼",
  "꿈동이 오리지널",
  "꿈동이 소보로빵",
  "꿈동이 단팥빵",
  "꿈동이 크림빵",
  "꿈동이 소금빵",
  "꿈동이 식빵",
  "꿈동이 베이글",
  "꿈동이 크루아상",
  "꿈동이 카스텔라",
  "꿈동이 꽈배기",
  "꿈동이 프레첼",
  "꿈동이 바게트",
  "꿈빛이 오리지널",
  "꿈빛이 소보로빵",
  "꿈빛이 단팥빵",
  "꿈빛이 크림빵",
  "꿈빛이 소금빵",
  "꿈빛이 식빵",
  "꿈빛이 베이글",
  "꿈빛이 크루아상",
  "꿈빛이 카스텔라",
  "꿈빛이 프레첼",
  "꿈빛이 바게트",
  "금돌이 오리지널",
  "금돌이 크림빵",
  "금돌이 식빵",
  "금돌이 베이글",
  "금돌이 크루아상",
  "금돌이 꽈배기",
  "금돌이 프레첼",
  "금돌이 바게트",
  "은순이 오리지널",
  "은순이 소보로빵",
  "은순이 단팥빵",
  "은순이 크림빵",
  "은순이 소금빵",
  "은순이 식빵",
  "은순이 베이글",
  "은순이 크루아상",
  "은순이 꽈배기",
  "은순이 프레첼",
  "은순이 바게트",
  "온빛 오리지널",
  "온빛 소금빵",
  "온빛 베이글",
  "온빛 크루아상",
  "온빛 카스텔라",
  "온빛 프레첼",
  "잼냥이 오리지널",
  "잼냥이 소보로빵",
  "잼냥이 단팥빵",
  "잼냥이 크림빵",
  "잼냥이 소금빵",
  "잼냥이 식빵",
  "93 꿈돌이",
  "꿈돌이 빵다발",
  "93 꿈순이",
  "꿈순이 빵다발",
  "진짜 치와와 쿠키",
  "가짜 치와와 쿠키",
];

const missingCollectibleIds = new Set([3, 12, 18, 29, 44, 58, 76, 90]);
const rareCollectibleIds = new Set([7, 8, 9, 10, 17, 18, 19, 20, 28, 29, 30, 31, 39, 40, 41, 42, 51, 52, 53, 59, 60, 61, 70, 71, 72, 77, 78, 79]);
const epicCollectibleIds = new Set([11, 12, 21, 22, 32, 43, 44, 54, 55, 62, 63, 73, 74, 80]);

const collectionItems = collectibleNames
  .map((name, index) => {
    const collectibleId = index + 1;
    const rank = collectibleId >= 87 ? "LEGENDARY" : epicCollectibleIds.has(collectibleId) ? "EPIC" : rareCollectibleIds.has(collectibleId) ? "RARE" : "NORMAL";

    return {
      collectibleId,
      name,
      rank,
      image: `https://pub-f43009aca02b490292930e08c3c58153.r2.dev/items/${collectibleId}.png`,
    };
  })
  .filter(({ collectibleId }) => !missingCollectibleIds.has(collectibleId));

export const collectionListResponse = {
  isSuccess: true,
  code: "200",
  message: "요청이 성공적입니다.",
  data: {
    items: collectionItems,
    length: collectionItems.length,
  },
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
  message: "요청은 성공적이나, 중복 아이템이 뽑혀 소량의 포인트를 환불해드립니다.",
  data: {
    itemId: 1,
    currentPoint: 1255,
  },
};
