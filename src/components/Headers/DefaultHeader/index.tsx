import { useEffect, useState } from "react";
import {
  createStyles,
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  rem,
  Button,
  Badge,
  ActionIcon,
  Stack,
  Input,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, useLocation } from "react-router-dom";
import { useAuthenticate } from "../../../hooks";
import {
  AiOutlineCheckCircle,
  AiOutlineLogout,
  AiOutlineMail,
  AiOutlineSearch,
  AiOutlineSetting,
  AiOutlineUser,
} from "react-icons/ai";
import { BiMoviePlay, BiUserCircle } from "react-icons/bi";
import { authenticateServices } from "../../../services";
import { useDispatch } from "react-redux";
import { userSlice } from "../../../redux/reducers";
import { notifications } from "@mantine/notifications";
import { SpotlightProvider, spotlight } from "@mantine/spotlight";
import type { SpotlightAction } from "@mantine/spotlight";

const useStyles = createStyles((theme) => ({
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingTop: theme.spacing.sm,
    backgroundColor: theme.fn.variant({
      variant: "filled",
      color: theme.primaryColor,
    }).background,
    borderBottom: `${rem(1)} solid ${
      theme.fn.variant({ variant: "filled", color: theme.primaryColor })
        .background
    }`,
  },

  mainSection: {
    paddingBottom: theme.spacing.md,
  },

  user: {
    color: theme.white,
    padding: `5px 5px`,
    borderRadius: theme.radius.lg,
    border: "2px solid #ffffff63",
    transition: "background-color 100ms ease",
    [theme.fn.smallerThan("xs")]: {
      borderRadius: theme.radius.xl,
    },
    "&:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.1
      ),
    },
  },

  button: {
    "&:hover": {
      opacity: "0.9",
      transition: "all 0.2s ease",
    },
  },

  userActive: {
    backgroundColor: theme.fn.lighten(
      theme.fn.variant({ variant: "filled", color: theme.primaryColor })
        .background!,
      0.1
    ),
  },

  tabsList: {
    borderBottom: "0 !important",
  },

  menuItem: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  menuStack: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  tab: {
    fontWeight: 500,
    height: rem(38),
    color: theme.white,
    backgroundColor: "transparent",
    borderColor: theme.fn.variant({
      variant: "filled",
      color: theme.primaryColor,
    }).background,

    "&:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.1
      ),
    },

    "&[data-active]": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.1
      ),
      borderColor: theme.fn.variant({
        variant: "filled",
        color: theme.primaryColor,
      }).background,
    },
  },
}));

