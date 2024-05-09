import { Badge, Button, NumberFormatter, Text } from "@mantine/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import bookingServices from "../../../services/bookingServices";
import NormalToast from "../../../components/AllToast/NormalToast";
import { BookingTypeTS } from "../../../types";

import moment from "moment";
import { useAuthenticate } from "../../../hooks";
import { loadingApi } from "../../../untils/loadingApi";
import { modals } from "@mantine/modals";
import {
  MRT_ColumnDef,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import socket from "../../../untils/socketio";

function ManageBookingPage() {
  const [data, setData] = useState<BookingTypeTS[]>([]);
  const [, , dataUser] = useAuthenticate();

  const getBooking = useCallback(async () => {
    try {
      const res = await bookingServices.getBookingByStaff(dataUser.id);
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
  }, [dataUser.id]);

  const openConfirm = (idBooking: string, status: string, message: string) =>
    modals.openConfirmModal({
      title: <p className="text-violet-500 text-lg font-semibold">{message}</p>,
      radius: "lg",
      children: (
        <Text size="sm" fw={700}>
          Đây là một hành độg quan trọng, hãy kiểm tra kỹ trước khi thực hiện.
          Nếu muốn tiếp tục hãy nhấn xác nhận.
        </Text>
      ),
      confirmProps: {
        radius: "md",
        color: "violet",
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

      const api = bookingServices.updateBooking(dataPass);
      const res = await loadingApi(api, "Cập nhật vé");

      if (res) {
        getBooking();
      }

      return res;
    } catch (error) {
      const err = error as Error;
      NormalToast({
        title: "Cập nhật vé",
        message: err.message,
        color: "red",
      });
    } finally {
      socket.emit("newNotification");
    }
  }

  const columns = useMemo<MRT_ColumnDef<BookingTypeTS>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id vé",
      },
      {
        id: "movieDetails",
        enableResizing: false,
        header: "Thông tin phim",
        accessorFn: (row) =>
          `${row.Show.Movie?.title} ${row.Show.Movie?.genre.join(" - ")} ${
            row.Show.Movie?.duration
          }`,
        Cell: ({ row }) => (
          <div>
            <Text fz="sm" fw={500}>
              {row?.original.Show?.Movie?.title}
            </Text>
            <Text fz="xs" c={"dimmed"}>
              {row?.original.Show?.Movie?.genre.join(" - ")}
            </Text>
            <Text fz="xs" c={"dimmed"}>
              {row?.original.Show?.Movie?.duration} phút
            </Text>
          </div>
        ),
        size: 250,
      },
      {
        id: "userDetails",
        enableResizing: false,
        header: "Người đặt",
        accessorFn: (row) =>
          `${row.User?.fullName} ${row.User?.phone} ${row.User?.email}`,
        Cell: ({ row }) => (
          <div>
            <Text fz="sm" fw={500}>
              {row?.original.User?.fullName}
            </Text>
            <Text fz="xs" c={"dimmed"}>
              {row?.original.User?.phone}
            </Text>
            <Text fz="xs" c={"dimmed"}>
              {row?.original.User?.email}
            </Text>
          </div>
        ),
        size: 250,
      },
      {
        enableResizing: false,
        id: "roomDetail",
        header: "Thông tin phòng",
        accessorFn: (row) =>
          `${row.Show.MovieHall?.name} ${row?.Show?.MovieHall?.Cinema?.name} ${row?.Show?.MovieHall?.RoomType?.name}`,
        Cell: ({ row }) => (
          <div>
            <Text fz="sm" fw={500}>
              {row?.original.Show?.MovieHall?.name}
            </Text>
            <Text fz="xs" c={"dimmed"}>
              {row?.original.Show?.MovieHall?.Cinema?.name}
            </Text>
            <Text fz="xs" c={"dimmed"}>
              {row?.original.Show?.MovieHall?.RoomType?.name}
            </Text>
          </div>
        ),
      },
      {
        // accessorKey: "priceNormal",
        id: "time",
        enableResizing: false,
        header: "Giờ chiếu",
        size: 200,
        accessorFn: (row) =>
          `${moment(row?.Show?.startTime).format("HH:mm DD/MM")} ${moment(
            row?.Show?.endTime
          ).format("HH:mm DD/MM")}`,
        Cell: ({ row }) => (
          <div>
            <Text fz="sm">
              Bắt đầu:{" "}
              {moment(row?.original.Show?.startTime).format("HH:mm DD/MM")}
            </Text>
            <Text fz="sm">
              Kết thúc:{" "}
              {moment(row?.original.Show?.endTime).format("HH:mm DD/MM")}
            </Text>
          </div>
        ),
      },
      {
        id: "seats",
        enableResizing: false,
        header: "Ghế",
        size: 150,
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <div>
            {row.original.SeatStatuses.map((seat) => (
              <div key={seat.id}>
                <Text fz="sm">Số ghế: {seat?.Seat?.name}</Text>
              </div>
            ))}
          </div>
        ),
      },
      {
        accessorKey: "totalPrice",
        enableResizing: false,
        header: "Tổng tiền",
        size: 100,
        Cell: ({ row }) => (
          <NumberFormatter
            value={row.original.totalPrice}
            suffix="VND"
            thousandSeparator
          ></NumberFormatter>
        ),
      },
      {
        id: "date",
        enableResizing: false,
        header: "Ngày đặt",
        size: 100,
        accessorFn: (row) => `${moment(row?.createdAt).format("DD/MM/YYYY")}`,
        Cell: ({ row }) => (
          <Text fz="sm">{moment(row?.original.date).format("DD/MM/YYYY")}</Text>
        ),
      },
      {
        id: "status",
        enableResizing: false,
        header: "Trạng thái",
        size: 150,
        accessorFn: (row) => `${row.status}`,
        Cell: ({ row }) => (
          <Badge
            radius={"md"}
            tt="capitalize"
            size="md"
            color={
              row.original.status === "Đã huỷ"
                ? "red"
                : row.original.status === "Đã nhận vé"
                ? "cyan"
                : row.original.status === "Đã thanh toán"
                ? "green"
                : "blue"
            }
          >
            {row.original.status}
          </Badge>
        ),
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: data ? data : [],
    enableColumnPinning: true,
    // enableColumnResizing: true,
    mantineSearchTextInputProps: {
      placeholder: "Tìm kiếm",
      radius: "md",
    },
    initialState: {
      showGlobalFilter: true,
      columnPinning: {
        right: ["mrt-row-actions"],
      },
    },
    // state: {
    //   isLoading: isLoading,
    // },
    enableRowActions: true,
    renderRowActions: ({ row }) => (
      <div className="flex flex-col gap-2">
        <div className="w-fit">
          {row.original.status == "Đã thanh toán" ? (
            <Button
              size="compact-xs"
              radius={"md"}
              onClick={() =>
                openConfirm(
                  row.original.id,
                  "Đã nhận vé",
                  "Xác nhận người dùng đã nhận vé"
                )
              }
            >
              Đã nhận vé
            </Button>
          ) : null}
        </div>
      </div>
    ),
    mantinePaperProps: {
      radius: "md",
    },
  });

  useEffect(() => {
    getBooking();
  }, [getBooking]);

  return (
    <div>
      <div>
        {/* <TableFilter headers={headers}></TableFilter> */}

        <MantineReactTable table={table} />
      </div>
    </div>
  );
}

export default ManageBookingPage;
