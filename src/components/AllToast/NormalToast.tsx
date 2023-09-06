import { notifications } from "@mantine/notifications";

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
    styles: () => ({
      root: {
        "&::before": { width: "9px" },
      },
    }),
    color: color,
    radius: "md",
  });
};

export default NormalToast;
