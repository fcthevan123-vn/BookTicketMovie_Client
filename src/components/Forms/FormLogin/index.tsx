import { Input, Radio, Group, Button, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";

function FormLogin() {
  const form = useForm({
    initialValues: { name: "", email: "", age: 0 },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      age: (value) =>
        value < 18 ? "You must be at least 18 to register" : null,
    },
  });

  return (
    <div className="lg:mx-8 sm:mx-5 my-3  ">
      <form onSubmit={form.onSubmit(console.log)}>
        <Input.Wrapper
          id="email"
          withAsterisk
          label="Email:"
          mt="sm"
          {...form.getInputProps("email")}
        >
          <Input
            className="border-b-2 px-4 border-sky-300"
            variant="unstyled"
            id="email"
            placeholder="Name"
          />
        </Input.Wrapper>

        <Input.Wrapper id="password" withAsterisk label="Password:" mt="sm">
          <PasswordInput
            className="border-b-2 px-1 border-sky-300"
            variant="unstyled"
            id="password"
            placeholder="Password"
          />
        </Input.Wrapper>

        <div className="flex justify-center">
          <Button
            className="transition-all hover:scale-110"
            size="sm"
            radius="xl"
            type="submit"
            mt="xl"
            variant="gradient"
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
