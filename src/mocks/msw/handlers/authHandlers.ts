import { http, HttpResponse } from "msw";
import { unauthorized } from "../data/common";
import { getMockAuthState } from "../utils/auth";
import { MOCK_ACCESS_TOKEN, MOCK_REFRESH_TOKEN, reissue, userInfo } from "../data/auth";

const API_VERSION = "v1";
const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 7;
const REFRESH_TOKEN_COOKIE = `refreshToken=${MOCK_REFRESH_TOKEN}; Path=/; Max-Age=${REFRESH_TOKEN_MAX_AGE}; HttpOnly; SameSite=Lax`;
const EXPIRED_REFRESH_TOKEN_COOKIE = "refreshToken=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax";

type LoginRequestBody = {
    code?: string | null;
};

export const authHandlers = [
    // [POST] 로그인 (oAuth)
    // [201] code가 "new-user"인 경우 신규 유저
    // [400] code가 없거나, null이거나 "400"인 경우
    // [401] code가 "401"인 경우
    // [502] code가 "502"인 경우
    // [200] 이외의 요청은 200응답
    http.post(`*/api/${API_VERSION}/auth/login`, async ({ request }) => {
        const body = (await request.json().catch(() => null)) as LoginRequestBody | null;
        const code = body?.code?.trim();

        if (!code || code === "400") {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "400",
                    message: "로그인 요청이 올바르지 않습니다.",
                    data: null,
                    errors: {
                        field: "code",
                        message: "카카오 인가 코드가 필요합니다.",
                    },
                },
                { status: 400 },
            );
        }

        if (code === "401") {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "401",
                    message: "로그인에 실패했습니다.",
                    data: null,
                    errors: {
                        field: null,
                        message: "인증 정보가 올바르지 않습니다.",
                    },
                },
                { status: 401 },
            );
        }

        if (code === "502") {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "502",
                    message: "카카오 사용자 정보 조회에 실패했습니다.",
                    data: null,
                    errors: {
                        field: "kakao",
                        message: "카카오 서버와 통신 중 문제가 발생했습니다.",
                    },
                },
                { status: 502 },
            );
        }

        const isNewUser = code === "new-user";

        return HttpResponse.json(
            {
                isSuccess: true,
                code: isNewUser ? "201" : "200",
                message: isNewUser ? "회원가입에 성공했습니다." : "로그인에 성공했습니다.",
                data: {
                    accessToken: MOCK_ACCESS_TOKEN,
                    refreshToken: MOCK_REFRESH_TOKEN,
                    isNewUser,
                },
                errors: null,
            },
            {
                status: isNewUser ? 201 : 200,
                headers: {
                    "Set-Cookie": REFRESH_TOKEN_COOKIE,
                },
            },
        );
    }),

    // [POST] 로그아웃
    http.post(`*/api/${API_VERSION}/auth/logout`, ({ request }) => {
        if (getMockAuthState(request) !== "valid") {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "401",
                    message: "로그아웃에 실패했습니다.",
                    data: null,
                    errors: {
                        field: "Authorization",
                        message: "인증 정보가 유효하지 않습니다.",
                    },
                },
                { status: 401 },
            );
        }

        return HttpResponse.json(
            {
                isSuccess: true,
                code: "LOGOUT_SUCCESS",
                message: "로그아웃에 성공했습니다.",
                data: null,
                errors: null,
            },
            {
                headers: {
                    "Set-Cookie": EXPIRED_REFRESH_TOKEN_COOKIE,
                },
            },
        );
    }),

    // [GET] 회원정보 조회
    http.get(`*/api/${API_VERSION}/auth/me`, ({ request }) => {
        if (getMockAuthState(request) !== "valid") {
            return HttpResponse.json(unauthorized, { status: 401 });
        }

        return HttpResponse.json(userInfo);
    }),

    // [POST] accessToken 재발급
    http.post(`*/api/${API_VERSION}/auth/reissue`, ({ cookies }) => {
        const refreshToken = cookies.refreshToken;

        if (!refreshToken) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "400",
                    message: "토큰 재발급 요청이 올바르지 않습니다.",
                    data: null,
                    errors: {
                        field: "refreshToken",
                        message: "Refresh Token이 필요합니다.",
                    },
                },
                { status: 400 },
            );
        }

        if (refreshToken !== MOCK_REFRESH_TOKEN) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "401",
                    message: "토큰 재발급에 실패했습니다.",
                    data: null,
                    errors: {
                        field: "refreshToken",
                        message: "Refresh Token이 유효하지 않거나 만료되었습니다.",
                    },
                },
                { status: 401 },
            );
        }

        return HttpResponse.json(reissue, {
            status: 200,
            headers: {
                "Set-Cookie": REFRESH_TOKEN_COOKIE,
            },
        });
    }),
];
