import { useLocation } from "react-router-dom";
import { Fragment } from "react";
import ManageBookingPage from "./ManageBookingPage";
import { TableFilterProvider } from "../../components/Provider/TableFilterProvider";
import ManageMovieHall from "./ManageMovieHall";
import RoomTypePage from "./RoomType";
import ManageLayout from "./ManageLayout/ManageLayout";
import AllSeatType from "./AllSeatType/AllSeatType";
import ManageShow from "./ManageShow/ManageShow";
import Dashboard from "./Dashboard/Dashboard";

const allPath = [
  {
    urlInclude: "dashboard",
    jsx: <Dashboard></Dashboard>,
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
  {
    urlInclude: "layout",
    jsx: <ManageLayout></ManageLayout>,
  },
  {
    urlInclude: "seat",
    jsx: <AllSeatType></AllSeatType>,
  },
  {
    urlInclude: "all-show",
    jsx: <ManageShow></ManageShow>,
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
