import { ActionIcon, Badge, Select, Text, Tooltip } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import bookingServices from "../../../services/bookingServices";
import NormalToast from "../../../components/AllToast/NormalToast";
import { BookingTypeTS } from "../../../types";
import { useTableCustom } from "../../../components/Provider/TableFilterProvider";
import moment from "moment";
import { IconCheck, IconX } from "@tabler/icons-react";
import TableFilter from "../../../components/TableFilter";
import { useAuthenticate } from "../../../hooks";
import { loadingApi } from "../../../untils/loadingApi";
import { modals } from "@mantine/modals";

function ManageBookingPage() {
  const [statusBooking, setStatusBooking] = useState("Tất cả");
  const [data, setData] = useState<BookingTypeTS[]>([]);
  const [, , dataUser] = useAuthenticate();
  const { setRows, headers, setHeaders, setIsLoading } = useTableCustom();

  const getBooking = useCallback(async () => {
    try {
      const res = await bookingServices.getBookingByStatus(statusBooking);
      if (res.statusCode === 0) {
        setData(res.data);
      }
    } catch (error) {
      const err = error as Error;
      NormalToast({
        title: "getBooking",
        message: err.message,
        color: "red",
      });
    }
  }, [statusBooking]);

  const openConfirm = (idBooking: string, status: string, message: string) =>
    modals.openConfirmModal({
      title: <p className="text-orange-500 font-semibold">{message}</p>,
      radius: "lg",
      children: (
        <Text size="sm">Bạn có chắc chắn muốn {message} này không?</Text>
      ),
      confirmProps: {
        radius: "md",
        color: "orange",
      },
      cancelProps: { radius: "md" },
      labels: { confirm: "Xác nhận", cancel: "Huỷ" },

      onConfirm: () => updateBooking(status, idBooking, dataUser.id),
    });

  async function updateBooking(
    status: string,
    idBooking: string,
    staffId: string
  ) {
    try {
      const dataPass = {
        bookingId: idBooking,
        staffId: staffId,
        status: status,
      };
      setIsLoading(true);
      const api = bookingServices.updateBooking(dataPass);
      const res = await loadingApi(api, "Cập nhật vé");

      if (res) {
        getBooking();
      }
      setIsLoading(false);
      return res;
    } catch (error) {
      const err = error as Error;
      NormalToast({
        title: "Cập nhật vé",
        message: err.message,
        color: "red",
      });
    }
  }

  useEffect(() => {
    getBooking();
  }, [getBooking]);

  useEffect(() => {
    if (data) {
      const rowRender = data.map((row, index) => {
        return {
          number: <Text fz="sm">{index + 1}</Text>,
          movieDetail: (
            <div>
              <Text fz="sm" fw={500}>
                {row.Show?.Movie?.title}
              </Text>
              <Text fz="xs" c={"dimmed"}>
                {row.Show?.Movie?.genre.join(" - ")}
              </Text>
              <Text fz="xs" c={"dimmed"}>
                {row.Show?.Movie?.duration} phút
              </Text>
            </div>
          ),
          RoomType: (
            <div>
              <Text fz="sm" fw={500}>
                Phòng: {row.Show?.MovieHall?.name}
              </Text>
              <Text fz="xs" c={"dimmed"}>
                Rạp: {row.Show?.MovieHall?.Cinema?.name}
              </Text>
              <Text fz="xs" c={"dimmed"}>
                Kiểu phòng: {row.Show?.MovieHall?.RoomType?.name}
              </Text>
            </div>
          ),
          timeShow: (
            <div>
              <Text fz="sm">Bắt đầu: {row.Show?.startTime}</Text>
              <Text fz="sm">Kết thúc: {row.Show?.endTime}</Text>
              <Text fz="sm">
                Ngày: {moment(row.Show?.date).format("DD/MM/YYYY")}
              </Text>
            </div>
          ),
          seat: (
            <div>
              {row.SeatStatuses.map((seat) => (
                <div key={seat.id}>
                  <Text fz="sm">Số ghế: {seat?.Seat?.name}</Text>
                </div>
              ))}
            </div>
          ),
          totalPrice: (
            <div>
              <Text fz="sm">
                {row.totalPrice.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </Text>
            </div>
          ),
          orderedDate: (
            <div>
              <Text fz="sm">{moment(row.createdAt).format("DD/MM/YYYY")}</Text>
            </div>
          ),
          user: (
            <div>
              <Text fz="sm" fw={500}>
                {row.User?.fullName}
              </Text>
              <Text fz="xs" c={"dimmed"}>
                {row.User?.phone}
              </Text>
              <Text fz="xs" c={"dimmed"}>
                {row.User?.email}
              </Text>
            </div>
          ),
          status: (
            <div>
              <Badge
                radius={"md"}
                tt="capitalize"
                size="md"
                color={
                  row.status === "Đã huỷ"
                    ? "red"
                    : row.status === "Chưa thanh toán"
                    ? "orange"
                    : row.status === "Đã xác nhận"
                    ? "violet"
                    : row.status === "Đã thanh toán"
                    ? "green"
                    : "blue"
                }
              >
                {row?.status}
              </Badge>
            </div>
          ),
          action: (
            <div className="flex gap-3">
              {row.status == "Chờ xác nhận" ? (
                <Tooltip label="Xác nhận">
                  <ActionIcon
                    variant="filled"
                    color={"violet"}
                    size="sm"
                    onClick={() =>
                      openConfirm(row.id, "Đã xác nhận", "Xác nhận đặt vé")
                    }
                    radius={"md"}
                    aria-label="Settings"
                  >
                    <IconCheck
                      style={{ width: "80%", height: "80%" }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                </Tooltip>
              ) : null}

              {row.status == "Chờ xác nhận" ? (
                <Tooltip label="Huỷ vé">
                  <ActionIcon
                    variant="filled"
                    color={"red"}
                    size="sm"
                    onClick={() =>
                      openConfirm(row.id, "Đã huỷ", "Xác nhận huỷ vé")
                    }
                    radius={"md"}
                    aria-label="Settings"
                  >
                    <IconX
                      style={{ width: "80%", height: "80%" }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                </Tooltip>
              ) : null}

              {row.status == "Đã xác nhận" ? (
                <>
                  <Tooltip label="Xác nhận thanh toán">
                    <ActionIcon
                      variant="filled"
                      color={"green"}
                      size="sm"
                      onClick={() =>
                        openConfirm(
                          row.id,
                          "Đã thanh toán",
                          "Xác nhận thanh toán"
                        )
                      }
                      radius={"md"}
                      aria-label="Settings"
                    >
                      <IconCheck
                        style={{ width: "80%", height: "80%" }}
                        stroke={1.5}
                      />
                    </ActionIcon>
                  </Tooltip>

                  <Tooltip label="Huỷ vé">
                    <ActionIcon
                      variant="filled"
                      color={"red"}
                      size="sm"
                      onClick={() =>
                        openConfirm(row.id, "Đã huỷ", "Xác nhận huỷ vé")
                      }
                      radius={"md"}
                      aria-label="Settings"
                    >
                      <IconX
                        style={{ width: "80%", height: "80%" }}
                        stroke={1.5}
                      />
                    </ActionIcon>
                  </Tooltip>
                </>
              ) : null}
            </div>
          ),
        };
      });

      setRows(rowRender);

      setHeaders([
        {
          label: "STT",
          value: "number",
          isSortable: true,
        },
        {
          label: "Thông tin phim",
          value: "movieDetail",
          isSortable: false,
        },
        {
          label: "Thông tin phòng",
          value: "RoomType",
          isSortable: false,
        },
        {
          label: "Giờ chiếu",
          value: "timeShow",
          isSortable: false,
        },
        {
          label: "Ghế",
          value: "seat",
          isSortable: false,
        },
        {
          label: "Tổng giá tiền",
          value: "totalPrice",
          isSortable: false,
        },
        {
          label: "Ngày đã đặt",
          value: "orderedDate",
          isSortable: false,
        },
        {
          label: "Người đặt",
          value: "user",
          isSortable: false,
        },
        {
          label: "Trạng thái",
          value: "status",
          isSortable: false,
        },
        {
          label: "#",
          value: "action",
          isSortable: false,
        },
      ]);
    }
  }, [data]);

  return (
    <div>
      <div className="flex justify-end">
        <Select
          mb={"lg"}
          radius={"md"}
          size="xs"
          defaultValue={statusBooking}
          allowDeselect={false}
          label="Trạng thái vé"
          onChange={(e) => setStatusBooking(e as string)}
          placeholder="Pick value"
          data={[
            "Tất cả",
            "Chờ xác nhận",
            "Đã xác nhận",
            "Đã thanh toán",
            "Đã huỷ",
          ]}
        />
      </div>
      <div>
        <TableFilter headers={headers}></TableFilter>
      </div>
    </div>
  );
}

export default ManageBookingPage;
