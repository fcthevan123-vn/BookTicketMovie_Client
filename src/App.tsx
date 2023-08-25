import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import GlobalStyles from "./components/GlobalStyles";
import router from "./router";
import { Suspense, FC, ReactNode } from "react";
import { MantineProvider, createEmotionCache } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import ProtectedRoute from "./components/ProtectRoute";
import ProviderGetProfile from "./components/ProviderGetProfile";
import { SpotlightProvider } from "@mantine/spotlight";

type LayoutComponent = FC<{ children: ReactNode }>;
const route = createBrowserRouter(
  router.map(
    (route: {
      element: FC;
      layout: LayoutComponent | string;
      isProtected: boolean | null;
      path: string;
    }) => {
      const Element = route.element;
      const MappingLayout = route.layout;
      const isProtected = route.isProtected;
      if (MappingLayout) {
        if (MappingLayout === "None") {
          return {
            path: route.path,
            element: isProtected ? (
              <Suspense fallback={<div>Loading...</div>}>
                <Element />
              </Suspense>
            ) : (
              <>
                <Suspense fallback={<div>Loading...</div>}>
                  <Element />
                </Suspense>
              </>
            ),
          };
        }
        return {
          path: route.path,
          element: isProtected ? (
            <MappingLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <Element />
              </Suspense>
            </MappingLayout>
          ) : (
            <MappingLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <Element />
              </Suspense>
            </MappingLayout>
          ),
        };
      } else {
        return {
          path: route.path,
          element: isProtected ? (
            <Suspense fallback={<div>Loading...</div>}>
              <Element />
            </Suspense>
          ) : (
            <Suspense fallback={<div>Loading...</div>}>
              <Element />
            </Suspense>
          ),
        };
      }
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
          globalStyles: (theme) => ({
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
        {/* <SpotlightProvider actions={[]}> */}
        <Notifications position="top-right" />
        <RouterProvider router={route} />
        {/* </SpotlightProvider> */}
      </MantineProvider>
    </GlobalStyles>
  );
}

export default App;
