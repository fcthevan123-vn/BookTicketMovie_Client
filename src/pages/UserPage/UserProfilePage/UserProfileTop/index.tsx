import {
  Avatar,
  BackgroundImage,
  Box,
  Button,
  Center,
  Stack,
  Text,
  createStyles,
} from "@mantine/core";
import React from "react";
import { AiOutlineDesktop, AiOutlineSafety } from "react-icons/ai";

type Props = {};

const useStyles = createStyles((theme) => ({
  backgroundImg: {
    padding: "10px",
    position: "relative",
    borderRadius: "20px",
    height: "250px",
    backgroundSize: "cover",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1692891259833-9832c3ca751e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80')",
  },

  avatar: {},
}));

const UserProfileTop = (props: Props) => {
  const { classes } = useStyles();
  return (
    <div>
      <div className={classes.backgroundImg}>
        <div className="absolute -bottom-24 px-5">
          <div className="flex gap-5">
            <div className="w-fit">
              <Avatar
                radius="lg"
                size={150}
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
              />

              <div className="flex justify-center gap-4 mt-1">
                <p className="text-sm text-sky-500 font-medium">Change</p>
                <p className="text-sm text-sky-500 font-medium">Delete</p>
              </div>
            </div>

            <div>
              <div className="h-1/2"></div>
              <div className="h-1/2">
                <p className="font-bold text-xl ">Lai The Van</p>
                <div className="flex gap-10">
                  <p className="flex items-center">
                    <AiOutlineDesktop className="me-2 text-lg"></AiOutlineDesktop>{" "}
                    Viet Nam
                  </p>

                  <p className="flex items-center">
                    <AiOutlineSafety className="me-2 text-lg"></AiOutlineSafety>{" "}
                    Can Tho
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
