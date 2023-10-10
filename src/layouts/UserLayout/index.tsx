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
