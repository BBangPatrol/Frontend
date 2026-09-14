export const unauthorized = {
    isSuccess: false,
    code: "COMMON401",
    message: "인증이 필요합니다",
    data: null,
};

export const notFound = {
    isSuccess: false,
    code: "COMMON404",
    message: "요청한 자원을 찾을 수 없습니다",
    data: null,
};

export const methodNotAllowed = {
    isSuccess: false,
    code: "COMMON405",
    message: "허용되지 않은 HTTP 메서드입니다",
    data: null,
};
