import { Link } from "react-router";

function MainPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 p-6">
      <Link
        className="rounded-lg bg-KUMDORI-01 px-4 py-2 typo-head-01 text-white hover:bg-violet-500"
        to="/api-test"
      >
        API 테스트
      </Link>
    </main>
  );
}

export default MainPage;
