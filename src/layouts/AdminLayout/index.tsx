import { useDisclosure } from "@mantine/hooks";
import {
  AppShell,
  Box,
  Burger,
  Divider,
  Group,
  ScrollArea,
  ThemeIcon,
  UnstyledButton,
  rem,
} from "@mantine/core";
import Logo from "../../components/Logo";
import { IconHome, IconLogout } from "@tabler/icons-react";
import classes from "./AdminLayout.module.css";
import { modals } from "@mantine/modals";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userSlice } from "../../redux/reducers";
import { authenticateServices } from "../../services";
import { loadingApi } from "../../untils/loadingApi";
import AdminNav from "../../components/Navbars/AdminNav";

type AdminLayoutProps = {
  children: React.ReactNode;
};

function AdminLayout({ children }: AdminLayoutProps) {
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
            // borderBottom: "0px",
            transition: "0ms",
            borderBottom: "2px solid var(--mantine-color-blue-7)",
            boxShadow: " rgba(0, 0, 0, 0.15) 0px 3px 3px 0px",
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
            backgroundColor: "var(--mantine-color-blue-6)",
          },
        }}
      >
        <AppShell.Section
          grow
          style={{
            padding: "0px var(--mantine-spacing-md)",
          }}
          component={ScrollArea}
          scrollbarSize={8}
        >
          <AdminNav></AdminNav>
        </AppShell.Section>

        <AppShell.Section
          style={{
            // borderTop: "1px solid var(--mantine-color-blue-3)",
            backgroundColor: "var(--mantine-color-blue-6)",
            padding: "10px var(--mantine-spacing-md)",
          }}
        >
          <Divider my="sm" size={"sm"} color="blue.7" />
          <div className={classes.footer}>
            <Link to="/">
              <UnstyledButton className={classes.control}>
                <Group justify="space-between" gap={0}>
                  <Box style={{ display: "flex", alignItems: "center" }}>
                    <ThemeIcon variant="white" size={30}>
                      <IconHome style={{ width: rem(18), height: rem(18) }} />
                    </ThemeIcon>
                    <Box ml="md">Trang chủ</Box>
                  </Box>
                </Group>
              </UnstyledButton>
            </Link>
            <UnstyledButton
              className={classes.control}
              onClick={openLogoutModal}
            >
              <Group justify="space-between" gap={0}>
                <Box style={{ display: "flex", alignItems: "center" }}>
                  <ThemeIcon variant="white" size={30}>
                    <IconLogout style={{ width: rem(18), height: rem(18) }} />
                  </ThemeIcon>
                  <Box ml="md">Đăng xuất</Box>
                </Box>
              </Group>
            </UnstyledButton>
            {/* <a href="#" className={classes.control} onClick={openLogoutModal}>
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Đăng xuất</span>
            </a> */}
          </div>
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

export default AdminLayout;
