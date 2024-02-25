import {
  Alert,
  Anchor,
  Button,
  Divider,
  Grid,
  UnstyledButton,
} from "@mantine/core";
import { AiOutlineEdit } from "react-icons/ai";
import { useAuthenticate } from "../../../../hooks";
import { useDisclosure } from "@mantine/hooks";
import ModalUpdateInformation from "../ModalUpdateInformation";
import { IconInfoCircle } from "@tabler/icons-react";
import { authenticateServices } from "../../../../services";
import { notifications } from "@mantine/notifications";

type Props = {};

const UserProfileInformation = (props: Props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [, , dataUser] = useAuthenticate();

  const data = [
    {
      label: "ID người dùng",
      value: dataUser.id,
    },
    {
      label: "Họ và tên",

      value: dataUser.fullName,
    },
    {
      label: "Tuổi",

      value: dataUser.age,
    },
    {
      label: "Email",

      value: dataUser.email,
    },

    {
      label: "Địa chỉ",

      value: dataUser.address,
    },
    {
      label: "Số điện thoại",

      value: dataUser.phone,
    },

    {
      label: "Giới tính",

      value: dataUser.gender,
    },
  ];

  const items = data.map((item, i) => (
    <div key={i} className="mx-4 mb-8">
      <Grid>
        <Grid.Col className="flex items-center" span="auto">
          <p className="font-medium text-left sm:flex items-center">
            {item.label}
          </p>
        </Grid.Col>
        <Grid.Col span={8} className="sm:flex sm:items-center">
          <p className="text-left break-words">{item.value}</p>
        </Grid.Col>
      </Grid>
      <Divider color="gray.2" my="sm" />
    </div>
  ));

  async function handleVerifyEmail() {
    try {
      const res = await authenticateServices.handleVerifyEmail(dataUser.id);
      console.log("res", res);
      notifications.show({
        radius: "lg",
        color: "green",
        title: "Gửi email thành công",
        message: "Vui lòng kiểm tra hộp thư email của bạn",
      });
    } catch (error) {
      const err = error as Error;
      notifications.update({
        id: "toast-register",
        radius: "md",
        color: "red",
        title: <p className="text-red-700">Lỗi xảy ra</p>,
        message: err.message,
        withBorder: true,
        autoClose: 2000,
      });
    }
  }

  return (
    <div className="lg:mx-20">
      {!dataUser?.isVerifyEmail && (
        <Alert
          variant="light"
          color="red"
          className="ms-4"
          title="Xác nhận tài khoản"
          radius={"md"}
          icon={<IconInfoCircle />}
        >
          <div>
            <p>
              Chúng tôi nhận thấy bạn chưa xác nhận tài khoản. Hãy xác nhận tài
              khoản để tiếp tục đặt vé xem phim.
            </p>
            <p
              className="underline underline-offset-2 text-blue-500 cursor-pointer"
              onClick={() => handleVerifyEmail()}
            >
              Nhấn vào đây để xác nhận
            </p>
          </div>
        </Alert>
      )}

      <ModalUpdateInformation
        opened={opened}
        close={close}
      ></ModalUpdateInformation>
      <div className="flex justify-end my-5 md:me-0 me-5">
        <Button
          onClick={open}
          size="xs"
          className="shadow-sm drop-shadow-md"
          radius="md"
        >
          Chỉnh sửa <AiOutlineEdit size="1rem" className="ms-1"></AiOutlineEdit>
        </Button>
      </div>
      {items}
    </div>
  );
};

export default UserProfileInformation;
