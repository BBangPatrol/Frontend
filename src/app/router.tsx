import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import RootLayout from "../layouts/RootLayout";
import FooterLayout from "../layouts/FooterLayout";

import HomePage from "../pages/home/HomePage";
import MapPage from "../pages/map/MapPage";
import CollectionPage from "../pages/collection/CollectionPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import ApiTestPage from "../pages/ApiTestPage";
import LoginTestPage from "../pages/LoginTestPage";
import DetailPage from "../pages/detail/DetailPage";
import ReviewDetailPage from "../pages/review/ReviewDetailPage";
import AddReviewPage from "../pages/review/AddReviewPage";
import ReceiptVerificationPage from "../pages/receipt/ReceiptVerificationPage";
import ReceiptResultPage from "../pages/receipt/ReceiptResultPage";
import DrawPage from "../pages/collection/DrawPage";
import MissionPage from "../pages/mission/MissionPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      {/* Footer가 필요한 페이지 */}
      <Route element={<FooterLayout />}>
        <Route path="map" element={<MapPage />} />
        <Route path="/login-test" element={<LoginTestPage />} />
        <Route path="/detail/:storeId" element={<DetailPage />} />
        <Route path="/detail/review" element={<ReviewDetailPage />} />
        <Route path="/detail/review/new" element={<AddReviewPage />} />
        <Route path="/receipt/verify" element={<ReceiptVerificationPage />} />
        <Route path="/receipt/result" element={<ReceiptResultPage />} />
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/mission" element={<MissionPage />} />
      </Route>

      {/* Footer가 필요 없는 페이지 */}
      <Route index element={<HomePage />} />
      <Route path="collection" element={<CollectionPage />} />
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="api-test" element={<ApiTestPage />} />
      <Route path="/collection/draw" element={<DrawPage />} />
    </Route>,
  ),
);
