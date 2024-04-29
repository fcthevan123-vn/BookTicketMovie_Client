import { useDisclosure } from "@mantine/hooks";
import { AppShell, Badge, Burger, Text } from "@mantine/core";
import { IconHome, IconLogout } from "@tabler/icons-react";
import classes from "./EmployeeLayout.module.css";
import { modals } from "@mantine/modals";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userSlice } from "../../redux/reducers";
import { authenticateServices } from "../../services";
import { loadingApi } from "../../untils/loadingApi";
import { EmployeeNav } from "../../components/Navbars/EmployeeNav";
import { useAuthenticate } from "../../hooks";

type EmployeeLayoutProps = {
  children: React.ReactNode;
};

function EmployeeLayout({ children }: EmployeeLayoutProps) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [, , dataUser] = useAuthenticate();

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
      title: <p className="text-red-500 font-medium">Đăng xuất</p>,
      centered: true,
      children: <p>Bạn có chắc chắc muốn đăng xuất không?</p>,
      zIndex: 1600,
      labels: {
        confirm: "Đăng xuất",
        cancel: "Huỷ",
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
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header
        styles={{
          header: {
            backgroundColor: "var(--mantine-color-violet-6)",
            borderBottom: "0px",
            transition: "0ms",
          },
        }}
      >
        <div className="flex items-center h-full mx-5  gap-2">
          <div>
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
          </div>
          <div className={classes.header + " border-l ps-3"}>
            <Text fw={700} size="sm" c={"white"}>
              Nhân viên: {dataUser.fullName}
            </Text>
            <Badge radius={"sm"} tt="capitalize" color="pink">
              Galaxy Nguyễn Văn Quá
            </Badge>
          </div>
        </div>
      </AppShell.Header>
      <AppShell.Navbar
        styles={{
          navbar: {
            borderRight: "1px solid var(--mantine-color-violet-3)",
            boxShadow: "var(--mantine-shadow-xl)",
          },
        }}
      >
        <AppShell.Section grow>
          <EmployeeNav></EmployeeNav>
        </AppShell.Section>
        <AppShell.Section
          style={{
            backgroundColor: "var(--mantine-color-violet-6)",
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

export default EmployeeLayout;
