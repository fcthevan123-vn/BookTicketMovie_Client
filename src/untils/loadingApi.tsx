import axios from "axios";
import { ResData } from "../types";
import { notifications } from "@mantine/notifications";
import { IconChecks, IconX } from "@tabler/icons-react";

export async function loadingApi(api: Promise<ResData>, actionTitle: string) {
  notifications.clean();
  notifications.show({
    id: "load-data",
    loading: true,
    radius: "lg",
    title: "Loading...",
    message: "It can take some minutes",
    withBorder: true,
    styles: () => ({
      root: {
        "&::before": { width: "8px" },
      },
    }),
  });
  try {
    const res = await api;
    if (res.statusCode === 0) {
      notifications.update({
        id: "load-data",
        title: actionTitle,
        message: res.message || "Thực hiện thành công",
        withBorder: true,
        styles: () => ({
          root: {
            "&::before": { width: "7px" },
          },
        }),
        icon: <IconChecks size="1rem" />,
        color: "blue",
        radius: "lg",
      });
    }
    return true;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response) {
        const errorMsg = err.response.data.message;
        notifications.update({
          id: "load-data",
          title: actionTitle,
          message: errorMsg || "Đã có lỗi xảy ra",
          withBorder: true,
          styles: () => ({
            root: {
              "&::before": { width: "7px" },
            },
          }),
          icon: <IconX stroke={3} size="1rem" />,
          color: "red",
          radius: "lg",
        });
      } else {
        notifications.update({
          id: "load-data",
          title: actionTitle,
          message: "Đã có lỗi từ phía server",
          withBorder: true,
          styles: () => ({
            root: {
              "&::before": { width: "7px" },
            },
          }),
          icon: <IconX stroke={3} size="1rem" />,
          color: "red",
          radius: "lg",
        });
      }
    } else {
      const errorWithMsg = err as { message?: string };
      const errorMsg = errorWithMsg.message || "Lỗi không xác định";
      notifications.update({
        id: "load-data",
        title: actionTitle,
        message: errorMsg,
        withBorder: true,
        icon: <IconX stroke={3} size="1rem" />,
        styles: () => ({
          root: {
            "&::before": { width: "7px" },
          },
        }),
        color: "red",
        radius: "lg",
      });
    }
    return false;
  }
}
