// mocks/auth.ts
export const MOCK_ACCESS_TOKEN = "mock-access-token";
export const MOCK_EXPIRED_ACCESS_TOKEN = "expired-access-token";
export const MOCK_REFRESH_TOKEN = "mock-refresh-token";

export const userInfo = {
    isSuccess: true,
    code: "200",
    message: "요청이 성공적입니다.",
    data: {
        userId: 1,
        userNickname: "닉네임",
    },
    errors: null,
};

export const reissue = {
    isSuccess: true,
    code: "200",
    message: "토큰 재발급에 성공했습니다.",
    data: {
        accessToken: MOCK_ACCESS_TOKEN,
        refreshToken: MOCK_REFRESH_TOKEN,
    },
    errors: null,
};
