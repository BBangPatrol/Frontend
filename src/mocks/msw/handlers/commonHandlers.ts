// handlers/commonHandlers.ts

import { http, HttpResponse } from "msw";

// data
import {
  internalServerError,
  methodNotAllowed,
  notFound,
} from "../data/common";

const apiVersion = "v1";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiRoute {
  pathname: RegExp;
  methods: HttpMethod[];
}

const apiRoutes: ApiRoute[] = [
  {
    pathname: new RegExp(`^/api/${apiVersion}/collectibles/?$`),
    methods: ["GET"],
  },
  {
    pathname: new RegExp(`^/api/${apiVersion}/collectibles/draw/?$`),
    methods: ["POST"],
  },
];

function findApiRoute(pathname: string) {
  return apiRoutes.find(({ pathname: pattern }) => pattern.test(pathname));
}

export const commonHandlers = [
  http.all(`*/api/${apiVersion}/*`, ({ request }) => {
    try {
      const { pathname } = new URL(request.url);
      const route = findApiRoute(pathname);

      // 404 Not Found (잘못된 API 주소)
      if (!route) {
        return HttpResponse.json(notFound, {
          status: 404,
        });
      }

      // 405 Method Not Allowed (잘못된 메서드)
      if (!route.methods.includes(request.method as HttpMethod)) {
        return HttpResponse.json(methodNotAllowed, {
          status: 405,
          headers: {
            Allow: route.methods.join(", "),
          },
        });
      }

      return HttpResponse.json(internalServerError, {
        status: 500,
      });
    } catch {
      return HttpResponse.json(internalServerError, {
        status: 500,
      });
    }
  }),
];
