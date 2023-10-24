import { Button, Divider, Group, Paper, Radio, Text } from "@mantine/core";
import React from "react";
import { usePickSeatContext } from "../Provider/PickSeatProvider";
import { SeatTS } from "../../types";

type Props = {};

type SeatToPayProps = {
  dataSeat: SeatTS;
};

function SeatToPay({ dataSeat }: SeatToPayProps) {
  return (
    <div className="flex justify-between mb-3">
      <div>
        <Text size="sm">Ghế: {dataSeat.name}</Text>
        <Text size="sm" c={"dimmed"} ml={"xs"}>
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
  );
}

function PaymentPreview({}: Props) {
  const {
    seatNumberControl,
    isDisabledSeat,
    setIsDisabledSeat,
    seatSelected,
    dataRoom,
    setSeatSelected,
  } = usePickSeatContext();

  let calculatePrice;

  if (dataRoom) {
    calculatePrice = (
      (parseFloat(dataRoom?.priceMultiplier) - 1) *
      100
    ).toFixed(0);
  }

  // function CalculateTotalPriceSeat(allSeat: SeatTS[]) {
  //   let total;

  //   return total;
  // }

  // const priceSeat = CalculateTotalPriceSeat(seatSelected);
  // console.log("priceSeat", priceSeat);

  return (
    <div className="w-full">
      <Paper shadow="xs" radius="md" withBorder p="xs" w={"100%"}>
        {seatSelected.map((seat) => (
          <SeatToPay dataSeat={seat} key={seat.id}></SeatToPay>
        ))}
        <Divider my="sm" />
        <div className="flex justify-between mb-2">
          <Text size="sm" fw={500}>
            Giá tiền:
          </Text>
          <Text size="sm">123</Text>
        </div>
        <div className="flex justify-between mb-2">
          <Text size="sm" fw={500}>
            Phí VAT:
          </Text>
          <Text size="sm">10%</Text>
        </div>
        <div className="flex justify-between mb-2">
          <Text size="sm" fw={500}>
            Phòng {dataRoom?.name}:
          </Text>
          <Text size="sm">{calculatePrice}%</Text>
        </div>
        <div className="flex justify-between mb-2">
          <Text size="sm" fw={500}>
            Tổng giá tiền:
          </Text>
          <Text size="sm">123</Text>
        </div>
        <Divider my="sm" />
        <Radio.Group
          size="sm"
          name="paymentMethod"
          label="Chọn phương thức thanh toán"
          withAsterisk
          // px={"md"}
        >
          <Group mt="xs">
            <Radio value="offline" label="Trực tiếp" />
            <Radio value="online" label="Banking" />
          </Group>
        </Radio.Group>
        <div className="mt-4 flex justify-center">
          <Button size="compact-sm" variant="filled" radius="sm" fullWidth>
            Xác nhận thanh toán
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default PaymentPreview;
