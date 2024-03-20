import { useEffect, useMemo, useState } from "react";
import { Group, Code, Text } from "@mantine/core";

import classes from "./EmployeeNav.module.css";
import {
  AiOutlineEye,
  AiOutlineLineChart,
  AiOutlineProfile,
} from "react-icons/ai";
import { BsPostcard } from "react-icons/bs";
import { useAuthenticate } from "../../../hooks";
import { Link } from "react-router-dom";
import { IconTicket } from "@tabler/icons-react";

export function EmployeeNav() {
  const [active, setActive] = useState("Billing");
  const [, , dataUser] = useAuthenticate();

  const dataNavbar = useMemo(
    () => [
      {
        link: `/employee/${dataUser?.id}/dashboard`,
        label: "Tổng quan",
        urlInclude: "dashboard",
        icon: AiOutlineProfile,
      },
      {
        link: `/employee/${dataUser?.id}/manage-booking`,
        label: "Quản lý vé",
        urlInclude: "manage-booking",
        icon: AiOutlineProfile,
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
        <item.icon className={classes.linkIcon} stroke={"1.5"} />
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
            Nhân viên: {dataUser.fullName}
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
