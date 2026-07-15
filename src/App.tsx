import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import ApiTestPage from "./pages/ApiTestPage";
import MainPage from "./pages/MainPage";

// 라우팅
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/api-test" element={<ApiTestPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
