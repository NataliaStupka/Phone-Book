import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./components/App/App";
import "modern-normalize";

// 1. Імпортуємо провайдер
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store"; // 2. Імпортуємо створений стор; persistor
import { BrowserRouter } from "react-router-dom"; // Маршрутизатор
import { PersistGate } from "redux-persist/integration/react"; // 'localStorage'

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <App />
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              duration: 2000,
            }}
          />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
