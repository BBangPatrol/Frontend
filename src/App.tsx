import { BrowserRouter, Route, Routes } from "react-router";
import ApiTestPage from "./pages/ApiTestPage";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import ReviewDetailPage from "./pages/ReviewDetailPage";
import AddReviewPage from "./pages/AddReviewPage";
import ReceiptVerificationPage from "./pages/ReceiptVerificationPage";
import ReceiptResultPage from "./pages/ReceiptResultPage";
import CollectiblePage from "./pages/CollectiblePage";
import DrawPage from "./pages/DrawPage";
import MissionPage from "./pages/MissionPage";
import MapPage from "./pages/MapPage";

// 라우팅
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/api-test" element={<ApiTestPage />} />
        <Route path="/detail" element={<DetailPage />} />
        <Route path="/detail/review" element={<ReviewDetailPage />} />
        <Route path="/detail/review/new" element={<AddReviewPage />} />
        <Route path="/receipt/verify" element={<ReceiptVerificationPage />} />
        <Route path="/receipt/result" element={<ReceiptResultPage />} />
        <Route path="/collect" element={<CollectiblePage />} />
        <Route path="/collect/draw" element={<DrawPage />} />
        <Route path="/mission" element={<MissionPage />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
