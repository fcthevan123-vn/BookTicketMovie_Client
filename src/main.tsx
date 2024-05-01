import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store from "./redux/store/index.ts";
import { persistor } from "./redux/store";
import "dayjs/locale/vi";
import { DatesProvider } from "@mantine/dates";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <DatesProvider settings={{ locale: "vi" }}>
        <App />
      </DatesProvider>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);
