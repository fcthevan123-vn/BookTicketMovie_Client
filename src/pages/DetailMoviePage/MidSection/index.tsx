import {
  Badge,
  Divider,
  Paper,
  ScrollArea,
  SegmentedControl,
  SimpleGrid,
} from "@mantine/core";

import Comment from "../../../components/Comment";

import ChartCustom from "../../../components/ChartCustom";

type Props = {};

function MidSection({}: Props) {
  return (
    <div className=" p-3">
      <SimpleGrid cols={2} verticalSpacing="xs">
        <Paper shadow="xs" radius="md" withBorder p="sm">
          <div>
            <div className="flex justify-between items-center">
              <Badge variant="dot" color="orange">
                Tất cả đánh giá
              </Badge>

              {/* <Badge variant="filled" color="orange">
                Bộ lọc
              </Badge> */}
              <SegmentedControl
                size="xs"
                radius={"lg"}
                color="orange"
                data={[
                  {
                    value: "all",
                    label: "Tất cả đánh giá",
                  },
                  {
                    value: "forMe",
                    label: "Đánh giá của bạn",
                  },
                ]}
              />
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
            <div className="flex justify-between items-center">
              <Badge variant="dot" color="blue">
                Thống kê nhanh
              </Badge>
              <SegmentedControl
                size="xs"
                radius={"lg"}
                color="blue"
                data={[
                  {
                    value: "all",
                    label: "Theo độ tuổi",
                  },
                  {
                    value: "forMe",
                    label: "Theo giới tính",
                  },
                ]}
              />
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
