import {
  Group,
  Avatar,
  Badge,
  Anchor,
  ActionIcon,
  rem,
  Text,
  Button,
  Tooltip,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import FormUser from "../../../components/Forms/FormUser";
import { userServices } from "../../../services";
import { useCallback, useEffect, useState } from "react";
import { loadingApi } from "../../../untils/loadingApi";
import TableFilter from "../../../components/TableFilter";
import { useTableCustom } from "../../../components/Provider/TableFilterProvider";

type userProps = {
  fullName: string;
  type: string;
  email: string;
  phone: string;
  sex: string;
  address: string;
  id?: string;
  age: number;
};

type userRows = {
  fullName: React.ReactNode;
  type: React.ReactNode;
  email: React.ReactNode;
  phone: React.ReactNode;
  sex: React.ReactNode;
  address: React.ReactNode;
  id?: React.ReactNode;
  age: React.ReactNode;
};

const jobColors: Record<string, string> = {
  user: "blue",
  admin: "orange",
  manager: "pink",
  employee: "green",
};

function ManageAccountPage() {
  const [data, setData] = useState<userProps[]>();

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

  const modalEditUser = (
    title: string,
    isUpdate: boolean,
    rowData: userProps | undefined
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

  // async function handleGetAllUsers() {
  //   setIsLoading(true);
  //   try {
  //     const res = await userServices.getAllUsersByRule(limitRow, activePage);
  //     setIsLoading(false);

  //     if (res.statusCode === 0) {
  //       setData(res.data);
  //       const totalRows = Math.ceil(res.rows / limitRow);
  //       console.log("totalRows", totalRows);
  //       setTotalPagination(totalRows);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async function handleDeleteUser(id: string) {
    setIsLoading(true);
    const api = userServices.deleteUserById(id);

    const res = await loadingApi(api, "Xoá tài khoản");
    setIsLoading(false);
    if (res) {
      modals.closeAll();
      handleGetAllUsers();
    }

    return res;
  }

  const searchUserByName = useCallback(
    async (
      currentSearchValue: string,
      activePage: number,
      limitRow: number
    ) => {
      setIsLoading(true);
      try {
        const res = await userServices.searchUserByAdmin(
          currentSearchValue,
          activePage,
          limitRow
        );
        setIsLoading(false);

        if (res.statusCode === 0) {
          setData(res.data);
          const totalRows = Math.ceil(res.rows / limitRow);

          if (
            totalRows > 0 &&
            totalRows < activePage &&
            res.data.length === 0
          ) {
            // setTotalPagination(totalRows);
            setActivePage(activePage - 1);
            handleGetAllUsers();
            return true;
          }
          setTotalPagination(totalRows);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [setIsLoading, setTotalPagination]
  );

  const handleGetAllUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await userServices.getAllUsersByRule(limitRow, activePage);
      setIsLoading(false);

      if (res.statusCode === 0) {
        setData(res.data);
        const totalRows = Math.ceil(res.rows / limitRow);

        setTotalPagination(totalRows);
      }
    } catch (error) {
      console.log(error);
    }
  }, [activePage, limitRow, setIsLoading, setTotalPagination]);

  useEffect(() => {
    if (currentSearchValue.length === 0) {
      handleGetAllUsers();
    }
  }, [handleGetAllUsers]);

  useEffect(() => {
    if (data) {
      const rowRender: userRows[] = data.map((row) => {
        return {
          fullName: (
            <Group gap="sm">
              <Avatar
                size={37}
                src={
                  "https://img.freepik.com/free-vector/gradient-minimalist-background_23-2149974328.jpg?w=1060&t=st=1696167379~exp=1696167979~hmac=d118c5067d20b1691f1afbf6c377db2fba119ba07ad14137907744ff747a24ca"
                }
                radius={30}
              />
              <Text fz="sm" fw={500} truncate="end" w={120}>
                {row.fullName}
              </Text>
            </Group>
          ),

          type: (
            <Badge color={jobColors[row.type.toLowerCase()]} variant="light">
              {row.type == "admin"
                ? "Quản trị viên"
                : row.type == "manager"
                ? "Quản lý"
                : row.type == "employee"
                ? "Nhân viên"
                : "Người dùng"}
            </Badge>
          ),

          email: (
            <Anchor component="button" size="sm">
              {row.email}
            </Anchor>
          ),

          phone: <Text fz="sm">{row.phone}</Text>,
          age: (
            <Text fz="sm" ta={"center"}>
              {row.age}
            </Text>
          ),
          sex: (
            <Text fz="sm" ta={"center"}>
              {row.sex == "0" ? "Nam" : "Nữ"}
            </Text>
          ),
          address: (
            <Tooltip label={row.address}>
              <Text fz="sm" truncate="end" w={200}>
                {row.address}
              </Text>
            </Tooltip>
          ),
          actions: (
            <Group gap={5} justify="center">
              <ActionIcon
                onClick={() => modalEditUser("Chỉnh sửa tài khoản", true, row)}
                variant="light"
                color="blue"
                radius={"md"}
              >
                <IconPencil
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                />
              </ActionIcon>
              <ActionIcon
                onClick={() => modalDeleteUser(row.id as string)}
                variant="light"
                color="red"
                radius={"md"}
              >
                <IconTrash
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Group>
          ),
        };
      });
      setRows(rowRender);

      setHeaders([
        {
          label: "Người dùng",
          value: "user",
          isSortable: true,
        },
        {
          label: "Vị trí",
          value: "type",
          isSortable: true,
          dataFilterLabel: "Lọc vị trí",
          dataFilter: [
            {
              value: "admin",
              label: "Quản trị viên",
            },
            {
              value: "user",
              label: "Người dùng",
            },
            {
              value: "manager",
              label: "Quản lý",
            },
            {
              value: "employee",
              label: "Nhân viên",
            },
          ],
        },
        {
          label: "Email",
          value: "email",
          isSortable: false,
        },
        {
          label: "Số điện thoại",
          value: "phone",
          isSortable: false,
        },
        {
          label: "Tuổi",
          value: "age",
          isSortable: false,
        },
        {
          label: "Giới tính",
          value: "sex",
          isSortable: false,
        },
        {
          label: "Địa chỉ",
          value: "address",
          isSortable: false,
        },
        {
          label: "Chỉnh sửa",
          value: "actions",
          isSortable: false,
        },
      ]);
    }
  }, [data]);

  useEffect(() => {
    searchUserByName(currentSearchValue, activePage, limitRow);
  }, [activePage, currentSearchValue, limitRow, searchUserByName]);

  return (
    <div>
      <div className="flex justify-end">
        <Button
          size="compact-sm"
          variant="filled"
          mb={"lg"}
          radius={"md"}
          onClick={() => modalEditUser("Thêm tài khoản mới", false, undefined)}
        >
          Thêm tài khoản
        </Button>
      </div>

      <TableFilter headers={headers}></TableFilter>
    </div>
  );
}

export default ManageAccountPage;
