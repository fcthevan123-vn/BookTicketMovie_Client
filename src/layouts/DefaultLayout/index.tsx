import { ReactNode } from "react";
import styles from "./DefaultLayout.module.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);

type DefaultLayoutProps = {
  children: ReactNode;
};

function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className={cx("wrap")}>
      <div className={cx("child")}>{children}</div>
      <div>{/* <Footer></Footer> */}</div>
    </div>
  );
}

export default DefaultLayout;
