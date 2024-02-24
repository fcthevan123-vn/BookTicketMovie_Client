import { RouterProvider } from "react-router-dom";
import GlobalStyles from "./components/GlobalStyles";

import { Suspense } from "react";
import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import LoaderPage from "./components/Loaders/LoaderPage";
import { ModalsProvider } from "@mantine/modals";
import routes from "./RouterControl";
import "@mantine/core/styles.css";
import "@mantine/spotlight/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/charts/styles.css";

const theme = createTheme({
  fontFamily: "Be Vietnam Pro",
});

function App() {
  return (
    <GlobalStyles>
      <MantineProvider theme={theme}>
        <Notifications position="top-right" />
        <ModalsProvider>
          <Suspense fallback={<LoaderPage></LoaderPage>}>
            <RouterProvider router={routes} />
          </Suspense>
        </ModalsProvider>
      </MantineProvider>
    </GlobalStyles>
  );
}

export default App;
