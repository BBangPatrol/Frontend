import { http, HttpResponse } from "msw";
import { getMockAuthState } from "../utils/auth";

// data
import { unauthorized } from "../data/common";
import {
    hotStoresResponse,
    receiptVerificationResultResponse,
    searchResultResponse,
    storeReviews,
    storeDetailResponse,
    visitVerificationResponse,
} from "../data/stores";
import { apiUrl } from "../../../api/config";

const MAX_RECEIPT_IMAGE_SIZE = 10 * 1024 * 1024;
const MAX_REVIEW_IMAGE_SIZE = 15 * 1024 * 1024;
const MAX_REVIEW_TOTAL_IMAGE_SIZE = 60 * 1024 * 1024;
const RECEIPT_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/webp", "image/heic", "image/heif"];
const RECEIPT_IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif"];
const REVIEW_IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
const favoriteStoreIds = new Set<number>();
const likedReviewIds = new Set<number>();

type visitVerificationRequestBody = {
    totalAmount: number;
    date: string;
    verificationToken: string;
};

async function readJsonBody<T>(request: Request): Promise<T | null> {
    try {
        return (await request.json()) as T;
    } catch {
        return null;
    }
}

export const storesHandlers = [
    // [get] 지도 검색
    http.get(apiUrl("stores/search"), ({ request }) => {
        const url = new URL(request.url);
        const sort = url.searchParams.get("sort") ?? "distance";
        const lat = Number(url.searchParams.get("lat"));
        const lon = Number(url.searchParams.get("lon"));

        if (!["distance", "rating", "visit"].includes(sort) || (sort === "distance" && (!url.searchParams.has("lat") || !url.searchParams.has("lon") || !Number.isFinite(lat) || !Number.isFinite(lon)))) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "COMMON400",
                    message: "잘못된 요청입니다.",
                },
                { status: 400 },
            );
        }

        const name = url.searchParams.get("name")?.trim().toLowerCase();
        const result = name ? searchResultResponse.data.result.filter(({ bakery }) => bakery.name.toLowerCase().includes(name)) : searchResultResponse.data.result;
        return HttpResponse.json({
            ...searchResultResponse,
            message: "요청이 성공적입니다.",
            data: {
                result,
                cursorPageInfo: {
                    size: result.length,
                    hasNext: false,
                    nextCursor: null,
                },
            },
        });
    }),

    // [get] 인기 빵집 조회
    http.get(apiUrl("stores/hot"), () => {
        return HttpResponse.json(hotStoresResponse);
    }),

    // [post] 즐겨찾기 추가
    // storeId = 999 로 존재하지 않는 가게(404) 테스트
    // storeId = 789 로 요청 충돌(409) 테스트
    http.post(apiUrl("stores/:storeId/favorites"), ({ request, params }) => {
        if (getMockAuthState(request) !== "valid") {
            return HttpResponse.json(unauthorized, { status: 401 });
        }

        const storeId = Number(params.storeId);
        if (storeId == 999) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "404",
                    message: "존재하지 않는 가게입니다.",
                    data: null,
                },
                { status: 404 },
            );
        }
        const likes = !favoriteStoreIds.has(storeId);
        if (likes) favoriteStoreIds.add(storeId);
        else favoriteStoreIds.delete(storeId);

        return HttpResponse.json(
            {
                isSuccess: true,
                code: likes ? "201" : "200",
                message: "요청이 성공적입니다.",
                data: { likes },
            },
            { status: likes ? 201 : 200 },
        );
    }),

    // [get] 가게 상세 조회
    // storeId : 999로 존재하지 않는 가게 테스트
    http.get(apiUrl("stores/:storeId/detail"), ({ params }) => {
        const { storeId } = params;
        const id = Number(storeId);

        // 404 Not Found
        if (id == 999) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "BAKERY404",
                    message: "빵집이 존재하지 않습니다.",
                    data: null,
                },
                { status: 404 },
            );
        }

        return HttpResponse.json({
            ...storeDetailResponse,
            message: "요청이 성공적입니다.",
            data: {
                ...storeDetailResponse.data,
                bakery: { ...storeDetailResponse.data.bakery, id },
            },
        });
    }),

    // [GET] 근처 관광지 조회
    http.get(apiUrl("stores/:storeId/attractions"), ({ params }) => {
        if (Number(params.storeId) === 999) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "BAKERY404",
                    message: "빵집이 존재하지 않습니다.",
                },
                { status: 404 },
            );
        }

        return HttpResponse.json({
            isSuccess: true,
            code: "200",
            message: "요청이 성공적입니다.",
            data: {
                attractions: [
                    {
                        contentId: "1622695",
                        category: "관광지",
                        name: "이시직공정려각",
                        address: "대전광역시 대덕구 송촌동",
                        imageUrl:
                            "http://tong.visitkorea.or.kr/cms/resource/75/3033275_image2_1.JPG",
                        lat: 36.3619180566,
                        lng: 127.4394906219,
                        distance: 1708,
                        tel: "",
                    },
                    {
                        contentId: "1622603",
                        category: "관광지",
                        name: "법동 석장승",
                        address: "대전광역시 대덕구 법동",
                        imageUrl:
                            "http://tong.visitkorea.or.kr/cms/resource/54/3033154_image2_1.JPG",
                        lat: 36.3676061288,
                        lng: 127.430166301,
                        distance: 1809,
                        tel: "",
                    },
                ],
            },
        });
    }),

    // [POST] 영수증 OCR 분석
    // storeId = 999 로 존재하지 않는 가게(404) 테스트
    http.post(apiUrl("stores/:storeId/visit-verifications"), async ({ params, request }) => {
        if (getMockAuthState(request) !== "valid") {
            return HttpResponse.json(unauthorized, { status: 401 });
        }

        const storeId = Number(params.storeId);
        const formData = await request.formData().catch(() => null);
        const receiptImage = formData?.get("receipt");

        // formData에 receiptImage가 없거나 receiptImage의 크기가 0일경우 400 응답
        if (!(receiptImage instanceof File) || receiptImage.size === 0) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "OCR400",
                    message: "유효하지 않는 요청입니다.",
                },
                { status: 400 },
            );
        }

        if (receiptImage.size > MAX_RECEIPT_IMAGE_SIZE) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "OCR413",
                    message: "이미지가 너무 큽니다(최대 10MB).",
                },
                { status: 413 },
            );
        }

        if (storeId == 999) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "BAKERY404",
                    message: "빵집이 존재하지 않습니다.",
                    data: null,
                },
                { status: 404 },
            );
        }

        // 파일이 이미지가 아닐경우 415 응답
        const receiptImageName = receiptImage.name.toLowerCase();
        const hasSupportedType = RECEIPT_IMAGE_TYPES.includes(receiptImage.type.toLowerCase());
        const hasSupportedExtension = RECEIPT_IMAGE_EXTENSIONS.some((extension) => receiptImageName.endsWith(extension));
        if (!hasSupportedType && !hasSupportedExtension) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "OCR415",
                    message: "지원하지 않는 이미지 형식입니다.",
                },
                { status: 415 },
            );
        }

        return HttpResponse.json(receiptVerificationResultResponse);
    }),

    // [post] 방문 인증
    // storeId = 999 로 존재하지 않는 가게(404) 테스트
    // totalAmount = 99999 로 영수증 해쉬값 중복(409) 테스트
    http.post(apiUrl("stores/:storeId/visits"), async ({ request, params }) => {
        if (getMockAuthState(request) !== "valid") {
            return HttpResponse.json(unauthorized, { status: 401 });
        }

        const storeId = Number(params.storeId);
        const body = await readJsonBody<visitVerificationRequestBody>(request);
        const totalAmount = body?.totalAmount;
        const date = body?.date;
        const verificationToken = body?.verificationToken;

        if (totalAmount == null || !Number.isInteger(totalAmount) || totalAmount <= 0 || !date || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !verificationToken?.trim()) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "COMMON400",
                    message: "잘못된 요청입니다.",
                },
                { status: 400 },
            );
        }

        if (storeId == 999) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "BAKERY404",
                    message: "빵집이 존재하지 않습니다.",
                    data: null,
                },
                { status: 404 },
            );
        }
        if (totalAmount == 99999) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "BAKE002",
                    message: "이미 사용한 영수증입니다.",
                },
                { status: 409 },
            );
        }
        if (verificationToken === "expired") {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "BAKE003",
                    message: "유효하지 않거나 만료된 인증 토큰입니다.",
                },
                { status: 400 },
            );
        }

        return HttpResponse.json(visitVerificationResponse, { status: 201 });
    }),

    // [get] 리뷰 조회 (특정 가게 리뷰 조회)
    // storeId = 999 로 존재하지 않는 가게(404) 테스트
    http.get(apiUrl("stores/:storeId/reviews"), ({ params, request }) => {
        const storeId = Number(params.storeId);

        if (storeId == 999) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "BAKERY404",
                    message: "빵집이 존재하지 않습니다.",
                    data: null,
                },
                { status: 404 },
            );
        }

        const page = Number(new URL(request.url).searchParams.get("page") ?? 0);
        if (!Number.isInteger(page) || page < 0) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "COMMON400",
                    message: "잘못된 요청입니다.",
                },
                { status: 400 },
            );
        }

        const size = 20;
        const reviews = storeReviews.slice(page * size, (page + 1) * size);
        const totalElements = storeReviews.length;
        const totalPages = Math.ceil(totalElements / size);

        return HttpResponse.json({
            isSuccess: true,
            code: "200",
            message: "요청이 성공적입니다.",
            data: {
                reviews,
                count: totalElements,
                pageInfo: {
                    page,
                    size,
                    totalElements,
                    totalPages,
                    hasNext: page + 1 < totalPages,
                },
            },
        });
    }),

    // [post] 리뷰 작성 (특정 가게 리뷰 작성)
    // storeId = 999로 존재하지 않는 가게(404) 테스트
    // content = "too-many"로 요청 과다(429) 테스트
    http.post(apiUrl("stores/:storeId/reviews"), async ({ request, params }) => {
        if (getMockAuthState(request) !== "valid") {
            return HttpResponse.json(unauthorized, { status: 401 });
        }

        const storeId = Number(params.storeId);

        if (storeId === 999) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "BAKERY404",
                    message: "빵집이 존재하지 않습니다.",
                    data: null,
                },
                { status: 404 },
            );
        }

        const formData = await request.formData().catch(() => null);
        const rating = Number(formData?.get("rating"));
        const content = formData?.get("content");
        const keywordIds = formData?.getAll("keywordIds") ?? [];
        const reviewImages = formData?.getAll("reviewImages") ?? [];

        const hasValidRequiredFields =
            Number.isInteger(rating) &&
            rating >= 1 &&
            rating <= 5 &&
            typeof content === "string" &&
            content.trim().length > 0 &&
            keywordIds.length > 0 &&
            keywordIds.every((keywordId) => typeof keywordId === "string" && Number.isInteger(Number(keywordId)));

        if (!hasValidRequiredFields) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "COMMON400",
                    message: "잘못된 요청입니다.",
                },
                { status: 400 },
            );
        }

        const imageFiles = reviewImages.filter((image): image is File => image instanceof File);
        const totalImageSize = imageFiles.reduce((total, image) => total + image.size, 0);

        if (imageFiles.some((image) => image.size > MAX_REVIEW_IMAGE_SIZE) || totalImageSize > MAX_REVIEW_TOTAL_IMAGE_SIZE) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "COMMON413",
                    message: "업로드 용량이 너무 큽니다. 사진은 장당 15MB, 한 번에 60MB 까지 가능합니다.",
                },
                { status: 413 },
            );
        }

        if (imageFiles.length !== reviewImages.length || imageFiles.some((image) => !REVIEW_IMAGE_EXTENSIONS.some((extension) => image.name.toLowerCase().endsWith(extension)))) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "COMMON415",
                    message: "지원하지 않는 파일형식입니다.",
                },
                { status: 415 },
            );
        }

        if (content === "too-many") {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "429",
                    message: "동일 요청이 너무 많습니다. 잠시 후 다시 시도해주세요.",
                    data: null,
                },
                { status: 429 },
            );
        }
        if (content === "not-verified") {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "REVIEW400",
                    message: "리뷰를 작성하려면 영수증 인증이 필요합니다.",
                },
                { status: 400 },
            );
        }

        return HttpResponse.json(
            {
                isSuccess: true,
                code: "201",
                message: "요청이 성공적입니다.",
                data: {
                    reviewId: 1,
                },
            },
            { status: 201 },
        );
    }),

    // [patch] 리뷰 수정
    // storeId 또는 reviewId = 999로 존재하지 않는 가게/리뷰(404) 테스트
    // content = "too-many"로 요청 과다(429) 테스트
    http.patch(apiUrl("stores/:storeId/reviews/:reviewId"), async ({ request, params }) => {
        if (getMockAuthState(request) !== "valid") {
            return HttpResponse.json(unauthorized, { status: 401 });
        }

        const storeId = Number(params.storeId);
        const reviewId = Number(params.reviewId);
        const review = storeReviews.find((item) => item.id === reviewId);

        if (storeId === 999 || !review) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "REVIEW404",
                    message: "리뷰가 존재하지 않습니다.",
                    data: null,
                },
                { status: 404 },
            );
        }

        if (review.writerId !== 1) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "USER403",
                    message: "권한이 없습니다.",
                },
                { status: 403 },
            );
        }

        const formData = await request.formData().catch(() => null);
        const rating = Number(formData?.get("rating"));
        const content = formData?.get("content");
        const deleteKeywordIds = formData?.getAll("deleteKeywordIds") ?? [];
        const keywordIds = formData?.getAll("keywordIds") ?? [];
        const deleteImages = formData?.getAll("deleteImages") ?? [];
        const reviewImages = formData?.getAll("reviewImages") ?? [];

        const hasValidRequiredFields =
            Number.isInteger(rating) &&
            rating >= 1 &&
            rating <= 5 &&
            typeof content === "string" &&
            content.trim().length > 0 &&
            [...deleteKeywordIds, ...keywordIds, ...deleteImages].every((id) => typeof id === "string" && Number.isInteger(Number(id)));

        if (!hasValidRequiredFields) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "COMMON400",
                    message: "잘못된 요청입니다.",
                },
                { status: 400 },
            );
        }

        const imageFiles = reviewImages.filter((image): image is File => image instanceof File);
        const totalImageSize = imageFiles.reduce((total, image) => total + image.size, 0);

        if (imageFiles.some((image) => image.size > MAX_REVIEW_IMAGE_SIZE) || totalImageSize > MAX_REVIEW_TOTAL_IMAGE_SIZE) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "COMMON413",
                    message: "업로드 용량이 너무 큽니다. 사진은 장당 15MB, 한 번에 60MB 까지 가능합니다.",
                },
                { status: 413 },
            );
        }

        if (imageFiles.length !== reviewImages.length || imageFiles.some((image) => !REVIEW_IMAGE_EXTENSIONS.some((extension) => image.name.toLowerCase().endsWith(extension)))) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "COMMON415",
                    message: "지원하지 않는 파일형식입니다.",
                },
                { status: 415 },
            );
        }

        if (content === "too-many") {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "429",
                    message: "동일 요청이 너무 많습니다. 잠시 후 다시 시도해주세요.",
                    data: null,
                },
                { status: 429 },
            );
        }

        const removedKeywordIds = deleteKeywordIds.map(Number);
        review.rating = rating;
        review.content = content.trim();
        review.keywords = [...new Set([...review.keywords.filter((keywordId) => !removedKeywordIds.includes(keywordId)), ...keywordIds.map(Number)])];

        return HttpResponse.json({
            isSuccess: true,
            code: "200",
            message: "리뷰가 수정되었습니다.",
            data: {
                reviewId,
            },
        });
    }),

    // [delete] 리뷰 삭제
    // storeId 또는 reviewId = 999로 존재하지 않는 가게/리뷰(404) 테스트
    http.delete(apiUrl("stores/:storeId/reviews/:reviewId"), ({ request, params }) => {
        if (getMockAuthState(request) !== "valid") {
            return HttpResponse.json(unauthorized, { status: 401 });
        }

        const reviewId = Number(params.reviewId);

        if (reviewId === 999) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "REVIEW404",
                    message: "리뷰가 존재하지 않습니다.",
                    data: null,
                },
                { status: 404 },
            );
        }

        return new HttpResponse(null, { status: 204 });
    }),

    // [post] 리뷰 좋아요 추가/삭제
    http.post(apiUrl("stores/:storeId/reviews/:reviewId/like"), ({ request, params }) => {
        if (getMockAuthState(request) !== "valid") {
            return HttpResponse.json(unauthorized, { status: 401 });
        }
        const reviewId = Number(params.reviewId);

        if (reviewId === 999) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "REVIEW404",
                    message: "리뷰가 존재하지 않습니다.",
                },
                { status: 404 },
            );
        }

        const likes = !likedReviewIds.has(reviewId);
        if (likes) likedReviewIds.add(reviewId);
        else likedReviewIds.delete(reviewId);

        return HttpResponse.json(
            {
                isSuccess: true,
                code: likes ? "201" : "200",
                message: "요청이 성공적입니다.",
                data: {
                    likes,
                },
            },
            { status: likes ? 201 : 200 },
        );
    }),
];
