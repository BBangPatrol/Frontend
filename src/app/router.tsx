import { createBrowserRouter } from "react-router";

import RootLayout from "../layouts/RootLayout";

import HomePage from "../pages/home/HomePage";
import MapPage from "../pages/map/MapPage";
import CollectionPage from "../pages/collection/CollectionPage";
import DashboardPage from "../pages/dashboard/DashboardPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "map",
        element: <MapPage />,
      },
      {
        path: "collection",
        element: <CollectionPage />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
    ],
  },
]);
