import React, { useCallback, useEffect, useState } from "react";
import { useAuthenticate } from "../../../hooks";
import NormalToast from "../../../components/AllToast/NormalToast";
import bookingServices from "../../../services/bookingServices";
import { BookingTypeTS } from "../../../types";
import { Text } from "@mantine/core";
import { useTableCustom } from "../../../components/Provider/TableFilterProvider";
import TableFilter from "../../../components/TableFilter";

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
          value: "RoomType",
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
          value: "totalPrice",
          isSortable: false,
        },
      ]);
    }
  }, [data]);

  return (
    <div>
      UserAllTickets
      <TableFilter headers={headers}></TableFilter>
    </div>
  );
}

export default UserAllTickets;
