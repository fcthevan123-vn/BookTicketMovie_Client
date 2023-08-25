import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
function MoviePage() {
  return (
    <div className="flex bg-blue-200 w-full flex-col gap-2 h-screen  justify-center items-center pt-20">
      MoviePage
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

export default MoviePage;
