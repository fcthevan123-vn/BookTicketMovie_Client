import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAuthenticate } from "../../../hooks";
import { seatServices } from "../../../services";
import { ErrToast } from "../../../components/AllToast/NormalToast";
import { SeatType } from "../../../types";
import {
  MRT_ColumnDef,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import {
  ActionIcon,
  Button,
  NumberFormatter,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { IconArmchair, IconEdit } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import FormSeatType from "./FormSeatType";

export default function AllSeatType() {
  const [, , dataUser] = useAuthenticate();
  const [tableData, setTableData] = useState<SeatType[]>();

  const openFormSeatType = (dataSeatType: SeatType[], staffId: string) =>
    modals.open({
      title: (
        <Text c="violet" fw={700}>
          Thêm loại ghế mới
        </Text>
      ),
      radius: "md",
      size: "xl",
      children: (
        <>
          <FormSeatType
            getSeatType={() => getAllSeatType(staffId)}
            data={dataSeatType}
            staffId={dataUser.id}
          ></FormSeatType>
        </>
      ),
    });

  const openUpdateSeatType = (
    dataSeatType: SeatType[],
    staffId: string,
    dataUpdate: SeatType
  ) =>
    modals.open({
      title: (
        <Text c="violet" fw={700}>
          Chỉnh sửa loại ghế
        </Text>
      ),
      radius: "md",
      size: "xl",
      children: (
        <>
          <FormSeatType
            getSeatType={() => getAllSeatType(staffId)}
            data={dataSeatType}
            staffId={dataUser.id}
            dataUpdate={dataUpdate}
          ></FormSeatType>
        </>
      ),
    });

  const getAllSeatType = useCallback(async (staffId: string) => {
    try {
      const res = await seatServices.getAllSeatType(staffId);

      setTableData(res.data);
    } catch (error) {
      ErrToast(error as Error, "getAllSeatType");
    }
  }, []);

  const columns = useMemo<MRT_ColumnDef<SeatType>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Tên",
      },
      {
        accessorFn: (row) => row.price.toString(),
        id: "price",
        header: "Giá cộng thêm",
        Cell: ({ row }) => (
          <NumberFormatter
            thousandSeparator
            value={row.original.price}
            suffix=" VND"
          />
        ),
      },
      {
        id: "color",
        accessorFn: (row) => row.color,
        header: "Màu sắc thể hiện",
        Cell: ({ row }) => (
          <ThemeIcon size="lg" color={`${row.original.color}.6`}>
            <IconArmchair style={{ width: "70%", height: "70%" }} />
          </ThemeIcon>
        ),
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: tableData ? tableData : [],
    mantineSearchTextInputProps: {
      placeholder: "Tìm kiếm",
      radius: "md",
    },
    initialState: {
      showGlobalFilter: true,
    },

    mantinePaperProps: {
      radius: "md",
    },
    enableRowActions: true,
    positionActionsColumn: "last",
    renderRowActions: ({ row }) => (
      <div className="flex gap-2">
        <ActionIcon
          variant="light"
          aria-label="Settings"
          radius={"md"}
          size={"lg"}
          onClick={() =>
            openUpdateSeatType(
              tableData as SeatType[],
              dataUser.id,
              row.original
            )
          }
        >
          <IconEdit style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
      </div>
    ),
  });

  useEffect(() => {
    getAllSeatType(dataUser.id);
  }, [dataUser.id, getAllSeatType]);

  return (
    <div className="px-3">
      <div className="mb-3 flex justify-end">
        {tableData && (
          <Button
            size="xs"
            radius={"md"}
            onClick={() => openFormSeatType(tableData, dataUser.id)}
          >
            Thêm kiểu bố trí ghế
          </Button>
        )}
      </div>
      <div>
        <MantineReactTable table={table} />
      </div>
    </div>
  );
}
