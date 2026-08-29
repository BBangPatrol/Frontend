import { http, HttpResponse } from "msw";
import { getMockAuthState } from "../utils/auth";

// data
import { unauthorized } from "../data/common";
import { missionFirstResponse, missionRewardResponse, missionSecondResponse } from "../data/missions";
import { apiUrl } from "../../../api/config";


export const missionsHandlers = [
    // [get] 미션 조회
    // QueryString filter 기능은 제외, cursor 기반 페이지네이션만 가능
    http.get(apiUrl("missions"), ({ request }) => {
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

        if (cursor == 1) return HttpResponse.json(missionFirstResponse);
        if (cursor == 2) return HttpResponse.json(missionSecondResponse);

        return HttpResponse.json(missionFirstResponse);
    }),

    // [post] 미션 보상 수집
    // missionId = 99999 로 내부적인 미션 미완료(400) 테스트
    // missionId = 12345 로 요청 충돌(409) 테스트
    http.post(apiUrl("missions/:missionId"), ({ request, params }) => {
        if (getMockAuthState(request) !== "valid") {
            return HttpResponse.json(unauthorized, { status: 401 });
        }

        const missionId = Number(params.missionId);

        if (missionId == 99999) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "400",
                    message: "유효하지 않는 요청입니다.",
                },
                { status: 400 },
            );
        }
        if (missionId == 12345) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "409",
                    message: "잠시 후 다시 시도해 주세요. (요청이 충돌되었습니다.)",
                },
                { status: 409 },
            );
        }

        return HttpResponse.json(missionRewardResponse);
    }),
];
