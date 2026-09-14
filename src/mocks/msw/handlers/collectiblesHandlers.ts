import { http, HttpResponse } from "msw";
import { getMockAuthState } from "../utils/auth";

// data
import { unauthorized } from "../data/common";
import { allCollectionListResponse, collectionDrawDuplicateResponse, collectionDrawResponse, collectionListResponse } from "../data/collectibles";
import { apiUrl } from "../../../api/config";

let currentPoint = 1250;
let drawCount = 0;

export const collectiblesHandlers = [
    // [get] 수집품 목록 조회
    http.get(apiUrl("collectibles"), ({ request }) => {
        if (getMockAuthState(request) !== "valid") {
            return HttpResponse.json(unauthorized, { status: 401 });
        }

        const type = new URL(request.url).searchParams.get("type");
        return HttpResponse.json(type === "all" ? allCollectionListResponse : collectionListResponse);
    }),

    // [post] 수집품 뽑기
    // 신규 수집품과 중복 수집품을 번갈아 응답
    http.post(apiUrl("collectibles"), ({ request }) => {
        if (getMockAuthState(request) !== "valid") {
            return HttpResponse.json(unauthorized, { status: 401 });
        }

        if (currentPoint < 100) {
            return HttpResponse.json(
                {
                    isSuccess: false,
                    code: "POINT400",
                    message: "포인트가 부족합니다.",
                },
                { status: 400 },
            );
        }

        const duplicated = drawCount % 2 === 1;
        currentPoint -= duplicated ? 80 : 100;
        drawCount += 1;

        const response = duplicated ? collectionDrawDuplicateResponse : collectionDrawResponse;
        return HttpResponse.json(
            {
                ...response,
                data: { ...response.data, currentPoint },
            },
            { status: duplicated ? 200 : 201 },
        );
    }),
];
