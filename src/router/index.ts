import { lazy } from "react";
import { ReactNode, FC } from "react";
const HomePage = lazy(() => import("../pages/HomePage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));

import { DefaultLayout } from "../layouts";

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
    isProtected: null,
    layout: "None",
    element: HomePage,
  },
  {
    path: "/register",
    isProtected: null,
    layout: DefaultLayout,
    element: RegisterPage,
  },
];

export default router;
