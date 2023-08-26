import styles from "./LoaderPage.module.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);

const LoaderPage = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className={cx("boxes")}>
        <div className={cx("box")}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={cx("box")}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={cx("box")}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={cx("box")}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default LoaderPage;
