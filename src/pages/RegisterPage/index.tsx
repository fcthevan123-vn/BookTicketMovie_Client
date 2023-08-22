import FormRegister from "../../components/Forms/FormRegister";
import pageLost from "../../assets/Image/page-lost.svg";
import groupPeople from "../../assets/Image/group-of-happy-business-people.svg";
import { motion, transform } from "framer-motion";
import { Image, Tabs, Transition } from "@mantine/core";
import { AiOutlineUser } from "react-icons/ai";
import { IoCreateOutline } from "react-icons/io5";
import FormLogin from "../../components/Forms/FormLogin";
function RegisterPage() {
  return (
    <div className="grid grid-cols-5 py-10 px-10  h-screen ">
      <div
        className="col-span-3 relative bg-sky-500 drop-shadow-2xl	rounded-lg flex flex-col items-center justify-center "
        style={{ boxShadow: "0 10px 50px rgba(2,132,199,0.7)" }}
      >
        <div className="absolute z-10 ">
          <p className="text-center text-4xl  mt-3 italic text-white font-medium">
            Welcome to Show Star Bookings!
          </p>

          <p className="text-lg italic indent-8 text-white mt-2 text-justify px-3 ">
            Register an account now to experience the excitement of convenient
            movie ticket booking. Share your passion for movies, discover
            captivating films, and indulge in fantastic entertainment
            experiences right here.
          </p>
        </div>

        <div className="absolute h-100 w-100 scale-75 z-0 top-0 left-0	">
          <Image src={pageLost}></Image>
        </div>
        <div className="absolute h-100 w-100 z-0 -bottom-9 right-9	">
          <Image src={groupPeople} className="scale-125"></Image>
        </div>
      </div>
      <div
        className="col-span-2 pt-3 my-4  rounded-r-lg w-full fade-in-fwd"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
        }}
      >
        <Tabs
          className="h-full relative "
          variant="pills"
          radius="xl"
          defaultValue="Login"
        >
          <Tabs.List className="float-right pr-5 absolute z-10 right-4">
            <Tabs.Tab value="Login" icon={<AiOutlineUser size="0.8rem" />}>
              Login
            </Tabs.Tab>
            <Tabs.Tab value="SignUp" icon={<IoCreateOutline size="0.8rem" />}>
              Sign Up
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel
            className="absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 w-full "
            value="SignUp"
            pt="xs"
          >
            <FormRegister></FormRegister>
          </Tabs.Panel>

          <Tabs.Panel
            className="absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 w-full "
            value="Login"
            pt="xs"
          >
            <FormLogin></FormLogin>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
}

export default RegisterPage;
