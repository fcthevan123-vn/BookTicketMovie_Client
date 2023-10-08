import { Badge, Divider, Paper, ScrollArea, SimpleGrid } from "@mantine/core";
import React from "react";
import Comment from "../../../components/Comment";
import ProgressCustom from "../../../components/ChartCustom";
import ChartCustom from "../../../components/ChartCustom";

type Props = {};

function MidSection({}: Props) {
  return (
    <div className=" p-3 mt-16 ">
      <SimpleGrid cols={2} spacing="xs" verticalSpacing="xs">
        <Paper shadow="xs" radius="md" withBorder p="sm">
          <div>
            <div className="flex justify-between">
              <Badge variant="dot" color="orange">
                Tất cả đánh giá
              </Badge>

              <Badge variant="filled" color="orange">
                Bộ lọc
              </Badge>
            </div>

            <Divider my="sm" />
            <ScrollArea h={400} type="always" scrollbarSize={4}>
              <div className="flex justify-start gap-6 flex-col">
                <Comment></Comment>
                <Comment></Comment>

                <Comment></Comment>
                <Comment></Comment>
                <Comment></Comment>
                <Comment></Comment>
                <Comment></Comment>
                <Comment></Comment>
                <Comment></Comment>
                <Comment></Comment>
              </div>
            </ScrollArea>
          </div>
        </Paper>
        <Paper shadow="xs" radius="md" withBorder p="sm">
          <div>
            <div className="flex justify-between">
              <Badge variant="dot" color="blue">
                Thống kê nhanh
              </Badge>
            </div>

            <Divider my="sm" />
            <ScrollArea h={400} type="always" scrollbarSize={4}>
              <div className="flex justify-start gap-6 flex-col">
                <ChartCustom></ChartCustom>
              </div>
            </ScrollArea>
          </div>
        </Paper>
      </SimpleGrid>
    </div>
  );
}

export default MidSection;
