// import styles from "./DefaultLayout.module.scss";
// import classNames from "classNames/bind";
// import { DefaultHeader } from "../../components/Headers/DefaultHeader";
// import { FooterComponent } from "../../components/FooterComponent";

// const cx = classNames.bind(styles);

// type DefaultLayoutProps = {
//   children: React.ReactNode;
// };

// function DefaultLayout({ children }: DefaultLayoutProps) {
//   return (
//     <div className={cx("wrap")}>
//       <DefaultHeader></DefaultHeader>
//       <div className={cx("child")} style={{ paddingTop: "110px" }}>
//         {children}
//       </div>
//       <div>
//         <FooterComponent></FooterComponent>
//       </div>
//     </div>
//   );
// }

// export default DefaultLayout;

import { useDisclosure } from "@mantine/hooks";
import { AppShell } from "@mantine/core";

import DefaultHeader from "../../components/Headers/DefaultHeader";
import { FooterComponent } from "../../components/FooterComponent";
type DefaultLayoutProps = {
  children: React.ReactNode;
};
function DefaultLayout({ children }: DefaultLayoutProps) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 120 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
      transitionDuration={0}
    >
      {/* <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            Logo
            <Group ml="xl" gap={0} visibleFrom="sm">
              <UnstyledButton className={classes.control}>Home</UnstyledButton>
              <UnstyledButton className={classes.control}>Blog</UnstyledButton>
              <UnstyledButton className={classes.control}>
                Contacts
              </UnstyledButton>
              <UnstyledButton className={classes.control}>
                Support
              </UnstyledButton>
            </Group>
          </Group>
        </Group> */}
      <AppShell.Header>
        <DefaultHeader></DefaultHeader>
      </AppShell.Header>

      <AppShell.Main>
        <div>{children}</div>
      </AppShell.Main>

      <FooterComponent></FooterComponent>
    </AppShell>
  );
}

export default DefaultLayout;
