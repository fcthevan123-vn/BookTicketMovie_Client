import {
  Button,
  Divider,
  Group,
  Input,
  Notification,
  NumberInput,
  PasswordInput,
  Radio,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { userServices } from "../../../services";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { BiErrorCircle } from "react-icons/bi";
import { AiOutlineCheckCircle } from "react-icons/ai";

function FormRegister() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm({
    initialValues: {
      fullName: "",
      email: "",
      address: "",
      password: "",
      confirmPassword: "",
      sex: "",
      phone: "",
      age: "",
    },

    // functions will be used to validate values at corresponding key
    validate: {
      fullName: (value) =>
        value.length < 2 ? "Tên phải có ít nhất 2 chữ cái" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email không hợp lệ"),
      address: (value) =>
        value.length < 5 ? "Địa chỉ phải có ít nhất 5 chữ cái" : null,
      password: (value) =>
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
          value
        )
          ? null
          : "Mật khẩu không hợp lệ",
      confirmPassword: (value, values) =>
        value == values.password ? null : "Mật khẩu nhập lại không khớp",
      phone: (value) =>
        /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(value)
          ? null
          : "Số điện thoại không hợp lệ",
      sex: (value) =>
        value.length == 0 ? "Vui lòng chọn giới tính của bạn" : null,
      age: (value) =>
        value.length == 0 || parseInt(value) < 8
          ? "Độ tuổi phải lớn hơn 8"
          : null,
    },
    validateInputOnChange: true,
  });

  async function handleSubmit(_data: object) {
    setIsLoading(true);
    notifications.show({
      id: "toast-register",
      loading: true,
      radius: "md",
      title: "Create your account",
      message: "It can take some minutes",
      autoClose: false,
      withCloseButton: false,
      withBorder: true,
    });
    try {
      const res = await userServices.handleRegister(_data);
      if (res.statusCode === 0) {
        setIsLoading(false);
        notifications.update({
          id: "toast-register",
          radius: "md",
          color: "teal",
          title: <p className="text-teal-600">Success</p>,
          message: res.message,
          withBorder: true,
          icon: <AiOutlineCheckCircle size="1.2rem" />,
          autoClose: 2000,
        });
        form.reset();
      }
    } catch (error) {
      notifications.update({
        id: "toast-register",
        radius: "md",
        color: "red",
        title: <p className="text-red-700">Error</p>,
        message: error.response?.data?.message,
        withBorder: true,
        icon: <BiErrorCircle size="1.2rem" />,
        autoClose: 2000,
      });
      setIsLoading(false);
    }
  }

  return (
    <div className="lg:mx-8 sm:mx-5 py-3 ">
      <form onSubmit={form.onSubmit(() => handleSubmit(form.values))}>
        <Input.Wrapper id="userName" withAsterisk label="Họ và tên:" mt="sm">
          <Input
            className="border-b-2 px-3 border-sky-300"
            variant="unstyled"
            id="userName"
            placeholder="Full name"
            value={form.values.fullName}
            onChange={(e) => form.setFieldValue("fullName", e.target.value)}
          />
        </Input.Wrapper>
        {form.errors.fullName ? (
          <p className="error-form-auth">{form.errors.fullName}</p>
        ) : null}

        <Input.Wrapper id="address" withAsterisk label="Địa chỉ:" mt="sm">
          <Input
            className="border-b-2 px-3 border-sky-300"
            variant="unstyled"
            id="address"
            placeholder="Address"
            value={form.values.address}
            onChange={(e) => form.setFieldValue("address", e.target.value)}
          />
        </Input.Wrapper>
        {form.errors.address ? (
          <p className="error-form-auth">{form.errors.address}</p>
        ) : null}

        <Input.Wrapper id="email" withAsterisk label="Email:" mt="sm">
          <Input
            className="border-b-2 px-3 border-sky-300"
            variant="unstyled"
            id="email"
            placeholder="Email"
            value={form.values.email}
            onChange={(e) => form.setFieldValue("email", e.target.value)}
          />
        </Input.Wrapper>
        {form.errors.email ? (
          <p className="error-form-auth">{form.errors.email}</p>
        ) : null}

        <div className="flex justify-between sm:gap-10 gap-6">
          <div className="w-1/2">
            <Input.Wrapper id="age" withAsterisk label="Tuổi:" mt="sm">
              <TextInput
                type="number"
                id="age"
                placeholder="Age"
                variant="unstyled"
                withAsterisk
                className="border-b-2 px-3 border-sky-300"
                value={form.values.age}
                onChange={(e) => form.setFieldValue("age", e.target.value)}
              />
            </Input.Wrapper>
            {form.errors.age ? (
              <p className="error-form-auth">{form.errors.age}</p>
            ) : null}
          </div>

          <div className="w-1/2">
            <Input.Wrapper
              id="phone"
              withAsterisk
              label="Số điện thoại:"
              mt="sm"
            >
              <Input
                className="border-b-2 px-3 border-sky-300"
                variant="unstyled"
                id="phone"
                placeholder="Phone"
                value={form.values.phone}
                onChange={(e) => form.setFieldValue("phone", e.target.value)}
              />
            </Input.Wrapper>
            {form.errors.phone ? (
              <p className="error-form-auth">{form.errors.phone}</p>
            ) : null}
          </div>
        </div>

        <Input.Wrapper
          id="password"
          withAsterisk
          label="Mật khẩu:"
          mt="sm"
          description="Mật khẩu tối thiểu 8 ký tự, ít nhất 1 chữ cái, 1 số và 1 ký tự đặc biệt"
        >
          <PasswordInput
            className="border-b-2  border-sky-300"
            variant="unstyled"
            id="password"
            placeholder="Password"
            value={form.values.password}
            onChange={(e) => form.setFieldValue("password", e.target.value)}
            // {...form.getInputProps("password")}
          />
        </Input.Wrapper>
        {form.errors.password ? (
          <p className="error-form-auth">{form.errors.password}</p>
        ) : null}

        <Input.Wrapper
          id="confirmPassword"
          withAsterisk
          label="Nhập lại mật khẩu:"
          mt="sm"
        >
          <PasswordInput
            className="border-b-2 px-1 border-sky-300"
            variant="unstyled"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={form.values.confirmPassword}
            onChange={(e) =>
              form.setFieldValue("confirmPassword", e.target.value)
            }
          />
        </Input.Wrapper>
        {form.errors.confirmPassword ? (
          <p className="error-form-auth">{form.errors.confirmPassword}</p>
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

        <div className="flex justify-center">
          <Button
            disabled={isLoading}
            className="transition-all hover:scale-110"
            size="sm"
            radius="xl"
            type="submit"
            mt="xl"
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
          >
            Đăng ký ngay
          </Button>
        </div>
      </form>
    </div>
  );
}

export default FormRegister;
