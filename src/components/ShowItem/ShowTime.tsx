import { Card, Select, Text, rem } from "@mantine/core";
import React from "react";

import classes from "./ShowTime.module.css";
import { modals } from "@mantine/modals";
import { IconChalkboard } from "@tabler/icons-react";
import LayoutSeat from "../LayoutSeat";

type Props = {};

function ShowTime({}: Props) {
  const titleCustom = (
    <div className="w-full flex justify-between px-20">
      <div className="flex gap-2 flex-col">
        <Text fw={700} size="xl" c={"white"}>
          Spider man
        </Text>
        <Text c={"white"} size="sm">
          Rap chieu 1 | Phong chieu 1 | 8:30 ~ 10:30 20/10/2023
        </Text>
      </div>
      <Select
        leftSection={
          <IconChalkboard
            style={{ width: rem(18), height: rem(18) }}
            stroke={1.5}
          />
        }
        w={120}
        allowDeselect={false}
        checkIconPosition="right"
        defaultValue={"1"}
        label="Số lượng ghế"
        radius="md"
        placeholder="Chọn số ghế"
        data={["1", "2", "3", "4"]}
        styles={{
          label: {
            color: "white",
          },
        }}
      />
    </div>
  );

  const openModal = () =>
    modals.open({
      title: titleCustom,
      fullScreen: true,
      radius: 0,
      children: <LayoutSeat></LayoutSeat>,
      styles: {
        header: {
          background: "var(--mantine-color-blue-5)",
        },
        body: {
          marginTop: "15px",
          //   height: "100%",
        },
        title: {
          width: "100%",
        },
        content: {
          background: "var(--mantine-color-gray-1)",
          //   height: "100%",
        },
      },
      transitionProps: {
        transition: "pop-top-left",
        duration: 300,
      },
      //   onClose: () => alert("Are you sure you want to close"),
    });

  return (
    <div>
      <Card
        shadow="sm"
        className={classes.card}
        padding="lg"
        radius="md"
        withBorder
        // onClick={open}
        onClick={openModal}
      >
        <Card.Section>
          <Text ta={"center"} py={15} size="md">
            08:30 ~ 10:40
          </Text>
        </Card.Section>

        <Card.Section
          style={{
            borderTop: "1px solid var(--mantine-color-gray-3)",
          }}
        >
          <Text size="sm" py={3} c={"dimmed"} ta={"center"}>
            110/120 ghế ngồi
          </Text>
        </Card.Section>
      </Card>
    </div>
  );
}

export default ShowTime;
