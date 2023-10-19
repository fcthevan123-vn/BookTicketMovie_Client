import axios from "axios";
import { ResDataNormal } from "../types";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";

export async function normalApi(
  api: Promise<ResDataNormal>,
  actionTitle: string
) {
  notifications.clean();
  try {
    const res = await api;
    if (res.statusCode === 0) {
      return res.data;
    }
    // return true;
  } catch (err) {
    console.log("err", err);
    if (axios.isAxiosError(err)) {
      if (err.response) {
        const errorMsg = err.response.data.message;
        notifications.show({
          title: actionTitle,
          message: errorMsg || "Đã có lỗi xảy ra",
          withBorder: true,
          autoClose: 4000,
          loading: false,
          icon: <IconX stroke={3} size="1rem" />,
          color: "red",
          radius: "lg",
        });
      } else {
        notifications.show({
          title: actionTitle,
          message: "Đã có lỗi từ phía server",
          withBorder: true,
          autoClose: 5000,
          loading: false,
          icon: <IconX stroke={3} size="1rem" />,
          color: "red",
          radius: "lg",
        });
      }
    } else {
      const errorWithMsg = err as { message?: string };
      const errorMsg = errorWithMsg.message || "Lỗi không xác định";
      notifications.show({
        autoClose: 5000,
        title: actionTitle,
        message: errorMsg,
        withBorder: true,
        icon: <IconX stroke={3} size="1rem" />,
        loading: false,
        color: "red",
        radius: "lg",
      });
    }
    // return false;
  }
}