export default function DefaultHeader() {
  const { classes, theme, cx } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [defaultValueTable, setDefaultValueTable] = useState<string>("");
  const location = useLocation();
  const [isLogged, , dataUser] = useAuthenticate();

  const dispatch = useDispatch();

  const data = {
    user: {
      name: dataUser?.fullName,
      email: dataUser?.email,
      image:
        "https://images.unsplash.com/photo-1692005561659-cdba32d1e4a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    },
    tabs: ["Home", "Movie", "Stream"],
  };

  const handleLogout = async () => {
    notifications.show({
      id: "load-data",
      loading: true,
      radius: "md",
      title: "Logout...",
      message: "It can take some minutes",
      autoClose: false,
      withCloseButton: false,
      withBorder: true,
    });
    const res = await authenticateServices.handleLogout();
    if (res.statusCode === 0) {
      notifications.update({
        id: "load-data",
        radius: "lg",
        color: "teal",
        title: <p className="text-teal-600">Success</p>,
        message: res.message,
        withBorder: true,
        icon: <AiOutlineCheckCircle size="1.2rem" />,
        autoClose: 2000,
      });
      dispatch(userSlice.actions.toggleLogin({}));
    }
  };

  const actions: SpotlightAction[] = [
    {
      title: "Home",
      description: "Get to home page",
      onTrigger: () => console.log("Home"),
      // icon: <IconHome size="1.2rem" />,
    },
    {
      title: "Dashboard",
      description: "Get full information about current system status",
      onTrigger: () => console.log("Dashboard"),
      // icon: <IconDashboard size="1.2rem" />,
    },
    {
      title: "Documentation",
      description: "Visit documentation to lean more about all features",
      onTrigger: () => console.log("Documentation"),
      // icon: <IconFileText size="1.2rem" />,
    },
  ];

  useEffect(() => {
    const pathName = location.pathname;
    const modifiedPath = pathName.charAt(1).toUpperCase() + pathName.slice(2);
    setDefaultValueTable(modifiedPath);
  }, [location]);

  return (
    <div
      className={`${classes.header} boxshadow-custom width-before-scroll-bar`}
    >
      <Container size="lg" className={classes.mainSection}>
        <Group position="apart">
          <Badge
            size="lg"
            radius="lg"
            sx={{ padding: "22px 15px" }}
            className="shadow-lg"
          >
            <Group spacing="sm">
              <ActionIcon color="blue" size="md" radius="md" variant="filled">
                <BiMoviePlay size="1.125rem" />
              </ActionIcon>
              Show Booking
            </Group>
          </Badge>

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
                    }) + "  shadow-md drop-shadow-md"
                  }
                >
                  <Group spacing={7}>
                    {/* <Avatar
                      src={data.user.image}
                      alt={data.user.name}
                      radius="xl"
                      size={30}
                    /> */}
                    <Avatar size={32} radius="xl" color="blue">
                      <AiOutlineUser size="1.3rem" />
                    </Avatar>
                    <Stack
                      className={classes.menuStack}
                      align="start"
                      spacing={6}
                    >
                      <Text
                        weight={500}
                        size="sm"
                        sx={{
                          lineHeight: 1,
                          color: theme.white,
                        }}
                        mr={3}
                      >
                        {data.user.name}
                      </Text>
                      <Text
                        weight={300}
                        size="sm"
                        sx={{
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
                <Menu.Label className={classes.menuItem}>Account</Menu.Label>
                <Menu.Item
                  className={classes.menuItem}
                  color="blue"
                  icon={<BiUserCircle size="0.9rem" stroke={1.5} />}
                >
                  {dataUser?.fullName}
                </Menu.Item>
                <Menu.Item
                  className={classes.menuItem}
                  icon={<AiOutlineMail size="0.9rem" stroke={1.5} />}
                >
                  {dataUser?.email}
                </Menu.Item>
                <Menu.Divider className={classes.menuItem} />
                <Menu.Label>Settings</Menu.Label>
                <Link to="/user/123/profile">
                  <Menu.Item
                    icon={<AiOutlineSetting size="0.9rem" stroke={1.5} />}
                  >
                    Account settings
                  </Menu.Item>
                </Link>

                <Menu.Item
                  icon={<AiOutlineCheckCircle size="0.9rem" stroke={1.5} />}
                >
                  Check version
                </Menu.Item>

                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>

                <Menu.Item
                  color="red"
                  icon={<AiOutlineLogout size="0.9rem" stroke={1.5} />}
                  onClick={() => handleLogout()}
                >
                  Logout
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
                  Login
                </Button>
              </Link>
            </div>
          )}
        </Group>
      </Container>
      <Container size="lg">
        <Group position="apart" spacing="xs">
          <Tabs
            value={defaultValueTable ? defaultValueTable : "Home"}
            variant="outline"
            classNames={{
              tabsList: classes.tabsList,
              tab: classes.tab,
            }}
          >
            <Tabs.List>
              {data.tabs.map((tab) => (
                <Link to={`/${tab.toLowerCase()}`} key={tab}>
                  <Tabs.Tab value={tab} key={tab}>
                    {tab}
                  </Tabs.Tab>
                </Link>
              ))}
            </Tabs.List>
          </Tabs>

          <SpotlightProvider
            radius="lg"
            actions={actions}
            withinPortal
            searchIcon={<AiOutlineSearch size="1.2rem" />}
            searchPlaceholder="Updating soon..."
            nothingFoundMessage="Nothing found..."
          >
            <Button
              // color="cyan"
              variant="gradient"
              gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
              onClick={spotlight.open as never}
              className={classes.button + " my-1 boxshadow-custom "}
              compact
              radius="md"
              rightIcon={<AiOutlineSearch size="1.3rem" />}
            >
              Search{" "}
            </Button>
          </SpotlightProvider>
        </Group>
      </Container>
    </div>
  );
}
