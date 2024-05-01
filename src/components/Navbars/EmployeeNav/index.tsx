import { useEffect, useMemo, useState } from "react";

import classes from "./EmployeeNav.module.css";
import { AiOutlineProfile } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  IconArmchair,
  IconChalkboard,
  IconLayoutDashboard,
  IconNewSection,
  IconSlideshow,
  IconTicket,
} from "@tabler/icons-react";

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
        link: `/employee/all-show`,
        label: "Suất chiếu",
        urlInclude: "all-show",
        icon: IconSlideshow,
      },
      {
        link: `/employee/manage-booking`,
        label: "Quản lý vé",
        urlInclude: "manage-booking",
        icon: IconTicket,
      },
      {
        label: "Phòng chiếu phim",
        icon: IconChalkboard,
        urlInclude: "movie-hall",
        link: `/employee/movie-hall`,
      },
      {
        label: "Kiểu phòng",
        icon: IconNewSection,
        urlInclude: "room-type",
        link: `/employee/room-type`,
      },
      {
        label: "Bố trí ghế",
        urlInclude: "layout",
        icon: IconLayoutDashboard,
        link: `/employee/layout`,
      },
      {
        label: "Các loại ghế",
        icon: IconArmchair,
        urlInclude: "seat",
        link: `/employee/seat`,
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
