import { ReactNode } from "react";
import styles from "./DefaultLayout.module.scss";
import classNames from "classNames/bind";
import DefaultHeader from "../../components/Headers/DefaultHeader";

const cx = classNames.bind(styles);

type DefaultLayoutProps = {
  children: React.ReactNode;
};

function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className={cx("wrap")}>
      <DefaultHeader></DefaultHeader>
      <div className={cx("child")} style={{ paddingTop: "110px" }}>
        {children}
      </div>
      <div>{/* <Footer></Footer> */}</div>
    </div>
  );
}

export default DefaultLayout;
