export const searchResultResponse = {
    isSuccess: true,
    code: "200",
    message: "OK",
    data: {
        result: [
            {
                bakery: {
                    id: 77,
                    name: "시나피 건강빵 연구소",
                    image: null,
                    avgRating: null,
                    lat: 36.3748211,
                    lon: 127.3215192,
                    signatureMenu: "울아빠빵, 언니빵, 통밀100%식빵, 통밀단팥빵",
                },
                visitCnt: 0,
                likes: false,
            },
            {
                bakery: {
                    id: 68,
                    name: "코리아팥빵",
                    image: null,
                    avgRating: null,
                    lat: 36.3493082,
                    lon: 127.3886044,
                    signatureMenu: "팥빵, 복분자 팥빵, 생크림 팥빵",
                },
                visitCnt: 0,
                likes: false,
            },
            {
                bakery: {
                    id: 67,
                    name: "작은빵집 토포",
                    image: null,
                    avgRating: null,
                    lat: 36.3221798,
                    lon: 127.3438919,
                    signatureMenu: "우리밀 바게트, 클래식 샌드위치, 뗌&리코타 바게트",
                },
                visitCnt: 0,
                likes: false,
            },
            {
                bakery: {
                    id: 62,
                    name: "만년빵집",
                    image: null,
                    avgRating: null,
                    lat: 36.3668983,
                    lon: 127.3750218,
                    signatureMenu: "치아바타, 식빵, 깜빠뉴, 소금빵",
                },
                visitCnt: 0,
                likes: false,
            },
            {
                bakery: {
                    id: 61,
                    name: "당신을 위한 빵집",
                    image: null,
                    avgRating: null,
                    lat: 36.3626404,
                    lon: 127.3695462,
                    signatureMenu: "호두파이, 쌀쿠키, 쌀바게트, 쌀쉬폰",
                },
                visitCnt: 0,
                likes: false,
            },
            {
                bakery: {
                    id: 60,
                    name: "달코미식빵",
                    image: null,
                    avgRating: null,
                    lat: 36.2997282,
                    lon: 127.3351922,
                    signatureMenu: "쫀득단팥빵, 베리김베뉴, 건과류실빵, 코코넛식빵",
                },
                visitCnt: 0,
                likes: false,
            },
            {
                bakery: {
                    id: 56,
                    name: "빵앗간",
                    image: null,
                    avgRating: null,
                    lat: 36.2999937,
                    lon: 127.3356482,
                    signatureMenu: "앙버터, 망모스빵, 발효종빵(화이트, 통밀)",
                },
                visitCnt: 0,
                likes: false,
            },
            {
                bakery: {
                    id: 55,
                    name: "빵드슈",
                    image: null,
                    avgRating: null,
                    lat: 36.3498481,
                    lon: 127.3961593,
                    signatureMenu: "소금빵, 휘낭시에, 브라우니, 에그타르트",
                },
                visitCnt: 0,
                likes: false,
            },
            {
                bakery: {
                    id: 48,
                    name: "내가 잘가는 빵집",
                    image: null,
                    avgRating: null,
                    lat: 36.3473732,
                    lon: 127.3681442,
                    signatureMenu: "밤식빵, 키라슈케익, 소금빵, 쇼콜라 종류",
                },
                visitCnt: 0,
                likes: false,
            },
            {
                bakery: {
                    id: 46,
                    name: "싶빵공장",
                    image: null,
                    avgRating: null,
                    lat: 36.3059772,
                    lon: 127.3505168,
                    signatureMenu: "아몬드 크루아상, 커스터드 크림 크루아상, 데니쉬식빵",
                },
                visitCnt: 0,
                likes: false,
            },
            {
                bakery: {
                    id: 17,
                    name: "언니네빵집",
                    image: null,
                    avgRating: null,
                    lat: 36.3498539,
                    lon: 127.4465791,
                    signatureMenu: "소금빵, 쌀빵, 통쏘, 망모스",
                },
                visitCnt: 0,
                likes: false,
            },
            {
                bakery: {
                    id: 9,
                    name: "오늘의빵집",
                    image: null,
                    avgRating: null,
                    lat: 36.4381476,
                    lon: 127.4229497,
                    signatureMenu: "밤모스, 무화과 깜빠뉴, 크로와상, 크랜베리 호두브라드",
                },
                visitCnt: 0,
                likes: false,
            },
            {
                bakery: {
                    id: 8,
                    name: "빵굽는나라",
                    image: null,
                    avgRating: null,
                    lat: 36.4471857,
                    lon: 127.4254844,
                    signatureMenu: "페스츄리, 바질크링치즈, 우도땅콩크림빵",
                },
                visitCnt: 0,
                likes: false,
            },
        ],
        cursorPageInfo: {
            size: 13,
            hasNext: false,
            nextCursor: null,
        },
    },
};

