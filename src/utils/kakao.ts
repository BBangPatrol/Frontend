export function startKakaoLogin() {
  const clientId = import.meta.env.VITE_KAKAO_REST_API_KEY?.trim();
  const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI?.trim();

  if (!clientId || !redirectUri) {
    alert("카카오 로그인 환경변수를 확인해 주세요.");
    return;
  }

  const state = crypto.randomUUID();
  sessionStorage.setItem("kakaoState", state);

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    state,
  });

  window.location.assign(`https://kauth.kakao.com/oauth/authorize?${params}`);
}
