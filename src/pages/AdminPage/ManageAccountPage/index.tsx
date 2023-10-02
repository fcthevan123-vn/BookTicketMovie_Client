import {
  Table,
  Group,
  Avatar,
  Badge,
  Anchor,
  ActionIcon,
  rem,
  Text,
  Button,
  Skeleton,
  Tooltip,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import {
  IconAdjustments,
  IconCaretDownFilled,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import FormUser from "../../../components/Forms/FormUser";
import { userServices } from "../../../services";
import { useEffect, useState } from "react";
import { loadingApi } from "../../../untils/loadingApi";
import FilterHeaderTable from "../../../components/FilterHeaderTable";

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

const jobColors: Record<string, string> = {
  user: "blue",
  admin: "orange",
  manager: "pink",
  employee: "green",
};

function ManageAccountPage() {
  const [data, setData] = useState<userProps[]>();
  const [isLoading, setIsLoading] = useState(false);

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

  async function handleGetAllUsers() {
    try {
      const res = await userServices.getAllUsersByRule(20, 1);
      if (res.statusCode === 0) {
        setData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

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

  const rows = data ? (
    data.map((item, index) => (
      <Table.Tr key={index}>
        <Table.Td>
          <Group gap="sm">
            <Avatar
              size={37}
              src={
                "https://img.freepik.com/free-vector/gradient-minimalist-background_23-2149974328.jpg?w=1060&t=st=1696167379~exp=1696167979~hmac=d118c5067d20b1691f1afbf6c377db2fba119ba07ad14137907744ff747a24ca"
              }
              radius={30}
            />
            <Text fz="sm" fw={500} truncate="end" w={120}>
              {item.fullName}
            </Text>
          </Group>
        </Table.Td>

        <Table.Td>
          <Badge color={jobColors[item.type.toLowerCase()]} variant="light">
            {item.type == "admin"
              ? "Quản trị viên"
              : item.type == "manager"
              ? "Quản lý"
              : item.type == "employee"
              ? "Nhân viên"
              : "Người dùng"}
          </Badge>
        </Table.Td>
        <Table.Td>
          <Anchor component="button" size="sm">
            {item.email}
          </Anchor>
        </Table.Td>
        <Table.Td>
          <Text fz="sm">{item.phone}</Text>
        </Table.Td>
        <Table.Td>
          <Text fz="sm" ta={"center"}>
            {item.age}
          </Text>
        </Table.Td>
        <Table.Td>
          <Text fz="sm" ta={"center"}>
            {item.sex == "0" ? "Nam" : "Nữ"}
          </Text>
        </Table.Td>
        <Table.Td>
          <Tooltip label={item.address}>
            <Text fz="sm" truncate="end" w={200}>
              {item.address}
            </Text>
          </Tooltip>
        </Table.Td>
        <Table.Td>
          <Group gap={5} justify="center">
            <ActionIcon
              onClick={() => modalEditUser("Chỉnh sửa tài khoản", true, item)}
              variant="light"
              color="blue"
              radius={"md"}
              loading={isLoading}
            >
              <IconPencil
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            </ActionIcon>
            <ActionIcon
              variant="light"
              color="red"
              loading={isLoading}
              radius={"md"}
              onClick={() => modalDeleteUser(item.id as string)}
            >
              <IconTrash
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
                onClick={() => modalDeleteUser(item.id as string)}
              />
            </ActionIcon>
          </Group>
        </Table.Td>
      </Table.Tr>
    ))
  ) : (
    <Table.Tr>
      <Table.Td>
        <Skeleton height={300} mt={6} radius="lg" />
      </Table.Td>
      <Table.Td>
        <Skeleton height={300} mt={6} radius="lg" />
      </Table.Td>
      <Table.Td>
        <Skeleton height={300} mt={6} radius="lg" />
      </Table.Td>
      <Table.Td>
        <Skeleton height={300} mt={6} radius="lg" />
      </Table.Td>
      <Table.Td>
        <Skeleton height={300} mt={6} radius="lg" />
      </Table.Td>
      <Table.Td>
        <Skeleton height={300} mt={6} radius="lg" />
      </Table.Td>
      <Table.Td>
        <Skeleton height={300} mt={6} radius="lg" />
      </Table.Td>
      <Table.Td>
        <Skeleton height={300} mt={6} radius="lg" />
      </Table.Td>
    </Table.Tr>
  );

  useEffect(() => {
    handleGetAllUsers();
  }, []);

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
      <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        <Table.ScrollContainer minWidth={800}>
          <div>
            <Table striped withColumnBorders verticalSpacing="sm">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Người dùng</Table.Th>
                  <Table.Th>
                    <FilterHeaderTable></FilterHeaderTable>
                  </Table.Th>
                  <Table.Th>Email</Table.Th>
                  <Table.Th>Số điện thoại</Table.Th>
                  <Table.Th ta={"center"}>Tuổi</Table.Th>
                  <Table.Th ta={"center"}>Giới tính</Table.Th>
                  <Table.Th>Địa chỉ</Table.Th>
                  <Table.Th />
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </div>
        </Table.ScrollContainer>
      </div>
    </div>
  );
}

export default ManageAccountPage;
