import { http, HttpResponse } from "msw";
import { unauthorized } from "../data/common";
import { getMockAuthState, MOCK_ACCESS_TOKEN } from "../utils/auth";

const apiVersion = "v1";
const newUserCode = "new-user";
const mockRefreshToken = "refresh-token";

type LoginRequestBody = {
  code?: string | null;
};

async function readLoginRequestBody(request: Request) {
  try {
    return (await request.json()) as LoginRequestBody;
  } catch {
    return null;
  }
}

export const authHandlers = [
  // [post] 로그인 (oAuth)
  // [201] code가 "new-user"인 경우 신규 유저
  // [400] code가 없거나, null이거나 "400"인 경우
  // [401] code가 "401"인 경우
  // [502] code가 "502"인 경우
  // [200] 이외의 요청은 200응답
  http.post(`*/api/${apiVersion}/auth/login`, async ({ request }) => {
    const body = await readLoginRequestBody(request);
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

    const isNewUser = code === newUserCode;

    return HttpResponse.json(
      {
        isSuccess: true,
        code: isNewUser ? "201" : "200",
        message: isNewUser
          ? "회원가입에 성공했습니다."
          : "로그인에 성공했습니다.",
        data: {
          accessToken: MOCK_ACCESS_TOKEN,
          refreshToken: mockRefreshToken,
          isNewUser,
        },
        errors: null,
      },
      {
        status: isNewUser ? 201 : 200,
        headers: {
          "Set-Cookie": `refreshToken=${mockRefreshToken}; Path=/; HttpOnly; SameSite=Lax`,
        },
      },
    );
  }),

  // - Authorization 헤더의 access token 검증 후 사용자 정보 반환
  http.get(`*/api/${apiVersion}/auth/me`, ({ request }) => {
    if (getMockAuthState(request) !== "valid") {
      return HttpResponse.json(unauthorized, { status: 401 });
    }

    return HttpResponse.json({
      isSuccess: true,
      code: "200",
      message: "요청이 성공적입니다.",
      data: {
        userId: 1,
        userNickname: "string",
      },
      errors: null,
    });
  }),
];
