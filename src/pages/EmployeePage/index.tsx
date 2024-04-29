import { useLocation } from "react-router-dom";
import { Fragment } from "react";
import ManageBookingPage from "./ManageBookingPage";
import { TableFilterProvider } from "../../components/Provider/TableFilterProvider";
import ManageMovieHall from "./ManageMovieHall";
import RoomTypePage from "./RoomType";

const allPath = [
  {
    urlInclude: "dashboard",
    jsx: (
      <>
        <div>
          <h1>dashboard</h1>
        </div>
      </>
    ),
  },
  {
    urlInclude: "manage-booking",
    jsx: (
      <TableFilterProvider initialData={[]}>
        <ManageBookingPage></ManageBookingPage>
      </TableFilterProvider>
    ),
  },
  {
    urlInclude: "movie-hall",
    jsx: <ManageMovieHall></ManageMovieHall>,
  },
  {
    urlInclude: "room-type",
    jsx: <RoomTypePage></RoomTypePage>,
  },
];

const EmployeePage = () => {
  const location = useLocation();

  const element = allPath.map((path) => {
    if (location.pathname.includes(path.urlInclude) === true) {
      return <Fragment key={path.urlInclude}>{path.jsx}</Fragment>;
    }
  });

  return <div>{element}</div>;
};

export default EmployeePage;
