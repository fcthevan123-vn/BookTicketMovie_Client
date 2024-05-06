import {
  IconBowl,
  IconFloatLeft,
  IconGauge,
  IconGift,
  IconMovie,
  IconSubtask,
} from "@tabler/icons-react";

import classes from "./AdminNav.module.css";
import { LinksGroup } from "../../LinksGroup";
import { IconTheater } from "@tabler/icons-react";
import { useMemo } from "react";

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
    label: "Rạp phim",
    icon: IconTheater,
    link: "/admin/cinema/overview",
  },
  // {
  //   label: "Quản lý đặt vé",
  //   icon: IconListCheck,
  //   link: `/admin/manage-booking`,
  // },
  {
    label: "Sự kiện",
    icon: IconGift,
    links: [
      { label: "Sự kiện", link: "/admin/event" },
      { label: "Mã giảm giá", link: "/admin/manage-discount" },
    ],
  },
  {
    label: "Đồ ăn & Nước",
    icon: IconBowl,
    link: `/admin/food`,
  },
  {
    label: "Tài khoản",
    icon: IconSubtask,
    link: `/admin/manage-account`,
  },
  {
    label: "Đánh giá",
    icon: IconFloatLeft,
    link: `/admin/reviews`,
  },
];

function AdminNav() {
  const links = useMemo(
    () => allLinks.map((item) => <LinksGroup {...item} key={item.label} />),
    []
  );

  return (
    <nav className={classes.navbar}>
      <div className={classes.linksInner}>{links}</div>
    </nav>
  );
}

export default AdminNav;
