import FormRegister from "../../components/Forms/FormRegister";
import { BackgroundImage, Tabs } from "@mantine/core";
import { AiOutlineUser } from "react-icons/ai";
import { IoCreateOutline } from "react-icons/io5";
import FormLogin from "../../components/Forms/FormLogin";
import styles from "./RegisterPage.module.css";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);

function RegisterPage() {
  return (
    <div className="bg-gradient-to-r from-violet-500 to-blue-500  sm:bg-none sm:bg-gray-300  grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-4 p-5 h-screen  boxshadow-custom">
      {/* <div className="lg:col-span-3  md:col-span-2	sm:col-span-2 hidden boxshadow-custom rounded-l-xl relative bg-gradient-to-r from-violet-500 to-blue-500 sm:flex flex-col items-center justify-center ">
       */}
      <div className="lg:col-span-3  md:col-span-2 	sm:col-span-2 hidden boxshadow-custom rounded-l-xl relative sm:flex flex-col items-center justify-center ">
        <div className="h-full rounded-l-xl  overflow-hidden">
          <BackgroundImage
            src="https://images.unsplash.com/photo-1581250505021-88929ce95b5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
            radius="xs"
            className="h-full "
          >
            <div className=" flex items-center backdrop-blur-sm	 flex-col justify-center h-full ">
              <p className="text-center mx-3 text-4xl mt-3 italic text-white font-medium">
                Chào mừng đến với Show Booking!
              </p>

              <p className="text-lg mx-3 italic indent-8 text-white mt-2 text-justify px-3 ">
                Hãy đăng ký tài khoản ngay để trải nghiệm sự thú vị của đặt vé
                xem phim thuận tiện. Chia sẻ niềm đam mê phim ảnh của bạn, khám
                phá những bộ phim hấp dẫn và thưởng thức những điều tuyệt vời
                trải nghiệm giải trí ngay tại đây.
              </p>
            </div>
          </BackgroundImage>
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
              Đăng nhập
            </Tabs.Tab>
            <Tabs.Tab value="SignUp" icon={<IoCreateOutline size="0.8rem" />}>
              Đăng ký
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
              Đăng nhập ngay
            </p>
            <FormLogin></FormLogin>
            <p
              className={cx(
                "text-login-bottom",
                "block text-center mx-1 sm:mx-8 text-2xl mt-14 italic  font-medium"
              )}
            >
              Và sẵn sàng khám phá thế giới đặt vé xem phim trực tuyến.
            </p>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
}

export default RegisterPage;
