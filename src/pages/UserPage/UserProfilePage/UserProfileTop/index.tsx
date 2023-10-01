import { Avatar } from "@mantine/core";
import { AiOutlineCheckCircle, AiOutlineSafety } from "react-icons/ai";
import { useAuthenticate } from "../../../../hooks";
import classes from "./UserProfileTop.module.css";
type Props = {};

// const useStyles = createStyles((theme) => ({
//   backgroundImg: {
//     margin: "15px",
//     position: "relative",
//     borderRadius: "20px",
//     height: "250px",
//     backgroundSize: "cover",
//     backgroundImage:
//       "url('https://images.unsplash.com/photo-1692891259833-9832c3ca751e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80')",

//     [theme.fn.smallerThan("xs")]: {
//       height: "160px",
//     },
//   },

//   avatar: {
//     height: "150px",
//     width: "150px",

//     [theme.fn.smallerThan("xs")]: {
//       height: "100px",
//       width: "100px",
//     },
//   },
// }));

const UserProfileTop = (props: Props) => {
  const [, , dataUser] = useAuthenticate();
  return (
    <div>
      <div className={classes.backgroundImg}>
        <div className="absolute sm:-bottom-24 w-full left-0  -bottom-32 px-2 sm:px-10 lg:px-20">
          <div className="flex gap-3 items-center flex-col sm:flex-row sm:gap-5 sm:items-end">
            <div className="w-fit flex flex-col items-center">
              <Avatar
                className={classes.avatar + " boxshadow-custom"}
                // className={" boxshadow-custom"}
                radius="lg"
                src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
              />

              <div className="flex justify-center gap-4 mt-1">
                <p className="text-sm text-sky-500 font-medium cursor-pointer">
                  Change
                </p>
                <p className="text-sm text-sky-500 font-medium cursor-pointer">
                  Delete
                </p>
              </div>
            </div>

            <div>
              <div className="h-1/2"></div>
              <div className="h-1/2 sm:mb-5 mb-0">
                <p className="font-bold text-xl text-center sm:text-left">
                  {dataUser?.fullName}
                </p>
                <div className="flex gap-10">
                  <p className="flex items-center">
                    <AiOutlineCheckCircle className="me-2 text-lg"></AiOutlineCheckCircle>{" "}
                    Verified
                  </p>

                  <p className="flex items-center">
                    <AiOutlineSafety className="me-2 text-lg"></AiOutlineSafety>{" "}
                    Join at ...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileTop;
