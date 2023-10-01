// import React from "react";
// import { UserNav } from "../../components/Navbars/UserNav";
// import { ActionIcon, Box, Drawer, createStyles } from "@mantine/core";
// import { useDisclosure } from "@mantine/hooks";
// import { AiOutlineMenu } from "react-icons/ai";

// type Props = {
//   children: React.ReactNode;
// };

// const useStyles = createStyles((theme) => ({
//   userLayout: {
//     // height: "100vh",
//     // width: "100vw",
//     marginLeft: "250px",
//     [theme.fn.largerThan("sm")]: {
//       display: "flex",
//     },
//     [theme.fn.smallerThan("sm")]: {
//       display: "block",
//     },
//     [theme.fn.smallerThan("sm")]: {
//       marginLeft: "0",
//     },
//   },

//   userNav: {
//     [theme.fn.smallerThan("sm")]: {
//       display: "none",
//     },
//   },

//   drawerHeader: {
//     height: "50px",
//     padding: "0.7em",
//     backgroundColor: theme.fn.variant({
//       variant: "filled",
//       color: theme.primaryColor,
//     }).background,
//   },

//   drawerBody: {
//     height: "calc(100% - 50px )",
//     padding: "0",
//   },

//   drawerContent: {
//     height: "100vh",
//   },

//   drawerCloseBtn: {
//     color: "white",
//     "&:hover": {
//       opacity: "0.8",
//       color: "black",
//     },
//   },

//   navMobile: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     right: 0,
//     zIndex: 10,
//     backgroundColor: theme.fn.variant({
//       variant: "filled",
//       color: theme.primaryColor,
//     }).background,
//     padding: "8px 20px",
//     boxShadow:
//       "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
//     [theme.fn.largerThan("sm")]: {
//       display: "none",
//     },
//     [theme.fn.smallerThan("sm")]: {
//       display: "block",
//     },
//   },
// }));

// const UserLayout = ({ children }: Props) => {
//   const { classes } = useStyles();
//   const [opened, { open, close }] = useDisclosure(false);

//   return (
//     <Box className={classes.userLayout}>
//       <div className={classes.userNav}>
//         <UserNav close={null}></UserNav>
//       </div>
//       <div>
//         <Drawer
//           classNames={{
//             header: classes.drawerHeader,
//             body: classes.drawerBody,
//             close: classes.drawerCloseBtn,
//           }}
//           opened={opened}
//           onClose={close}
//           size={"300px"}
//           overlayProps={{ opacity: 0.5, blur: 4 }}
//         >
//           <div className="h-full">
//             <UserNav close={close}></UserNav>
//           </div>
//         </Drawer>
//       </div>

//       <div className={classes.navMobile}>
//         <ActionIcon onClick={open} size="md" color="white" variant="filled">
//           <AiOutlineMenu size="1.525rem" />
//         </ActionIcon>
//       </div>
//       <div className="w-full sm:mt-0 mt-16">{children}</div>
//     </Box>
//   );
// };

// export default UserLayout;

import { useDisclosure } from "@mantine/hooks";
import { AppShell, Burger, Group } from "@mantine/core";
import Logo from "../../components/Logo";
import { UserNav } from "../../components/Navbars/UserNav";
import { IconHome, IconLogout } from "@tabler/icons-react";
import classes from "./UserLayout.module.css";
import { modals } from "@mantine/modals";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userSlice } from "../../redux/reducers";
import { authenticateServices } from "../../services";
import { loadingApi } from "../../untils/loadingApi";

type UserLayoutProps = {
  children: React.ReactNode;
};

function UserLayout({ children }: UserLayoutProps) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const api = await authenticateServices.handleLogout();
    const res = await loadingApi(api, "Đăng xuất");
    if (res) {
      dispatch(userSlice.actions.toggleLogin({}));
      navigate("/");
    }
    return res;
  };

  const openLogoutModal = () =>
    modals.openConfirmModal({
      title: <p className="text-red-500 font-medium">Logout</p>,
      centered: true,
      children: <p>Are you sure to logout?</p>,
      zIndex: 1600,
      labels: {
        confirm: "Logout",
        cancel: "Cancel",
      },
      confirmProps: { color: "red", radius: "lg" },
      cancelProps: { color: "red", radius: "lg" },
      overlayProps: {
        color: "#141517",
        opacity: 0.55,
        blur: 3,
      },
      radius: "lg",
      onCancel: () => console.log("Cancel"),
      onConfirm: () => handleLogout(),
    });

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header
        styles={{
          header: {
            backgroundColor: "var(--mantine-color-blue-6)",
            borderBottom: "0px",
            transition: "0ms",
          },
        }}
      >
        <Group h="100%" px="md">
          <Burger
            color="white"
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom="sm"
            size="sm"
          />
          <Burger
            color="white"
            opened={desktopOpened}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="sm"
          />
          <Logo size="md" radius="md"></Logo>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar
        styles={{
          navbar: {
            borderRight: "1px solid var(--mantine-color-blue-3)",
            boxShadow: "var(--mantine-shadow-xl)",
          },
        }}
      >
        <AppShell.Section grow>
          <UserNav></UserNav>
        </AppShell.Section>
        <AppShell.Section
          style={{
            backgroundColor: "var(--mantine-color-blue-6)",
          }}
          p="md"
        >
          <div className={classes.footer}>
            <Link to="/">
              <span className={classes.link}>
                <IconHome className={classes.linkIcon} stroke={1.5} />
                <span>Trang chủ</span>
              </span>
            </Link>
            <a href="#" className={classes.link} onClick={openLogoutModal}>
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Đăng xuất</span>
            </a>
          </div>
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

export default UserLayout;
