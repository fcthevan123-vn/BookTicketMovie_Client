// import { useEffect, useMemo, useState } from "react";
// import { Group, Code } from "@mantine/core";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { BiHomeAlt2 } from "react-icons/bi";
// import {
//   AiOutlineCheckCircle,
//   AiOutlineEye,
//   AiOutlineLineChart,
//   AiOutlineLogout,
//   AiOutlineProfile,
//   AiOutlineSwitcher,
// } from "react-icons/ai";

// import { BsPostcard } from "react-icons/bs";
// import { useAuthenticate } from "../../../hooks";
// import { modals } from "@mantine/modals";
// import { notifications } from "@mantine/notifications";
// import { userSlice } from "../../../redux/reducers";
// import { authenticateServices } from "../../../services";
// import { useDispatch } from "react-redux";
// import classes from "./UserNav.module.css";
// import cx from "clsx";

// const useStyles = createStyles((theme) => ({
//   navbar: {
//     backgroundColor: theme.fn.variant({
//       variant: "filled",
//       color: theme.primaryColor,
//     }).background,
//     borderRight: "0",
//     position: "fixed",
//     top: "0",
//     left: "0",
//   },

//   version: {
//     backgroundColor: theme.fn.lighten(
//       theme.fn.variant({ variant: "filled", color: theme.primaryColor })
//         .background!,
//       0.1
//     ),
//     color: theme.white,
//     fontWeight: 700,
//   },

//   header: {
//     paddingBottom: theme.spacing.md,
//     marginBottom: `calc(${theme.spacing.md} * 1.5)`,
//     borderBottom: `${rem(1)} solid ${theme.fn.lighten(
//       theme.fn.variant({ variant: "filled", color: theme.primaryColor })
//         .background!,
//       0.1
//     )}`,
//   },

//   footer: {
//     paddingTop: theme.spacing.md,
//     marginTop: theme.spacing.md,
//     borderTop: `${rem(1)} solid ${theme.fn.lighten(
//       theme.fn.variant({ variant: "filled", color: theme.primaryColor })
//         .background!,
//       0.1
//     )}`,
//   },

// link: {
//   ...theme.fn.focusStyles(),
//   display: "flex",
//   alignItems: "center",
//   textDecoration: "none",
//   fontSize: theme.fontSizes.sm,
//   color: theme.colorScheme === "dark" ? theme.colors.gray[3] : theme.white,
//   padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
//   borderRadius: theme.radius.md,
//   fontWeight: 500,
//   cursor: "pointer",

//   "&:hover": {
//     backgroundColor: theme.fn.lighten(
//       theme.fn.variant({ variant: "filled", color: theme.primaryColor })
//         .background!,
//       0.1
//     ),
//   },
// },

//   linkIcon: {
//     fontSize: "17px",
//     ref: getStylesRef("icon"),
//     color: theme.white,
//     opacity: 0.75,
//     marginRight: theme.spacing.xs,
//   },

//   linkActive: {
//     "&, &:hover": {
//       backgroundColor: theme.fn.lighten(
//         theme.fn.variant({ variant: "filled", color: theme.primaryColor })
//           .background!,
//         0.15
//       ),
//       [`& .${getStylesRef("icon")}`]: {
//         opacity: 0.9,
//       },
//     },
//   },
// }));

// interface Props {
//   close: (() => void) | null;
// }

