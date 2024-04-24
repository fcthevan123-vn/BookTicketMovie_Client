import { useDisclosure, useWindowScroll } from "@mantine/hooks";
import { ActionIcon, Affix, AppShell, Transition, rem } from "@mantine/core";

import DefaultHeader from "../../components/Headers/DefaultHeader";
import { useAuthenticate } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { IconArrowUp } from "@tabler/icons-react";

type DefaultLayoutProps = {
  children: React.ReactNode;
};
function DefaultLayout({ children }: DefaultLayoutProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();
  const [, , dataUser] = useAuthenticate();
  const [scroll, scrollTo] = useWindowScroll();

  useEffect(() => {
    if (dataUser.type == "admin") {
      navigate("/admin/dashboard");
    }
    if (dataUser.type == "employee") {
      navigate(`/employee/${dataUser.id}/dashboard`);
    }
  }, [dataUser, navigate]);

  return (
    <AppShell
      header={{ height: 120 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      transitionDuration={0}
    >
      <AppShell.Header>
        <DefaultHeader></DefaultHeader>
      </AppShell.Header>

      <AppShell.Main>
        <div>{children}</div>
      </AppShell.Main>

      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <ActionIcon
              size={"lg"}
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            >
              <IconArrowUp style={{ width: rem(20), height: rem(20) }} />
            </ActionIcon>
          )}
        </Transition>
      </Affix>
    </AppShell>
  );
}

export default DefaultLayout;
