import { Link } from "react-router";

function MainPage() {
    return (
        <main className="flex min-h-dvh flex-col items-center justify-center gap-6 p-6">
            <Link className="rounded-lg bg-violet-600 px-4 py-2 font-semibold text-white hover:bg-violet-500" to="/api-test">
                API 테스트
            </Link>
        </main>
    );
}

export default MainPage;
