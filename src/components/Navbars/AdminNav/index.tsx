import { IconGauge, IconMovie, IconSubtask } from "@tabler/icons-react";

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
    label: "Rạp phim",
    icon: IconTheater,
    link: "/admin/cinema/overview",
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
