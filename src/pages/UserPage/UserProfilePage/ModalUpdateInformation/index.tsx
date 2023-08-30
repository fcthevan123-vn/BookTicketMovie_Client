import {
  Button,
  Group,
  Input,
  Modal,
  Radio,
  useMantineTheme,
} from "@mantine/core";
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
  const theme = useMantineTheme();
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
        value.length < 2 ? "Name must have at least 2 letters" : null,
      address: (value) =>
        value.length < 5 ? "Address must have at least 5 letters" : null,
      phone: (value) =>
        /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(value) ? null : "Phone invalid",
      sex: (value) => (value.length == 0 ? "Please select your gender" : null),
      age: (value) =>
        value.length == 0 || parseInt(value) < 8
          ? "Age must larger than 8"
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
          title: "Success",
          message: res.message,
          withBorder: true,
        });
      }
    } catch (error) {
      notifications.update({
        id: "toast-register",
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
    <>
      <Modal
        zIndex={1000}
        radius="lg"
        size="md"
        opened={opened}
        onClose={close}
        title="Update your information"
        overlayProps={{
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[4],
          opacity: 0.6,
          blur: 3,
        }}
      >
        <div>
          <form onSubmit={form.onSubmit(() => handleSubmit(form.values))}>
            <Input
              icon={<AiOutlineUser />}
              placeholder="Full Name"
              radius="md"
              value={form.values.fullName}
              onChange={(e) => form.setFieldValue("fullName", e.target.value)}
            />
            {form.errors.fullName ? (
              <p className="error-form-auth mt-1">{form.errors.fullName}</p>
            ) : null}

            <Input
              className="mt-4"
              icon={<BsMap />}
              placeholder="Address"
              radius="md"
              value={form.values.address}
              onChange={(e) => form.setFieldValue("address", e.target.value)}
            />
            {form.errors.address ? (
              <p className="error-form-auth mt-1">{form.errors.address}</p>
            ) : null}

            <Input
              className="mt-4"
              icon={<AiOutlinePhone />}
              placeholder="Phone"
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
              icon={<BsCalendarDate />}
              placeholder="Age"
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
              label="Select your gender"
              withAsterisk
              value={form.values.sex}
              onChange={(e) => form.setFieldValue("sex", e)}
            >
              <Group mt="xs">
                <Radio value="0" label="Male" />
                <Radio value="1" label="Female" />
              </Group>
            </Radio.Group>
            {form.errors.sex ? (
              <p className="error-form-auth">{form.errors.sex}</p>
            ) : null}

            <div className="mt-4 flex justify-end gap-2">
              <Button
                className="shadow-md drop-shadow-md"
                radius="md"
                compact
                onClick={() => form.reset()}
              >
                Reset Default
              </Button>
              <Button
                className="shadow-md drop-shadow-md"
                type="submit"
                radius="md"
                compact
                loading={isLoading}
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default ModalUpdateInformation;
