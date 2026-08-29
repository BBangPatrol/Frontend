import { BrowserRouter, Route, Routes } from "react-router";
import ApiTestPage from "./pages/ApiTestPage";
import DetailPage from "./pages/DetailPage";
import ReviewDetailPage from "./pages/ReviewDetailPage";
import AddReviewPage from "./pages/AddReviewPage";
import ReceiptVerificationPage from "./pages/ReceiptVerificationPage";
import ReceiptResultPage from "./pages/ReceiptResultPage";
import CollectiblePage from "./pages/CollectiblePage";
import DrawPage from "./pages/DrawPage";
import MissionPage from "./pages/MissionPage";
import MapPage from "./pages/MapPage";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/home/HomePage";
import DashboardPage from "./pages/dashboard/DashboardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
