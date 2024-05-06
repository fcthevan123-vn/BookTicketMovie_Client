import { Anchor, Breadcrumbs } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import { Fragment } from "react";
import DashboardPage from "./DashboardPage";
import AddMoviePage from "./AddMoviePage";
import AllMoviesPage from "./AllMoviesPage";
import { MovieProvider } from "../../components/Provider/MovieProvider/MovieProvider";
import ManageAccountPage from "./ManageAccountPage";
import { TableFilterProvider } from "../../components/Provider/TableFilterProvider";
import AdminCinemaPage from "./AdminCinemaPage";
import AdminMovieHallPage from "./AdminMovieHallPage";
import AdminLayoutPage from "./AdminLayoutPage";
import ManageBookingPage from "./ManageBookingPage";
import ShowTimePage from "./ShowTimePage";
import ManageEventPage from "./ManageEventPage";
import ManageDiscountPage from "./ManageDiscountPage";
import ManageFoodPage from "./ManageFoodPage/ManageFoodPage";
import MangeReview from "./ManageReview/MangeReview";

type cinemaRows = {
  name: React.ReactNode;
  location: React.ReactNode;
  detailLocation: React.ReactNode;
};

const allPath = [
  {
    urlInclude: "dashboard",
    breadcrumbs: [
      { title: "Admin", href: "#" },
      { title: "Dashboard", href: "#" },
    ],
    jsx: <DashboardPage></DashboardPage>,
  },
  {
    urlInclude: "addamovie",
    breadcrumbs: [
      { title: "Admin", href: "/admin/dashboard" },
      { title: "Movie", href: "#" },
      { title: "Add-a-movie", href: "#" },
    ],
    jsx: <AddMoviePage></AddMoviePage>,
  },

  {
    urlInclude: "cinema/overview",
    breadcrumbs: [
      { title: "Admin", href: "/admin/dashboard" },
      { title: "Cinema", href: "#" },
    ],
    jsx: (
      <TableFilterProvider<cinemaRows> initialData={[]}>
        <AdminCinemaPage></AdminCinemaPage>
      </TableFilterProvider>
    ),
  },
  {
    urlInclude: "moviehall/overview",
    breadcrumbs: [
      { title: "Admin", href: "/admin/dashboard" },
      { title: "Movie hall", href: "#" },
    ],
    jsx: (
      <TableFilterProvider<[]> initialData={[]}>
        <AdminMovieHallPage></AdminMovieHallPage>
      </TableFilterProvider>
    ),
  },
  {
    urlInclude: "allmovies",
    breadcrumbs: [
      { title: "Admin", href: "/admin/dashboard" },
      { title: "Movie", href: "#" },
      { title: "All-movies", href: "#" },
    ],
    jsx: (
      <MovieProvider>
        <AllMoviesPage></AllMoviesPage>
      </MovieProvider>
    ),
  },
  {
    urlInclude: "manageaccount",
    breadcrumbs: [
      { title: "Admin", href: "/admin/dashboard" },
      { title: "Manage Account", href: "#" },
    ],
    jsx: <ManageAccountPage></ManageAccountPage>,
  },

  {
    urlInclude: "managebooking",
    breadcrumbs: [
      { title: "Admin", href: "/admin/dashboard" },
      { title: "Manage Booking", href: "#" },
    ],
    jsx: (
      <TableFilterProvider initialData={[]}>
        <ManageBookingPage></ManageBookingPage>
      </TableFilterProvider>
    ),
  },

  {
    urlInclude: "layout/overview",
    breadcrumbs: [
      { title: "Admin", href: "/admin/dashboard" },
      { title: "Manage layout", href: "#" },
    ],
    jsx: (
      <TableFilterProvider<[]> initialData={[]}>
        <AdminLayoutPage></AdminLayoutPage>
      </TableFilterProvider>
    ),
  },
  {
    urlInclude: "showtime",
    breadcrumbs: [
      { title: "Admin", href: "/admin/dashboard" },
      { title: "Show Time", href: "#" },
    ],
    jsx: (
      <TableFilterProvider<[]> initialData={[]}>
        <ShowTimePage></ShowTimePage>
      </TableFilterProvider>
    ),
  },
  {
    urlInclude: "event",
    breadcrumbs: [
      { title: "Admin", href: "/admin/event" },
      { title: "Event", href: "#" },
    ],
    jsx: (
      <TableFilterProvider<[]> initialData={[]}>
        <ManageEventPage></ManageEventPage>
      </TableFilterProvider>
    ),
  },
  {
    urlInclude: "discount",
    breadcrumbs: [
      { title: "Admin", href: "/admin/discount" },
      { title: "Discount", href: "#" },
    ],
    jsx: (
      <TableFilterProvider<[]> initialData={[]}>
        <ManageDiscountPage></ManageDiscountPage>
      </TableFilterProvider>
    ),
  },
  {
    urlInclude: "food",
    breadcrumbs: [
      { title: "Admin", href: "/admin/food" },
      { title: "Food & Drink", href: "#" },
    ],
    jsx: <ManageFoodPage></ManageFoodPage>,
  },
  {
    urlInclude: "reviews",
    breadcrumbs: [
      { title: "Admin", href: "/admin/reviews" },
      { title: "Reviews", href: "#" },
    ],
    jsx: <MangeReview></MangeReview>,
  },
];

const AdminPage = () => {
  const location = useLocation();
  const urlConverted = location.pathname.replace(/-/g, "");

  const element = allPath.map((path) => {
    if (urlConverted.includes(path.urlInclude) === true) {
      return (
        <Fragment key={path.urlInclude}>
          <Breadcrumbs className="pt-3 px-6">
            {path.breadcrumbs.map((item, index) => (
              <Link to={item.href} key={index}>
                <Anchor component="p" aria-disabled key={index}>
                  {item.title}
                </Anchor>
              </Link>
            ))}
          </Breadcrumbs>
          <div className="p-3">{path.jsx}</div>
        </Fragment>
      );
    }
  });
  return <div>{element}</div>;
};

export default AdminPage;
