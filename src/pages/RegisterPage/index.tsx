import FormRegister from "../../components/Forms/FormRegister";
import { Image, Tabs, Transition } from "@mantine/core";
import { AiOutlineUser } from "react-icons/ai";
import { IoCreateOutline } from "react-icons/io5";
import FormLogin from "../../components/Forms/FormLogin";
import styles from "./RegisterPage.module.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);

function RegisterPage() {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500  sm:bg-none sm:bg-gray-200  grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-4 p-5 h-screen  boxshadow-custom">
      <div className="lg:col-span-3  md:col-span-2	sm:col-span-2 hidden boxshadow-custom rounded-l-xl relative bg-gradient-to-r from-cyan-500 to-blue-500 sm:flex flex-col items-center justify-center ">
        <div className="absolute z-10 ">
          <p className="text-center mx-3 text-4xl mt-3 italic text-white font-medium">
            Welcome to Show Booking!
          </p>

          <p className="text-lg mx-3 italic indent-8 text-white mt-2 text-justify px-3 ">
            Register an account now to experience the excitement of convenient
            movie ticket booking. Share your passion for movies, discover
            captivating films, and indulge in fantastic entertainment
            experiences right here.
          </p>
        </div>
      </div>
      <div className="bg-white col-span-2 md:col-span-2 sm:col-span-2 pt-3 w-full boxshadow-custom sm:rounded-none sm:rounded-r-xl   rounded-xl">
        <Tabs
          className="h-full relative "
          variant="pills"
          radius="xl"
          defaultValue="Login"
        >
          <Tabs.List className="float-right pr-5 absolute z-10 right-4 ">
            <Tabs.Tab value="Login" icon={<AiOutlineUser size="0.8rem" />}>
              Login
            </Tabs.Tab>
            <Tabs.Tab value="SignUp" icon={<IoCreateOutline size="0.8rem" />}>
              Sign Up
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel
            className="absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 w-full px-7 sm:px-0 "
            value="SignUp"
            pt="xs"
          >
            <FormRegister></FormRegister>
          </Tabs.Panel>

          <Tabs.Panel
            className="absolute  top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4  w-full px-7 sm:px-0"
            value="Login"
            pt="xs"
          >
            <p
              className={cx(
                "text-login-top",
                "block text-center mx-3 text-2xl mb-14 italic font-medium"
              )}
            >
              Log in to your account
            </p>
            <FormLogin></FormLogin>
            <p
              className={cx(
                "text-login-bottom",
                "block text-center mx-1 sm:mx-8 text-2xl mt-14 italic  font-medium"
              )}
            >
              And get ready to explore a world of online movie ticket booking.
            </p>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
}

export default RegisterPage;
