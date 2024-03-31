import cx from "clsx";
import { useEffect, useState } from "react";
import {
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  Burger,
  rem,
  useMantineTheme,
  Badge,
  ActionIcon,
  Button,
  Stack,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import classes from "./DefaultHeader.module.css";
import { BiMoon, BiMoviePlay, BiSun, BiUserCircle } from "react-icons/bi";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { SpotlightActionData, Spotlight, spotlight } from "@mantine/spotlight";
import {
  AiOutlineCheckCircle,
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineSetting,
  AiOutlineLogout,
  AiOutlineSearch,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuthenticate } from "../../../hooks";
import { userSlice } from "../../../redux/reducers";
import { authenticateServices, userServices } from "../../../services";
import {
  IconDashboard,
  IconFileText,
  IconHome,
  IconSearch,
  IconSwitchHorizontal,
} from "@tabler/icons-react";

export default function DefaultHeader() {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [defaultValueTable, setDefaultValueTable] = useState<string>("");
  const location = useLocation();
  const [isLogged, , dataUser] = useAuthenticate();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = {
    user: {
      name: dataUser?.fullName,
      email: dataUser?.email,
      type: dataUser?.type,
      image:
        "https://images.unsplash.com/photo-1692005561659-cdba32d1e4a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    },

    tabs: [
      {
        label: "Trang chủ",
        link: "home",
      },
      {
        label: "Phim",
        link: "movie",
      },
      {
        label: "Giới thiệu",
        link: "about",
      },
    ],
  };

  const handleLogout = async () => {
    const id = notifications.show({
      loading: true,
      radius: "lg",
      title: "Đăng xuất",
      message: "Có thể mất vài phút để đăng xuất",
      autoClose: false,
      withCloseButton: false,
      withBorder: true,
    });
    const res = await authenticateServices.handleLogout();
    if (res.statusCode === 0) {
      notifications.update({
        id,
        radius: "lg",
        color: "violet",
        title: <p className="text-violet-600">Đăng xuất thành công</p>,
        message: res.message,
        withBorder: true,
        icon: <AiOutlineCheckCircle size="1.2rem" />,
        autoClose: 2000,
        loading: false,
        withCloseButton: true,
      });
      dispatch(userSlice.actions.toggleLogin({}));
    }
  };

  const openSwitchAdmin = () =>
    modals.openConfirmModal({
      title: <p className="text-blue-500 font-medium">Switch to admin page</p>,
      centered: true,
      children: <p>Are you sure to switch to admin page?</p>,
      zIndex: 1600,
      labels: {
        confirm: "Confirm",
        cancel: "Cancel",
      },
      confirmProps: { color: "blue", radius: "lg" },
      cancelProps: { color: "gray", radius: "lg" },
      overlayProps: {
        color: "#141517",
        opacity: 0.55,
        blur: 3,
      },
      radius: "lg",
      onCancel: () => console.log("Cancel"),
      onConfirm: () => navigate(`/admin/dashboard`),
    });

  const actions: SpotlightActionData[] = [
    {
      id: "home",
      label: "Home",
      description: "Get to home page",
      onClick: () => console.log("Home"),
      leftSection: (
        <IconHome style={{ width: rem(24), height: rem(24) }} stroke={1.5} />
      ),
    },
    {
      id: "dashboard",
      label: "Dashboard",
      description: "Get full information about current system status",
      onClick: () => console.log("Dashboard"),
      leftSection: (
        <IconDashboard
          style={{ width: rem(24), height: rem(24) }}
          stroke={1.5}
        />
      ),
    },
    {
      id: "documentation",
      label: "Documentation",
      description: "Visit documentation to lean more about all features",
      onClick: () => console.log("Documentation"),
      leftSection: (
        <IconFileText
          style={{ width: rem(24), height: rem(24) }}
          stroke={1.5}
        />
      ),
    },
  ];

  const getProfile = async () => {
    const res = await userServices.getProfile();
    if (res.statusCode === 0) {
      dispatch(
        userSlice.actions.handleLogin({
          id: res?.data?.id,
          email: res?.data?.email,
          fullName: res?.data?.fullName,
          isVerifyEmail: res?.data?.isVerifyEmail,
          phone: res?.data?.phone,
          address: res?.data?.address,
          age: res?.data?.age,
          count: res?.data?.count,
          gender: res?.data?.sex === 0 ? "Nam" : "Nữ",
          type: res?.data?.type,
        })
      );
    }
  };

  useEffect(() => {
    getProfile();

    const pathName = location.pathname;

    const modifiedPath = pathName.slice(1);

    setDefaultValueTable(modifiedPath);
  }, [location]);

  const items = data.tabs.map((tab) => (
    <Link to={`/${tab.link}`} key={tab.link}>
      <Tabs.Tab value={tab.link} key={tab.label}>
        {tab.label}
      </Tabs.Tab>
    </Link>
  ));

  return (
    <div className={classes.header + " shadow-lg drop-shadow-sm"}>
      <Container className={classes.mainSection} size="xl">
        <Group justify="space-between" style={{ height: "54px" }}>
          <Badge size="lg" radius="lg" className={classes.badge}>
            <Group gap="xs">
              <ActionIcon color="violet" size="md" radius="md" variant="filled">
                <BiMoviePlay size="1.125rem" />
              </ActionIcon>
              Show Booking
            </Group>
          </Badge>
          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
          {isLogged ? (
            <Menu
              width={260}
              position="bottom-end"
              transitionProps={{ transition: "pop-top-right" }}
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
              withinPortal
              radius="lg"
            >
              <Menu.Target>
                <UnstyledButton
                  className={
                    cx(classes.user, {
                      [classes.userActive]: userMenuOpened,
                    }) + " bg-white shadow-xl drop-shadow-xl"
                  }
                >
                  <Group gap="xs">
                    {/* <Avatar
                      src={data.user.image}
                      alt={data.user.name}
                      radius="xl"
                      size={30}
                    /> */}
                    <Avatar
                      size={32}
                      radius="xl"
                      bg={"white"}
                      color="blue"
                      ml={"sm"}
                    >
                      <AiOutlineUser size="1.3rem" />
                    </Avatar>
                    <Stack className="my-1 mx-2" align="start" gap={"xs"}>
                      <Text
                        size="sm"
                        style={{
                          fontWeight: "500",
                          color: "white",
                        }}
                        mr={3}
                      >
                        {data.user.name}
                      </Text>
                      <Text
                        size="sm"
                        style={{
                          lineHeight: 1,
                          color: theme.white,
                        }}
                        mr={3}
                      >
                        {data.user.email}
                      </Text>
                    </Stack>
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label className={classes.menuItem}>Tài khoản</Menu.Label>
                <Menu.Item
                  className={classes.menuItem}
                  color="blue"
                  leftSection={<BiUserCircle size="0.9rem" stroke={"1.5"} />}
                >
                  {dataUser?.fullName}
                </Menu.Item>
                <Menu.Item
                  className={classes.menuItem}
                  leftSection={<AiOutlineMail size="0.9rem" stroke={"1.5"} />}
                >
                  {dataUser?.email}
                </Menu.Item>
                <Menu.Divider className={classes.menuItem} />
                <Menu.Label>Cài đặt</Menu.Label>
                <Link to={`/user/${dataUser.id}/profile`}>
                  <Menu.Item
                    leftSection={
                      <AiOutlineSetting size="0.9rem" stroke={"1.5"} />
                    }
                  >
                    Trang cá nhân
                  </Menu.Item>
                </Link>

                <Menu.Item
                  // closeMenuOnClick={false}
                  onClick={() => toggleColorScheme()}
                  leftSection={
                    dark ? (
                      <BiSun size="0.9rem" stroke={"1.5"} />
                    ) : (
                      <BiMoon size="0.9rem" stroke={"1.5"} />
                    )
                  }
                >
                  {dark ? "Chế độ sáng" : "Chế độ tối"}
                </Menu.Item>

                <Menu.Divider />

                <Menu.Label>Hành động</Menu.Label>

                <Menu.Item
                  color="red"
                  leftSection={<AiOutlineLogout size="0.9rem" stroke={"1.5"} />}
                  onClick={() => handleLogout()}
                >
                  Đăng xuất
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <div>
              <Link to={"/register"}>
                <Button
                  variant="gradient"
                  gradient={{ from: "#0061ff", to: "#60efff" }}
                  radius="lg"
                  className="shadow-md drop-shadow-md"
                >
                  Đăng nhập
                </Button>
              </Link>
            </div>
          )}
        </Group>
      </Container>
      <Container size="xl">
        <Group justify="space-between" gap="sm">
          <Tabs
            value={defaultValueTable ? defaultValueTable : "home"}
            variant="outline"
            visibleFrom="sm"
            classNames={{
              root: classes.tabs,
              list: classes.tabsList,
              tab: classes.tab,
            }}
          >
            <Tabs.List>{items}</Tabs.List>
          </Tabs>

          {/* <Button
            // color="violet"
            variant="gradient"
            gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
            onClick={spotlight.open}
            className={classes.button + " my-1 boxshadow-custom "}
            radius="md"
            size="compact-sm"
            rightSection={<AiOutlineSearch size="1.3rem" />}
          >
            Search{" "}
          </Button> */}
          <Spotlight
            actions={actions}
            nothingFound="Nothing found..."
            highlightQuery
            radius={"lg"}
            searchProps={{
              leftSection: (
                <IconSearch
                  style={{ width: rem(20), height: rem(20) }}
                  stroke={1.5}
                />
              ),
              placeholder: "Search...",
            }}
          />
        </Group>
      </Container>
    </div>
  );
}
