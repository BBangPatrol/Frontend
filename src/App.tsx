import { BrowserRouter, Route, Routes } from "react-router";
import ApiTestPage from "./pages/ApiTestPage";
import DetailPage from "./pages/detail/DetailPage";
import ReviewDetailPage from "./pages/review/ReviewDetailPage";
import AddReviewPage from "./pages/review/AddReviewPage";
import ReceiptVerificationPage from "./pages/receipt/ReceiptVerificationPage";
import ReceiptResultPage from "./pages/receipt/ReceiptResultPage";
import CollectionPage from "./pages/collection/CollectionPage";
import DrawPage from "./pages/collection/DrawPage";
import MissionPage from "./pages/mission/MissionPage";
import MapPage from "./pages/map/MapPage";
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
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/collection/draw" element={<DrawPage />} />
          <Route path="/mission" element={<MissionPage />} />
          <Route path="/map" element={<MapPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
