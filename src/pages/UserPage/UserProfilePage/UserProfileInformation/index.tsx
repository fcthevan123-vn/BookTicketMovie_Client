import { Alert, Button, Divider, Grid } from "@mantine/core";
import { AiOutlineEdit } from "react-icons/ai";
import { useAuthenticate } from "../../../../hooks";
import { useDisclosure } from "@mantine/hooks";
import ModalUpdateInformation from "../ModalUpdateInformation";
import { IconInfoCircle } from "@tabler/icons-react";

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
          Chúng tôi nhận thấy bạn chưa xác nhận tài khoản. Hãy xác nhận tài
          khoản để tiếp tục đặt vé xem phim.
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
