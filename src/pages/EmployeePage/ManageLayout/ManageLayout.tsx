import { useCallback, useEffect, useMemo, useState } from "react";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import { ActionIcon, Button, Text } from "@mantine/core";
import { Layout } from "../../../types";
import { layoutServices } from "../../../services";
import { ErrToast } from "../../../components/AllToast/NormalToast";
import { useAuthenticate } from "../../../hooks";
import { IconEye } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { FormLayout } from "./FormLayout";
import PreviewLayout from "./PreviewLayout";

const ManageLayout = () => {
  const [, , dataUser] = useAuthenticate();
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState<Layout[]>();

  const getLayout = useCallback(async (staffId: string) => {
    setIsLoading(true);
    try {
      const res = await layoutServices.getLayoutByStaff(staffId);

      setTableData(res.data);
    } catch (error) {
      ErrToast(error as Error, "getLayout");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const openViewDetail = (data: Layout) =>
    modals.open({
      title: (
        <Text c="violet" fw={700}>
          Xem chi tiết - {data.name}
        </Text>
      ),
      centered: true,
      radius: "md",
      size: "xl",
      children: (
        <>
          <PreviewLayout data={data}></PreviewLayout>
        </>
      ),
    });

  const openFormLayout = () =>
    modals.open({
      title: (
        <Text c="violet" fw={700}>
          Thêm kiểu bố trí ghế
        </Text>
      ),
      radius: "md",
      size: "xl",
      children: (
        <>
          <FormLayout
            getAllLayout={() => getLayout(dataUser.id)}
            employeeId={dataUser.id}
          ></FormLayout>
        </>
      ),
    });

  const columns = useMemo<MRT_ColumnDef<Layout>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Tên",
      },
      {
        accessorKey: "rows",
        header: "Số hàng ghế",
      },
      {
        accessorKey: "seatsPerRow",
        header: "Số ghế trong 1 hàng",
      },

      //   {
      //     id: "status",
      //     accessorFn: (row) =>
      //       row.status == "open" ? "Khả dụng" : "Không khả dụng",
      //     header: "Trạng thái",
      //     Cell: ({ row }) =>
      //       row.original.status === "open" ? (
      //         <Badge color="violet" variant="light" size="md" radius="sm">
      //           Khả dụng
      //         </Badge>
      //       ) : (
      //         <Badge color="red" variant="light" size="sm" radius="md">
      //           Không khả dụng
      //         </Badge>
      //       ),
      //   },
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
    state: {
      isLoading: isLoading,
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
          onClick={() => openViewDetail(row.original)}
        >
          <IconEye style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
      </div>
    ),
  });

  useEffect(() => {
    getLayout(dataUser.id);
  }, [dataUser.id, getLayout]);

  return (
    <div className="px-3">
      <div className="mb-3 flex justify-end">
        <Button size="xs" radius={"md"} onClick={openFormLayout}>
          Thêm kiểu bố trí ghế
        </Button>
      </div>
      <div>
        <MantineReactTable table={table} />
      </div>
    </div>
  );
};

export default ManageLayout;
