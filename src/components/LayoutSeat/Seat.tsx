import { Box, Chip, Text } from "@mantine/core";
import React from "react";
import classes from "./Seat.module.css";
type Props = {};

function Seat({}: Props) {
  return (
    <div>
      {/* <Box className={classes.box}>
        <Text size="sm">1</Text>
      </Box> */}
      <Chip
        radius="md"
        size="xs"
        styles={{
          label: {
            width: "40px",
            height: "40px",
            border: "1px solid var(--mantine-color-blue-2)",
          },
        }}
      >
        1
      </Chip>
    </div>
  );
}

export default Seat;
