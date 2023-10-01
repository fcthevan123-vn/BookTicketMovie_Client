import { Anchor, Breadcrumbs } from "@mantine/core";
import { useLocation } from "react-router-dom";
import { Fragment } from "react";
import DashboardPage from "./DashboardPage";
import AddMoviePage from "./AddMoviePage";
import AllMoviesPage from "./AllMoviesPage";
import { MovieProvider } from "../../components/Provider/MovieProvider/MovieProvider";
import ManageAccountPage from "./ManageAccountPage";

type Props = {};

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
];

const AdminPage = (props: Props) => {
  const location = useLocation();
  const urlConverted = location.pathname.replace(/-/g, "");

  const element = allPath.map((path) => {
    if (urlConverted.includes(path.urlInclude) === true) {
      return (
        <Fragment key={path.urlInclude}>
          <Breadcrumbs className="pt-3 px-6">
            {path.breadcrumbs.map((item, index) => (
              <Anchor aria-disabled href={item.href} key={index}>
                {item.title}
              </Anchor>
            ))}
          </Breadcrumbs>
          {path.jsx}
        </Fragment>
      );
    }
  });

  // return <div className={classes.root}>{element}</div>;
  return <div>{element}</div>;
};

export default AdminPage;
