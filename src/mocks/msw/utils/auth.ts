import { MOCK_ACCESS_TOKEN, MOCK_EXPIRED_ACCESS_TOKEN } from "../data/auth";

export type MockAuthState = "valid" | "expired" | "missing" | "invalid";
export type MockTokenMode = "none" | "valid" | "expired";

export function getMockAuthorizationHeader(mode: MockTokenMode) {
    if (mode === "valid") return `Bearer ${MOCK_ACCESS_TOKEN}`;
    if (mode === "expired") return `Bearer ${MOCK_EXPIRED_ACCESS_TOKEN}`;
    return undefined;
}

export function getMockAuthState(request: Request): MockAuthState {
    const authorization = request.headers.get("Authorization");

    if (!authorization) return "missing";
    if (authorization === `Bearer ${MOCK_ACCESS_TOKEN}`) return "valid";
    if (authorization === `Bearer ${MOCK_EXPIRED_ACCESS_TOKEN}`) return "expired";

    return "invalid";
}
