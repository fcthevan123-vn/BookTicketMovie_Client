import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ReviewTS } from "../../../types";
import { reviewServices } from "../../../services";
import { ErrToast } from "../../../components/AllToast/NormalToast";
import {
  MRT_ColumnDef,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { Rating, Text } from "@mantine/core";
import moment from "moment";

function MangeReview() {
  const [data, setData] = useState<ReviewTS[]>();

  const getAllReview = useCallback(async () => {
    try {
      const res = await reviewServices.getAllReviewsInSystem();
      if (res.statusCode == 0) {
        setData(res.data);
      }
    } catch (error) {
      setData([]);
      ErrToast(error as Error, "getAllReview");
    }
  }, []);

  const columns = useMemo<MRT_ColumnDef<ReviewTS>[]>(
    () => [
      {
        id: "movieDetails",
        enableResizing: false,
        header: "Thông tin phim",
        accessorFn: (row) =>
          `${row.Movie?.title} ${row.Movie?.genre.join(" - ")} ${
            row.Movie?.duration
          }`,
        Cell: ({ row }) => (
          <div>
            <Text fz="sm" fw={500}>
              {row?.original.Movie?.title}
            </Text>
            <Text fz="xs" c={"dimmed"}>
              {row?.original.Movie?.genre.join(" - ")}
            </Text>
            <Text fz="xs" c={"dimmed"}>
              {row?.original.Movie?.duration} phút
            </Text>
          </div>
        ),
        size: 250,
      },
      {
        id: "userDetails",
        enableResizing: false,
        header: "Người đánh giá",
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
        id: "reviewDetail",
        header: "Nội dung",
        accessorFn: (row) => `${row.star} ${row?.content}`,
        Cell: ({ row }) => (
          <div>
            <Text fz="sm" fw={500}>
              {row?.original.content}
            </Text>
            <Rating value={row.original.star} />
          </div>
        ),
      },
      {
        // accessorKey: "priceNormal",
        id: "updatedAt",
        header: "Ngày đánh giá",

        accessorFn: (row) => `${moment(row?.updatedAt).format("DD/MM/YYYY")}`,
        Cell: ({ renderedCellValue }) => (
          <Text fz="sm">{renderedCellValue}</Text>
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
    },
    // state: {
    //   isLoading: isLoading,
    // }
    mantinePaperProps: {
      radius: "md",
    },
  });

  useEffect(() => {
    getAllReview();
  }, [getAllReview]);

  return (
    <div>
      <MantineReactTable table={table} />
    </div>
  );
}

export default MangeReview;
