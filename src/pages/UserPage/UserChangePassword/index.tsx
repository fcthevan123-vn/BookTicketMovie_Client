import { Button, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FaDotCircle } from "react-icons/fa";
import { useAuthenticate } from "../../../hooks";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";
import { userServices } from "../../../services";
import { reloadInfo } from "../../../redux/reducers/userSlice";
import { useDispatch } from "react-redux";

const UserChangePassword = () => {
  const [, , dataUser] = useAuthenticate();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },

    // functions will be used to validate values at corresponding key
    validate: {
      oldPassword: (value) =>
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
          value
        )
          ? null
          : "Password invalid",
      newPassword: (value, values) => {
        if (value.length > 0 && value == values.oldPassword) {
          return "New password must differ from old password";
        }
        if (
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
            value
          )
        ) {
          return null;
        } else {
          return "Password invalid";
        }
      },
      confirmPassword: (value, values) =>
        value == values.newPassword ? null : "Confirm password does not match",
    },
    validateInputOnChange: true,
  });

  async function handleSubmit(_data: object) {
    setIsLoading(true);
    notifications.show({
      id: "toast-changePassword",
      loading: true,
      radius: "md",
      title: "Change your password",
      message: "It can take some minutes",
      autoClose: false,
      withCloseButton: false,
      withBorder: true,
    });
    try {
      const res = await userServices.changePassword(_data, dataUser.id);
      if (res.statusCode === 0) {
        setIsLoading(false);
        notifications.update({
          id: "toast-changePassword",
          radius: "md",
          color: "blue",
          title: <p className="text-blue-500">Success</p>,
          message: res.message,
          withBorder: true,
          autoClose: 2000,
        });
        dispatch(reloadInfo());
        form.reset();
      }
    } catch (error) {
      notifications.update({
        id: "toast-changePassword",
        radius: "md",
        color: "red",
        title: <p className="text-red-700">Error</p>,
        message: error.response?.data?.message,
        withBorder: true,
        autoClose: 2000,
      });
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={form.onSubmit(() => handleSubmit(form.values))}>
      <div className="p-5 flex sm:flex-row flex-col items-center justify-center lg:gap-16 md:gap-8 gap-5">
        <div className="sm:w-1/3 w-3/4 flex flex-col gap-5 sm:order-none order-last">
          <PasswordInput
            placeholder="Password"
            label="Password"
            radius="md"
            withAsterisk
            error
            {...form.getInputProps("oldPassword")}
          />

          <PasswordInput
            placeholder="New Password"
            label="New Password"
            radius="md"
            withAsterisk
            {...form.getInputProps("newPassword")}
          />

          <PasswordInput
            placeholder="Confirm Password"
            label="Confirm Password"
            radius="md"
            withAsterisk
            {...form.getInputProps("confirmPassword")}
          />
          <div className="flex gap-2">
            <Button loading={isLoading} radius="md" w={"50%"} type="submit">
              Save
            </Button>
            <Button
              radius="md"
              w={"50%"}
              type="reset"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
          </div>
        </div>

        <div className="sm:w-2/3 w-100 flex flex-col items-start justify-center">
          <div className="mb-4">
            <p className="lg:text-3xl text-2xl text-sky-500">
              Change Your Password
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="italic text-gray-500 font-light">
              Password must contain *
            </p>
            <p className="flex items-center gap-3">
              <FaDotCircle className=" text-sky-500"></FaDotCircle>At least 8
              characters
            </p>
            <p className="flex items-center gap-3">
              <FaDotCircle className=" text-sky-500"></FaDotCircle>At least 1
              letter
            </p>
            <p className="flex items-center gap-3">
              <FaDotCircle className=" text-sky-500"></FaDotCircle>At least 1
              number
            </p>
            <p className="flex items-center gap-3">
              <FaDotCircle className=" text-sky-500"></FaDotCircle>At least 1
              special character
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UserChangePassword;
