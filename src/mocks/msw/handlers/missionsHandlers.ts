import { http, HttpResponse } from "msw";
import { getMockAuthState } from "../utils/auth";

// data
import { unauthorized } from "../data/common";
import { missionRewardResponse, missionsResponse } from "../data/missions";
import { apiUrl } from "../../../api/config";

export const missionsHandlers = [
    // [get] 미션 조회
    http.get(apiUrl("missions"), ({ request }) => {
        if (getMockAuthState(request) !== "valid") {
            return HttpResponse.json(unauthorized, { status: 401 });
        }

        const url = new URL(request.url);
        const filter = url.searchParams.get("filter");

        if (filter !== "all" && filter !== "in-progress" && filter !== "completed") {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "400",
                    message: "filter 요청값이 올바르게 설정되지 않았습니다.",
                },
                { status: 400 },
            );
        }

        const missions = missionsResponse.data.missions.filter((mission) => {
            if (filter === "in-progress") return mission.status === "inProgress";
            if (filter === "completed") return mission.status === "completed" || mission.status === "notReceived";
            return true;
        });

        return HttpResponse.json({
            ...missionsResponse,
            data: { ...missionsResponse.data, missions },
        });
    }),

    // [patch] 미션 보상 수집
    // missionId = 99999 로 내부적인 미션 미완료(400) 테스트
    // missionId = 12345 로 요청 충돌(409) 테스트
    http.patch(apiUrl("missions/:missionId"), ({ request, params }) => {
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

        const mission = missionsResponse.data.missions.find(({ id }) => id === missionId);

        if (!mission || mission.status !== "notReceived") {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "400",
                    message: "유효하지 않는 요청입니다.",
                },
                { status: 400 },
            );
        }

        mission.status = "completed";

        return HttpResponse.json(missionRewardResponse);
    }),
];
