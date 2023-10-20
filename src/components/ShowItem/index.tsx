import {
  ActionIcon,
  Badge,
  Button,
  Divider,
  Grid,
  HoverCard,
  Paper,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { IconAdjustments, IconDotsVertical } from "@tabler/icons-react";
import React from "react";
import ShowTime from "./ShowTime";

type Props = {};

function ShowItem({}: Props) {
  const showTimeRender = (
    <Grid px={"md"} py={10}>
      <Grid.Col span={2}>
        <div>
          <Text>Phong 2D</Text>
        </div>
      </Grid.Col>
      <Grid.Col span={10}>
        <SimpleGrid cols={5}>
          <ShowTime></ShowTime>
          <ShowTime></ShowTime>
          <ShowTime></ShowTime>
          <ShowTime></ShowTime>
          <ShowTime></ShowTime>
          <ShowTime></ShowTime>
          <ShowTime></ShowTime>
        </SimpleGrid>
      </Grid.Col>
    </Grid>
  );

  return (
    <Paper
      withBorder
      shadow="xs"
      radius="md"
      p="lg"
      styles={{
        root: {
          borderLeft: "8px solid var(--mantine-color-orange-6)",
        },
      }}
    >
      <div className="flex items-center gap-2">
        <Badge variant="light" p={"sm"} radius="xl">
          <Text fw={500} size="sm" tt="capitalize">
            Rap chieu 1
          </Text>
        </Badge>
        <HoverCard width={280} shadow="md">
          <HoverCard.Target>
            <ActionIcon
              variant="light"
              size="sm"
              radius="md"
              aria-label="Settings"
            >
              <IconDotsVertical
                style={{ width: "70%", height: "70%" }}
                stroke={1.5}
              />
            </ActionIcon>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text size="sm">Chi tiet rap chieu phim</Text>
          </HoverCard.Dropdown>
        </HoverCard>
      </div>

      <div className="flex flex-col gap-2">
        {showTimeRender}
        <Divider my="sm" size={"sm"} mx={"lg"} />
        {showTimeRender}
      </div>
    </Paper>
  );
}

export default ShowItem;
