import { http, HttpResponse } from "msw";
import { getMockAuthState } from "../utils/auth";

// data
import { unauthorized } from "../data/common";
import {
  myFavoriteResponse,
  searchResultFirstResponse,
  searchResultSecondResponse,
  storeDetailResponse,
  visitVerificationResponse,
} from "../data/stores";

const apiVersion = "v1";

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
  http.get(`*/api/${apiVersion}/stores/search`, ({ request }) => {
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

  // [get] 가게 상세 조회
  // storeId : 999로 존재하지 않는 가게 테스트
  http.get(`*/api/${apiVersion}/stores/:storeId/detail`, ({ params }) => {
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

  // [post] 즐겨찾기 추가
  // storeId = 999 로 존재하지 않는 가게(404) 테스트
  // storeId = 789 로 요청 충돌(409) 테스트
  http.post(
    `*/api/${apiVersion}/stores/:storeId/favorites`,
    ({ request, params }) => {
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
    },
  ),

  // [post] 영수증 찾기 OCR 분석
  // storeId = 999 로 존재하지 않는 가게(404) 테스트
  // storeId = 789 로 요청 충돌(409) 테스트
  http.post(`*/api/${apiVersion}/stores/:storeId/favorites`, () => {}),

  // [post] 방문 인증
  // storeId = 999 로 존재하지 않는 가게(404) 테스트
  // totalAmount = 99999 로 영수증 해쉬값 중복(409) 테스트
  http.post(
    `*/api/${apiVersion}/stores/:storeId/visits`,
    async ({ request, params }) => {
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
    },
  ),

  // [get] 리뷰 조회 (특정 가게 리뷰 조회)
  // storeId = 999 로 존재하지 않는 가게(404) 테스트
  // nextCursor로 2페이지까지 조회가능, hasNext로 2페이지에서 페이지네이션 중단하기
  http.get(
    `api/${apiVersion}/stores/:storeId/reviews`,
    ({ request, params }) => {
      const url = new URL(request.url);
      const cursor = Number(url.searchParams.get("cursor") ?? 0);

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

      return HttpResponse.json(
        {
          isSuccess: false,
          code: "409",
          message: "conflict 발생",
        },
        { status: 409 },
      );
    },
  ),

  // [post] 리뷰 작성 (특정 가게 리뷰 작성)
  http.get(`api/${apiVersion}/stores/:storeId/reviews`, () => {}),

  // [patch] 리뷰 수정
  http.patch(`api/${apiVersion}/stores/:storeId/reviews/:reviewId`, () => {}),

  // [delete] 리뷰 삭제
  // storeId = 999 로 존재하지 않는 가게(404) 테스트
  http.delete(`api/${apiVersion}/stores/:storeId/reviews/:reviewId`, () => {
    // 204 응답 조율 후 작성
  }),

  // [post] 리뷰 좋아요 추가/삭제
  // storeId = 999 로 존재하지 않는 가게(404) 테스트
  http.post(
    `api/${apiVersion}/stores/:storeId/reviews/:reviewId/like`,
    ({ request, params }) => {
      if (getMockAuthState(request) !== "valid") {
        return HttpResponse.json(unauthorized, { status: 401 });
      }
      const storeId = Number(params.storeId);
      const reviewId = Number(params.reviewId);

      // 예외처리 구현 필요

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
    },
  ),
];
