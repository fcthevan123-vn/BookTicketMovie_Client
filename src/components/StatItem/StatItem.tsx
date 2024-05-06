import { Box, Text, ThemeIcon } from "@mantine/core";
import { TablerIconsProps } from "@tabler/icons-react";

type Props = {
  data: {
    icon: (props: TablerIconsProps) => JSX.Element;
    title: string;
    stat: string | number;
    color: string;
  };
};

function StatItem({ data }: Props) {
  const border = `1px solid var(--mantine-color-${data.color}-2)`;
  const bg = `var(--mantine-color-${data.color}-0)`;

  return (
    <Box
      //   bg={`${data.color}.1`}
      style={{
        border: border,
        background: bg,
      }}
      className={"py-6 px-6 rounded-lg shadow-md"}
    >
      <div className="flex w-full justify-between items-end">
        <div>
          <Text fw={500} c={`${data.color}.5`}>
            {data.title}
          </Text>
          <Text fw={900} c={`${data.color}.8`} mt={"sm"} size="30px">
            {data.stat}
          </Text>
        </div>

        <ThemeIcon variant="filled" radius="md" size="xl" color={data.color}>
          <data.icon style={{ width: "70%", height: "70%" }}></data.icon>
        </ThemeIcon>
      </div>
    </Box>
  );
}

export default StatItem;
