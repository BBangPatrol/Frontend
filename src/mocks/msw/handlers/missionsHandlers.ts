import { http, HttpResponse } from "msw";
import { getMockAuthState } from "../utils/auth";

// data
import { unauthorized } from "../data/common";
import { mainMissionsResponse, missionRewardResponse, missionsResponse } from "../data/missions";
import { apiUrl } from "../../../api/config";

export const missionsHandlers = [
    // [get] 미션 조회
    http.get(apiUrl("missions"), ({ request }) => {
        if (getMockAuthState(request) !== "valid") {
            return HttpResponse.json(unauthorized, { status: 401 });
        }

        const url = new URL(request.url);
        const filter = url.searchParams.get("filter") ?? "all";
        const cursorParam = url.searchParams.get("cursor");
        const sizeParam = url.searchParams.get("size");
        const cursorValue = Number(cursorParam ?? 0);
        const sizeValue = Number(sizeParam ?? 20);

        if (!Number.isInteger(cursorValue) || !Number.isInteger(sizeValue)) {
            const field = !Number.isInteger(cursorValue) ? "cursor" : "size";
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "COMMON400",
                    message: "잘못된 요청입니다.",
                    errors: {
                        field,
                        message: "값의 형식이 올바르지 않습니다.",
                    },
                },
                { status: 400 },
            );
        }

        const cursor = Math.max(cursorValue, 0);
        const size = Math.min(Math.max(sizeValue, 1), 50);

        const filteredMissions = missionsResponse.data.missions.filter((mission) => {
            if (filter === "in-progress") return mission.status === "inProgress";
            if (filter === "completed") return mission.status === "completed" || mission.status === "notReceived";
            return true;
        });
        const missions = filteredMissions.slice(cursor, cursor + size);
        const nextCursor = cursor + missions.length;
        const hasNext = nextCursor < filteredMissions.length;

        return HttpResponse.json({
            ...missionsResponse,
            data: {
                missions,
                cursorPageInfo: {
                    size: missions.length,
                    hasNext,
                    nextCursor: hasNext ? nextCursor : null,
                },
            },
        });
    }),

    // [get] 메인 화면 미션 조회
    http.get(apiUrl("missions/main"), ({ request }) => {
        if (getMockAuthState(request) !== "valid") {
            return HttpResponse.json(unauthorized, { status: 401 });
        }

        return HttpResponse.json(mainMissionsResponse);
    }),

    // [patch] 미션 보상 수집
    // missionId = 99999 로 존재하지 않는 미션(404) 테스트
    // missionId = 12345 로 미완료 미션(400) 테스트
    http.patch(apiUrl("missions/:missionId"), ({ request, params }) => {
        if (getMockAuthState(request) !== "valid") {
            return HttpResponse.json(unauthorized, { status: 401 });
        }

        const missionId = Number(params.missionId);

        if (missionId == 99999) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "MISSION404",
                    message: "존재하지 않는 미션 번호입니다.",
                },
                { status: 404 },
            );
        }
        if (missionId == 12345) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "MISSION401",
                    message: "아직 완료되지 않은 미션입니다.",
                },
                { status: 400 },
            );
        }

        const mission = missionsResponse.data.missions.find(({ id }) => id === missionId);

        if (!mission) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "MISSION404",
                    message: "존재하지 않는 미션 번호입니다.",
                },
                { status: 404 },
            );
        }
        if (mission.status === "completed") {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "MISSION400",
                    message: "이미 보상을 수령한 미션입니다.",
                },
                { status: 400 },
            );
        }
        if (mission.status !== "notReceived") {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "MISSION401",
                    message: "아직 완료되지 않은 미션입니다.",
                },
                { status: 400 },
            );
        }

        mission.status = "completed";

        return HttpResponse.json(missionRewardResponse);
    }),
];
