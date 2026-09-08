import { Link } from "react-router-dom";
import { startKakaoLogin } from "../utils/kakao";

export default function LoginTestPage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col gap-6 p-6">
      <h1 className="text-3xl font-bold">카카오 로그인 테스트</h1>
      <button type="button" onClick={startKakaoLogin} className="h-10 rounded-md bg-[#FEE500] px-4 font-semibold text-black">
        카카오 로그인
      </button>
      <Link to="/" className="text-sm text-sub-01 underline">메인으로 이동</Link>
    </main>
  );
}
