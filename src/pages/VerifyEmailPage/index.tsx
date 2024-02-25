import React, { useState } from "react";
import styles from "./VerifyEmailPage.module.css";

import classNames from "classNames/bind";
import { Button, Paper } from "@mantine/core";
import { Link, useLocation, useParams } from "react-router-dom";
import { authenticateServices, userServices } from "../../services";
import { notifications } from "@mantine/notifications";
import { useDispatch } from "react-redux";
import { userSlice } from "../../redux/reducers";

const cx = classNames.bind(styles);

function VerifyEmailPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const { id } = useParams(); // tokens param

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("user"); // userid query parameter

  const dispatch = useDispatch();

  const getProfile = async () => {
    const res = await userServices.getProfile();
    if (res.statusCode === 0) {
      dispatch(
        userSlice.actions.handleLogin({
          id: res?.data?.id,
          email: res?.data?.email,
          fullName: res?.data?.fullName,
          isVerifyEmail: res?.data?.isVerifyEmail,
          phone: res?.data?.phone,
          address: res?.data?.address,
          age: res?.data?.age,
          count: res?.data?.count,
          gender: res?.data?.sex === 0 ? "Nam" : "Nữ",
          type: res?.data?.type,
        })
      );
    }
  };

  async function handleConfirmEmail(id: string, userId: string) {
    try {
      setIsLoading(true);
      const res = await authenticateServices.handleConfirmEmail(id, userId);
      if (res.statusCode === 0) {
        // await getProfile();
        setIsVerified(true);
        setIsLoading(false);
      }
      console.log("res", res);
    } catch (error) {
      setIsLoading(false);
      notifications.show({
        title: "Xác nhận email thất bại",
        withBorder: true,
        radius: "lg",
        color: "red",
        message:
          "Có thể do email đã được xác nhận rồi hoặc đã truy cập sai đường link.",
      });
    }
  }

  return (
    <div className=" h-screen">
      <div className="flex justify-center">
        <div
          style={{ width: "700px" }}
          className="flex justify-center mt-36 gap-10 border border-gray-300 rounded-2xl p-10 shadow-md"
        >
          <div>
            <div className={cx("spinner")}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center gap-10">
            {!isVerified ? (
              <h1 className="text-3xl underline underline-offset-4 font-bold">
                Xác nhận địa chỉ email
              </h1>
            ) : (
              <h1 className="text-3xl text-blue-500  font-bold">
                Xác nhận thành công ✅✅✅
              </h1>
            )}

            {!isVerified ? (
              <div className="flex gap-4">
                <Button
                  loading={isLoading}
                  onClick={() =>
                    handleConfirmEmail(id as string, userId as string)
                  }
                  variant="filled"
                  size="md"
                  radius="md"
                >
                  Đồng ý
                </Button>
                <Link to={"/"}>
                  <Button variant="filled" size="md" color="red" radius="md">
                    Trang chủ
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <p className=" text-center text-lg italic break-words">
                  Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Bây giờ hãy quay
                  về trang chủ để đặt vé xem phim nhé!❤️❤️❤️
                </p>
                <div className="flex justify-center">
                  <a href={"/"}>
                    <Button variant="filled" size="md" radius="md">
                      Về trang chủ
                    </Button>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmailPage;
