import React from "react";
import { adminNav } from "../../components/Navbars/adminNav";
import { ActionIcon, Box, Drawer, createStyles } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AiOutlineMenu } from "react-icons/ai";
import { AdminNav } from "../../components/Navbars/AdminNav";

type Props = {
  children: React.ReactNode;
};

const useStyles = createStyles((theme) => ({
  adminLayout: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // height: "100vh",
    // width: "100vw",
    marginLeft: "310px",
    position: "relative",
    [theme.fn.largerThan("sm")]: {
      display: "flex",
    },
    [theme.fn.smallerThan("sm")]: {
      display: "block",
    },
    [theme.fn.smallerThan("sm")]: {
      marginLeft: "0",
    },
  },

  adminNav: {
    position: "fixed",
    top: "0",
    left: "0",
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
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
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

const AdminLayout = ({ children }: Props) => {
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Box className={classes.adminLayout}>
      <div className={classes.adminNav}>
        {/* <adminNav close={null}></adminNav> */}
        <AdminNav></AdminNav>
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
            {/* <adminNav close={close}></adminNav> */}
            <AdminNav></AdminNav>
          </div>
        </Drawer>
      </div>

      <div className={classes.navMobile}>
        <ActionIcon onClick={open} size="md" color="white" variant="filled">
          <AiOutlineMenu size="1.525rem" />
        </ActionIcon>
      </div>
      <div className="w-full sm:mt-0 mt-16 ">{children}</div>
    </Box>
  );
};

export default AdminLayout;
