import { Button, Divider, Group, Paper, Radio, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { usePickSeatContext } from "../Provider/PickSeatProvider";
import { SeatTS } from "../../types";
import ModalConfirmBook from "../Modals/ModalConfirmBook";

type Props = {};

type SeatToPayProps = {
  dataSeat: SeatTS;
};

function SeatToPay({ dataSeat }: SeatToPayProps) {
  return (
    <div className="flex justify-between mb-3">
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
  );
}

function PaymentPreview({}: Props) {
  const { seatSelected, dataTotal, setAllPrice } = usePickSeatContext();

  const [openModalConfirm, setOpenModalConfirm] = useState(false);

  let calculatePrice: number | undefined = undefined;
  let totalPrice: number | undefined = undefined;

  if (dataTotal) {
    calculatePrice = parseInt(
      (
        (parseFloat(dataTotal.MovieHall.RoomType.priceMultiplier) - 1) *
        100
      ).toFixed(0)
    );
  }

  function CalculateTotalPriceSeat(allSeat: SeatTS[]) {
    let total = 0;
    if (allSeat.length > 0) {
      for (const seat of allSeat) {
        total += seat.SeatType.price;
      }
    }

    return total;
  }

  const priceSeat = CalculateTotalPriceSeat(seatSelected);

  if (calculatePrice) {
    totalPrice =
      priceSeat + (priceSeat * 10) / 100 + (calculatePrice * priceSeat) / 100;
  }

  useEffect(() => {
    if (calculatePrice && totalPrice && priceSeat) {
      setAllPrice({
        originalPrice: priceSeat,
        vatPrice: (priceSeat * 10) / 100,
        typeRoomPrice: calculatePrice,
        totalPrice: totalPrice,
      });
    }
  }, [calculatePrice, priceSeat, setAllPrice, totalPrice]);

  return (
    <div className="w-full">
      {/* Modal confirm */}
      <ModalConfirmBook
        opened={openModalConfirm}
        close={() => setOpenModalConfirm(false)}
      ></ModalConfirmBook>
      <Paper shadow="xs" radius="md" withBorder p="xs" w={260}>
        {seatSelected.map((seat) => (
          <SeatToPay dataSeat={seat} key={seat.id}></SeatToPay>
        ))}
        <Divider my="sm" />
        <div className="flex justify-between mb-2">
          <Text size="sm" fw={500}>
            Giá tiền gốc:
          </Text>
          <Text size="sm">
            {priceSeat.toLocaleString("it-IT", {
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
            {((priceSeat * 10) / 100).toLocaleString("it-IT", {
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
              {calculatePrice}%
            </Text>
          </div>

          <Text size="sm">
            {" "}
            {calculatePrice &&
              ((priceSeat * calculatePrice) / 100).toLocaleString("it-IT", {
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
            {totalPrice &&
              totalPrice.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
          </Text>
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
            <Radio value="online" disabled label="Banking" />
          </Group>
        </Radio.Group>
        <div className="mt-4 flex justify-center">
          <Button
            onClick={() => setOpenModalConfirm(true)}
            size="compact-sm"
            variant="filled"
            radius="md"
            fullWidth
          >
            Thanh toán
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default PaymentPreview;
