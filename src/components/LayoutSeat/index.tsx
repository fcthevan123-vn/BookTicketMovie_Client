import { Box, Container, Paper, SimpleGrid, Text } from "@mantine/core";
import React from "react";
import Seat from "./Seat";
import classes from "./LayoutSeat.module.css";
type Props = {};

function LayoutSeat({}: Props) {
  const renderSeat = Array(47)
    .fill(0)
    .map((_, index) => <Seat key={index}></Seat>);

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <Paper
        shadow="xs"
        radius="md"
        withBorder
        p="xl"
        style={{
          width: "600px",
        }}
      >
        <SimpleGrid cols={10} spacing={"xs"}>
          {renderSeat}
        </SimpleGrid>

        <div className="mt-20 flex flex-col items-center">
          <div className={classes.screen}></div>
          <Text c={"dimmed"} size="sm">
            Màn hình ở phía này
          </Text>
        </div>
      </Paper>

      <Paper
        shadow="xs"
        radius="md"
        withBorder
        mt={"lg"}
        px="xl"
        py={"sm"}
        style={{
          width: "600px",
        }}
      >
        <div className="flex justify-center items-center gap-6">
          <div className="flex flex-col justify-center items-center gap-1">
            <Box
              className={classes.box}
              style={{
                background: "var(--mantine-color-gray-1)",
                border: "1px solid var(--mantine-color-blue-2)",
              }}
            ></Box>
            <Text size="xs" c={"dimmed"}>
              Có thể chọn
            </Text>
          </div>
          <div className="flex flex-col justify-center items-center gap-1">
            <Box
              className={classes.box}
              style={{
                background: "var(--mantine-color-blue-6)",
              }}
            ></Box>
            <Text size="xs" c={"dimmed"}>
              Đang chọn
            </Text>
          </div>
          <div className="flex flex-col justify-center items-center gap-1">
            <Box
              className={classes.box}
              style={{
                background: "var(--mantine-color-gray-4)",
              }}
            ></Box>
            <Text size="xs" c={"dimmed"}>
              Không thể chọn
            </Text>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default LayoutSeat;
