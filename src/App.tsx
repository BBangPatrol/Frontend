import { BrowserRouter, Route, Routes } from "react-router";

import RootLayout from "./layouts/RootLayout";

import HomePage from "./pages/home/HomePage";
import MapPage from "./pages/map/MapPage";
import CollectionPage from "./pages/collection/CollectionPage";
import DashboardPage from "./pages/dashboard/DashboardPage";

import ApiTestPage from "./pages/ApiTestPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />

          <Route path="/api-test" element={<ApiTestPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
