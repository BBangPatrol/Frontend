import { http, HttpResponse } from "msw";
import { getMockAuthState } from "../utils/auth";

// data
import { unauthorized } from "../data/common";
import {
  breadCollectionResponse,
  myPageResponse,
  myPointFirstResponse,
  myPointSecondResponse,
  myReviewsFirstResponse,
  myReviewsSecondResponse,
} from "../data/users";

const apiVersion = "v1";

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
  http.get(`*/api/${apiVersion}/users/me/bread-collections`, ({ request }) => {
    if (getMockAuthState(request) !== "valid") {
      return HttpResponse.json(unauthorized, { status: 401 });
    }

    return HttpResponse.json(breadCollectionResponse);
  }),

  // [get] 마이페이지
  http.get(`*/api/${apiVersion}/users/me`, ({ request }) => {
    if (getMockAuthState(request) !== "valid") {
      return HttpResponse.json(unauthorized, { status: 401 });
    }

    return HttpResponse.json(myPageResponse);
  }),

  // [patch] 닉네임 수정
  // nickname: "conflict"로 중복 닉네임 테스트
  http.patch(`*/api/${apiVersion}/users/me/edit`, async ({ request }) => {
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

  // [get] 내 포인트 기록 조회
  // nextCursor를 이용해 순환하도록 되어있음 (1->2, 2->1)
  http.get(`*/api/${apiVersion}/users/me/points`, ({ request }) => {
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
  http.get(`*/api/${apiVersion}/users/me/reviews`, ({ request }) => {
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
