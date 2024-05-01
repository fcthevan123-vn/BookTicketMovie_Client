import { useCallback, useEffect, useMemo } from "react";
import { useAuthenticate } from "../../../hooks";
import { movieServices, showServices } from "../../../services";
import { ErrToast } from "../../../components/AllToast/NormalToast";
import { Button, Text } from "@mantine/core";
import {
  MRT_ColumnDef,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { MovieTS, Show } from "../../../types";
import { modals } from "@mantine/modals";
import FormShow from "./FormShow";
import { useSetState } from "@mantine/hooks";
import moment from "moment";
import dayjs from "dayjs";

type dataType = {
  tableData: Show[];
  allData: MovieTS[];
};

function ManageShow() {
  const [, , dataUser] = useAuthenticate();
  const [data, setData] = useSetState<dataType>({
    tableData: [],
    allData: [],
  });
  const [dataFilter, setDataFilter] = useSetState({
    movie: [""],
    movieHall: [],
  });

  const openModalAdd = (data: MovieTS[], getAllShow: () => Promise<void>) => {
    modals.open({
      title: (
        <Text fw={500} size="lg">
          Thêm suất chiếu mới
        </Text>
      ),
      size: "lg",
      children: <FormShow updateData={getAllShow} movieData={data}></FormShow>,
      radius: "md",
      lockScroll: false,
    });
  };

  const getShowByCinema = useCallback(
    async (staffId: string) => {
      try {
        const res = await showServices.getShowByCinema(staffId);
        setData({
          tableData: res.allShows,
        });
        setDataFilter({
          movieHall: res.filterMovieHallName,
        });
      } catch (error) {
        console.log("error", error);
        ErrToast(error as Error, "getShowByCinema");
      }
    },
    [setData]
  );

  const getShow = useCallback(
    async (staffId: string) => {
      try {
        const res = await movieServices.getAllShowByMovie(staffId);

        if (res.statusCode == 0) {
          setData({
            allData: res.data,
          });
        }
      } catch (error) {
        ErrToast(error as Error, "getShow");
      }
    },
    [setData, setDataFilter]
  );

  //   useEffect(() => {
  //     getMovieHall(dataUser.id);
  //   }, [dataUser.id, getMovieHall]);

  useEffect(() => {
    if (data) {
      const allMovie = data.allData.map((movie) => movie.title);
      setDataFilter({
        movie: allMovie as string[],
      });
    }
  }, [data]);

  useEffect(() => {
    getShow(dataUser.id);
  }, [dataUser.id, getShow]);

  useEffect(() => {
    getShowByCinema(dataUser.id);
  }, [dataUser.id, getShowByCinema]);

  const columns = useMemo<MRT_ColumnDef<Show>[]>(
    () => [
      {
        header: "Tên phim",
        accessorKey: "Movie.title",
      },
      {
        id: "info",
        header: "Thông tin phòng chiếu",
        accessorFn: (row) => (row ? `${row?.MovieHall?.name}` : ``),
        filterVariant: "select",
        mantineFilterSelectProps: {
          data: dataFilter.movieHall,
        },
        enableResizing: false,
        Cell: ({ row }) => (
          <div>
            <Text fw={500} size="sm" c={"violet"} tt={"capitalize"}>
              {row?.original?.MovieHall?.name}
            </Text>
            <Text size="xs" c={"dimmed"} tt={"capitalize"}>
              {row?.original?.MovieHall?.Layout?.name}
            </Text>
            <Text size="xs" c={"dimmed"} tt={"capitalize"}>
              {row?.original?.MovieHall?.RoomType?.name}
            </Text>
          </div>
        ),
        size: 300,
      },
      {
        id: "startTime",
        header: "Giờ chiếu",
        accessorFn: (row) =>
          `${moment(row.startTime).format("HH:mm")} - ${moment(
            row.endTime
          ).format("HH:mm")}`,
        enableResizing: false,
      },
      {
        id: "date",
        header: "Ngày",
        accessorFn: (originalRow) => {
          return dayjs(originalRow.date).locale("vi").toDate();
        },
        Cell: ({ cell }) => dayjs(cell.getValue<Date>()).format("DD/MM"),
        filterVariant: "date",
        enableResizing: false,
      },
      {
        id: "duration",
        header: "Thời lượng",
        accessorFn: (row) => `${row.Movie?.duration} phút`,
        enableResizing: false,
      },
    ],
    [dataFilter.movieHall]
  );

  const table = useMantineReactTable({
    columns,
    data: data ? data.tableData : [],
    enableColumnResizing: true,
    enableGrouping: true,
    enableColumnDragging: false,
    enableStickyHeader: true,
    positionToolbarAlertBanner: "none",
    mantineFilterTextInputProps: {
      placeholder: "Tìm kiếm",
    },
    mantineFilterSelectProps: {
      placeholder: "Chọn dữ liệu",
    },
    mantineFilterDateInputProps: {
      placeholder: "Chọn ngày",
      valueFormat: "DD/MM",
    },
    initialState: {
      density: "xs",
      expanded: true,
      grouping: ["Movie.title"],
      showColumnFilters: true,
      //   sorting: [{ id: "title", desc: false }],
    },
    mantineTableContainerProps: { style: { maxHeight: 600 } },
    mantinePaperProps: {
      radius: "md",
    },
    renderTopToolbarCustomActions: () => (
      <div>
        <Button
          size="xs"
          radius={"sm"}
          className="m-1"
          onClick={() =>
            openModalAdd(data.allData, () => getShowByCinema(dataUser.id))
          }
        >
          Thêm suất chiếu mới
        </Button>
      </div>
    ),
  });

  return (
    <div className="px-3">
      {/* <div className="mb-3 flex justify-end">
        <Button
          size="xs"
          radius={"md"}
          onClick={() =>
            openModalAdd(data.allData, () => getShowByCinema(dataUser.id))
          }
        >
          Thêm suất chiếu mới
        </Button>
      </div> */}
      <div className="relative">
        <MantineReactTable table={table} />
      </div>
    </div>
  );
}

export default ManageShow;
