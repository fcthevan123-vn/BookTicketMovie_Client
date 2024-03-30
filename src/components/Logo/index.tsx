import { ActionIcon, Group, Text } from "@mantine/core";

import { BiMoviePlay } from "react-icons/bi";

type Props = {
  size: string;
  radius: string;
};

const Logo = ({ size, radius }: Props) => {
  return (
    <Group
      justify="center"
      gap="xs"
      style={{
        // border: "1px solid var(--mantine-color-gray-4)",
        backgroundColor: "var(--mantine-color-pink-4)",
        borderRadius: "var(--mantine-radius-lg)",
        padding: "5px 16px",
        boxShadow: "var(--mantine-shadow-xs)",
      }}
    >
      <ActionIcon color="pink" size={size} radius={radius} variant="filled">
        <BiMoviePlay style={{ width: "70%", height: "70%" }} stroke={"1.5"} />
      </ActionIcon>
      <Text size="xs" c={"white"}>
        Show Booking
      </Text>
    </Group>
  );
};

export default Logo;
