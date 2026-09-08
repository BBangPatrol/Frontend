import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "./styles/global.css";

import App from "./App";
import { isServiceApiRequest } from "./api/config";
import { QueryProvider } from "./providers/QueryProvider";
import { store, persistor } from "./store/store";

// 서비스워커(MSW) 설정
async function enableMocking() {
  if (import.meta.env.VITE_ENABLE_MSW !== "true") return;

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
        <PersistGate loading={null} persistor={persistor}>
          <QueryProvider>
            <App />
          </QueryProvider>
        </PersistGate>
      </Provider>
    </StrictMode>,
  );
});
