// handlers/commonHandlers.ts

import { http, HttpResponse } from "msw";
import { matchPath } from "react-router";

// data
import { methodNotAllowed, notFound } from "../data/common";
import { apiUrl } from "../../../api/config";

// 405 응답을 위한 path 배열
const apiPaths = [
    "/api/:v/auth/login",
    "/api/:v/auth/logout",
    "/api/:v/auth/me",
    "/api/:v/auth/reissue",
    "/api/:v/users/me/bread-collections",
    "/api/:v/users/me",
    "/api/:v/users/me/edit",
    "/api/:v/users/me/profile-image",
    "/api/:v/users/me/points",
    "/api/:v/users/me/reviews",
    "/api/:v/stores/search",
    "/api/:v/stores/:storeId/detail",
    "/api/:v/stores/:storeId/attractions",
    "/api/:v/stores/:storeId/favorites",
    "/api/:v/stores/:storeId/visit-verifications",
    "/api/:v/stores/:storeId/visits",
    "/api/:v/stores/:storeId/reviews",
    "/api/:v/stores/:storeId/reviews/:reviewId",
    "/api/:v/stores/:storeId/reviews/:reviewId/like",
    "/api/:v/missions",
    "/api/:v/missions/:missionId",
    "/api/:v/collectibles",
    "/api/:v/collectibles/draw",
];

// 명세서 상 존재하는 path 이지만 메서드가 없을경우 405 응답
// 명세서 상 존재하지 않는 path인 경우 404 응답
export const commonHandlers = [
    http.all(apiUrl("*"), ({ request }) => {
        const { pathname } = new URL(request.url);
        const isApiPath = apiPaths.some((path) => matchPath(path, pathname));

        if (isApiPath) {
            return HttpResponse.json(methodNotAllowed, { status: 405 });
        }

        return HttpResponse.json(notFound, { status: 404 });
    }),
];
