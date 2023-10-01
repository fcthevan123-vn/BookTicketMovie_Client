import { Button, Input, TextInput } from "@mantine/core";
import {
  useForm,
  hasLength,
  isNotEmpty,
  isEmail,
  matches,
  isInRange,
} from "@mantine/form";
import { modals } from "@mantine/modals";
import {
  IconCalendarEvent,
  IconFriends,
  IconMail,
  IconMapPin,
  IconPassword,
  IconPhone,
} from "@tabler/icons-react";
import { IconUserCircle } from "@tabler/icons-react";

type Props = {
  isUpdate: boolean;
};

function FormUser({ isUpdate }: Props) {
  const form = useForm({
    initialValues: {
      fullName: "",
      address: "",
      email: "",
      phone: "",
      age: 0,
      sex: 0,
    },

    validate: {
      fullName: hasLength(
        { min: 2, max: 100 },
        "Tên phải nằm trong khoảng 2 - 100 ký tự"
      ),
      address: hasLength(
        { min: 2, max: 1000 },
        "Địa chỉ nằm trong khoảng 2 - 100 ký tự"
      ),
      email: isEmail("Email không hợp lệ"),
      phone: matches(
        /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
        "Số điện thoại không hợp lệ"
      ),
      age: isInRange(
        { min: 4, max: 99 },
        "Độ tuổi phải nằm trong khoảng 4 - 99 tuổi"
      ),
      sex: isNotEmpty("Chưa điền giới tính"),
    },
  });

  function handleSubmit() {
    console.log("ok");
  }

  return (
    <div>
      <form
        onSubmit={form.onSubmit(() => handleSubmit())}
        className="flex flex-col gap-3"
      >
        <TextInput
          radius={"md"}
          label="Your email"
          placeholder="Họ và tên"
          leftSection={<IconUserCircle size={21} />}
          withAsterisk
          {...form.getInputProps("fullName")}
        />

        {!isUpdate && (
          <Input
            radius={"md"}
            placeholder="Mật khẩu"
            leftSection={<IconPassword size={21} />}
          />
        )}
        <Input
          radius={"md"}
          placeholder="Địa chỉ"
          leftSection={<IconMapPin size={21} />}
          {...form.getInputProps("address")}
        />
        <Input
          radius={"md"}
          placeholder="Số điện thoại"
          leftSection={<IconPhone size={21} />}
          {...form.getInputProps("phone")}
        />
        <Input
          radius={"md"}
          placeholder="Email"
          leftSection={<IconMail size={21} />}
          {...form.getInputProps("email")}
        />
        <Input
          radius={"md"}
          placeholder="Giới tính"
          leftSection={<IconFriends size={21} />}
          {...form.getInputProps("sex")}
        />
        <Input
          radius={"md"}
          placeholder="Tuổi"
          leftSection={<IconCalendarEvent size={21} />}
          {...form.getInputProps("age")}
        />

        <div className="flex justify-end gap-2">
          <Button
            radius={"md"}
            size="compact-sm"
            type="reset"
            onClick={() => modals.closeAll()}
            mt="sm"
            variant="outline"
            color="gray"
          >
            Huỷ
          </Button>
          <Button
            radius={"md"}
            size="compact-sm"
            type="submit"
            // onClick={() => modals.closeAll()}
            mt="sm"
          >
            Lưu
          </Button>
        </div>
      </form>
    </div>
  );
}

export default FormUser;
