// import {
//   createStyles,
//   Text,
//   Container,
//   ActionIcon,
//   Group,
//   rem,
//   Badge,
// } from "@mantine/core";
// import { CiInstagram, CiTwitter, CiYoutube } from "react-icons/ci";
// import { BiMoviePlay } from "react-icons/bi";
// const useStyles = createStyles((theme) => ({
//   footer: {
//     marginTop: rem(120),
//     paddingTop: `calc(${theme.spacing.xl} * 2)`,
//     paddingBottom: `calc(${theme.spacing.xl} * 2)`,
//     backgroundColor:
//       theme.colorScheme === "dark"
//         ? theme.colors.dark[6]
//         : theme.colors.gray[2],
//     borderTop: `${rem(1)} solid ${
//       theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
//     }`,
//   },

//   logo: {
//     maxWidth: rem(200),

//     [theme.fn.smallerThan("sm")]: {
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//     },
//   },

//   description: {
//     marginTop: rem(5),

//     [theme.fn.smallerThan("sm")]: {
//       marginTop: theme.spacing.xs,
//       textAlign: "center",
//     },
//   },

//   inner: {
//     display: "flex",
//     justifyContent: "space-between",

//     [theme.fn.smallerThan("sm")]: {
//       flexDirection: "column",
//       alignItems: "center",
//     },
//   },

//   groups: {
//     display: "flex",
//     flexWrap: "wrap",

//     [theme.fn.smallerThan("sm")]: {
//       display: "none",
//     },
//   },

//   wrapper: {
//     width: rem(160),
//   },

//   link: {
//     display: "block",
//     color:
//       theme.colorScheme === "dark"
//         ? theme.colors.dark[1]
//         : theme.colors.gray[6],
//     fontSize: theme.fontSizes.sm,
//     paddingTop: rem(3),
//     paddingBottom: rem(3),

//     "&:hover": {
//       textDecoration: "underline",
//     },
//   },

//   title: {
//     fontSize: theme.fontSizes.lg,
//     fontWeight: 700,
//     fontFamily: `Greycliff CF, ${theme.fontFamily}`,
//     marginBottom: `calc(${theme.spacing.xs} / 2)`,
//     color: theme.colorScheme === "dark" ? theme.white : theme.black,
//   },

//   afterFooter: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: theme.spacing.xl,
//     paddingTop: theme.spacing.xl,
//     paddingBottom: theme.spacing.xl,
//     borderTop: `${rem(1)} solid ${
//       theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
//     }`,

//     [theme.fn.smallerThan("sm")]: {
//       flexDirection: "column",
//     },
//   },

//   social: {
//     [theme.fn.smallerThan("sm")]: {
//       marginTop: theme.spacing.xs,
//     },
//   },
// }));

// interface FooterComponentProps {
//   data: {
//     title: string;
//     links: { label: string; link: string }[];
//   }[];
// }

// const data = [
//   {
//     title: "About",
//     links: [
//       {
//         label: "Features",
//         link: "#",
//       },
//       {
//         label: "Pricing",
//         link: "#",
//       },
//       {
//         label: "Support",
//         link: "#",
//       },
//       {
//         label: "Forums",
//         link: "#",
//       },
//     ],
//   },
//   {
//     title: "Project",
//     links: [
//       {
//         label: "Contribute",
//         link: "#",
//       },
//       {
//         label: "Media assets",
//         link: "#",
//       },
//       {
//         label: "Changelog",
//         link: "#",
//       },
//       {
//         label: "Releases",
//         link: "#",
//       },
//     ],
//   },
//   {
//     title: "Community",
//     links: [
//       {
//         label: "Join Discord",
//         link: "#",
//       },
//       {
//         label: "Follow on Twitter",
//         link: "#",
//       },
//       {
//         label: "Email newsletter",
//         link: "#",
//       },
//       {
//         label: "GitHub discussions",
//         link: "#",
//       },
//     ],
//   },
// ];

// export function FooterComponent() {
//   const { classes } = useStyles();

//   const groups = data.map((group) => {
//     const links = group.links.map((link, index) => (
//       <Text<"a">
//         key={index}
//         className={classes.link}
//         component="a"
//         href={link.link}
//         onClick={(event) => event.preventDefault()}
//       >
//         {link.label}
//       </Text>
//     ));

//     return (
//       <div className={classes.wrapper} key={group.title}>
//         <Text className={classes.title}>{group.title}</Text>
//         {links}
//       </div>
//     );
//   });

//   return (
//     <footer className={classes.footer}>
//       <Container className={classes.inner}>
//         <div className={classes.logo}>
//           <Badge
//             size="lg"
//             radius="lg"
//             sx={{ padding: "22px 15px", marginBottom: "10px" }}
//             className="shadow-lg"
//           >
//             <Group spacing="sm">
//               <ActionIcon color="blue" size="md" radius="md" variant="filled">
//                 <BiMoviePlay size="1.125rem" />
//               </ActionIcon>
//               Show Booking
//             </Group>
//           </Badge>
//           <Text size="xs" color="dimmed" className={classes.description}>
//             Build fully functional accessible web applications faster than ever
//           </Text>
//         </div>
//         <div className={classes.groups}>{groups}</div>
//       </Container>
//       <Container className={classes.afterFooter}>
//         <Text color="dimmed" size="sm">
//           © 2023 - Lai The Van
//         </Text>

//         <Group spacing={0} className={classes.social} position="right" noWrap>
//           <ActionIcon size="lg">
//             <CiTwitter size="1.4rem" stroke={1.5} />
//           </ActionIcon>
//           <ActionIcon size="lg">
//             <CiYoutube size="1.4rem" stroke={1.5} />
//           </ActionIcon>
//           <ActionIcon size="lg">
//             <CiInstagram size="1.4rem" stroke={1.5} />
//           </ActionIcon>
//         </Group>
//       </Container>
//     </footer>
//   );
// }

import { Text, Container, ActionIcon, Group, rem } from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons-react";
import classes from "./FooterComponent.module.css";

const data = [
  {
    title: "About",
    links: [
      { label: "Features", link: "#" },
      { label: "Pricing", link: "#" },
      { label: "Support", link: "#" },
      { label: "Forums", link: "#" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "Contribute", link: "#" },
      { label: "Media assets", link: "#" },
      { label: "Changelog", link: "#" },
      { label: "Releases", link: "#" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Join Discord", link: "#" },
      { label: "Follow on Twitter", link: "#" },
      { label: "Email newsletter", link: "#" },
      { label: "GitHub discussions", link: "#" },
    ],
  },
];

export function FooterComponent() {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<"a">
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          Logo
          <Text size="xs" c="dimmed" className={classes.description}>
            Build fully functional accessible web applications faster than ever
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © 2020 mantine.dev. All rights reserved.
        </Text>

        <Group
          gap={0}
          className={classes.social}
          justify="flex-end"
          wrap="nowrap"
        >
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandTwitter
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandYoutube
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
