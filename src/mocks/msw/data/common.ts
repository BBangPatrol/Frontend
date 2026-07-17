export const unauthorized = {
    isSuccess: false,
    code: "401",
    message: "토큰이 만료되었거나 유효한 토큰이 아닙니다.",
    data: null,
};

export const notFound = {
    isSuccess: false,
    code: "404",
    message: "해당 요청 주소를 찾을 수 없습니다.",
    data: null,
};

export const methodNotAllowed = {
    isSuccess: false,
    code: "405",
    message: "허용되지 않은 HTTP 메서드입니다.",
    data: null,
};
