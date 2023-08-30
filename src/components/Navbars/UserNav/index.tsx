import { useEffect, useMemo, useState } from "react";
import {
  createStyles,
  Navbar,
  Group,
  Code,
  getStylesRef,
  rem,
} from "@mantine/core";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiHomeAlt2 } from "react-icons/bi";
import {
  AiOutlineCheckCircle,
  AiOutlineEye,
  AiOutlineLineChart,
  AiOutlineLogout,
  AiOutlineProfile,
  AiOutlineSwitcher,
} from "react-icons/ai";

import { BsPostcard } from "react-icons/bs";
import { useAuthenticate } from "../../../hooks";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { userSlice } from "../../../redux/reducers";
import { authenticateServices } from "../../../services";
import { useDispatch } from "react-redux";

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.fn.variant({
      variant: "filled",
      color: theme.primaryColor,
    }).background,
    borderRight: "0",
    position: "fixed",
    top: "0",
    left: "0",
  },

  version: {
    backgroundColor: theme.fn.lighten(
      theme.fn.variant({ variant: "filled", color: theme.primaryColor })
        .background!,
      0.1
    ),
    color: theme.white,
    fontWeight: 700,
  },

  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${theme.fn.lighten(
      theme.fn.variant({ variant: "filled", color: theme.primaryColor })
        .background!,
      0.1
    )}`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${theme.fn.lighten(
      theme.fn.variant({ variant: "filled", color: theme.primaryColor })
        .background!,
      0.1
    )}`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color: theme.white,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    cursor: "pointer",

    "&:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.1
      ),
    },
  },

  linkIcon: {
    fontSize: "17px",
    ref: getStylesRef("icon"),
    color: theme.white,
    opacity: 0.75,
    marginRight: theme.spacing.xs,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.15
      ),
      [`& .${getStylesRef("icon")}`]: {
        opacity: 0.9,
      },
    },
  },
}));

interface Props {
  close: (() => void) | null;
}

export function UserNav({ close }: Props) {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Profile");
  const [, , dataUser] = useAuthenticate();
  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dataNavbar = useMemo(
    () => [
      {
        link: `/user/${dataUser?.id}/profile`,
        label: "Profile",
        urlInclude: "profile",
        icon: AiOutlineProfile,
      },
      {
        link: "",
        label: "Statistic",
        urlInclude: "Statistic",
        icon: AiOutlineLineChart,
      },
      {
        link: "",
        label: "Verify Email",
        urlInclude: "verify-email",
        icon: AiOutlineCheckCircle,
      },
      {
        link: `/user/${dataUser?.id}/change-password`,
        label: "Change Password",
        urlInclude: "change-password",
        icon: AiOutlineEye,
      },
      {
        link: "",
        label: "Your Feedback",
        urlInclude: "feedback",
        icon: BsPostcard,
      },
    ],
    [dataUser]
  );

  const links = dataNavbar.map((item) => {
    return (
      <Link to={item.link} key={item.label}>
        <p
          className={cx(classes.link, {
            [classes.linkActive]: item.label === active,
          })}
          // href={item.link}
          key={item.label}
          onClick={() => {
            if (close) {
              close();
            }
            setActive(item.label);
          }}
        >
          <item.icon className={classes.linkIcon} stroke={1.5} />
          <span>{item.label}</span>
        </p>
      </Link>
    );
  });

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
    try {
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
        navigate("/");
      }
    } catch (error) {
      return error;
    }
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

  useEffect(() => {
    dataNavbar.map((path) => {
      if (location.pathname.includes(path.urlInclude)) {
        setActive(path.label);
      }
    });
  }, [dataNavbar, location]);

  return (
    <Navbar
      height="100%"
      width={{ xs: 250 }}
      p="md"
      className={classes.navbar + " shadow-xl drop-shadow-md"}
    >
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <span className="text-white">Show booking</span>
          <Code className={classes.version}>v1.0.1</Code>
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <Link to="/" className={classes.link}>
          <BiHomeAlt2 className={classes.linkIcon} stroke={1.5} />
          <span>Home</span>
        </Link>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <AiOutlineSwitcher className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <p className={classes.link} onClick={openLogoutModal}>
          <AiOutlineLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </p>
      </Navbar.Section>
    </Navbar>
  );
}
