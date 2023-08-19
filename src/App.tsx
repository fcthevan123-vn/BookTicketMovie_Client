import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalStyles from "./components/GlobalStyles";
import router from "./router";
import { Suspense, FC, ReactNode } from "react";

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

function App() {
  return (
    <GlobalStyles>
      <RouterProvider router={route} />
    </GlobalStyles>
  );
}

export default App;
