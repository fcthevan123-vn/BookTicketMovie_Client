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
  Modal,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import FormUser from "../../../components/Forms/FormUser";
import { userServices } from "../../../services";
import { useEffect, useState } from "react";

type Props = {};

type userProps = {
  fullName: string;
  type: string;
  email: string;
  phone: number;
  sex: number;
  address: string;
  id?: string;
};

const jobColors: Record<string, string> = {
  engineer: "blue",
  manager: "cyan",
  designer: "pink",
};

function ManageAccountPage({}: Props) {
  const [data, setData] = useState<userProps[]>();

  const modalEditUser = (title: string, isUpdate: boolean) =>
    modals.open({
      title: (
        <Text c="blue" fw={500}>
          {title}
        </Text>
      ),
      children: (
        <>
          <FormUser isUpdate={isUpdate}></FormUser>
        </>
      ),
      lockScroll: false,
      radius: "lg",
    });

  async function handleGetAllUsers() {
    try {
      const res = await userServices.getAllUsersByRule(5, 1);
      if (res.statusCode === 0) {
        setData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
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
            <Text fz="sm" fw={500}>
              {item.fullName}
            </Text>
          </Group>
        </Table.Td>

        <Table.Td>
          <Badge color={jobColors[item.type.toLowerCase()]} variant="light">
            {item.type}
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
            18
          </Text>
        </Table.Td>
        <Table.Td>
          <Text fz="sm" ta={"center"}>
            Nam
          </Text>
        </Table.Td>
        <Table.Td>
          <Text fz="sm">Can Tho, Viet Nam</Text>
        </Table.Td>
        <Table.Td>
          <Group gap={5} justify="center">
            <ActionIcon
              onClick={() => modalEditUser("Chỉnh sửa tài khoản", true)}
              variant="light"
              color="blue"
              radius={"md"}
            >
              <IconPencil
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            </ActionIcon>
            <ActionIcon variant="light" color="red" radius={"md"}>
              <IconTrash
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
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
    <div className="sm:mx-5">
      {/* <Modal opened={opened} onClose={close} title="Authentication">
       <FormUser isUpdate={isUpdate}></FormUser>
      </Modal> */}

      <div className="flex justify-end">
        <Button
          size="compact-sm"
          variant="filled"
          my={"lg"}
          radius={"md"}
          onClick={() => modalEditUser("Thêm tài khoản mới", false)}
        >
          Thêm tài khoản
        </Button>
      </div>
      <Table.ScrollContainer minWidth={800}>
        <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm">
          <Table striped withColumnBorders verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Người dùng</Table.Th>
                <Table.Th>Vị trí</Table.Th>
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
  );
}

export default ManageAccountPage;
