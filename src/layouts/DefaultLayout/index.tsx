import { useDisclosure } from "@mantine/hooks";
import { AppShell } from "@mantine/core";

import DefaultHeader from "../../components/Headers/DefaultHeader";
import FooterComponent from "../../components/FooterComponent";
import { useAuthenticate } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

type DefaultLayoutProps = {
  children: React.ReactNode;
};
function DefaultLayout({ children }: DefaultLayoutProps) {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();
  const [, , dataUser] = useAuthenticate();
  useEffect(() => {
    if (dataUser.type == "admin") {
      navigate("/admin/dashboard");
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
      padding="md"
      transitionDuration={0}
    >
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
