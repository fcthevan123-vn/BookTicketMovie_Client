import { createStyles } from "@mantine/core";
import UserProfileTop from "./UserProfilePage/UserProfileTop";
import UserProfileInformation from "./UserProfilePage/UserProfileInformation";
import { useLocation } from "react-router-dom";
import { Fragment } from "react";
import UserChangePassword from "./UserChangePassword";

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
    urlInclude: "password",
    jsx: (
      <>
        <div>
          <UserChangePassword></UserChangePassword>
        </div>
      </>
    ),
  },
];

const UserPage = (props: Props) => {
  const { classes } = useStyles();
  const location = useLocation();

  const element = allPath.map((path) => {
    if (location.pathname.includes(path.urlInclude) === true) {
      return <Fragment key={path.urlInclude}>{path.jsx}</Fragment>;
    }
  });

  return <div className={classes.root}>{element}</div>;
};

export default UserPage;
