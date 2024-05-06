import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAuthenticate } from "../../../hooks";
import NormalToast from "../../../components/AllToast/NormalToast";
import bookingServices from "../../../services/bookingServices";
import { BookingTypeTS } from "../../../types";
import { Badge, Button, NumberFormatter, Text } from "@mantine/core";
import QRCode from "react-qr-code";
import moment from "moment";
import { modals } from "@mantine/modals";
import { PDFDownloadLink } from "@react-pdf/renderer";
import UserTicketPdf from "./UserTicketPdf";
import {
  MRT_ColumnDef,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";

function UserAllTickets() {
  const [, , dataUser] = useAuthenticate();

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

  const viewQrCode = (id: string) =>
    modals.open({
      title: (
        <Text fw={700} ta={"center"} c={"violet"}>
          QR Code vé của bạn
        </Text>
      ),
      radius: "md",
      children: (
        <div className="flex justify-center p-3">
          <QRCode value={id} />
        </div>
      ),
      centered: true,
    });

  const columns = useMemo<MRT_ColumnDef<BookingTypeTS>[]>(
    () => [
      {
        id: "movieDetails",
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
        header: "Ngày đặt",
        size: 100,
        accessorFn: (row) => `${moment(row?.createdAt).format("DD/MM/YYYY")}`,
        Cell: ({ row }) => (
          <Text fz="sm">{moment(row?.original.date).format("DD/MM/YYYY")}</Text>
        ),
      },
      {
        id: "status",
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
      // {
      //   id: "export",
      //   header: "Xuất vé",
      //   enableColumnFilter: false,
      //   Cell: ({ row }) => (
      //     <div className="w-fit">
      //       {row.original.status == "Đã nhận vé" ||
      //       row.original.status == "Đã thanh toán" ? (
      //         <PDFDownloadLink
      //           document={
      //             <UserTicketPdf
      //               ticketData={row.original}
      //               userData={dataUser}
      //             />
      //           }
      //         >
      //           {({ loading }) =>
      //             loading ? (
      //               <Button size="compact-xs" radius={"md"}>
      //                 Loading
      //               </Button>
      //             ) : (
      //               <div className="flex flex-col gap-1">
      //                 <Button size="compact-xs" radius={"md"}>
      //                   Xuất vé
      //                 </Button>
      //                 <Button size="compact-xs" radius={"md"}>
      //                   Xuất vé
      //                 </Button>
      //               </div>
      //             )
      //           }
      //         </PDFDownloadLink>
      //       ) : null}
      //     </div>
      //   ),
      // },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: data ? data : [],
    enableColumnPinning: true,
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
          {row.original.status == "Đã nhận vé" ||
          row.original.status == "Đã thanh toán" ? (
            <PDFDownloadLink
              document={
                <UserTicketPdf ticketData={row.original} userData={dataUser} />
              }
            >
              {({ loading }) =>
                loading ? (
                  <Button size="compact-xs" radius={"md"}>
                    Loading
                  </Button>
                ) : (
                  <Button w={80} size="compact-xs" radius={"md"}>
                    Xuất vé
                  </Button>
                )
              }
            </PDFDownloadLink>
          ) : null}
        </div>
        {row.original.status == "Đã nhận vé" ||
        row.original.status == "Đã thanh toán" ? (
          <Button
            color="pink"
            w={80}
            size="compact-xs"
            radius={"md"}
            onClick={() => viewQrCode(row.original.id)}
          >
            QR Code
          </Button>
        ) : null}
      </div>
    ),
    mantinePaperProps: {
      radius: "md",
    },
  });

  useEffect(() => {
    getAllBookings();
  }, [getAllBookings]);

  return (
    <div className="">
      <MantineReactTable table={table} />
    </div>
  );
}

export default UserAllTickets;
