import { useState } from "react";
import {
  createStyles,
  Navbar,
  Group,
  Code,
  getStylesRef,
  rem,
} from "@mantine/core";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.fn.variant({
      variant: "filled",
      color: theme.primaryColor,
    }).background,
    borderRight: "0",
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

    "&:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.1
      ),
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color: theme.white,
    opacity: 0.75,
    marginRight: theme.spacing.sm,
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

const data = [
  { link: "", label: "Profile" },
  { link: "", label: "Statistic" },
  { link: "", label: "Verify Email" },
  { link: "", label: "Change Password" },
  { link: "", label: "Your Feedback" },
];

export function UserNav() {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Profile");

  const links = data.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      {/* <item.icon className={classes.linkIcon} stroke={1.5} /> */}
      <span>{item.label}</span>
    </a>
  ));

  return (
    <Navbar
      height="100%"
      width={{ xs: 250 }}
      p="md"
      className={classes.navbar + " shadow-xl drop-shadow-md"}
    >
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          {/* <MantineLogo size={28} inverted /> */}
          Logo here
          <Code className={classes.version}>v1.0.1</Code>
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <Link to="/" className={classes.link}>
          {/* <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} /> */}
          <span>Home</span>
        </Link>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          {/* <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} /> */}
          <span>Change account</span>
        </a>

        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          {/* <IconLogout className={classes.linkIcon} stroke={1.5} /> */}
          <span>Logout</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
}
