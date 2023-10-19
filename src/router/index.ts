import { lazy } from "react";
import { ReactNode, FC } from "react";
const HomePage = lazy(() => import("../pages/HomePage"));
const MoviePage = lazy(() => import("../pages/MoviePage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));
const UserPage = lazy(() => import("../pages/UserPage"));
const AdminPage = lazy(() => import("../pages/AdminPage"));

const MovieDetailPage = lazy(() => import("../pages/DetailMoviePage"));

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
    path: "/admin/manage-account",
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
  {
    path: "/admin/cinema/overview",
    isProtected: true,
    isAdmin: true,
    layout: AdminLayout,
    element: AdminPage,
  },
  {
    path: "/admin/cinema/add-a-cinema",
    isProtected: true,
    isAdmin: true,
    layout: AdminLayout,
    element: AdminPage,
  },

  {
    path: "/admin/movie-hall/overview",
    isProtected: true,
    isAdmin: true,
    layout: AdminLayout,
    element: AdminPage,
  },

  {
    path: "/admin/layout/overview",
    isProtected: true,
    isAdmin: true,
    layout: AdminLayout,
    element: AdminPage,
  },

  // Movies
  {
    path: "/movie/:id",
    isProtected: false,
    isAdmin: false,
    layout: DefaultLayout,
    element: MovieDetailPage,
  },

  {
    path: "/movie",
    isProtected: false,
    layout: DefaultLayout,
    element: MoviePage,
  },
];

export default router;
