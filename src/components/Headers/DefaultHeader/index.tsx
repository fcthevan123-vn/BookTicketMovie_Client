// import { useEffect, useState } from "react";
// import {
//   createStyles,
//   Container,
//   Avatar,
//   UnstyledButton,
//   Group,
//   Text,
//   Menu,
//   Tabs,
//   rem,
//   Button,
//   Badge,
//   ActionIcon,
//   Stack,
//   useMantineColorScheme,
// } from "@mantine/core";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useAuthenticate } from "../../../hooks";
// import {
//   AiOutlineCheckCircle,
//   AiOutlineLogout,
//   AiOutlineMail,
//   AiOutlineSearch,
//   AiOutlineSetting,
//   AiOutlineUser,
// } from "react-icons/ai";
// import { BiMoon, BiMoviePlay, BiSun, BiUserCircle } from "react-icons/bi";
// import { authenticateServices } from "../../../services";
// import { useDispatch } from "react-redux";
// import { userSlice } from "../../../redux/reducers";
// import { notifications } from "@mantine/notifications";
// import type { SpotlightActionData } from "@mantine/spotlight";
// import {
//   IconDashboard,
//   IconFileText,
//   IconHome,
//   IconSwitchHorizontal,
// } from "@tabler/icons-react";
// import { modals } from "@mantine/modals";
// import classes from "./DefaultHeader.module.css";

