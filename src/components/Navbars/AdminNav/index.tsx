import {
  IconBorderAll,
  IconChalkboard,
  IconClockHour1,
  IconGauge,
  IconGift,
  IconListCheck,
  IconMovie,
  IconSubtask,
} from "@tabler/icons-react";

import classes from "./AdminNav.module.css";
import { LinksGroup } from "../../LinksGroup";
import { IconTheater } from "@tabler/icons-react";

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
    label: "Quản lý giờ chiếu",
    icon: IconClockHour1,
    link: `/admin/show-time`,
  },
  {
    label: "Rạp phim",
    icon: IconTheater,
    link: "/admin/cinema/overview",
  },
  {
    label: "Phòng chiếu phim",
    icon: IconChalkboard,
    link: `/admin/movie-hall/overview`,
  },
  {
    label: "Kiểu bố trí",
    icon: IconBorderAll,
    link: `/admin/layout/overview`,
  },

  {
    label: "Quản lý đặt vé",
    icon: IconListCheck,
    link: `/admin/manage-booking`,
  },
  {
    label: "Quản lý sự kiện",
    icon: IconGift,
    links: [
      { label: "Sự kiện", link: "/admin/event" },
      { label: "Mã giảm giá", link: "/admin/manage-discount" },
    ],
  },
  {
    label: "Quản lý tài khoản",
    icon: IconSubtask,
    link: `/admin/manage-account`,
  },
];

function AdminNav() {
  const links = allLinks.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.linksInner}>{links}</div>
    </nav>
  );
}

export default AdminNav;