// export function UserNav() {
//   const [active, setActive] = useState("Profile");
//   const [, , dataUser] = useAuthenticate();
//   const location = useLocation();

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const dataNavbar = useMemo(
//     () => [
//       {
//         link: `/user/${dataUser?.id}/profile`,
//         label: "Profile",
//         urlInclude: "profile",
//         icon: AiOutlineProfile,
//       },
//       {
//         link: "",
//         label: "Statistic",
//         urlInclude: "Statistic",
//         icon: AiOutlineLineChart,
//       },
//       {
//         link: "",
//         label: "Verify Email",
//         urlInclude: "verify-email",
//         icon: AiOutlineCheckCircle,
//       },
//       {
//         link: `/user/${dataUser?.id}/change-password`,
//         label: "Change Password",
//         urlInclude: "change-password",
//         icon: AiOutlineEye,
//       },
//       {
//         link: "",
//         label: "Your Feedback",
//         urlInclude: "feedback",
//         icon: BsPostcard,
//       },
//     ],
//     [dataUser]
//   );

//   const links = dataNavbar.map((item) => {
//     return (
//       <Link to={item.link} key={item.label}>
//         <p
//           className={cx(classes.link, {
//             [classes.linkActive]: item.label === active,
//           })}
//           // href={item.link}
//           key={item.label}
//           onClick={() => {
//             if (close) {
//               close();
//             }
//             setActive(item.label);
//           }}
//         >
//           <item.icon className={classes.linkIcon} stroke={1.5} />
//           <span>{item.label}</span>
//         </p>
//       </Link>
//     );
//   });

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
//     try {
//       const res = await authenticateServices.handleLogout();
//       if (res.statusCode === 0) {
//         notifications.update({
//           id: "load-data",
//           radius: "lg",
//           color: "teal",
//           title: <p className="text-teal-600">Success</p>,
//           message: res.message,
//           withBorder: true,
//           icon: <AiOutlineCheckCircle size="1.2rem" />,
//           autoClose: 2000,
//         });
//         dispatch(userSlice.actions.toggleLogin({}));
//         navigate("/");
//       }
//     } catch (error) {
//       return error;
//     }
//   };

//   const openLogoutModal = () =>
//     modals.openConfirmModal({
//       title: <p className="text-red-500 font-medium">Logout</p>,
//       centered: true,
//       children: <p>Are you sure to logout?</p>,
//       zIndex: 1600,
//       labels: {
//         confirm: "Logout",
//         cancel: "Cancel",
//       },
//       confirmProps: { color: "red", radius: "lg" },
//       cancelProps: { color: "red", radius: "lg" },
//       overlayProps: {
//         color: "#141517",
//         opacity: 0.55,
//         blur: 3,
//       },
//       radius: "lg",
//       onCancel: () => console.log("Cancel"),
//       onConfirm: () => handleLogout(),
//     });

//   useEffect(() => {
//     dataNavbar.map((path) => {
//       if (location.pathname.includes(path.urlInclude)) {
//         setActive(path.label);
//       }
//     });
//   }, [dataNavbar, location]);

//   return (
//     <nav
//       // height="100%"
//       // width={{ xs: 250 }}
//       // p="md"
//       className={classes.navbar + " shadow-xl drop-shadow-md"}
//     >
//       <div>
//         <Group className={classes.header} justify="apart">
//           <span className="text-white">Show booking</span>
//           <Code color="gray.1" className={classes.version}>
//             v1.0.1
//           </Code>
//         </Group>
//         {links}
//       </div>

//       <div className={classes.footer}>
//         <Link to="/" className={classes.link}>
//           <BiHomeAlt2 className={classes.linkIcon} stroke={1.5} />
//           <span>Home</span>
//         </Link>
//         <a
//           href="#"
//           className={classes.link}
//           onClick={(event) => event.preventDefault()}
//         >
//           <AiOutlineSwitcher className={classes.linkIcon} stroke={1.5} />
//           <span>Change account</span>
//         </a>

//         <p className={classes.link} onClick={openLogoutModal}>
//           <AiOutlineLogout className={classes.linkIcon} stroke={1.5} />
//           <span>Logout</span>
//         </p>
//       </div>
//     </nav>
//   );
// }

import { useEffect, useMemo, useState } from "react";
import { Group, Code, Text } from "@mantine/core";

import classes from "./UserNav.module.css";
import {
  AiOutlineCheckCircle,
  AiOutlineEye,
  AiOutlineLineChart,
  AiOutlineProfile,
} from "react-icons/ai";
import { BsPostcard } from "react-icons/bs";
import { useAuthenticate } from "../../../hooks";
import { Link } from "react-router-dom";
import { IconTicket } from "@tabler/icons-react";

export function UserNav() {
  const [active, setActive] = useState("Billing");
  const [, , dataUser] = useAuthenticate();

  const dataNavbar = useMemo(
    () => [
      {
        link: `/user/${dataUser?.id}/profile`,
        label: "Trang cá nhân",
        urlInclude: "profile",
        icon: AiOutlineProfile,
      },
      {
        link: "",
        label: "Thống kê",
        urlInclude: "Statistic",
        icon: AiOutlineLineChart,
      },
      {
        link: "",
        label: "Xác nhận email",
        urlInclude: "verify-email",
        icon: AiOutlineCheckCircle,
      },
      {
        link: `/user/${dataUser?.id}/change-password`,
        label: "Đổi mật khẩu",
        urlInclude: "change-password",
        icon: AiOutlineEye,
      },
      {
        link: `/user/${dataUser?.id}/all-tickets`,
        label: "Vé đã đặt",
        urlInclude: "all-tickets",
        icon: IconTicket,
      },
      {
        link: ``,
        label: "Tất cả đánh giá",
        urlInclude: "feedback",
        icon: BsPostcard,
      },
    ],
    [dataUser]
  );

  const links = dataNavbar.map((item) => (
    <Link to={item.link} key={item.label}>
      <p
        className={classes.link}
        data-active={item.label === active || undefined}
        key={item.label}
        onClick={() => {
          setActive(item.label);
        }}
      >
        <item.icon className={classes.linkIcon} stroke={1.5} />
        <span>{item.label}</span>
      </p>
    </Link>
  ));

  useEffect(() => {
    dataNavbar.map((path) => {
      if (location.pathname.includes(path.urlInclude)) {
        setActive(path.label);
      }
    });
  }, [dataNavbar, location]);

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Text size="sm" c={"white"} fs={"italic"} td={"underline"}>
            Xin chào: {dataUser.fullName}
          </Text>
          <Code fw={700} className={classes.version}>
            v1.0.0
          </Code>
        </Group>
        {links}
      </div>
    </nav>
  );
}