// export default function DefaultHeader() {
//   const [userMenuOpened, setUserMenuOpened] = useState(false);
//   const [defaultValueTable, setDefaultValueTable] = useState<string>("");
//   const location = useLocation();
//   const [isLogged, , dataUser] = useAuthenticate();
//   const { colorScheme, toggleColorScheme } = useMantineColorScheme();
//   const dark = colorScheme === "dark";

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const data = {
//     user: {
//       name: dataUser?.fullName,
//       email: dataUser?.email,
//       type: dataUser?.type,
//       image:
//         "https://images.unsplash.com/photo-1692005561659-cdba32d1e4a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
//     },

//     tabs: [
//       {
//         label: "Trang chủ",
//         link: "home",
//       },
//       {
//         label: "Phim",
//         link: "movie",
//       },
//       {
//         label: "Xem online",
//         link: "stream",
//       },
//     ],
//   };

//   const handleLogout = async () => {
//     notifications.show({
//       id: "load-data",
//       loading: true,
//       radius: "md",
//       title: "Logout...",
//       message: "It can take some minutes",
//       autoClose: false,
//       withCloseButton: false,
//       withBorder: true,
//     });
//     const res = await authenticateServices.handleLogout();
//     if (res.statusCode === 0) {
//       notifications.update({
//         id: "load-data",
//         radius: "lg",
//         color: "teal",
//         title: <p className="text-teal-600">Success</p>,
//         message: res.message,
//         withBorder: true,
//         icon: <AiOutlineCheckCircle size="1.2rem" />,
//         autoClose: 2000,
//       });
//       dispatch(userSlice.actions.toggleLogin({}));
//     }
//   };

//   const openSwitchAdmin = () =>
//     modals.openConfirmModal({
//       title: <p className="text-blue-500 font-medium">Switch to admin page</p>,
//       centered: true,
//       children: <p>Are you sure to switch to admin page?</p>,
//       zIndex: 1600,
//       labels: {
//         confirm: "Confirm",
//         cancel: "Cancel",
//       },
//       confirmProps: { color: "blue", radius: "lg" },
//       cancelProps: { color: "gray", radius: "lg" },
//       overlayProps: {
//         color: "#141517",
//         opacity: 0.55,
//         blur: 3,
//       },
//       radius: "lg",
//       onCancel: () => console.log("Cancel"),
//       onConfirm: () => navigate(`/admin/dashboard`),
//     });

//   const actions: SpotlightActionData[] = [
//     {
//       id: "home",
//       label: "Home",
//       description: "Get to home page",
//       onClick: () => console.log("Home"),
//       leftSection: (
//         <IconHome style={{ width: rem(24), height: rem(24) }} stroke={1.5} />
//       ),
//     },
//     {
//       id: "dashboard",
//       label: "Dashboard",
//       description: "Get full information about current system status",
//       onClick: () => console.log("Dashboard"),
//       leftSection: (
//         <IconDashboard
//           style={{ width: rem(24), height: rem(24) }}
//           stroke={1.5}
//         />
//       ),
//     },
//     {
//       id: "documentation",
//       label: "Documentation",
//       description: "Visit documentation to lean more about all features",
//       onClick: () => console.log("Documentation"),
//       leftSection: (
//         <IconFileText
//           style={{ width: rem(24), height: rem(24) }}
//           stroke={1.5}
//         />
//       ),
//     },
//   ];

//   useEffect(() => {
//     const pathName = location.pathname;

//     const modifiedPath = pathName.slice(1);
//     console.log(modifiedPath);
//     setDefaultValueTable(modifiedPath);
//   }, [location]);

//   return (
//     <div
//       className={`${classes.header} boxshadow-custom width-before-scroll-bar`}
//     >
//       <Container size="lg" className={classes.mainSection}>
//         <Group position="apart">
//           <Badge
//             size="lg"
//             radius="lg"
//             sx={(theme) => ({
//               backgroundColor:
//                 theme.colorScheme === "dark"
//                   ? theme.colors.dark[4]
//                   : theme.colors.blue[0],

//               padding: "22px 15px",
//             })}
//             className="shadow-lg"
//           >
//             <Group spacing="sm">
//               <ActionIcon color="blue" size="md" radius="md" variant="filled">
//                 <BiMoviePlay size="1.125rem" />
//               </ActionIcon>
//               Show Booking
//             </Group>
//           </Badge>

//           {isLogged ? (
//             <Menu
//               width={260}
//               position="bottom-end"
//               transitionProps={{ transition: "pop-top-right" }}
//               onClose={() => setUserMenuOpened(false)}
//               onOpen={() => setUserMenuOpened(true)}
//               withinPortal
//               radius="lg"
//             >
//               <Menu.Target>
//                 <UnstyledButton
//                   className={
//                     cx(classes.user, {
//                       [classes.userActive]: userMenuOpened,
//                     }) + "  shadow-md drop-shadow-md"
//                   }
//                 >
//                   <Group spacing={7}>
//                     {/* <Avatar
//                       src={data.user.image}
//                       alt={data.user.name}
//                       radius="xl"
//                       size={30}
//                     /> */}
//                     <Avatar size={32} radius="xl" color="blue">
//                       <AiOutlineUser size="1.3rem" />
//                     </Avatar>
//                     <Stack
//                       className={classes.menuStack}
//                       align="start"
//                       spacing={6}
//                     >
//                       <Text
//                         weight={500}
//                         size="sm"
//                         sx={{
//                           lineHeight: 1,
//                           color: theme.white,
//                         }}
//                         mr={3}
//                       >
//                         {data.user.name}
//                       </Text>
//                       <Text
//                         weight={300}
//                         size="sm"
//                         sx={{
//                           lineHeight: 1,
//                           color: theme.white,
//                         }}
//                         mr={3}
//                       >
//                         {data.user.email}
//                       </Text>
//                     </Stack>
//                   </Group>
//                 </UnstyledButton>
//               </Menu.Target>
//               <Menu.Dropdown>
//                 <Menu.Label className={classes.menuItem}>Account</Menu.Label>
//                 <Menu.Item
//                   className={classes.menuItem}
//                   color="blue"
//                   icon={<BiUserCircle size="0.9rem" stroke={1.5} />}
//                 >
//                   {dataUser?.fullName}
//                 </Menu.Item>
//                 <Menu.Item
//                   className={classes.menuItem}
//                   icon={<AiOutlineMail size="0.9rem" stroke={1.5} />}
//                 >
//                   {dataUser?.email}
//                 </Menu.Item>
//                 <Menu.Divider className={classes.menuItem} />
//                 <Menu.Label>Settings</Menu.Label>
//                 <Link to={`/user/${dataUser.id}/profile`}>
//                   <Menu.Item
//                     icon={<AiOutlineSetting size="0.9rem" stroke={1.5} />}
//                   >
//                     Account settings
//                   </Menu.Item>
//                 </Link>

//                 {data.user.type == "admin" ? (
//                   <Menu.Item
//                     onClick={openSwitchAdmin}
//                     icon={<IconSwitchHorizontal size="0.9rem" stroke={1.5} />}
//                   >
//                     Switch to admin
//                   </Menu.Item>
//                 ) : null}

//                 <Menu.Item
//                   icon={<AiOutlineCheckCircle size="0.9rem" stroke={1.5} />}
//                 >
//                   Check version
//                 </Menu.Item>
//                 <Menu.Item
//                   // closeMenuOnClick={false}
//                   onClick={() => toggleColorScheme()}
//                   icon={
//                     dark ? (
//                       <BiSun size="0.9rem" stroke={1.5} />
//                     ) : (
//                       <BiMoon size="0.9rem" stroke={1.5} />
//                     )
//                   }
//                 >
//                   {dark ? "Light mode" : "Dark mode"}
//                 </Menu.Item>

//                 <Menu.Divider />

//                 <Menu.Label>Danger zone</Menu.Label>

//                 <Menu.Item
//                   color="red"
//                   icon={<AiOutlineLogout size="0.9rem" stroke={1.5} />}
//                   onClick={() => handleLogout()}
//                 >
//                   Logout
//                 </Menu.Item>
//               </Menu.Dropdown>
//             </Menu>
//           ) : (
//             <div>
//               <Link to={"/register"}>
//                 <Button
//                   variant="gradient"
//                   gradient={{ from: "#0061ff", to: "#60efff" }}
//                   radius="lg"
//                   className="shadow-md drop-shadow-md"
//                 >
//                   Login
//                 </Button>
//               </Link>
//             </div>
//           )}
//         </Group>
//       </Container>
//       <Container size="lg">
//         <Group position="apart" spacing="xs">
//           <Tabs
//             value={defaultValueTable ? defaultValueTable : "home"}
//             variant="outline"
//             classNames={{
//               tabsList: classes.tabsList,
//               tab: classes.tab,
//             }}
//           >
//             <Tabs.List>
//               {data.tabs.map((tab) => (
//                 <Link to={`/${tab.link}`} key={tab.link}>
//                   <Tabs.Tab value={tab.link} key={tab.label}>
//                     {tab.label}
//                   </Tabs.Tab>
//                 </Link>
//               ))}
//             </Tabs.List>
//           </Tabs>

//           {/* <SpotlightProvider
//             radius="lg"
//             actions={actions}
//             withinPortal
//             searchIcon={<AiOutlineSearch size="1.2rem" />}
//             searchPlaceholder="Updating soon..."
//             nothingFoundMessage="Nothing found..."
//           >
//             <Button
//               // color="cyan"
//               variant="gradient"
//               gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
//               onClick={spotlight.open as never}
//               className={classes.button + " my-1 boxshadow-custom "}
//               compact
//               radius="md"
//               rightIcon={<AiOutlineSearch size="1.3rem" />}
//             >
//               Search{" "}
//             </Button>
//           </SpotlightProvider> */}
//         </Group>
//       </Container>
//     </div>
//   );
// }

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
import { authenticateServices } from "../../../services";
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
        label: "Xem online",
        link: "stream",
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
        color: "teal",
        title: <p className="text-teal-600">Đăng xuất thành công</p>,
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

  useEffect(() => {
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
      <Container className={classes.mainSection} size="md">
        <Group justify="space-between" style={{ height: "54px" }}>
          <Badge size="lg" radius="lg" className={classes.badge}>
            <Group gap="sm">
              <ActionIcon color="blue" size="md" radius="md" variant="filled">
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
                <Menu.Label className={classes.menuItem}>Account</Menu.Label>
                <Menu.Item
                  className={classes.menuItem}
                  color="blue"
                  leftSection={<BiUserCircle size="0.9rem" stroke={1.5} />}
                >
                  {dataUser?.fullName}
                </Menu.Item>
                <Menu.Item
                  className={classes.menuItem}
                  leftSection={<AiOutlineMail size="0.9rem" stroke={1.5} />}
                >
                  {dataUser?.email}
                </Menu.Item>
                <Menu.Divider className={classes.menuItem} />
                <Menu.Label>Settings</Menu.Label>
                <Link to={`/user/${dataUser.id}/profile`}>
                  <Menu.Item
                    leftSection={
                      <AiOutlineSetting size="0.9rem" stroke={1.5} />
                    }
                  >
                    Account settings
                  </Menu.Item>
                </Link>

                {data.user.type == "admin" ? (
                  <Menu.Item
                    onClick={openSwitchAdmin}
                    leftSection={
                      <IconSwitchHorizontal size="0.9rem" stroke={1.5} />
                    }
                  >
                    Switch to admin
                  </Menu.Item>
                ) : null}

                <Menu.Item
                  leftSection={
                    <AiOutlineCheckCircle size="0.9rem" stroke={1.5} />
                  }
                >
                  Check version
                </Menu.Item>
                <Menu.Item
                  // closeMenuOnClick={false}
                  onClick={() => toggleColorScheme()}
                  leftSection={
                    dark ? (
                      <BiSun size="0.9rem" stroke={1.5} />
                    ) : (
                      <BiMoon size="0.9rem" stroke={1.5} />
                    )
                  }
                >
                  {dark ? "Light mode" : "Dark mode"}
                </Menu.Item>

                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>

                <Menu.Item
                  color="red"
                  leftSection={<AiOutlineLogout size="0.9rem" stroke={1.5} />}
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
                  Đăng nhập
                </Button>
              </Link>
            </div>
          )}
        </Group>
      </Container>
      <Container size="md">
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

          <Button
            // color="cyan"
            variant="gradient"
            gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
            onClick={spotlight.open}
            className={classes.button + " my-1 boxshadow-custom "}
            radius="md"
            size="compact-sm"
            rightSection={<AiOutlineSearch size="1.3rem" />}
          >
            Search{" "}
          </Button>
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
