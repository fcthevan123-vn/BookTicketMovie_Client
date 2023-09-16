import { lazy } from "react";
import { ReactNode, FC } from "react";
const HomePage = lazy(() => import("../pages/HomePage"));
const MoviePage = lazy(() => import("../pages/MoviePage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));
const UserPage = lazy(() => import("../pages/UserPage"));
const AdminPage = lazy(() => import("../pages/AdminPage"));
import { AdminLayout, DefaultLayout, UserLayout } from "../layouts";

type LayoutComponent = FC<{ children: ReactNode }>;

interface IRouter {
  path: string;
  layout: LayoutComponent | string;
  element: FC;
  isProtected: boolean | null;
  isAdmin?: boolean | null;
}

const router: IRouter[] = [
  {
    path: "/",
    isProtected: true,
    layout: DefaultLayout,
    element: HomePage,
  },
  {
    path: "/home",
    isProtected: true,
    layout: DefaultLayout,
    element: HomePage,
  },
  {
    path: "/movie",
    isProtected: null,
    layout: DefaultLayout,
    element: MoviePage,
  },
  {
    path: "/register",
    isProtected: null,
    layout: "None",
    element: RegisterPage,
  },

  // User
  {
    path: "/user/:id/profile",
    isProtected: true,
    layout: UserLayout,
    element: UserPage,
  },

  {
    path: "/user/:id/change-password",
    isProtected: true,
    layout: UserLayout,
    element: UserPage,
  },
  {
    path: "*",
    isProtected: true,
    layout: "None",
    element: ErrorPage,
  },
  {
    path: "/error",
    isProtected: true,
    layout: "None",
    element: ErrorPage,
  },

  // admin
  {
    path: "/admin/dashboard",
    isProtected: true,
    isAdmin: true,
    layout: AdminLayout,
    element: AdminPage,
  },

  {
    path: "/admin/movie/add-a-movie",
    isProtected: true,
    isAdmin: true,
    layout: AdminLayout,
    element: AdminPage,
  },
  {
    path: "/admin/movie/all-movies",
    isProtected: true,
    isAdmin: true,
    layout: AdminLayout,
    element: AdminPage,
  },
];

export default router;
