import React, { useCallback, useEffect, useState } from "react";
import { useAuthenticate } from "../../../hooks";
import NormalToast from "../../../components/AllToast/NormalToast";
import bookingServices from "../../../services/bookingServices";
import { BookingTypeTS } from "../../../types";
import { Text } from "@mantine/core";
import { useTableCustom } from "../../../components/Provider/TableFilterProvider";
import TableFilter from "../../../components/TableFilter";
import moment from "moment";

type Props = {};

function UserAllTickets({}: Props) {
  const [, , dataUser] = useAuthenticate();
  const {
    setRows,
    headers,
    setHeaders,
    limitRow,
    setIsLoading,
    activePage,
    setTotalPagination,
    currentSearchValue,
    totalPagination,
    setActivePage,
  } = useTableCustom();

  const [data, setData] = useState<BookingTypeTS[] | null>(null);

  const getAllBookings = useCallback(async () => {
    try {
      const res = await bookingServices.getBookingByUserId(dataUser.id);
      if (res.statusCode === 0) {
        setData(res.data);
        console.log("res.data", res.data);
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
                {row.Show.Movie?.title}
              </Text>
              <Text fz="xs" c={"dimmed"}>
                {row.Show.Movie?.genre.join(" - ")}
              </Text>
              <Text fz="xs" c={"dimmed"}>
                {row.Show.Movie?.duration} phút
              </Text>
            </div>
          ),
          RoomType: (
            <div>
              <Text fz="sm" fw={500}>
                Phòng: {row.Show.MovieHall.name}
              </Text>
              <Text fz="xs" c={"dimmed"}>
                Rạp: {row.Show.MovieHall.Cinema.name}
              </Text>
              <Text fz="xs" c={"dimmed"}>
                Kiểu phòng: {row.Show.MovieHall.RoomType.name}
              </Text>
            </div>
          ),
          timeShow: (
            <div>
              <Text fz="sm">
                Bắt đầu: {moment(row.Show.startTime).format("HH:mm")}
              </Text>
              <Text fz="sm">
                Kết thúc: {moment(row.Show.endTime).format("HH:mm")}
              </Text>
              <Text fz="sm">
                Ngày: {moment(row.Show.date).format("DD/MM/YYYY")}
              </Text>
            </div>
          ),
          seat: (
            <div>
              {row.SeatStatuses.map((seat) => (
                <div>
                  <Text fz="sm">Số ghế: {seat.Seat.name}</Text>
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
