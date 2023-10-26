import UserProfileTop from "./UserProfilePage/UserProfileTop";
import UserProfileInformation from "./UserProfilePage/UserProfileInformation";
import { useLocation } from "react-router-dom";
import { Fragment } from "react";
import UserChangePassword from "./UserChangePassword";
import UserAllTickets from "./UserAllTickets";
import { TableFilterProvider } from "../../components/Provider/TableFilterProvider";

type Props = {};

const allPath = [
  {
    urlInclude: "profile",
    jsx: (
      <>
        <div>
          <UserProfileTop></UserProfileTop>
        </div>
        <div className="sm:mt-36 mt-40">
          <UserProfileInformation></UserProfileInformation>
        </div>
      </>
    ),
  },
  {
    urlInclude: "change-password",
    jsx: (
      <>
        <div>
          <UserChangePassword></UserChangePassword>
        </div>
      </>
    ),
  },
  {
    urlInclude: "all-tickets",
    jsx: (
      <>
        <div>
          <TableFilterProvider initialData={[]}>
            <UserAllTickets></UserAllTickets>
          </TableFilterProvider>
        </div>
      </>
    ),
  },
];

const UserPage = (props: Props) => {
  const location = useLocation();

  const element = allPath.map((path) => {
    if (location.pathname.includes(path.urlInclude) === true) {
      return <Fragment key={path.urlInclude}>{path.jsx}</Fragment>;
    }
  });

  // return <div className={classes.root}>{element}</div>;
  return <div>{element}</div>;
};

export default UserPage;
