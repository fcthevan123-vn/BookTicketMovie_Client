import { Anchor, Breadcrumbs, createStyles } from "@mantine/core";
import { useLocation } from "react-router-dom";
import { Fragment } from "react";
import DashboardPage from "./DashboardPage";
import AddMoviePage from "./AddMoviePage";
import { useEffect } from "react";
import AllMoviesPage from "./AllMoviesPage";
import { MovieProvider } from "../../components/Provider/MovieProvider/MovieProvider";

type Props = {};

const useStyles = createStyles((theme) => ({
  root: {
    padding: "1px 0",
    margin: "20px",
    borderRadius: "20px",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : "#fff",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
  },
}));

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
];

const AdminPage = (props: Props) => {
  const { classes } = useStyles();
  const location = useLocation();
  const urlConverted = location.pathname.replace(/-/g, "");
  console.log(urlConverted);

  const element = allPath.map((path) => {
    if (urlConverted.includes(path.urlInclude) === true) {
      return (
        <Fragment key={path.urlInclude}>
          <Breadcrumbs className="pt-3 px-6">
            {path.breadcrumbs.map((item, index) => (
              <Anchor aria-disabled italic href={item.href} key={index}>
                {item.title}
              </Anchor>
            ))}
          </Breadcrumbs>
          {path.jsx}
        </Fragment>
      );
    }
  });

  return <div className={classes.root}>{element}</div>;
};

export default AdminPage;
