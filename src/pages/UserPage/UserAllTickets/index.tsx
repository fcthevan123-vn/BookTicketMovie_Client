import React, { useCallback, useEffect, useState } from "react";
import { useAuthenticate } from "../../../hooks";
import NormalToast from "../../../components/AllToast/NormalToast";
import bookingServices from "../../../services/bookingServices";
import { BookingTypeTS } from "../../../types";
import { ActionIcon, Badge, Button, Text, Tooltip } from "@mantine/core";
import { useTableCustom } from "../../../components/Provider/TableFilterProvider";
import TableFilter from "../../../components/TableFilter";
import moment from "moment";
import { IconTrash } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { loadingApi } from "../../../untils/loadingApi";
import { PDFDownloadLink } from "@react-pdf/renderer";
import UserTicketPdf from "./UserTicketPdf";

function UserAllTickets() {
  const [, , dataUser] = useAuthenticate();
  const { setRows, headers, setHeaders } = useTableCustom();

  const [data, setData] = useState<BookingTypeTS[] | null>(null);

  const getAllBookings = useCallback(async () => {
    try {
      const res = await bookingServices.getBookingByUserId(dataUser.id);
      if (res.statusCode === 0) {
        setData(res.data);
      }
    } catch (error) {
      const err = error as Error;
      NormalToast({
        title: "getAllBookings",
        color: "red",
        message: err.message,
      });
    }
  }, [dataUser.id]);

  const openConfirmDelete = (idBooking: string) =>
    modals.openConfirmModal({
      title: <p className="text-red-500 font-semibold">Xác nhận huỷ vé</p>,
      radius: "lg",
      children: <Text size="sm">Bạn có chắc chắn muốn huỷ vé này không?</Text>,
      confirmProps: {
        radius: "md",
        color: "red",
      },
      cancelProps: { radius: "md" },
      labels: { confirm: "Xác nhận", cancel: "Huỷ" },

      onConfirm: () => deleleteBooking(idBooking),
    });

  async function deleleteBooking(idBooking: string) {
    try {
      const api = bookingServices.deleteBooking(idBooking);
      const res = await loadingApi(api, "Huỷ vé");

      if (res) {
        getAllBookings();
      }

      return res;
    } catch (error) {
      const err = error as Error;
      NormalToast({
        title: "Huỷ vé",
        message: err.message,
        color: "red",
      });
    }
  }

  useEffect(() => {
    getAllBookings();
  }, [getAllBookings]);

  useEffect(() => {
    if (data) {
      const rowRender = data.map((row, index) => {
        return {
          number: <Text fz="sm">{index + 1}</Text>,
          movieDetail: (
            <div>
              <Text fz="sm" fw={500}>
                {row?.Show?.Movie?.title}
              </Text>
              <Text fz="xs" c={"dimmed"}>
                {row?.Show?.Movie?.genre.join(" - ")}
              </Text>
              <Text fz="xs" c={"dimmed"}>
                {row?.Show?.Movie?.duration} phút
              </Text>
            </div>
          ),
          RoomType: (
            <div>
              <Text fz="sm" fw={500}>
                Phòng: {row?.Show?.MovieHall?.name}
              </Text>
              <Text fz="xs" c={"dimmed"}>
                Rạp: {row?.Show?.MovieHall?.Cinema?.name}
              </Text>
              <Text fz="xs" c={"dimmed"}>
                Kiểu phòng: {row?.Show?.MovieHall?.RoomType?.name}
              </Text>
            </div>
          ),
          timeShow: (
            <div>
              <Text fz="sm">Bắt đầu: {row?.Show?.startTime}</Text>
              <Text fz="sm">Kết thúc: {row?.Show?.endTime}</Text>
              <Text fz="sm">
                Ngày: {moment(row?.Show?.date).format("DD/MM/YYYY")}
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
              <Text fz="sm">{moment(row?.createdAt).format("DD/MM/YYYY")}</Text>
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
                    ? "teal"
                    : row.status === "Đã thanh toán"
                    ? "green"
                    : "blue"
                }
              >
                {row.status}
              </Badge>
            </div>
          ),
          staff: (
            <div>
              {row.Staff ? (
                <div>
                  <Text fz="sm">{row?.Staff?.fullName}</Text>
                  <Text fz="xs" c={"dimmed"}>
                    {row?.Staff?.phone}
                  </Text>
                  <Text fz="xs" c={"dimmed"}>
                    {row?.Staff?.email}
                  </Text>
                </div>
              ) : (
                "..."
              )}
            </div>
          ),
          action: (
            <div>
              {row.status == "Chờ xác nhận" ? (
                <Tooltip label="Huỷ vé">
                  <ActionIcon
                    onClick={() => openConfirmDelete(row.id)}
                    variant="filled"
                    color={"red"}
                    size="sm"
                    aria-label="Settings"
                  >
                    <IconTrash
                      style={{ width: "80%", height: "80%" }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                </Tooltip>
              ) : null}
            </div>
          ),
          printTicket: (
            <div>
              {console.log(row)}
              {row.status == "Đã xác nhận" ? (
                <PDFDownloadLink
                  document={
                    <UserTicketPdf ticketData={row} userData={dataUser} />
                  }
                >
                  {({ loading }) =>
                    loading ? (
                      <Button size="compact-xs" radius={"md"}>
                        Loading
                      </Button>
                    ) : (
                      <Button size="compact-xs" radius={"md"}>
                        Xuất vé
                      </Button>
                    )
                  }
                </PDFDownloadLink>
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
          label: "Trạng thái",
          value: "status",
          isSortable: false,
        },
        {
          label: "Nhân viên",
          value: "staff",
          isSortable: false,
        },
        {
          label: "#",
          value: "action",
          isSortable: false,
        },
        {
          label: "Xuất vé",
          value: "printTicket",
          isSortable: false,
        },
      ]);
    }
  }, [data]);

  return (
    <div className="">
      <TableFilter headers={headers}></TableFilter>
    </div>
  );
}

export default UserAllTickets;
