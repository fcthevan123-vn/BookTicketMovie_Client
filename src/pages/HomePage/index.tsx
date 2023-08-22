import { useDisclosure } from "@mantine/hooks";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
function HomePage() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div className="flex flex-col gap-2 h-screen container justify-center items-center pt-20">
      Homepage
      <Button variant="light" color="cyan" radius="xl">
        Login
      </Button>
      <Link to={"/register"}>
        <Button variant="light" color="yellow" radius="xl">
          Sign up
        </Button>
      </Link>
    </div>
  );
}

export default HomePage;
