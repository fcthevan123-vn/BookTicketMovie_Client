import { Input, Radio, Group, Button, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { AxiosError } from "axios";
import { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";
import { authenticateServices, userServices } from "../../../services";
import { useNavigate } from "react-router-dom";
import { userSlice } from "../../../redux/reducers";
import { useDispatch } from "react-redux";

function FormLogin() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, setLogin] = useState(false);
  const form = useForm({
    initialValues: { email: "", password: "" },

    // functions will be used to validate values at corresponding key
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email invalid"),
      password: (value) => (value.length == 0 ? "Password invalid" : null),
    },
    validateInputOnChange: true,
  });

  const getProfile = async () => {
    const res = await userServices.getProfile();
    if (res.statusCode === 0) {
      dispatch(
        userSlice.actions.handleLogin({
          id: res.data.id,
          email: res.data.email,
          fullName: res.data.fullName,
          isVerifyEmail: res.data.isVerifyEmail,
          phone: res.data.phone,
          address: res.data.address,
        })
      );
      setLogin(true);
      navigate("/");
    } else {
      navigate("/register");
    }
  };

  async function handleLogin(email: string, password: string) {
    setIsLoading(true);
    notifications.show({
      id: "load-data",
      loading: true,
      radius: "md",
      title: "Login...",
      message: "It can take some minutes",
      autoClose: false,
      withCloseButton: false,
      withBorder: true,
    });
    try {
      const res = await authenticateServices.handleLogin(email, password);
      if (res.statusCode === 0) {
        notifications.update({
          id: "load-data",
          radius: "lg",
          color: "teal",
          title: <p className="text-teal-600">Success</p>,
          message: res.message,
          withBorder: true,
          icon: <AiOutlineCheckCircle size="1.2rem" />,
          autoClose: 2000,
        });
        // form.reset();
        getProfile();
      } else {
        notifications.update({
          id: "load-data",
          radius: "lg",
          color: "red",
          title: <p className="text-red-700">Error</p>,
          message: res?.message,
          withBorder: true,
          icon: <BiErrorCircle size="1.2rem" />,
          autoClose: 2000,
        });
      }
      setIsLoading(false);
    } catch (error) {
      const err = error as AxiosError;
      notifications.update({
        id: "load-data",
        radius: "md",
        color: "red",
        title: <p className="text-red-700">Error</p>,
        message: err.response?.data?.message,
        withBorder: true,
        icon: <BiErrorCircle size="1.2rem" />,
        autoClose: 2000,
      });
      setIsLoading(false);
    }
  }

  return (
    <div className="lg:mx-8 sm:mx-5 my-3 p-3 border-sky-300 boxshadow-custom rounded-lg">
      <form
        onSubmit={form.onSubmit(() =>
          handleLogin(form.values.email, form.values.password)
        )}
      >
        <Input.Wrapper id="email" withAsterisk label="Email:" mt="sm">
          <Input
            className="border-b-2 px-4 border-sky-300"
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

        <Input.Wrapper id="password" withAsterisk label="Password:" mt="sm">
          <PasswordInput
            className="border-b-2 px-1 border-sky-300"
            variant="unstyled"
            id="password"
            placeholder="Password"
            value={form.values.password}
            onChange={(e) => form.setFieldValue("password", e.target.value)}
          />
        </Input.Wrapper>
        {form.errors.password ? (
          <p className="error-form-auth">{form.errors.password}</p>
        ) : null}

        <div className="flex justify-center">
          <Button
            className="transition-all hover:scale-110"
            size="sm"
            radius="xl"
            type="submit"
            mt="xl"
            variant="gradient"
            loading={isLoading}
            gradient={{ from: "teal", to: "blue", deg: 60 }}
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}

export default FormLogin;
