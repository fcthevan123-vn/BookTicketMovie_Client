import { Button, Group, Input, Modal, Radio } from "@mantine/core";
import { AiOutlinePhone, AiOutlineUser } from "react-icons/ai";
import { useAuthenticate } from "../../../../hooks";
import { useForm } from "@mantine/form";
import { BsCalendarDate, BsMap } from "react-icons/bs";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { userServices } from "../../../../services";
import { useDispatch } from "react-redux";
import { reloadInfo } from "../../../../redux/reducers/userSlice";

interface Props {
  opened: boolean;
  close: () => void;
}

function ModalUpdateInformation({ opened, close }: Props) {
  const [, , dataUser] = useAuthenticate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      fullName: dataUser?.fullName,
      address: dataUser?.address,
      phone: dataUser?.phone,
      age: dataUser?.age,
      sex: dataUser?.gender == "male" ? "0" : "1",
    },

    // functions will be used to validate values at corresponding key
    validate: {
      fullName: (value) =>
        value.length < 5 ? "Tên phải có ít nhất 5 ký tự" : null,
      address: (value) =>
        value.length < 5 ? "Địa chỉ phải có ít nhất 5 ký tự" : null,
      phone: (value) =>
        /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(value)
          ? null
          : "Số điện thoại không hợp lệ",
      sex: (value) => (value.length == 0 ? "Vui lòng chọn giới tính" : null),
      age: (value) =>
        value.length == 0 || parseInt(value) < 8
          ? "Độ tuổi phải lớn hơn 8"
          : null,
    },
    validateInputOnChange: true,
  });

  async function handleSubmit(_data: object) {
    setIsLoading(true);
    try {
      const res = await userServices.updateProfile(_data, dataUser.id);
      if (res.statusCode === 0) {
        dispatch(reloadInfo());
        setIsLoading(false);
        close();
        notifications.show({
          radius: "md",
          title: "Cập nhật thông tin",
          message: res.message,
          withBorder: true,
        });
      }
    } catch (error) {
      const err = error as Error;
      notifications.update({
        id: "toast-register",
        radius: "md",
        color: "red",
        title: <p className="text-red-700">Error</p>,
        message: err.message,
        withBorder: true,
        autoClose: 2000,
      });
      setIsLoading(false);
    }
  }

  return (
    <>
      <Modal
        zIndex={1000}
        radius="lg"
        size="md"
        opened={opened}
        onClose={close}
        title="Sửa thông tin cá nhân của bạn"
        overlayProps={{
          opacity: 0.6,
          blur: 3,
        }}
      >
        <div>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.onSubmit(() => handleSubmit(form.values))}
          >
            <Input
              leftSection={<AiOutlineUser />}
              placeholder="Họ và tên"
              radius="md"
              value={form.values.fullName}
              onChange={(e) => form.setFieldValue("fullName", e.target.value)}
            />
            {form.errors.fullName ? (
              <p className="error-form-auth mt-1">{form.errors.fullName}</p>
            ) : null}

            <Input
              className="mt-4"
              leftSection={<BsMap />}
              placeholder="Địa chỉ"
              radius="md"
              value={form.values.address}
              onChange={(e) => form.setFieldValue("address", e.target.value)}
            />
            {form.errors.address ? (
              <p className="error-form-auth mt-1">{form.errors.address}</p>
            ) : null}

            <Input
              className="mt-4"
              leftSection={<AiOutlinePhone />}
              placeholder="Số điện thoại"
              type="number"
              radius="md"
              value={form.values.phone}
              onChange={(e) => form.setFieldValue("phone", e.target.value)}
            />
            {form.errors.phone ? (
              <p className="error-form-auth mt-1">{form.errors.phone}</p>
            ) : null}

            <Input
              className="mt-4"
              leftSection={<BsCalendarDate />}
              placeholder="Tuổi"
              radius="md"
              type="number"
              value={form.values.age}
              onChange={(e) => form.setFieldValue("age", e.target.value)}
            />
            {form.errors.age ? (
              <p className="error-form-auth mt-1">{form.errors.age}</p>
            ) : null}

            <Radio.Group
              mt={"sm"}
              name="sex"
              label="Giới tính"
              withAsterisk
              value={form.values.sex}
              onChange={(e) => form.setFieldValue("sex", e)}
            >
              <Group mt="xs">
                <Radio value="0" label="Nam" />
                <Radio value="1" label="Nữ" />
              </Group>
            </Radio.Group>
            {form.errors.sex ? (
              <p className="error-form-auth">{form.errors.sex}</p>
            ) : null}

            <div className="mt-4 flex justify-end gap-2">
              <Button
                className="shadow-md drop-shadow-md"
                radius="md"
                size="compact-sm"
                onClick={() => form.reset()}
              >
                Khôi phục mặc định
              </Button>
              <Button
                className="shadow-md drop-shadow-md"
                type="submit"
                radius="md"
                size="compact-sm"
                loading={isLoading}
              >
                Lưu
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default ModalUpdateInformation;
