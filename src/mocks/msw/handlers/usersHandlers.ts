import { http, HttpResponse } from "msw";
import { getMockAuthState } from "../utils/auth";

// data
import { unauthorized } from "../data/common";
import { breadCollectionResponse, myPageResponse, myPointFirstResponse, myPointSecondResponse, myReviewsFirstResponse, myReviewsSecondResponse, userProfileImage } from "../data/users";
import { apiUrl } from "../../../api/config";

const MAX_PROFILE_IMAGE_SIZE = 5 * 1024 * 1024;

type UpdateNicknameRequestBody = {
    nickname: string;
};

async function readJsonBody<T>(request: Request): Promise<T | null> {
    try {
        return (await request.json()) as T;
    } catch {
        return null;
    }
}

export const usersHandlers = [
    // [get] 빵 컬렉션
    http.get(apiUrl("users/me/bread-collections"), ({ request }) => {
        if (getMockAuthState(request) !== "valid") {
            return HttpResponse.json(unauthorized, { status: 401 });
        }

        return HttpResponse.json(breadCollectionResponse);
    }),

    // [get] 마이페이지
    http.get(apiUrl("users/me"), ({ request }) => {
        if (getMockAuthState(request) !== "valid") {
            return HttpResponse.json(unauthorized, { status: 401 });
        }

        return HttpResponse.json(myPageResponse);
    }),

    // [patch] 닉네임 수정
    // nickname: "conflict"로 중복 닉네임 테스트
    http.patch(apiUrl("users/me/edit"), async ({ request }) => {
        if (getMockAuthState(request) !== "valid") {
            return HttpResponse.json(unauthorized, { status: 401 });
        }

        const body = await readJsonBody<UpdateNicknameRequestBody>(request);
        const nickname = body?.nickname;

        // 닉네임 입력값이 없거나(null) 빈문자열인 경우
        if (!nickname || nickname.length == 0) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "400",
                    message: "빈 닉네임",
                    data: null,
                    errors: {
                        field: "nickname",
                        message: "닉네임이 비어있습니다.",
                    },
                },
                { status: 400 },
            );
        }

        // 닉네임 중복 테스트
        if (nickname == "conflict") {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "409",
                    message: "conflict 발생",
                    data: null,
                    errors: {
                        field: "nickname",
                        message: "중복된 닉네임입니다.",
                    },
                },
                { status: 409 },
            );
        }

        // mock data 값 수정 (새로고침시 초기화)
        myPageResponse.data.nickname = nickname;

        return HttpResponse.json(
            {
                isSuccess: true,
                code: "204",
                message: "요청이 성공적입니다.",
            },
            { status: 204 },
        );
    }),

    // [PATCH] 내 프로필 이미지 설정
    // 파일명이 "too-many"로 시작하면 429 응답 (테스트용)
    http.patch(apiUrl("users/me/profile-image"), async ({ request }) => {
        if (getMockAuthState(request) !== "valid") {
            return HttpResponse.json(unauthorized, { status: 401 });
        }

        const formData = await request.formData().catch(() => null);
        const profileImage = formData?.get("profileImage");

        // formData에 profileImage가 없거나 profileImage의 크기가 0일경우 400 응답
        if (!(profileImage instanceof File) || profileImage.size === 0) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "400",
                    message: "필수 업로드 파일이 누락되었습니다.",
                    data: null,
                    errors: {
                        field: "profileImage",
                        message: "프로필 이미지 파일은 필수입니다.",
                    },
                },
                { status: 400 },
            );
        }

        // 파일 용량이 5MB 이상일 경우 413 응답
        if (profileImage.size > MAX_PROFILE_IMAGE_SIZE) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "413",
                    message: "이미지 용량이 너무 큽니다.",
                },
                { status: 413 },
            );
        }

        // 파일이 이미지가 아닐경우 415 응답
        if (!profileImage.type.startsWith("image/")) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "415",
                    message: "해당 파일은 지원되지 않는 형식입니다.",
                },
                { status: 415 },
            );
        }

        // 파일명이 "too-many"로 시작하면 429 응답 (테스트용)
        if (profileImage.name.startsWith("too-many")) {
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
            message: "이미지 업로드 요청이 성공했습니다.",
            data: {
                imageUrl: `https://example.com/images/profile/${encodeURIComponent(profileImage.name)}`,
            },
        });
    }),

    // [GET] 내 프로필 이미지 조회
    http.get(apiUrl("users/me/profile-image"), ({ request }) => {
        if (getMockAuthState(request) !== "valid") {
            return HttpResponse.json(unauthorized, { status: 401 });
        }

        return HttpResponse.json(userProfileImage);
    }),

    // [get] 내 포인트 기록 조회
    // nextCursor를 이용해 순환하도록 되어있음 (1->2, 2->1)
    http.get(apiUrl("users/me/points"), ({ request }) => {
        if (getMockAuthState(request) !== "valid") {
            return HttpResponse.json(unauthorized, { status: 401 });
        }

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
        if (cursor == 1) return HttpResponse.json(myPointFirstResponse);
        if (cursor == 2) return HttpResponse.json(myPointSecondResponse);

        return HttpResponse.json(myPointFirstResponse);
    }),

    // [get] 내가 작성한 리뷰 조회
    // nextCursor를 이용해 순환하도록 되어있음 (1->2, 2->1)
    http.get(apiUrl("users/me/reviews"), ({ request }) => {
        if (getMockAuthState(request) !== "valid") {
            return HttpResponse.json(unauthorized, { status: 401 });
        }

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
        if (cursor == 1) return HttpResponse.json(myReviewsFirstResponse);
        if (cursor == 2) return HttpResponse.json(myReviewsSecondResponse);

        return HttpResponse.json(myReviewsFirstResponse);
    }),
];
