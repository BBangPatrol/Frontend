import { http, HttpResponse } from "msw";
import { apiUrl } from "../../../api/config";
import { unauthorized } from "../data/common";
import { breadCollectionResponse, myPageResponse, myPointFirstResponse, myPointSecondResponse, myReviewsFirstResponse, myReviewsSecondResponse, userProfileImage } from "../data/users";
import { getMockAuthState } from "../utils/auth";

const MAX_PROFILE_IMAGE_SIZE = 15 * 1024 * 1024;
const PROFILE_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

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

function getPage(request: Request) {
    const page = Number(new URL(request.url).searchParams.get("page") ?? 0);
    return Number.isInteger(page) && page >= 0 ? page : null;
}

export const usersHandlers = [
    http.get(apiUrl("users/me/bread-collections"), ({ request }) => {
        if (getMockAuthState(request) !== "valid") return HttpResponse.json(unauthorized, { status: 401 });
        return HttpResponse.json(breadCollectionResponse);
    }),

    http.get(apiUrl("users/me"), ({ request }) => {
        if (getMockAuthState(request) !== "valid") return HttpResponse.json(unauthorized, { status: 401 });
        return HttpResponse.json(myPageResponse);
    }),

    // nickname = "conflict"로 닉네임 중복 응답 테스트
    http.patch(apiUrl("users/me/edit"), async ({ request }) => {
        if (getMockAuthState(request) !== "valid") return HttpResponse.json(unauthorized, { status: 401 });

        const body = await readJsonBody<UpdateNicknameRequestBody>(request);
        const nickname = body?.nickname?.trim();

        if (!nickname || nickname.length > 50) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "COMMON400",
                    message: "잘못된 요청입니다.",
                    errors: {
                        field: "nickname",
                        message: !nickname ? "공백일 수 없습니다" : "크기가 0에서 50 사이여야 합니다",
                    },
                },
                { status: 400 },
            );
        }

        if (nickname === "conflict") {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "USER409",
                    message: "닉네임이 중복됩니다.",
                },
                { status: 409 },
            );
        }

        myPageResponse.data.nickname = nickname;
        return new HttpResponse(null, { status: 204 });
    }),

    http.post(apiUrl("users/me/profile-image"), async ({ request }) => {
        if (getMockAuthState(request) !== "valid") return HttpResponse.json(unauthorized, { status: 401 });

        const formData = await request.formData().catch(() => null);
        const profileImage = formData?.get("profileImage");

        if (!(profileImage instanceof File) || profileImage.size === 0) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "COMMON400",
                    message: "잘못된 요청입니다.",
                },
                { status: 400 },
            );
        }

        if (profileImage.size > MAX_PROFILE_IMAGE_SIZE) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "COMMON413",
                    message: "업로드 용량이 너무 큽니다. 사진은 장당 15MB, 한 번에 60MB 까지 가능합니다.",
                },
                { status: 413 },
            );
        }

        if (!PROFILE_IMAGE_TYPES.includes(profileImage.type)) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "COMMON415",
                    message: "지원하지 않는 파일형식입니다.",
                },
                { status: 415 },
            );
        }

        userProfileImage.data.imageUrl = `https://example.com/images/profile/${encodeURIComponent(profileImage.name)}`;
        return new HttpResponse(null, { status: 204 });
    }),

    http.get(apiUrl("users/me/profile-image"), ({ request }) => {
        if (getMockAuthState(request) !== "valid") return HttpResponse.json(unauthorized, { status: 401 });
        return HttpResponse.json(userProfileImage);
    }),

    http.get(apiUrl("users/me/points"), ({ request }) => {
        if (getMockAuthState(request) !== "valid") return HttpResponse.json(unauthorized, { status: 401 });

        const page = getPage(request);
        if (page == null) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "COMMON400",
                    message: "잘못된 요청입니다.",
                },
                { status: 400 },
            );
        }

        return HttpResponse.json(page === 0 ? myPointFirstResponse : myPointSecondResponse);
    }),

    http.get(apiUrl("users/me/reviews"), ({ request }) => {
        if (getMockAuthState(request) !== "valid") return HttpResponse.json(unauthorized, { status: 401 });

        const page = getPage(request);
        if (page == null) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "COMMON400",
                    message: "잘못된 요청입니다.",
                },
                { status: 400 },
            );
        }

        return HttpResponse.json(page === 0 ? myReviewsFirstResponse : myReviewsSecondResponse);
    }),
];
