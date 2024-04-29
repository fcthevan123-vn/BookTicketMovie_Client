import { useEffect, useMemo, useState } from "react";

import classes from "./EmployeeNav.module.css";
import { AiOutlineProfile } from "react-icons/ai";
import { Link } from "react-router-dom";
import { IconChalkboard, IconNewSection } from "@tabler/icons-react";

export function EmployeeNav() {
  const [active, setActive] = useState("Billing");

  const dataNavbar = useMemo(
    () => [
      {
        link: `/employee/dashboard`,
        label: "Tổng quan",
        urlInclude: "dashboard",
        icon: AiOutlineProfile,
      },
      {
        link: `/employee/manage-booking`,
        label: "Quản lý vé",
        urlInclude: "manage-booking",
        icon: AiOutlineProfile,
      },
      {
        label: "Phòng chiếu phim",
        icon: IconChalkboard,
        link: `/employee/movie-hall`,
      },
      {
        label: "Kiểu phòng",
        icon: IconNewSection,
        link: `/employee/room-type`,
      },
    ],
    []
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
      if (location.pathname.includes(path.urlInclude as string)) {
        setActive(path.label);
      }
    });
  }, [dataNavbar]);

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>
    </nav>
  );
}
