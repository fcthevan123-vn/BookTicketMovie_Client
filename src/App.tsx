import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import GlobalStyles from "./components/GlobalStyles";
import router from "./router";
import { Suspense, FC, ReactNode } from "react";
import { MantineProvider, createEmotionCache } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import ProtectedRoute from "./components/ProtectRoute";
import ProviderGetProfile from "./components/ProviderGetProfile";
import { SpotlightProvider } from "@mantine/spotlight";
import LoaderPage from "./components/Loaders/LoaderPage";
import { ModalsProvider } from "@mantine/modals";

type LayoutComponent = FC<{ children: ReactNode }>;
const route = createBrowserRouter(
  router.map(
    (route: {
      element: FC;
      layout: LayoutComponent | string;
      path: string;
    }) => {
      const Element = route.element;
      const MappingLayout = route.layout;

      if (MappingLayout === "None") {
        return {
          path: route.path,
          element: (
            // <Suspense fallback={<div>Loading...</div>}>
            <Element />
            // </Suspense>
          ),
        };
      }
      return {
        path: route.path,
        element: (
          <MappingLayout>
            {/* <Suspense fallback={<div>Loading...</div>}> */}
            <Element />
            {/* </Suspense> */}
          </MappingLayout>
        ),
      };
    }
  )
);

const myCache = createEmotionCache({
  key: "mantine",
  prepend: false,
});

function App() {
  return (
    <GlobalStyles>
      <MantineProvider
        emotionCache={myCache}
        theme={{
          globalStyles: () => ({
            "*, *::before, *::after": {
              boxSizing: "border-box",
              fontFamily: "Poppins",
            },
          }),
          colorScheme: "light",
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Notifications position="top-right" />
        <ModalsProvider>
          <Suspense fallback={<LoaderPage></LoaderPage>}>
            <RouterProvider router={route} />
          </Suspense>
        </ModalsProvider>
      </MantineProvider>
    </GlobalStyles>
  );
}

export default App;
