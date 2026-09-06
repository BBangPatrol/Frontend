import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import RootLayout from "../layouts/RootLayout";
import FooterLayout from "../layouts/FooterLayout";

import HomePage from "../pages/home/HomePage";
import MapPage from "../pages/map/MapPage";
import CollectionPage from "../pages/collection/CollectionPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import ApiTestPage from "../pages/ApiTestPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      {/* Footer가 필요한 페이지 */}
      <Route element={<FooterLayout />}>
        <Route path="map" element={<MapPage />} />
      </Route>

      {/* Footer가 필요 없는 페이지 */}
      <Route index element={<HomePage />} />
      <Route path="collection" element={<CollectionPage />} />
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="api-test" element={<ApiTestPage />} />
    </Route>,
  ),
);
