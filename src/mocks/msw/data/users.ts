export const breadCollectionResponse = {
    isSuccess: true,
    code: "200",
    message: "OK",
    data: {
        visits: [
            {
                storeId: 1,
                storeName: "성심당 본점",
                visitDate: "2026-06-06",
                reviewId: null,
                rating: null,
                review: null,
            },
            {
                storeId: 2,
                storeName: "하레하레",
                visitDate: "2026-06-05",
                reviewId: 2,
                rating: 5,
                review: "빵이 맛있고 직원분들이 친절해요.",
            },
        ],
    },
};

export const myPageResponse = {
    isSuccess: true,
    code: "200",
    message: "OK",
    data: {
        nickname: "테스트유저",
        collectionBooks: {
            collected: 14,
            total: 95,
            items: [
                {
                    collectibleId: 2,
                    name: "꿈돌이 소보로빵",
                    rank: "NORMAL",
                    image: "https://pub-f43009aca02b490292930e08c3c58153.r2.dev/items/2.png",
                },
                {
                    collectibleId: 88,
                    name: "꿈돌이 빵다발",
                    rank: "LEGENDARY",
                    image: "https://pub-f43009aca02b490292930e08c3c58153.r2.dev/items/88.png",
                },
            ],
        },
        point: 1250,
        reviews: {
            reviewCount: 7,
            reviewLikes: 42,
        },
        missions: [
            {
                missionId: 1,
                title: "중구 5개 다녀오기",
                count: 3,
                targetCount: 5,
                status: "inProgress",
            },
            {
                missionId: 2,
                title: "수집품 10개 모으기",
                count: 10,
                targetCount: 10,
                status: "notReceived",
            },
        ],
    },
};

export const myPointFirstResponse = {
    isSuccess: true,
    code: "200",
    message: "OK",
    data: {
        point_history: [
            { type: "earn", content: "방문 인증", amount: 1200, date: "2026-06-25T08:00:00" },
            { type: "spend", content: "수집품 뽑기", amount: 100, date: "2026-06-24T07:50:00" },
        ],
        pageInfo: {
            page: 0,
            size: 5,
            totalElements: 7,
            totalPages: 2,
            hasNext: true,
        },
    },
};

export const myPointSecondResponse = {
    isSuccess: true,
    code: "200",
    message: "OK",
    data: {
        point_history: [
            { type: "earn", content: "회원가입 축하 포인트", amount: 300, date: "2026-06-20T08:00:00" },
            { type: "spend", content: "수집품 뽑기", amount: 100, date: "2026-06-19T07:50:00" },
        ],
        pageInfo: {
            page: 1,
            size: 5,
            totalElements: 7,
            totalPages: 2,
            hasNext: false,
        },
    },
};

export const myReviewsFirstResponse = {
    isSuccess: true,
    code: "200",
    message: "OK",
    data: {
        reviews: [
            { bakeryId: 1, bakeryName: "성심당 본점", rating: 5, content: "튀김소보로는 언제 먹어도 맛있어요.", likeCount: 12, date: "2026-05-20T00:00:00" },
            { bakeryId: 2, bakeryName: "하레하레", rating: 5, content: "소금빵 겉바속촉 제대로입니다.", likeCount: 25, date: "2026-05-18T00:00:00" },
        ],
        reviewCount: 7,
        reviewLikes: 111,
        pageInfo: {
            page: 0,
            size: 5,
            totalElements: 7,
            totalPages: 2,
            hasNext: true,
        },
    },
};

export const myReviewsSecondResponse = {
    isSuccess: true,
    code: "200",
    message: "OK",
    data: {
        reviews: [
            { bakeryId: 3, bakeryName: "몽심", rating: 5, content: "디저트가 다양하고 맛있어요.", likeCount: 57, date: "2026-04-19T00:00:00" },
            { bakeryId: 4, bakeryName: "시오네 베이커리", rating: 4, content: "바삭한 바게트와 소금빵이 맛있어요.", likeCount: 17, date: "2026-04-02T00:00:00" },
        ],
        reviewCount: 7,
        reviewLikes: 111,
        pageInfo: {
            page: 1,
            size: 5,
            totalElements: 7,
            totalPages: 2,
            hasNext: false,
        },
    },
};

export const userProfileImage = {
    isSuccess: true,
    code: "200",
    message: "OK",
    data: {
        imageUrl: "https://example.com/images/profile/test-user.jpg",
    },
};
