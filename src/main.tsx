import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import "./styles/global.css";

import App from "./App";
import { isServiceApiRequest } from "./api/config";
import { QueryProvider } from "./providers/QueryProvider";
import { store } from "./store/store";

// 서비스워커(MSW) 설정
async function enableMocking() {
  // return;
  if (import.meta.env.MODE !== "development") return;

  const { worker } = await import("./mocks/msw/browser");

  return worker.start({
    onUnhandledRequest(request, print) {
      if (isServiceApiRequest(request)) {
        print.error();
      }
    },
  });
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Provider store={store}>
        <QueryProvider>
          <App />
        </QueryProvider>
      </Provider>
    </StrictMode>,
  );
});
