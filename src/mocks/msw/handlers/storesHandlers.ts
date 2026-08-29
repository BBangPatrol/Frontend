import { http, HttpResponse } from "msw";
import { getMockAuthState } from "../utils/auth";

// data
import { unauthorized } from "../data/common";
import {
    getStoreReviewsFirstResponse,
    getStoreReviewsSecondResponse,
    myFavoriteResponse,
    receiptVerificationResultResponse,
    searchResultFirstResponse,
    searchResultSecondResponse,
    storeDetailResponse,
    visitVerificationResponse,
} from "../data/stores";
import { apiUrl } from "../../../api/config";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

type visitVerificationRequestBody = {
    totalAmount: number;
    date: string;
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
    // Query String은 적용되어 있지 않음 (Cursor기반 페이지네이션만 가능)
    http.get(apiUrl("stores/search"), ({ request }) => {
        const url = new URL(request.url);
        const cursor = Number(url.searchParams.get("cursor") ?? 0);

        // 프론트엔드용 응답 (커서가 제대로 입력되지 않은 경우)
        if (cursor == 0) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "400",
                    message: "cursor 요청값이 올바르게 설정되지 않았습니다.",
                },
                { status: 400 },
            );
        }

        // 페이지 순환용 응답
        if (cursor == 1) return HttpResponse.json(searchResultFirstResponse);
        if (cursor == 2) return HttpResponse.json(searchResultSecondResponse);

        return HttpResponse.json(searchResultFirstResponse);
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
        if (storeId == 789) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "409",
                    message: "잠시 후 다시 시도해 주세요. (요청이 충돌되었습니다.)",
                    data: null,
                },
                { status: 409 },
            );
        }

        return HttpResponse.json(myFavoriteResponse, { status: 201 });
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
                    code: "404",
                    message: "존재하지 않는 가게입니다.",
                    data: null,
                },
                { status: 404 },
            );
        }

        return HttpResponse.json(storeDetailResponse);
    }),

    // [GET] 근처 관광지 조회
    http.get(apiUrl("stores/:storeId/near"), () => {}),

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
                    code: "400",
                    message: "유효하지 않는 요청입니다.",
                },
                { status: 400 },
            );
        }

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

        // 파일이 이미지가 아닐경우 415 응답
        if (!receiptImage.type.startsWith("image/")) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "415",
                    message: "해당 파일은 지원되지 않는 형식입니다.",
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

        if (totalAmount == null || date == null) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "400",
                    message: "유효하지 않는 요청입니다.",
                },
                { status: 400 },
            );
        }

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
        if (totalAmount == 99999) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "409",
                    message: "conflict 발생",
                },
                { status: 409 },
            );
        }

        return HttpResponse.json(visitVerificationResponse, { status: 201 });
    }),

    // [get] 리뷰 조회 (특정 가게 리뷰 조회)
    // storeId = 999 로 존재하지 않는 가게(404) 테스트
    // nextCursor로 2페이지까지 조회가능, hasNext로 2페이지에서 페이지네이션 중단하기
    http.get(apiUrl("stores/:storeId/reviews"), ({ request, params }) => {
        const url = new URL(request.url);
        const cursor = Number(url.searchParams.get("cursor") ?? 0);

        // 프론트엔드용 응답 (커서가 제대로 입력되지 않은 경우)
        if (cursor == 0) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "400",
                    message: "cursor 요청값이 올바르게 설정되지 않았습니다.",
                },
                { status: 400 },
            );
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

        if (cursor == 1) return HttpResponse.json(getStoreReviewsFirstResponse);
        if (cursor == 2) return HttpResponse.json(getStoreReviewsSecondResponse);

        return HttpResponse.json(getStoreReviewsFirstResponse);
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
                    code: "404",
                    message: "존재하지 않는 가게입니다.",
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
                    code: "400",
                    message: "유효하지 않는 요청입니다.",
                },
                { status: 400 },
            );
        }

        const imageFiles = reviewImages.filter((image): image is File => image instanceof File);
        const totalImageSize = imageFiles.reduce((total, image) => total + image.size, 0);

        if (totalImageSize > MAX_IMAGE_SIZE) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "413",
                    message: "이미지 용량이 너무 큽니다.",
                },
                { status: 413 },
            );
        }

        if (imageFiles.length !== reviewImages.length || imageFiles.some((image) => !image.type.startsWith("image/"))) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "415",
                    message: "해당 파일은 지원되지 않는 형식입니다.",
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

        if (storeId === 999 || reviewId === 999) {
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
                    code: "400",
                    message: "유효하지 않는 요청입니다.",
                },
                { status: 400 },
            );
        }

        const imageFiles = reviewImages.filter((image): image is File => image instanceof File);
        const totalImageSize = imageFiles.reduce((total, image) => total + image.size, 0);

        if (totalImageSize > MAX_IMAGE_SIZE) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "413",
                    message: "이미지 용량이 너무 큽니다.",
                },
                { status: 413 },
            );
        }

        if (imageFiles.length !== reviewImages.length || imageFiles.some((image) => !image.type.startsWith("image/"))) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "415",
                    message: "해당 파일은 지원되지 않는 형식입니다.",
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

        const storeId = Number(params.storeId);
        const reviewId = Number(params.reviewId);

        if (storeId === 999 || reviewId === 999) {
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

        return new HttpResponse(null, { status: 204 });
    }),

    // [post] 리뷰 좋아요 추가/삭제
    http.post(apiUrl("stores/:storeId/reviews/:reviewId/like"), ({ request, params }) => {
        if (getMockAuthState(request) !== "valid") {
            return HttpResponse.json(unauthorized, { status: 401 });
        }
        const storeId = Number(params.storeId);
        const reviewId = Number(params.reviewId);

        if (storeId === 999 || reviewId === 999) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "400",
                    message: "유효하지 않는 요청입니다.",
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
                    likes: true,
                },
            },
            { status: 201 },
        );
    }),
];
