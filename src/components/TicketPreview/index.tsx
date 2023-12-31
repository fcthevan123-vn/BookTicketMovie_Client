import {
  Blockquote,
  Divider,
  Grid,
  Paper,
  ScrollArea,
  Text,
} from "@mantine/core";
import React from "react";
import { usePickSeatContext } from "../Provider/PickSeatProvider";
import { SeatTS } from "../../types";
import moment from "moment";
import { IconInfoCircle } from "@tabler/icons-react";

type Props = {};

type SeatToPayProps = {
  dataSeat: SeatTS;
};

function SeatToPay({ dataSeat }: SeatToPayProps) {
  return (
    <Blockquote
      color="blue"
      radius="lg"
      p={"xs"}
      style={{
        boxShadow: "var(--mantine-shadow-xs)",
        borderLeft: "5px solid var(--mantine-color-blue-6)",
      }}
      my="sm"
      iconSize={39}
      //   icon={<IconInfoCircle></IconInfoCircle>}
    >
      <div className="flex  justify-between mb-3">
        <div>
          <Text size="sm">Ghế: {dataSeat.name}</Text>
          <Text size="xs" c={"dimmed"} ml={"xs"}>
            {dataSeat.SeatType.name}
          </Text>
        </div>

        <div>
          <Text size="sm">
            {dataSeat.SeatType.price.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </Text>
        </div>
      </div>
    </Blockquote>
  );
}

function TicketPreview({}: Props) {
  const { dataTotal, seatSelected, allPrice } = usePickSeatContext();

  return (
    <div>
      {/* {console.log("seatSelected", seatSelected)} */}

      <Paper shadow="sm" radius="lg" withBorder p="xs">
        <Grid>
          <Grid.Col span={5}>
            <Paper
              shadow="xl"
              // style={{
              //   background: "var(--mantine-color-blue-5)",
              // }}
              radius="md"
              withBorder
              h={"100%"}
              className="bg-gradient-to-r from-sky-500 to-green-500"
              p="sm"
            >
              <div className="flex gap-1 flex-col h-full justify-center">
                <Text size="lg" c={"white"} fw={500}>
                  {dataTotal?.Movie?.title}
                </Text>
                <Divider
                  opacity={0.7}
                  color={"white"}
                  my={5}
                  mx={"sm"}
                  size="xs"
                ></Divider>
                <Text c={"white"} size="sm" fw={200}>
                  Thời lượng: {dataTotal?.Movie?.duration} phút
                </Text>
                <Text c={"white"} size="sm" fw={200}>
                  Ngôn ngữ: {dataTotal?.Movie?.language}
                </Text>
                <Text c={"white"} size="sm" fw={200}>
                  Phụ đề: {dataTotal?.Movie?.subtitle}
                </Text>
                <Text c={"white"} size="sm" fw={200}>
                  Độ tuổi yêu cầu: {dataTotal?.Movie?.ageRequire}
                </Text>
                <Divider
                  opacity={0.7}
                  color={"white"}
                  my={5}
                  mx={"sm"}
                  size="xs"
                ></Divider>
                <Text c={"white"} size="sm" fw={200}>
                  Thời gian chiếu: {dataTotal?.startTime} - {dataTotal?.endTime}
                </Text>
                <Text c={"white"} size="sm" fw={200}>
                  {dataTotal?.MovieHall.name}
                </Text>
                <Text c={"white"} size="sm" fw={200}>
                  {dataTotal?.MovieHall.Cinema.name}
                </Text>
              </div>
            </Paper>
          </Grid.Col>
          <Grid.Col span={7}>
            <ScrollArea h={220} type="always" scrollbarSize={6}>
              {seatSelected.map((seat) => (
                <SeatToPay dataSeat={seat} key={seat.id}></SeatToPay>
              ))}
            </ScrollArea>

            <Divider my="sm" />
            <div className="flex justify-between mb-2">
              <Text size="sm" fw={500}>
                Giá tiền gốc:
              </Text>
              <Text size="sm">
                {allPrice.originalPrice.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </Text>
            </div>
            <div className="flex justify-between mb-2">
              <div>
                <Text size="sm" fw={500}>
                  Phí VAT:
                </Text>

                <Text size="xs" c={"dimmed"} ml={"xs"}>
                  10%
                </Text>
              </div>

              <Text size="sm">
                {allPrice.vatPrice.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </Text>
            </div>
            <div className="flex justify-between mb-2">
              <div>
                <Text size="sm" fw={500}>
                  Phòng {dataTotal?.MovieHall?.name}:
                </Text>

                <Text size="xs" c={"dimmed"} ml={"xs"}>
                  {allPrice.typeRoomPrice}%
                </Text>
              </div>

              <Text size="sm">
                {(
                  (allPrice.originalPrice * allPrice.typeRoomPrice) /
                  100
                ).toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </Text>
            </div>
            <div className="flex justify-between mb-2">
              <Text size="sm" fw={500}>
                Tổng giá tiền:
              </Text>
              <Text size="sm">
                {allPrice.totalPrice.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </Text>
            </div>

            <div className="flex justify-between mb-2">
              <Text size="sm" fw={500}>
                Phương thức thanh toán:
              </Text>
              <Text size="sm">Trực tiếp</Text>
            </div>
          </Grid.Col>
        </Grid>
      </Paper>
    </div>
  );
}

export default TicketPreview;
