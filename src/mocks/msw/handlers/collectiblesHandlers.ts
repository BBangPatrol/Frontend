import { http, HttpResponse } from "msw";
import { getMockAuthState } from "../utils/auth";

// data
import { unauthorized } from "../data/common";
import { collectionDrawDuplicateResponse, collectionDrawResponse, collectionListResponse } from "../data/collectibles";
import { apiUrl } from "../../../api/config";


export const collectiblesHandlers = [
    // [get] 수집품 목록 조회
    http.get(apiUrl("collectibles"), ({ request }) => {
        if (getMockAuthState(request) !== "valid") {
            return HttpResponse.json(unauthorized, { status: 401 });
        }

        return HttpResponse.json(collectionListResponse);
    }),

    // [post] 수집품 뽑기
    // 새로운 수집품 or 중복 수집품을 5:5 확률로 응답
    http.post(apiUrl("collectibles/draw"), ({ request }) => {
        if (getMockAuthState(request) !== "valid") {
            return HttpResponse.json(unauthorized, { status: 401 });
        }

        const rand = Math.random() < 0.5;

        if (rand) return HttpResponse.json(collectionDrawResponse, { status: 201 });
        return HttpResponse.json(collectionDrawDuplicateResponse);
    }),
];
