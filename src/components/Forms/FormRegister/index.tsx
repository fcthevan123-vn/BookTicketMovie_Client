import {
  Button,
  Divider,
  Group,
  Input,
  PasswordInput,
  Radio,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";

function FormRegister() {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      address: "",
      password: "",
      confirmPassword: "",
      sex: "",
    },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      address: (value) =>
        value.length < 5 ? "Address must have at least 5 letters" : null,
      password: (value) =>
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
          value
        )
          ? null
          : "Password invalid",
      confirmPassword: (value, values) =>
        value == values.password ? null : "Confirm password does not match",
    },
    validateInputOnChange: true,
  });

  function handleSubmit(_data: object) {
    console.log(_data);
  }

  return (
    <div className="lg:mx-8 sm:mx-5 py-3 ">
      <form onSubmit={form.onSubmit(() => handleSubmit(form.values))}>
        <Input.Wrapper id="userName" withAsterisk label="Name:" mt="sm">
          <Input
            className="border-b-2 px-3 border-sky-300"
            variant="unstyled"
            id="userName"
            placeholder="Name"
            value={form.values.name}
            onChange={(e) => form.setFieldValue("name", e.target.value)}
          />
        </Input.Wrapper>
        {form.errors.name ? (
          <p className="error-form-auth">{form.errors.name}</p>
        ) : null}

        <Input.Wrapper id="address" withAsterisk label="Address:" mt="sm">
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

        <Input.Wrapper
          id="password"
          withAsterisk
          label="Password:"
          mt="sm"
          description="Password minimum eight characters, at least one letter, one number and one special character"
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
          label="Confirm Password:"
          mt="sm"
          description="Confirm password must matches the password"
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

        <div className="flex justify-center">
          <Button
            className="transition-all hover:scale-110"
            size="sm"
            radius="xl"
            type="submit"
            mt="xl"
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
          >
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
}

export default FormRegister;
