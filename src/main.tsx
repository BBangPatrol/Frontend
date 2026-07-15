import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryProvider } from "./providers/QueryProvider.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

// 서비스워커(MSW) 설정
async function enableMocking() {
  if (import.meta.env.MODE !== "development") return;

  const { worker } = await import("./mocks/msw/browser");

  return worker.start({
    onUnhandledRequest: "bypass",
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
