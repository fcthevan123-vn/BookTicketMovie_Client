import {
  Button,
  Group,
  NumberInput,
  PasswordInput,
  Radio,
  Select,
  TextInput,
} from "@mantine/core";
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
  IconMail,
  IconMapPin,
  IconPassword,
  IconPhone,
} from "@tabler/icons-react";
import { IconUserCircle } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { userServices } from "../../../services";
import { loadingApi } from "../../../untils/loadingApi";

type userProps = {
  fullName: string;
  type: string;
  email: string;
  phone: string;
  sex: string;
  address: string;
  id?: string;
  password?: string;
  age: number;
};

type Props = {
  isUpdate: boolean;
  data?: userProps | undefined;
  apiFetch?: () => void;
};

function FormUser({ isUpdate, data, apiFetch }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<userProps>({
    initialValues: {
      ...(isUpdate ? { id: data && data.id } : ""),
      fullName: "",
      address: "",
      email: "",
      phone: "",
      age: 16,
      sex: "",
      type: "",
      ...(isUpdate ? {} : { password: "" }),
      // password: "",
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
      type: isNotEmpty("Chưa điền vị trí"),
      ...(isUpdate
        ? {}
        : {
            password: matches(
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              "Mật khẩu phải chứa ít nhất 8 ký tự. Bao gồm ít nhất 1 chữ cái, 1 số và 1 ký tự đặc biệt"
            ),
          }),
    },
  });

  async function handleSubmit(dataForm: typeof form.values) {
    setIsLoading(true);
    let api;
    if (isUpdate) {
      api = userServices.updateProfileByAdmin(dataForm, dataForm.id as string);
    } else {
      api = userServices.handleRegisterByAdmin(dataForm);
    }
    const res = await loadingApi(
      api,
      isUpdate ? "Chỉnh sửa tài khoản" : "Tạo tài khoản"
    );
    setIsLoading(false);
    if (res) {
      modals.closeAll();
      apiFetch && apiFetch();
      // getLimitMovies(activePage);
      // onClose();
    }

    return res;
  }

  useEffect(() => {
    if (data) {
      form.setValues({
        fullName: data.fullName,
        address: data.address,
        type: data.type,
        phone: data.phone,
        age: data.age,
        sex: data.sex.toString(),
        email: data.email,
      });
    }
  }, [data]);

  useEffect(() => {});

  return (
    <div>
      <form
        onSubmit={form.onSubmit(() => handleSubmit(form.values))}
        className="flex flex-col gap-3"
      >
        <TextInput
          radius={"md"}
          placeholder="Họ và tên"
          leftSection={<IconUserCircle size={21} />}
          withAsterisk
          {...form.getInputProps("fullName")}
        />

        {!isUpdate && (
          <PasswordInput
            leftSection={<IconPassword size={21}></IconPassword>}
            radius="md"
            placeholder="Mật khẩu"
            {...form.getInputProps("password")}
          />
        )}
        <TextInput
          radius={"md"}
          placeholder="Địa chỉ"
          leftSection={<IconMapPin size={21} />}
          {...form.getInputProps("address")}
        />
        <TextInput
          radius={"md"}
          placeholder="Số điện thoại"
          leftSection={<IconPhone size={21} />}
          {...form.getInputProps("phone")}
        />
        <TextInput
          radius={"md"}
          placeholder="Email"
          leftSection={<IconMail size={21} />}
          {...form.getInputProps("email")}
        />

        <NumberInput
          radius={"md"}
          placeholder="Tuổi"
          leftSection={<IconCalendarEvent size={21} />}
          {...form.getInputProps("age")}
        />

        <Select
          label="Vị trí"
          placeholder="Chọn vị trí"
          data={[
            { value: "admin", label: "Quản trị viên" },
            { value: "employee", label: "Nhân viên" },
            { value: "user", label: "Người dùng" },
          ]}
          radius={"md"}
          {...form.getInputProps("type")}
        />

        <Radio.Group
          name="sexRadio"
          label="Giới tính"
          {...form.getInputProps("sex")}
        >
          <Group mt="xs">
            <Radio value="0" label="Nam" />
            <Radio value="1" label="Nữ" />
          </Group>
        </Radio.Group>

        <div className="flex justify-end gap-2">
          <Button
            radius={"md"}
            size="sm"
            type="reset"
            onClick={() => modals.closeAll()}
            mt="sm"
            variant="outline"
            color="gray"
          >
            Huỷ
          </Button>
          <Button
            loading={isLoading}
            radius={"md"}
            size="sm"
            type="submit"
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
