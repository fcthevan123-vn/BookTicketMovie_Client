import { lazy } from "react";
import { ReactNode, FC } from "react";
const HomePage = lazy(() => import("../pages/HomePage"));
const MoviePage = lazy(() => import("../pages/MoviePage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));
const UserPage = lazy(() => import("../pages/UserPage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const AdminPage = lazy(() => import("../pages/AdminPage"));
const PickSeatPage = lazy(() => import("../pages/PickSeatPage"));
const MovieDetailPage = lazy(() => import("../pages/DetailMoviePage"));
const VerifyEmailPage = lazy(() => import("../pages/VerifyEmailPage"));
const EmployeePage = lazy(() => import("../pages/EmployeePage"));
const EventPage = lazy(() => import("../pages/EventPage"));
const PaymentAuthPage = lazy(() => import("../pages/PaymentAuthPage"));
const SelectShowPage = lazy(() => import("../pages/SelectShowPage"));

import {
  AdminLayout,
  DefaultLayout,
  EmployeeLayout,
  UserLayout,
} from "../layouts";

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
    path: "/payment-auth",
    isProtected: false,
    layout: "None",
    element: PaymentAuthPage,
  },
  {
    path: "/event/:id",
    isProtected: false,
    layout: DefaultLayout,
    element: EventPage,
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

  {
    path: "/verify-email/:id",
    isProtected: false,
    layout: "None",
    element: VerifyEmailPage,
  },

  // User
  {
    path: "/user/:id/profile",
    isProtected: true,
    layout: UserLayout,
    element: UserPage,
  },

  {
    path: "/user/:id/statistic",
    isProtected: true,
    layout: UserLayout,
    element: UserPage,
  },

  {
    path: "/user/:id/all-reviews",
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
    path: "/user/:id/all-tickets",
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
    path: "/admin/event",
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

  {
    path: "/admin/manage-booking",
    isProtected: true,
    isAdmin: true,
    layout: AdminLayout,
    element: AdminPage,
  },
  {
    path: "/admin/show-time",
    isProtected: true,
    isAdmin: true,
    layout: AdminLayout,
    element: AdminPage,
  },
  {
    path: "/admin/manage-discount",
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

  {
    path: "/about",
    isProtected: false,
    layout: DefaultLayout,
    element: AboutPage,
  },

  {
    path: "/select-show/:id",
    isProtected: true,
    layout: "None",
    element: SelectShowPage,
  },

  {
    path: "/pick-seat-by-show/:id",
    isProtected: true,
    layout: "None",
    element: PickSeatPage,
  },

  // employee
  {
    path: "/employee/dashboard",
    isProtected: true,
    layout: EmployeeLayout,
    element: EmployeePage,
  },

  {
    path: "/employee/manage-booking",
    isProtected: true,
    layout: EmployeeLayout,
    element: EmployeePage,
  },
  {
    path: "/employee/movie-hall",
    isProtected: true,
    layout: EmployeeLayout,
    element: EmployeePage,
  },

  {
    path: "/employee/room-type",
    isProtected: true,
    layout: EmployeeLayout,
    element: EmployeePage,
  },
  {
    path: "/employee/layout",
    isProtected: true,
    layout: EmployeeLayout,
    element: EmployeePage,
  },

  {
    path: "/employee/seat",
    isProtected: true,
    layout: EmployeeLayout,
    element: EmployeePage,
  },
  {
    path: "/employee/all-show",
    isProtected: true,
    layout: EmployeeLayout,
    element: EmployeePage,
  },
];

export default router;
