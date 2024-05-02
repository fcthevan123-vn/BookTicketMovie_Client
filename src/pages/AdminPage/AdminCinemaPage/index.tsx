import { ActionIcon, Badge, Button, Text, rem } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useCallback, useEffect, useMemo, useState } from "react";
import FormAddCinema from "../../../components/Forms/FormCinema/FormAddCinema";

import { cinemaServices } from "../../../services";
import { IconPencil, IconTrash } from "@tabler/icons-react";

import { Cinema } from "../../../types";
import {
  MRT_ColumnDef,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { PreviewImages } from "../../../components/PreviewImage";

function AdminCinemaPage() {
  const [data, setData] = useState<Cinema[]>();

  const openModalAdd = () => {
    modals.open({
      title: (
        <Text fw={500} size="lg" c={"violet"}>
          Tạo rạp phim mới
        </Text>
      ),
      size: "lg",
      children: (
        <FormAddCinema
          isUpdate={false}
          getAllCinema={getLimitCinemas}
        ></FormAddCinema>
      ),
      radius: "md",
      lockScroll: false,
    });
  };

  const openModalUpdate = (data: Cinema) => {
    modals.open({
      title: (
        <Text fw={500} size="lg" c={"violet"}>
          Chỉnh sửa rạp phim
        </Text>
      ),
      size: "lg",
      children: (
        <FormAddCinema
          isUpdate={true}
          cinemaData={data}
          getAllCinema={getLimitCinemas}
        ></FormAddCinema>
      ),
      radius: "md",
      lockScroll: false,
    });
  };

  const getLimitCinemas = useCallback(async () => {
    try {
      const res = await cinemaServices.getLimitCinemas(1, 100);

      if (res.statusCode === 0) {
        setData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const columns = useMemo<MRT_ColumnDef<Cinema>[]>(
    () => [
      {
        header: "Tên rạp phim",
        accessorKey: "name",
      },
      {
        id: "info",
        header: "Thông tin cụ thể",
        accessorFn: (row) => {
          if (row) {
            return `${row.detailLocation} ${row.locationName} ${row.hotline}`;
          }
        },
        enableResizing: false,
        Cell: ({ row }) => {
          return (
            <div>
              <Text fw={500} size="sm" c={"violet"} tt={"capitalize"}>
                {row?.original?.detailLocation}
              </Text>
              <Text size="xs" c={"dimmed"} tt={"capitalize"}>
                {row.original.locationName}
              </Text>
              <Text size="xs" c={"dimmed"} tt={"capitalize"}>
                {row?.original?.hotline}
              </Text>
            </div>
          );
        },

        size: 300,
      },
      {
        header: "Hình ảnh",
        id: "image",
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <PreviewImages
            img={row.original.image as string}
            height={100}
            width={200}
          ></PreviewImages>
        ),
      },
      {
        header: "Nhân viên quản lý",
        id: "staff",
        accessorFn: (row) => {
          if (row) {
            return `${row.User?.fullName} ${row.User?.email} ${row.User?.phone}`;
          }
        },
        Cell: ({ row }) => (
          <div>
            <Text fw={500} size="sm" tt={"capitalize"}>
              {row?.original?.User?.fullName}
            </Text>
            <Text size="xs" c={"dimmed"} tt={"capitalize"}>
              {row?.original?.User?.email}
            </Text>
            <Text size="xs" c={"dimmed"} tt={"capitalize"}>
              {row?.original?.User?.phone}
            </Text>
          </div>
        ),
      },
      {
        id: "status",
        accessorFn: (row) =>
          row.status == "open" ? "Hoạt động" : "Đã đóng cửa",
        header: "Trạng thái",
        Cell: ({ row }) =>
          row.original.status === "open" ? (
            <Badge color="violet" variant="light" size="md" radius="sm">
              Hoạt động
            </Badge>
          ) : (
            <Badge color="red" variant="light" size="md" radius="sm">
              Đã đóng của
            </Badge>
          ),
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: data ? data : [],
    enableGrouping: true,
    enableColumnDragging: false,
    enableStickyHeader: true,
    positionToolbarAlertBanner: "none",
    enableRowActions: true,
    initialState: {
      showGlobalFilter: true,
    },
    positionActionsColumn: "last",
    mantineTableContainerProps: { style: { maxHeight: 600 } },
    mantinePaperProps: {
      radius: "md",
    },
    renderTopToolbarCustomActions: () => (
      <div>
        <Button size="xs" radius={"sm"} className="m-1" onClick={openModalAdd}>
          Thêm rạp phim
        </Button>
      </div>
    ),
    renderRowActions: ({ row }) => (
      <div className="flex gap-2">
        <ActionIcon
          onClick={() => openModalUpdate(row.original)}
          variant="light"
          radius={"md"}
        >
          <IconPencil
            style={{ width: rem(16), height: rem(16) }}
            stroke={1.5}
          />
        </ActionIcon>
        <ActionIcon variant="light" color="red" radius={"md"}>
          <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
        </ActionIcon>
      </div>
    ),
  });

  useEffect(() => {
    getLimitCinemas();
  }, [getLimitCinemas]);

  return (
    <div>
      {/* <TableFilter headers={headers}></TableFilter> */}

      <MantineReactTable table={table} />
    </div>
  );
}

export default AdminCinemaPage;
