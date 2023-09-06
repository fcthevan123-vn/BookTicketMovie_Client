import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import GlobalStyles from "./components/GlobalStyles";
import router from "./router";
import { Suspense, FC, ReactNode, useState } from "react";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  createEmotionCache,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import ProtectedRoute from "./components/ProtectRoute";
import LoaderPage from "./components/Loaders/LoaderPage";
import { ModalsProvider } from "@mantine/modals";

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
      const isProtectedElement = route.isProtected;

      if (MappingLayout === "None") {
        return {
          path: route.path,
          element: isProtectedElement ? (
            <ProtectedRoute>
              <Element />
            </ProtectedRoute>
          ) : (
            <Element />
          ),
        };
      }
      return {
        path: route.path,
        element: isProtectedElement ? (
          <ProtectedRoute>
            <MappingLayout>
              <Element />
            </MappingLayout>
          </ProtectedRoute>
        ) : (
          <MappingLayout>
            <Element />
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
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <GlobalStyles>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          emotionCache={myCache}
          theme={{
            globalStyles: () => ({
              "*, *::before, *::after": {
                boxSizing: "border-box",
                fontFamily: "Be Vietnam Pro",
              },
            }),
            colorScheme,
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
      </ColorSchemeProvider>
    </GlobalStyles>
  );
}

export default App;
