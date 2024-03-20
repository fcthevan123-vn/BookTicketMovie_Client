import { useLocation } from "react-router-dom";
import { Fragment } from "react";
import ManageBookingPage from "./ManageBookingPage";
import { MovieProvider } from "../../components/Provider/MovieProvider/MovieProvider";
import { TableFilterProvider } from "../../components/Provider/TableFilterProvider";

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
