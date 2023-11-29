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
        link: `/user/${dataUser?.id}/statistic`,
        label: "Thống kê",
        urlInclude: "Statistic",
        icon: AiOutlineLineChart,
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
        link: `/user/${dataUser?.id}/all-reviews`,
        label: "Tất cả đánh giá",
        urlInclude: "all-reviews",
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
  }, [dataNavbar, location.pathname]);

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
