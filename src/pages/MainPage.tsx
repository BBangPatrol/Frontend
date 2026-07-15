import { Link } from "react-router";

function MainPage() {
  return (
    <main>
      <h1>Main Page</h1>
      <Link to="/api-test">API 테스트 페이지로 이동</Link>
    </main>
  );
}

export default MainPage;
