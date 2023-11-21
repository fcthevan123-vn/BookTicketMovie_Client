import { Input, Button, PasswordInput, Checkbox } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { authenticateServices, userServices } from "../../../services";
import { useNavigate } from "react-router-dom";
import { userSlice } from "../../../redux/reducers";
import { useDispatch } from "react-redux";
import { loadingApi } from "../../../untils/loadingApi";

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
          id: res?.data?.id,
          email: res?.data?.email,
          fullName: res?.data?.fullName,
          isVerifyEmail: res?.data?.isVerifyEmail,
          phone: res?.data?.phone,
          address: res?.data?.address,
          age: res?.data?.age,
          count: res?.data?.count,
          gender: res?.data?.sex === 0 ? "Nam" : "Nữ",
          type: res?.data?.type,
        })
      );
      setLogin(true);

      // handle forward link
      const urlParams = new URLSearchParams(window.location.search);

      const forwardTo = urlParams.get("forwardTo");
      const open = urlParams.get("open");

      if (forwardTo) {
        navigate(`${forwardTo + `?open=${open}`}`);
      } else {
        navigate("/");
      }
    } else {
      navigate("/register");
    }
  };

  async function handleLogin(email: string, password: string) {
    setIsLoading(true);
    const api = authenticateServices.handleLogin(email, password);
    const res = await loadingApi(api, "Đăng nhập");
    if (res === true) {
      getProfile();
    }
    setIsLoading(false);
    return res;
  }

  return (
    <div className="lg:mx-8 sm:mx-5 my-3 p-3 border-sky-300  rounded-lg">
      <form
        onSubmit={form.onSubmit(() =>
          handleLogin(form.values.email, form.values.password)
        )}
      >
        <Input.Wrapper id="email" withAsterisk label="Tài khoản:" mt="sm">
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

        <Input.Wrapper id="password" withAsterisk label="Mật khẩu:" mt="sm">
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

        <Checkbox label="Nhớ tài khoản" radius="sm" className="mt-6" />

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
            Đăng nhập
          </Button>
        </div>
      </form>
    </div>
  );
}

export default FormLogin;
