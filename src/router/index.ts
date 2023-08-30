import { lazy } from "react";
import { ReactNode, FC } from "react";
const HomePage = lazy(() => import("../pages/HomePage"));
const MoviePage = lazy(() => import("../pages/MoviePage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));
const UserProfilePage = lazy(() => import("../pages/UserPage/UserProfilePage"));

import { DefaultLayout, UserLayout } from "../layouts";

type LayoutComponent = FC<{ children: ReactNode }>;

interface IRouter {
  path: string;
  layout: LayoutComponent | string;
  element: FC;
  isProtected: boolean | null;
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
    isProtected: null,
    layout: UserLayout,
    element: UserProfilePage,
  },

  {
    path: "/user/:id/change-password",
    isProtected: null,
    layout: UserLayout,
    element: UserProfilePage,
  },
  {
    path: "*",
    isProtected: null,
    layout: "None",
    element: ErrorPage,
  },
];

export default router;
