// import {
//   Navbar,
//   Group,
//   Code,
//   ScrollArea,
//   createStyles,
//   rem,
// } from "@mantine/core";
// import {
//   IconCalendarStats,
//   IconGauge,
//   IconPresentationAnalytics,
//   IconFileAnalytics,
//   IconAdjustments,
//   IconLock,
//   IconMovie,
//   IconHome2,
//   IconLogout,
// } from "@tabler/icons-react";
// import { LinksGroup } from "../../LinksGroup";
// import { useAuthenticate } from "../../../hooks";

// const useStyles = createStyles((theme) => ({
//   navbar: {
//     backgroundColor:
//       theme.colorScheme === "dark"
//         ? theme.colors.dark[6]
//         : theme.colors.blue[6],
//     paddingBottom: 0,
//   },

//   header: {
//     padding: theme.spacing.md,
//     paddingTop: 0,
//     marginLeft: `calc(${theme.spacing.md} * -1)`,
//     marginRight: `calc(${theme.spacing.md} * -1)`,
//     color: theme.colorScheme === "dark" ? theme.white : theme.white,
//     borderBottom: `${rem(1)} solid ${theme.fn.lighten(
//       theme.fn.variant({ variant: "filled", color: theme.primaryColor })
//         .background!,
//       0.2
//     )}`,
//   },

//   links: {
//     marginLeft: `calc(${theme.spacing.md} * -1)`,
//     marginRight: `calc(${theme.spacing.md} * -1)`,
//   },

//   linksInner: {
//     paddingTop: theme.spacing.xl,
//     paddingBottom: theme.spacing.xl,
//   },

//   footer: {
//     marginLeft: `calc(${theme.spacing.md} * -1)`,
//     marginRight: `calc(${theme.spacing.md} * -1)`,
//     borderTop: `${rem(1)} solid ${theme.fn.lighten(
//       theme.fn.variant({ variant: "filled", color: theme.primaryColor })
//         .background!,
//       0.2
//     )}`,
//   },
// }));

// export function AdminNav() {
//   const { classes } = useStyles();
//   const [, , dataUser] = useAuthenticate();

//   const mockdata = [
//     {
//       label: "Dashboard",
//       icon: IconGauge,
//       link: `/admin/dashboard`,
//     },

//     {
//       label: "Movies",
//       icon: IconMovie,
//       links: [
//         { label: "Add a movie", link: `/admin/movie/add-a-movie` },
//         { label: "All movies", link: "/admin/movie/all-movies" },
//       ],
//     },
//     {
//       label: "Releases",
//       icon: IconCalendarStats,
//       links: [
//         { label: "Upcoming releases", link: "/" },
//         { label: "Previous releases", link: "/" },
//         { label: "Releases schedule", link: "/" },
//       ],
//     },
//     { label: "Analytics", icon: IconPresentationAnalytics },
//     { label: "Contracts", icon: IconFileAnalytics },
//     { label: "Settings", icon: IconAdjustments },
//     {
//       label: "Security",
//       icon: IconLock,
//       links: [
//         { label: "Enable 2FA", link: "/" },
//         { label: "Change password", link: "/" },
//         { label: "Recovery codes", link: "/" },
//       ],
//     },
//   ];

//   const links = mockdata.map((item) => (
//     <LinksGroup {...item} key={item.label} />
//   ));

//   return (
//     <Navbar width={{ sm: 300 }} p="xl" className={classes.navbar}>
//       <Navbar.Section className={classes.header}>
//         <Group position="apart">
//           Show Booking
//           <Code sx={{ fontWeight: 700 }}>v1.0.1</Code>
//         </Group>
//       </Navbar.Section>

//       <Navbar.Section grow className={classes.links} component={ScrollArea}>
//         <div className={classes.linksInner}>{links}</div>
//       </Navbar.Section>

//       <Navbar.Section className={classes.footer}>
//         <div className="pt-1">
//           <LinksGroup label="Home" icon={IconHome2} link="/"></LinksGroup>
//           <LinksGroup label="Logout" icon={IconLogout}></LinksGroup>
//         </div>
//       </Navbar.Section>
//     </Navbar>
//   );
// }

import {
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
  IconMovie,
} from "@tabler/icons-react";

import classes from "./AdminNav.module.css";
import { LinksGroup } from "../../LinksGroup";

const allLinks = [
  {
    label: "Tổng quan",
    icon: IconGauge,
    link: `/admin/dashboard`,
  },

  {
    label: "Phim",
    icon: IconMovie,
    links: [
      { label: "Thêm phim mới", link: "/admin/movie/add-a-movie" },
      { label: "Tất cả phim", link: "/admin/movie/all-movies" },
    ],
  },
  {
    label: "Releases",
    icon: IconCalendarStats,
    links: [
      { label: "Upcoming releases", link: "/" },
      { label: "Previous releases", link: "/" },
      { label: "Releases schedule", link: "/" },
    ],
  },
  { label: "Analytics", icon: IconPresentationAnalytics },
  { label: "Contracts", icon: IconFileAnalytics },
  { label: "Settings", icon: IconAdjustments },
  {
    label: "Security",
    icon: IconLock,
    links: [
      { label: "Enable 2FA", link: "/" },
      { label: "Change password", link: "/" },
      { label: "Recovery codes", link: "/" },
    ],
  },
];

function AdminNav() {
  const links = allLinks.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <nav className={classes.navbar}>
      {/* <div className={classes.header}>
        <Group justify="space-between">
          Logo
          <Code fw={700}>v3.1.2</Code>
        </Group>
      </div> */}

      {/* <ScrollArea className={classes.links} scrollbarSize={4}> */}
      <div className={classes.linksInner}>{links}</div>
      {/* </ScrollArea> */}
    </nav>
  );
}

export default AdminNav;
