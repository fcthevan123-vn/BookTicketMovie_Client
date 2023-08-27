import React from "react";
import { UserNav } from "../../components/Navbars/UserNav";
import {
  ActionIcon,
  Box,
  Button,
  Drawer,
  createStyles,
  getStylesRef,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AiOutlineMenu } from "react-icons/ai";

type Props = {
  children: React.ReactNode;
};

const useStyles = createStyles((theme) => ({
  userLayout: {
    height: "100vh",
    width: "100vw",
    [theme.fn.largerThan("sm")]: {
      display: "flex",
    },
    [theme.fn.smallerThan("sm")]: {
      display: "block",
    },
  },

  userNav: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  drawerHeader: {
    height: "50px",
    padding: "0.7em",
    backgroundColor: theme.fn.variant({
      variant: "filled",
      color: theme.primaryColor,
    }).background,
  },

  drawerBody: {
    height: "calc(100% - 50px )",
    padding: "0",
  },

  drawerContent: {
    height: "100vh",
  },

  drawerCloseBtn: {
    color: "white",
    "&:hover": {
      opacity: "0.8",
      color: "black",
    },
  },

  navMobile: {
    backgroundColor: theme.fn.variant({
      variant: "filled",
      color: theme.primaryColor,
    }).background,
    padding: "8px 20px",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
    [theme.fn.smallerThan("sm")]: {
      display: "block",
    },
  },
}));

const UserLayout = ({ children }: Props) => {
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Box className={classes.userLayout}>
      <div className={classes.userNav}>
        <UserNav></UserNav>
      </div>
      <div>
        <Drawer
          classNames={{
            header: classes.drawerHeader,
            body: classes.drawerBody,
            close: classes.drawerCloseBtn,
          }}
          opened={opened}
          onClose={close}
          size={"300px"}
          overlayProps={{ opacity: 0.5, blur: 4 }}
        >
          <div className="h-full">
            <UserNav></UserNav>
          </div>
        </Drawer>
      </div>

      <div className={classes.navMobile}>
        <ActionIcon onClick={open} size="md" color="white" variant="filled">
          <AiOutlineMenu size="1.525rem" />
        </ActionIcon>
      </div>
      <div className="w-full">{children}</div>
    </Box>
  );
};

export default UserLayout;
