import { useDisclosure, useSetState } from "@mantine/hooks";
import {
  ActionIcon,
  AppShell,
  Badge,
  Burger,
  Indicator,
  Menu,
  ScrollArea,
  Text,
} from "@mantine/core";
import { IconBell, IconHome, IconLogout } from "@tabler/icons-react";
import classes from "./EmployeeLayout.module.css";
import { modals } from "@mantine/modals";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userSlice } from "../../redux/reducers";
import {
  authenticateServices,
  cinemaServices,
  notificationServices,
} from "../../services";
import { loadingApi } from "../../untils/loadingApi";
import { EmployeeNav } from "../../components/Navbars/EmployeeNav";
import { useAuthenticate } from "../../hooks";
import { ErrToast } from "../../components/AllToast/NormalToast";
import socket from "../../untils/socketio";
import { useCallback, useEffect, useState } from "react";
import { Cinema, NotificationTS } from "../../types";
import moment from "moment";

type EmployeeLayoutProps = {
  children: React.ReactNode;
};

function EmployeeLayout({ children }: EmployeeLayoutProps) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const [cinemaData, setCinemaData] = useState<Cinema>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [, , dataUser] = useAuthenticate();
  const [notification, setNotification] = useSetState({
    allNotification: [] as NotificationTS[],
    unreadNotification: [] as NotificationTS[],
    unreadCount: 0,
  });

  const getAllNoti = useCallback(
    async (userId: string) => {
      try {
        const res = await notificationServices.getAllNoti(userId);

        setNotification(res.data);
      } catch (error) {
        // ErrToast(error as Error, "getAllNotification");
      }
    },
    [setNotification]
  );

  const getCinema = useCallback(async (userId: string) => {
    try {
      const res = await cinemaServices.getCinemaByStaffId(userId);
      setCinemaData(res.data);
    } catch (error) {
      console.log("error", error);
    }
  }, []);

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

  const generateColor = (noti: NotificationTS) => {
    if (noti.status == "read") {
      return "gray";
    }
    if (noti.typeNotification == "error") {
      return "red";
    } else if (noti.typeNotification == "warning") {
      return "orange";
    } else {
      return "violet";
    }
  };

  useEffect(() => {
    getCinema(dataUser.id);
  }, [dataUser.id, getCinema]);

  useEffect(() => {
    socket.on("fetchNotification", () => {
      getAllNoti(dataUser.id);
    });
  }, [dataUser.id, getAllNoti]);

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
        <div className="flex items-center  justify-between h-full mx-5  gap-2">
          <div className="flex gap-2">
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
                {cinemaData ? cinemaData.name : ""}
              </Badge>
            </div>
          </div>

          <Menu
            onClose={() =>
              socket.emit("read_notification", notification.unreadNotification)
            }
            shadow="md"
            width={450}
            withArrow
            arrowOffset={0}
            radius={"lg"}
            transitionProps={{ transition: "pop", duration: 300 }}
          >
            <Menu.Target>
              <Indicator
                size={14}
                disabled={notification.unreadCount == 0 ? true : false}
                withBorder
                color="pink"
                label={notification.unreadCount}
              >
                <ActionIcon
                  size="45"
                  radius="lg"
                  color="pink"
                  aria-label="Settings"
                >
                  <IconBell
                    style={{ width: "50%", height: "50%" }}
                    stroke={1.5}
                  />
                </ActionIcon>
              </Indicator>
            </Menu.Target>

            <Menu.Dropdown>
              {notification.allNotification.length > 0 ? (
                <ScrollArea
                  mah={450}
                  h={100}
                  scrollbarSize={4}
                  offsetScrollbars
                >
                  {notification.allNotification.map((noti) => (
                    <Menu.Item color={generateColor(noti)} key={noti.id}>
                      <Link to={`${noti.linkNotification}`}>
                        <Text fw={500} size="sm">
                          {noti.title}
                        </Text>

                        <Text
                          fw={300}
                          lineClamp={3}
                          ta={"left"}
                          c={"black"}
                          size="sm"
                        >
                          {noti.message}
                        </Text>

                        <Text fw={500} ta={"right"} c={"black"} size="xs">
                          {moment(noti.createdAt).fromNow()}
                        </Text>
                      </Link>
                    </Menu.Item>
                  ))}
                </ScrollArea>
              ) : (
                <Menu.Item>
                  <Text fw={500} size="sm">
                    Bạn chưa có thông báo nào
                  </Text>

                  <Text
                    fw={300}
                    lineClamp={3}
                    ta={"left"}
                    c={"black"}
                    size="sm"
                  >
                    ...
                  </Text>
                </Menu.Item>
              )}
            </Menu.Dropdown>
          </Menu>
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
