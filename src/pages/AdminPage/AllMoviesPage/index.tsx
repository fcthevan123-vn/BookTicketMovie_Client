import { useState, useEffect, useCallback, useMemo } from "react";
import { ActionIcon, Text } from "@mantine/core";
import { movieServices } from "../../../services";
import { IconAdjustments, IconEdit } from "@tabler/icons-react";
import { MovieTS } from "../../../types";
import { ErrToast } from "../../../components/AllToast/NormalToast";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import { useElementSize } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import FormEditMovie from "../../../components/Forms/FormEditMovie";
import { loadingApi } from "../../../untils/loadingApi";
import moment from "moment";

function AllMoviesPage() {
  const [tableData, setTableData] = useState<MovieTS[]>();
  const [isLoading, setIsLoading] = useState(false);
  const { ref, width } = useElementSize();

  async function handleDeleteMovie(id: string) {
    setIsLoading(true);
    const api = movieServices.deleteMovie({ id });
    const res = await loadingApi(api, "Xoá phim");
    if (res === true) {
      getAllMovie();
    }
    setIsLoading(false);
    return res;
  }

  const modalDeleteMovie = (id: string) =>
    modals.openConfirmModal({
      title: (
        <Text c={"red"} fw={"bold"}>
          Xoá phim
        </Text>
      ),
      children: <Text size="sm">Bạn có chắc chắn xoá phim này vĩnh viễn?</Text>,
      centered: true,
      confirmProps: {
        color: "red",
        radius: "md",
        size: "xs",
        loading: isLoading,
      },
      cancelProps: {
        radius: "md",
        size: "xs",
      },
      lockScroll: false,
      radius: "lg",
      labels: {
        confirm: "Đồng ý",
        cancel: "Huỷ",
      },
      onConfirm: () => handleDeleteMovie(id),
    });

  const modalEditMovie = (data: MovieTS) =>
    modals.open({
      title: (
        <Text c={"violet"} size="lg" fw={700}>
          Chỉnh sửa phim
        </Text>
      ),
      children: (
        <FormEditMovie
          getAllMovie={() => getAllMovie()}
          onClose={() => modals.closeAll()}
          dataMovie={data}
        ></FormEditMovie>
      ),
      fullScreen: true,
      lockScroll: true,
    });

  const getAllMovie = useCallback(async () => {
    try {
      setIsLoading(true);

      const res = await movieServices.getAllMovies({ isCount: false });
      setTableData(res.data);
    } catch (error) {
      ErrToast(error as Error, "getAllMovie");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const columns = useMemo<MRT_ColumnDef<MovieTS>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Tên phim",
      },
      {
        id: "directors",
        accessorFn: (row) => row.directors.join(" - "),
        header: "Đạo diễn",
        size: 50,
      },

      {
        // accessorKey: "genre",
        accessorFn: (row) => row.genre.join(" - "),
        id: "genre",
        header: "Thể loại",
      },
      {
        accessorFn: (row) => `${moment(row.releaseDate).format("DD/MM/YYYY")}`,
        id: "releaseDate",
        header: "Ngày phát hành",
      },

      {
        accessorFn: (row) => `${moment(row.endDate).format("DD/MM/YYYY")}`,
        id: "endDate",
        header: "Ngày kết thúc",
      },

      {
        id: "language",
        accessorFn: (row) => `${row.language} ${row.subtitle} ${row.country}`,
        header: "Thông tin",

        Cell: ({ row }) => (
          <div className="flex flex-col">
            <span>Ngôn ngữ: {row.original.language}</span>
            <span>Phụ đề: {row.original.subtitle}</span>
            <span>Quốc gia: {row.original.country}</span>
          </div>
        ),
      },

      {
        accessorKey: "duration",
        header: "Thời lượng",
        size: 50,
      },
      {
        accessorKey: "ageRequire",
        header: "Độ tuổi",
        size: 50,
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: tableData ? tableData : [],
    enableColumnPinning: true,
    mantineSearchTextInputProps: {
      placeholder: "Tìm kiếm",
      radius: "md",
    },
    initialState: {
      columnPinning: {
        right: ["mrt-row-actions"],
      },
      showGlobalFilter: true,
    },
    enableRowActions: true,
    positionActionsColumn: "last",
    state: {
      isLoading: isLoading,
    },
    mantinePaperProps: {
      radius: "md",
    },

    renderRowActions: ({ row }) => (
      <div className="flex gap-2">
        <ActionIcon
          variant="filled"
          aria-label="Settings"
          radius={"md"}
          size={"lg"}
          onClick={() => {
            modalEditMovie(row.original);
          }}
        >
          <IconEdit style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
        <ActionIcon
          color="red"
          aria-label="Settings"
          radius={"md"}
          size={"lg"}
          onClick={() => {
            modalDeleteMovie(row.original.id as string);
          }}
        >
          <IconAdjustments
            style={{ width: "70%", height: "70%" }}
            stroke={1.5}
          />
        </ActionIcon>
      </div>
    ),
  });

  useEffect(() => {
    getAllMovie();
  }, [getAllMovie]);

  return (
    <div
      className="flex flex-col py-5 gap-2 justify-center items-center"
      ref={ref}
    >
      <div
        className="p-2"
        style={{
          maxWidth: width,
        }}
      >
        {tableData && <MantineReactTable table={table} />}
      </div>
    </div>
  );
}

export default AllMoviesPage;
