import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../layouts/RootLayout";
import FooterLayout from "../layouts/FooterLayout";

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
        element: <FooterLayout />,
        children: [
          {
            path: "map",
            element: <MapPage />,
          },
        ],
      },
      {
        index: true,
        element: <HomePage />,
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
