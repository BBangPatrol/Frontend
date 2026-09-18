import { RouterProvider } from "react-router-dom";
import { MotionConfig } from "motion/react";

import { router } from "./app/router";

export default function App() {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.2, ease: "easeOut" }}>
      <RouterProvider router={router} />
    </MotionConfig>
  );
}
