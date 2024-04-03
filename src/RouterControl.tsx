import { FC, ReactNode } from "react";
import { ScrollRestoration, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/ProtectRoute";
import router from "./router";

type LayoutComponent = FC<{ children: ReactNode }>;
const routes = createBrowserRouter(
  router.map(
    (route: {
      element: FC;
      layout: LayoutComponent | string;
      isProtected: boolean | null;
      isAdmin?: boolean | null;
      path: string;
    }) => {
      const Element = route.element;
      const MappingLayout = route.layout;
      const isProtectedElement = route.isProtected;
      const checkAdmin = route.isAdmin;

      if (MappingLayout === "None") {
        return {
          path: route.path,
          element: isProtectedElement ? (
            <ProtectedRoute checkAdmin={checkAdmin}>
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
          <ProtectedRoute checkAdmin={checkAdmin}>
            <ScrollRestoration />
            <MappingLayout>
              <Element />
            </MappingLayout>
          </ProtectedRoute>
        ) : (
          <MappingLayout>
            <ScrollRestoration />
            <Element />
          </MappingLayout>
        ),
      };
    }
  )
);

export default routes;
