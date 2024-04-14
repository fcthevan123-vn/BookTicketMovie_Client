import { rem } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconBell } from "@tabler/icons-react";

type Props = {
  title: string;
  message: string;
  color: string;
};

const NormalToast = ({ title, message, color }: Props) => {
  return notifications.show({
    title: title,
    message: message,
    withBorder: true,
    color: color,
    radius: "lg",
    icon: <IconBell style={{ width: rem(20), height: rem(20) }} />,
  });
};

export const ErrToast = (err: Error, title: string) => {
  const errMsg = err.message;
  return notifications.show({
    title: title,
    message: errMsg,
    withBorder: true,
    color: "red",
    radius: "lg",
    icon: <IconBell style={{ width: rem(20), height: rem(20) }} />,
  });
};

export default NormalToast;
