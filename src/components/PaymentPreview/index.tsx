import {
  ActionIcon,
  Alert,
  Button,
  Divider,
  Group,
  Paper,
  Radio,
  ScrollArea,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { usePickSeatContext } from "../Provider/PickSeatProvider";
import { RoomType, SeatTS } from "../../types";
import ModalConfirmBook from "../Modals/ModalConfirmBook";
import { IconAlertCircle, IconCheck } from "@tabler/icons-react";
import { useInputState } from "@mantine/hooks";
import { discountServices } from "../../services";
import moment from "moment";
import { modals } from "@mantine/modals";

type SeatToPayProps = {
  dataSeat: SeatTS;
  dataRoomType: RoomType;
  date: string;
};

function SeatToPay({ dataSeat, dataRoomType, date }: SeatToPayProps) {
  const weekday = moment(date).format("dddd");

  const isWeekend = weekday === "thứ bảy" || weekday === "chủ nhật";

  const price = useMemo(() => {
    if (isWeekend) {
      return (
        dataSeat.SeatType.price + dataRoomType.priceHoliday[1]
      ).toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      });
    } else {
      return (
        dataSeat.SeatType.price + dataRoomType.priceNormal[1]
      ).toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      });
    }
  }, [
    dataRoomType.priceHoliday,
    dataRoomType.priceNormal,
    dataSeat.SeatType.price,
    isWeekend,
  ]);

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
          {/* {dataSeat.SeatType.price.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })} */}

          {/* {dataSeat.SeatType.price + dataRoomType.priceNormal[1]} */}
          {price}
        </Text>
      </div>
    </div>
  );
}

