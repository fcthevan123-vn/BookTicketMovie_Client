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
import AddNewCinemaPage from "./AdminCinemaPage/AddNewCinemaPage";

type userRows = {
  fullName: React.ReactNode;
  type: React.ReactNode;
  email: React.ReactNode;
  phone: React.ReactNode;
  sex: React.ReactNode;
  address: React.ReactNode;
  id?: React.ReactNode;
  age: React.ReactNode;
};

type cinemaRows = {
  name: React.ReactNode;
  location: React.ReactNode;
  detailLocation: React.ReactNode;
};

const intinialUserData = [
  {
    fullName: "",
    type: "",
    email: "",
    phone: "",
    sex: "",
    address: "",
    id: "",
    age: "",
  },
];

const intinialCinemaData = [
  {
    name: "",
    location: "",
    detailLocation: "",
  },
];

const allPath = [
  {
    urlInclude: "dashboard",
    breadcrumbs: [
      { title: "Admin", href: "#" },
      { title: "Dashboard", href: "#" },
    ],
    jsx: (
      <div>
        <DashboardPage></DashboardPage>
      </div>
    ),
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
    urlInclude: "addacinema",
    breadcrumbs: [
      { title: "Admin", href: "/admin/dashboard" },
      { title: "Cinema", href: "/admin/cinema/overview" },
      { title: "Add-a-cinema", href: "#" },
    ],
    jsx: <AddNewCinemaPage></AddNewCinemaPage>,
  },
  {
    urlInclude: "cinema/overview",
    breadcrumbs: [
      { title: "Admin", href: "/admin/dashboard" },
      { title: "Cinema", href: "#" },
    ],
    jsx: (
      <TableFilterProvider<cinemaRows> initialData={intinialCinemaData}>
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
      <TableFilterProvider<cinemaRows> initialData={intinialCinemaData}>
        <AdminCinemaPage></AdminCinemaPage>
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
    jsx: (
      <TableFilterProvider<userRows> initialData={intinialUserData}>
        <ManageAccountPage></ManageAccountPage>
      </TableFilterProvider>
    ),
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
          <div className="px-6">{path.jsx}</div>
        </Fragment>
      );
    }
  });

  // return <div className={classes.root}>{element}</div>;
  return <div>{element}</div>;
};

export default AdminPage;
