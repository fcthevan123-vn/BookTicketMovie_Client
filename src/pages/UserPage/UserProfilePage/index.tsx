import { createStyles } from "@mantine/core";
import UserProfileTop from "./UserProfileTop";
import UserProfileInformation from "./UserProfileInformation";

type Props = {};

const useStyles = createStyles((theme) => ({
  root: {
    padding: "10px",

    // height: "100%",
    margin: "20px",
    borderRadius: "20px",
    backgroundColor: "#fff",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
  },
}));

const UserProfilePage = (props: Props) => {
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <div>
        <UserProfileTop></UserProfileTop>
      </div>
      <div className="mt-36">
        <UserProfileInformation></UserProfileInformation>
      </div>
    </div>
  );
};

export default UserProfilePage;
