import {
  Blockquote,
  Divider,
  Grid,
  NumberFormatter,
  Paper,
  ScrollArea,
  Text,
} from "@mantine/core";
import { usePickSeatContext } from "../Provider/PickSeatProvider";
import { RoomType, SeatTS } from "../../types";
import moment from "moment";

type SeatToPayProps = {
  dataSeat: SeatTS;
  dataRoomType: RoomType;
  date: string;
};

function SeatToPay({ dataSeat, dataRoomType, date }: SeatToPayProps) {
  console.log("dataSeat", dataSeat, dataRoomType);

  function CalculateTotalPriceSeat(
    dataSeat: SeatTS,
    dataRoomType: RoomType,
    date: string
  ) {
    const weekday = moment(date).format("dddd");

    const isWeekend = weekday === "thứ bảy" || weekday === "chủ nhật";

    let total = 0;

    if (isWeekend) {
      const price = dataSeat.SeatType.price + dataRoomType.priceHoliday[1];
      total += price;
    } else {
      const price = dataSeat.SeatType.price + dataRoomType.priceNormal[1];
      total += price;
    }

    return total;
  }

  return (
    <Blockquote
      radius="lg"
      p={"xs"}
      style={{
        boxShadow: "var(--mantine-shadow-xs)",
        borderLeft: "8px solid var(--mantine-color-pink-5)",
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
            {/* {dataSeat.SeatType.price.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })} */}
            <NumberFormatter
              value={CalculateTotalPriceSeat(dataSeat, dataRoomType, date)}
              suffix=" VND"
              thousandSeparator
            ></NumberFormatter>
          </Text>
        </div>
      </div>
    </Blockquote>
  );
}

function TicketPreview() {
  const { dataTotal, seatSelected, allPrice, paymentMethod, discount } =
    usePickSeatContext();

  return (
    <div>
      <Paper shadow="sm" radius="lg" withBorder p="xs">
        <Grid>
          <Grid.Col span={5}>
            <Paper
              shadow="xl"
              radius="md"
              withBorder
              h={"100%"}
              className="bg-gradient-to-tr from-violet-500 to-orange-300"
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
                  Thời gian chiếu: <br></br>
                  {moment(dataTotal?.startTime).format("hh:mm DD/MM")} -{" "}
                  {moment(dataTotal?.endTime).format("hh:mm DD/MM")}
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
                <SeatToPay
                  dataSeat={seat}
                  key={seat.id}
                  dataRoomType={dataTotal?.MovieHall.RoomType as RoomType}
                  date={dataTotal?.date as string}
                ></SeatToPay>
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

            {discount.nameDiscount && (
              <div className="flex justify-between mb-2">
                <div>
                  <Text size="sm" fw={500}>
                    Mã giảm giá:
                  </Text>

                  <Text size="xs" c={"dimmed"} ml={"xs"}>
                    {discount.nameDiscount}
                  </Text>
                </div>

                <Text size="sm">
                  {/* -{allPrice.originalPrice} */}-
                  {(
                    (allPrice.originalPrice * discount.percentDiscount) /
                    100
                  ).toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </Text>
              </div>
            )}

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
              <Text size="sm">
                {paymentMethod == "direct" ? "Trực tiếp" : "Online - VN Pay"}
              </Text>
            </div>
          </Grid.Col>
        </Grid>
      </Paper>
    </div>
  );
}

export default TicketPreview;