export const hotStoresResponse = {
    isSuccess: true,
    code: "200",
    message: "OK",
    data: {
        stores: [
            { storeId: 2, storeName: "보보로베이커리", rating: 4.8, region: "대덕구" },
            { storeId: 1, storeName: "성심당 본점", rating: 4.7, region: "중구" },
            { storeId: 68, storeName: "코리아팥빵", rating: 4.5, region: "서구" },
        ],
    },
};

export const storeDetailResponse = {
    isSuccess: true,
    code: "200",
    message: "OK",
    data: {
        bakery: {
            id: 2,
            name: "보보로베이커리",
            region: "대덕구",
            address: "대전광역시 대덕구 계족산로 81번길 96, 1층",
            lat: 36.3666839,
            lon: 127.4373045,
            phone: "042-632-0445",
            hours: "7:30-22:00, 명절당일 휴무",
            avgRating: null,
            signatureMenu: "어니언바게트, 폭신폭신몽블랑, 게랑드소금빵",
            summary: "어니언 바게트와 소금빵이 특히 맛있다는 평가가 많고, 다양한 빵과 친절한 서비스가 좋은 반응을 얻고 있어요.",
            content:
                "다양한 빵과 주문제작 케이크를 판매하는 송촌동의 베이커리 카페다. 대전의 유명 제과점들을 거치고 각종 대회에서 수상한 20년 경력의 대표가 운영하고 있다. 자연주의를 지향하며 신선한 우리 농산물을 사용한 빵을 선보이고 있다. 바삭한 후츠 바게트에 양파와 크림치즈, 생크림으로 만든 비법 크림이 들어간 '어니언 바게트'가 이곳의 시그니처다.",
            image: null,
        },
        visitCnt: 0,
        likes: false,
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
        visitDetailId: 1,
        point: 1200,
    },
};

export const storeReviews = [
    {
        id: 37,
        writerId: 7,
        writerName: "빵순이1",
        writerImageUrl: "https://example.com/profiles/7.jpg",
        rating: 5,
        content: "성심당은 역시 튀소!",
        keywords: [1, 2, 6],
        images: ["https://example.com/reviews/37-1.jpg"],
        thumbnails: ["https://example.com/reviews/37-1_thumb.jpg"],
        likeCount: 12,
        isLike: true,
        date: "2026-05-28T14:32:10",
    },
    {
        id: 36,
        writerId: 1,
        writerName: "빵돌이",
        writerImageUrl: "https://example.com/profiles/1.jpg",
        rating: 4,
        content: "명란바게트가 짭조름하고 맛있어요.",
        keywords: [3, 4],
        images: [],
        thumbnails: [],
        likeCount: 4,
        isLike: false,
        date: "2026-05-27T11:20:00",
    },
    ...Array.from({ length: 35 }, (_, index) => ({
        id: 35 - index,
        writerId: (index % 8) + 1,
        writerName: `빵지순례자${index + 1}`,
        writerImageUrl: null,
        rating: 5 - (index % 5),
        content: "빵이 맛있고 매장이 쾌적해서 다시 방문하고 싶어요.",
        keywords: [(index % 12) + 1],
        images: [],
        thumbnails: [],
        likeCount: index % 10,
        isLike: index % 3 === 0,
        date: `2026-04-${String(30 - (index % 30)).padStart(2, "0")}T10:00:00`,
    })),
];

export const receiptVerificationResultResponse = {
    isSuccess: true,
    code: "200",
    message: "요청이 성공적입니다.",
    data: {
        bakeryName: "성심당 본점",
        date: "2026-05-23",
        amount: 12100,
        menu: "소금빵, 튀김소보로...",
        verificationToken: "334775f4097d799a5a7793944c6d2c8ccd0d6e2696f85962c02719b9ea298af0",
    },
};

export const receiptMatchResultResponse = {
    ...receiptVerificationResultResponse,
    data: {
        storeId: 2,
        storeName: "성심당 본점",
        ...receiptVerificationResultResponse.data,
    },
};
