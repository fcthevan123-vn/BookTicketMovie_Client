import { Badge, ActionIcon, Text, Button, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import FormUser from "../../../components/Forms/FormUser";
import { userServices } from "../../../services";
import { useCallback, useEffect, useMemo, useState } from "react";
import { loadingApi } from "../../../untils/loadingApi";
import { UserTS } from "../../../types";
import {
  MRT_ColumnDef,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { useSetState } from "@mantine/hooks";

const jobColors: Record<string, string> = {
  user: "blue",
  admin: "orange",
  manager: "violet",
  employee: "green",
};

function ManageAccountPage() {
  const [data, setData] = useState<UserTS[]>();
  const [loading, setLoading] = useSetState({
    isLoading: false,
    disable: false,
  });

  const modalEditUser = (
    title: string,
    isUpdate: boolean,
    rowData: UserTS | undefined
  ) =>
    modals.open({
      title: (
        <Text c="blue" fw={500}>
          {title}
        </Text>
      ),
      children: (
        <>
          <FormUser
            isUpdate={isUpdate}
            data={rowData}
            apiFetch={handleGetAllUsers}
          ></FormUser>
        </>
      ),
      lockScroll: false,
      radius: "lg",
    });

  const modalDeleteUser = (idUser: string) =>
    modals.openConfirmModal({
      title: (
        <Text c="red" fw={600}>
          Xoá tài khoản
        </Text>
      ),

      lockScroll: false,
      radius: "lg",
      children: (
        <Text size="sm">
          Tài khoản sẽ bị xoá vĩnh viễn và không thể khôi phục lại.
        </Text>
      ),
      labels: { confirm: "Xoá", cancel: "Huỷ" },
      cancelProps: { radius: "md", size: "sm" },
      confirmProps: {
        color: "red",
        radius: "md",
        size: "sm",
      },
      onConfirm: () => handleDeleteUser(idUser),
    });

  async function handleDeleteUser(id: string) {
    const api = userServices.deleteUserById(id);

    const res = await loadingApi(api, "Xoá tài khoản");

    if (res) {
      modals.closeAll();
      handleGetAllUsers();
    }

    return res;
  }

  const handleGetAllUsers = useCallback(async () => {
    setLoading({
      isLoading: true,
    });
    try {
      const res = await userServices.getAllUsersByRule(10000, 1);
      if (res.statusCode === 0) {
        setData(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading({
        isLoading: false,
      });
    }
  }, [setLoading]);

  useEffect(() => {
    handleGetAllUsers();
  }, [handleGetAllUsers]);

  const columns = useMemo<MRT_ColumnDef<UserTS>[]>(
    () => [
      {
        header: "Họ và tên",
        accessorKey: "fullName",
      },
      {
        id: "type",
        header: "Chức vụ",
        filterVariant: "select",
        mantineFilterSelectProps: {
          data: ["Quản trị viên", "Nhân Viên", "Người dùng"],
        },
        accessorFn: (row) =>
          row.type == "admin"
            ? "Quản trị viên"
            : row.type == "manager"
            ? "Quản lý"
            : row.type == "employee"
            ? "Nhân viên"
            : "Người dùng",
        Cell: ({ row }) => (
          <Badge
            color={jobColors[row.original.type.toLowerCase()]}
            variant="light"
          >
            {row.original.type == "admin"
              ? "Quản trị viên"
              : row.original.type == "manager"
              ? "Quản lý"
              : row.original.type == "employee"
              ? "Nhân viên"
              : "Người dùng"}
          </Badge>
        ),
        size: 180,
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "phone",
        header: "SDT",
      },
      {
        accessorKey: "age",
        header: "Tuổi",
        size: 50,
      },
      {
        id: "sex",
        header: "Giới tính",
        accessorFn: (row) => (row.sex.toString() == "0" ? "Nam" : "Nữ"),
        size: 50,
        Cell: ({ row }) =>
          row.original.sex.toString() == "0" ? (
            <Badge color="blue" variant="light" size="md" radius="sm">
              Nam
            </Badge>
          ) : (
            <Badge color="pink" variant="light" size="md" radius="sm">
              Nữ
            </Badge>
          ),
      },
      {
        id: "address",
        accessorFn: (row) => row.address,
        header: "Địa chỉ",
        Cell: ({ renderedCellValue }) => (
          <Tooltip label={renderedCellValue}>
            <Text fz="sm" truncate="end" w={200}>
              {renderedCellValue}
            </Text>
          </Tooltip>
        ),
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: data ? data : [],
    // enableColumnResizing: true,
    enableGrouping: true,
    enableColumnDragging: false,
    enableStickyHeader: true,
    positionToolbarAlertBanner: "none",
    mantineTableContainerProps: { style: { maxHeight: 600 } },
    mantinePaperProps: {
      radius: "md",
    },
    initialState: { showColumnFilters: true, isLoading: loading.isLoading },
    enableRowActions: true,
    positionActionsColumn: "last",
    mantineFilterTextInputProps: {
      placeholder: "Tìm kiếm",
    },
    renderTopToolbarCustomActions: () => (
      <div>
        <Button
          size="xs"
          radius={"sm"}
          className="m-1"
          onClick={() => modalEditUser("Thêm tài khoản mới", false, undefined)}
        >
          Thêm người dùng
        </Button>
      </div>
    ),
    renderRowActions: ({ row }) => (
      <div className="flex gap-2">
        <ActionIcon
          variant="light"
          aria-label="Settings"
          radius={"md"}
          size={"lg"}
          onClick={() =>
            modalEditUser("Chỉnh sửa tài khoản", true, row.original)
          }
        >
          <IconEdit style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
        <ActionIcon
          color="red"
          aria-label="Settings"
          radius={"md"}
          variant="light"
          size={"lg"}
          onClick={() => modalDeleteUser(row.original.id)}
        >
          <IconTrash style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
      </div>
    ),
  });

  return (
    <div>
      <MantineReactTable table={table} />
    </div>
  );
}

export default ManageAccountPage;