function PaymentPreview() {
  const {
    seatSelected,
    dataTotal,
    allPrice,
    discount,
    setAllPrice,
    paymentMethod,
    setPaymentMethod,
    setDiscount,
  } = usePickSeatContext();
  const [valueDiscount, setValueDiscount] = useInputState<string>("");
  const [discountStatus, setDiscountStatus] = useState<ReactElement>();
  const [openModalConfirm, setOpenModalConfirm] = useState(false);

  const openConfirmBook = (setOpenModalConfirm: () => void) =>
    modals.openConfirmModal({
      title: (
        <Text fw={600} size="lg" c={"violet"}>
          Xác nhận đặt vé
        </Text>
      ),
      size: "lg",
      children: (
        <Alert
          variant="light"
          color="red"
          radius="md"
          title={<Text fw={900}>Cảnh báo không thể huỷ vé</Text>}
          icon={<IconAlertCircle></IconAlertCircle>}
        >
          <Text>
            Hệ thống của chúng tôi không xử lý việc yêu cầu huỷ vé của người
            dùng dưới bất kể lý do nào. Hãy kiểm tra chắc chắn sau đó mới nhấn
            xác nhận.
          </Text>
        </Alert>
      ),
      overlayProps: {
        backgroundOpacity: 0.55,
        blur: 5,
      },
      confirmProps: {
        size: "xs",
        radius: "md",
      },
      cancelProps: {
        size: "xs",
        radius: "md",
      },
      radius: "lg",
      lockScroll: false,
      centered: true,
      labels: { confirm: "Đồng ý", cancel: "Huỷ" },
      onCancel: () => console.log("Cancel"),
      onConfirm: setOpenModalConfirm,
    });

  // let totalPrice: number | undefined = undefined;

  function CalculateTotalPriceSeat(
    allSeat: SeatTS[],
    dataRoomType: RoomType,
    date: string
  ) {
    const weekday = moment(date).format("dddd");

    const isWeekend = weekday === "thứ bảy" || weekday === "chủ nhật";

    let total = 0;
    if (allSeat.length > 0) {
      for (const seat of allSeat) {
        if (isWeekend) {
          const price = seat.SeatType.price + dataRoomType.priceHoliday[1];
          total += price;
        } else {
          const price = seat.SeatType.price + dataRoomType.priceNormal[1];
          total += price;
        }
      }
    }

    return total;
  }

  // const priceSeat = CalculateTotalPriceSeat(seatSelected, dataTotal);

  const priceSeat = useMemo(() => {
    return CalculateTotalPriceSeat(
      seatSelected,
      dataTotal?.MovieHall.RoomType as RoomType,
      dataTotal?.date ? dataTotal.date : "18/05/2002"
    );
  }, [dataTotal, seatSelected]);

  // if (calculatePrice) {
  //   totalPrice = priceSeat + (calculatePrice * priceSeat) / 100;
  // }

  async function validateDiscount(nameDiscount: string) {
    if (nameDiscount.length > 0) {
      const res = await discountServices.checkValidDiscount(nameDiscount);
      if (res.statusCode === 0 && res.isValid) {
        setDiscountStatus(
          <span className="text-xs">
            -{res.data.percentDiscount}% | Còn lại: {res.data.quantity}
          </span>
        );
        setDiscount({
          percentDiscount: res.data.percentDiscount,
          nameDiscount: res.data.nameDiscount,
        });
      } else {
        setDiscount({
          percentDiscount: 0,
          nameDiscount: "",
        });
        setDiscountStatus(
          <span className="text-red-500 italic text-xs">{res.message}</span>
        );
      }
    } else {
      setDiscountStatus(<></>);
      setDiscount({
        percentDiscount: 0,
        nameDiscount: "",
      });
    }
  }

  useEffect(() => {
    if (priceSeat) {
      setAllPrice({
        originalPrice: priceSeat,
        typeRoomPrice: 0,
        totalPrice: priceSeat,
        originalTotalPrice: priceSeat,
      });
    }
  }, [priceSeat, setAllPrice]);

  return (
    <div className="w-full">
      {/* Modal confirm */}

      <ModalConfirmBook
        opened={openModalConfirm}
        close={() => setOpenModalConfirm(false)}
      ></ModalConfirmBook>
      <Paper shadow="xs" radius="md" withBorder p="xs" w={"100%"}>
        <ScrollArea.Autosize mah={320} offsetScrollbars scrollbarSize={6}>
          {seatSelected.map((seat) => (
            <SeatToPay
              dataRoomType={dataTotal?.MovieHall?.RoomType as RoomType}
              date={dataTotal?.date as string}
              dataSeat={seat}
              key={seat.id}
            ></SeatToPay>
          ))}
        </ScrollArea.Autosize>

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

        {/* <div className="flex justify-between mb-2">
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
        </div> */}
        {/* Discount */}
        <div className=" mb-2">
          <div className="flex justify-between">
            <div>
              <Text size="sm" fw={500}>
                Mã giảm giá:
              </Text>
            </div>

            <Text size="sm">
              -
              {discount.nameDiscount &&
                ((discount.percentDiscount * priceSeat) / 100).toLocaleString(
                  "it-IT",
                  {
                    style: "currency",
                    currency: "VND",
                  }
                )}
            </Text>
          </div>

          <TextInput
            radius="md"
            size="xs"
            value={valueDiscount}
            onChange={setValueDiscount}
            description={discountStatus}
            placeholder="Nhập MGG nếu có"
            disabled={discount.nameDiscount.length > 0 && true}
            rightSection={
              <Tooltip label="Áp dụng MGG" withArrow>
                <ActionIcon
                  disabled={discount.nameDiscount.length > 0 && true}
                  onClick={() => validateDiscount(valueDiscount)}
                >
                  <IconCheck size={19} />
                </ActionIcon>
              </Tooltip>
            }
          />
        </div>

        <div className="flex justify-between mb-2">
          <Text size="sm" fw={500}>
            Tổng giá tiền:
          </Text>
          <Text size="sm">
            {allPrice &&
              allPrice.totalPrice.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
          </Text>
        </div>
        <Divider my="sm" />
        <Radio.Group
          size="sm"
          name="paymentMethod"
          label="Phương thức thanh toán"
          withAsterisk
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e)}
        >
          <Group mt="xs">
            {/* <Radio value="direct" label="Trực tiếp" /> */}
            <Radio value="online" label="Online - VN Pay" />
          </Group>
        </Radio.Group>

        <div className="mt-4 flex justify-center">
          <Button
            // onClick={() => setOpenModalConfirm(true)}
            onClick={() => openConfirmBook(() => setOpenModalConfirm(true))}
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
