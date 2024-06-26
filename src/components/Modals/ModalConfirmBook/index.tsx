import {
  Alert,
  Button,
  Code,
  Divider,
  Group,
  Modal,
  Paper,
  Stepper,
  Text,
  Title,
} from "@mantine/core";
import {
  IconAt,
  IconCalendarEvent,
  IconMapPin,
  IconPhoneCall,
} from "@tabler/icons-react";
import { useState } from "react";
import { useAuthenticate } from "../../../hooks";
import TicketPreview from "../../TicketPreview";
import { usePickSeatContext } from "../../Provider/PickSeatProvider";
import bookingServices from "../../../services/bookingServices";
import { loadingApi } from "../../../untils/loadingApi";
import { ErrToast } from "../../AllToast/NormalToast";
import { useNavigate } from "react-router-dom";
import { paymentServices } from "../../../services";

type Props = {
  opened: boolean;
  close: () => void;
};

function ModalConfirmBook({ opened, close }: Props) {
  const [active, setActive] = useState(0);
  const [, , dataUser] = useAuthenticate();
  const navigate = useNavigate();
  const {
    allPrice,
    seatSelected,
    dataTotal,
    isLoading,
    paymentMethod,
    discount,
  } = usePickSeatContext();

  const nextStep = () =>
    setActive((current) => (current < 2 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  async function createDirectBooking() {
    const seatIds = seatSelected.map((seat) => seat.id);
    try {
      const data = {
        userId: dataUser.id,
        paymentMethod: paymentMethod,
        seatIds: seatIds,
        totalPrice: allPrice.totalPrice,
        showId: dataTotal?.id,
        isPaid: false,
        discount: discount.nameDiscount,
        status: "Chờ xác nhận",
        sendEmail: true,
      };

      const api = bookingServices.createBooking(data);

      const res = await loadingApi(api, "Đặt vé xem phim");

      if (res) {
        navigate(`/user/${dataUser.id}/all-tickets`);
      }

      return res;
    } catch (error) {
      ErrToast(error as Error, "createDirectBooking");
    }
  }

  async function createOnlineBooking() {
    const seatIds = seatSelected.map((seat) => seat.id);
    try {
      const data = {
        userId: dataUser.id,
        paymentMethod: paymentMethod,
        seatIds: seatIds,
        totalPrice: allPrice.totalPrice,
        showId: dataTotal?.id,
        isPaid: false,
        discount: discount.nameDiscount,
        status: "Chưa thanh toán",
        sendEmail: false,
      };

      const res = await paymentServices.createPaymentURL(data);
      console.log("res", res);
      if (res.statusCode == 0) {
        window.location.href = res.data.url;
      }

      return res;
    } catch (error) {
      ErrToast(error as Error, "createOnlineBooking");
    }
  }

  async function handleCreateBooking() {
    if (active < 2) {
      nextStep();
    } else {
      if (paymentMethod == "direct") {
        await createDirectBooking();
      } else {
        await createOnlineBooking();
      }
    }
  }

  return (
    <Modal
      lockScroll={false}
      opened={opened}
      centered
      radius={"lg"}
      size={"70%"}
      onClose={close}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      title={
        <Text c={"violet"} fw={600} size="lg">
          Xác nhận thanh toán | Phương thức:
          {paymentMethod == "direct" ? " Trực tiếp" : " Online qua VN Pay"}
        </Text>
      }
    >
      {/* {console.log("dataTotal", dataTotal)} */}
      <Divider size="sm" mb="md"></Divider>
      <Stepper size="sm" active={active} onStepClick={setActive} mih={250}>
        <Stepper.Step
          label="Bước 1"
          description="Kiểm tra thông tin tài khoản"
          h={"100%"}
        >
          <div className="flex justify-center items-center">
            <div className="flex flex-col gap-5 bg-gradient-to-tr from-violet-500 to-orange-300 justify-center border border-gray-200 p-3 rounded-xl shadow-md items-center ">
              <Paper
                withBorder
                shadow="xs"
                radius="md"
                p="md"
                w={700}
                // h={400}
                // className="bg-gradient-to-r from-violet-500 to-blue-500"
                // style={{ background: "var(--mantine-color-blue-6)" }}
              >
                <div>
                  <Text fz="xs" tt="uppercase" c="black">
                    Thông tin người dùng
                  </Text>

                  <Text fz="lg" fw={500} c="black" td={"underline"}>
                    {dataUser.fullName}
                  </Text>

                  <Group wrap="nowrap" justify="start" gap={10} mt={3}>
                    <IconAt stroke={1.5} size="1rem" color="black" />
                    <Text fz="xs" c="black">
                      {dataUser.email}
                    </Text>
                  </Group>

                  <Group wrap="nowrap" justify="start" gap={10} mt={5}>
                    <IconPhoneCall stroke={1.5} size="1rem" color="black" />
                    <Text fz="xs" c="black">
                      {dataUser.phone}
                    </Text>
                  </Group>

                  <Group wrap="nowrap" justify="start" gap={10} mt={5}>
                    <IconMapPin stroke={1.5} size="1rem" color="black" />
                    <Text fz="xs" c="black">
                      {dataUser.address}
                    </Text>
                  </Group>
                  <Group wrap="nowrap" justify="start" gap={10} mt={5}>
                    <IconCalendarEvent stroke={1.5} size="1rem" color="black" />
                    <Text fz="xs" c="black">
                      {dataUser.age} tuổi
                    </Text>
                  </Group>
                </div>

                <Alert
                  mt={"md"}
                  variant="light"
                  color="orange"
                  radius={"md"}
                  title="Cảnh báo về độ tuổi"
                >
                  <p className="text-sm">
                    1. Quý Khách Hàng xem phim được phân loại T13, T16, T18 vui
                    lòng mang theo giấy tờ tùy thân có ảnh nhận diện và ngày
                    tháng năm sinh để đảm bảo việc tuân thủ theo quy định.{" "}
                  </p>
                  <p className="text-sm  mt-2">
                    2. Ban Quản Lý Cụm Rạp Chiếu Phim Show Booking có quyền kiểm
                    tra và từ chối Quý Khách Hàng nếu không tuân thủ đúng quy
                    định về độ tuổi.
                  </p>
                </Alert>
              </Paper>
              {/* 
              <div
                className="w-full"
                style={{
                  borderRadius: "var(--mantine-radius-md)",
                }}
              >
                <SelectNackAndDrink></SelectNackAndDrink>
              </div> */}
            </div>
          </div>
        </Stepper.Step>

        <Stepper.Step label="Bước 2" description="Kiểm tra thông tin vé">
          <TicketPreview></TicketPreview>
        </Stepper.Step>

        {/* <Stepper.Step label="Bước 3" description="Kiểm tra vé xem phim">
          <TicketPreview></TicketPreview>
        </Stepper.Step> */}

        <Stepper.Completed>
          <div className="flex justify-center items-center">
            <div
              className="flex flex-col gap-5 justify-center  items-center "
              style={{
                height: "420px",
              }}
            >
              <Paper
                withBorder
                shadow="xs"
                radius="md"
                p="md"
                w={600}
                // h={400}
                className="bg-gradient-to-r from-violet-500 to-blue-500"
                // style={{ background: "var(--mantine-color-blue-6)" }}
              >
                <div className="flex flex-col gap-2">
                  <Title order={2} c={"white"}>
                    Đôi lời nhắc nhở
                  </Title>
                  <Text c={"white"}>
                    Sau khi bạn đã kiểm tra kỹ thông tin vé xem phim cũng như
                    thông tin cá nhân của mình, chúng tôi rất vui thông báo rằng
                    mọi thứ đã sẵn sàng và đã chắc chắn.
                  </Text>

                  <Text c={"white"}>
                    Cảm ơn bạn đã lựa chọn chúng tôi và chúc bạn có một buổi xem
                    phim thú vị!
                  </Text>

                  <Text c={"white"}>
                    Nhấn{" "}
                    <Code color="blue.8" c="white">
                      Đặt vé ngay
                    </Code>{" "}
                    để đặt vé, còn nếu muốn kiểm tra lại thì nhấn{" "}
                    <Code color="white" c="black">
                      Trở về
                    </Code>
                    . Lưu ý quá trình đặt vé có thể sẽ mất vài phút, khi đặt
                    xong thì hệ thống sẽ tự chuyển trang để bạn có thể xem vé
                    của mình
                  </Text>
                </div>
              </Paper>
            </div>
          </div>
        </Stepper.Completed>
      </Stepper>
      <Group justify="center" mt="xl">
        <Button
          size="compact-sm"
          radius={"md"}
          color="red"
          variant="outline"
          onClick={close}
          disabled={isLoading}
        >
          Đóng
        </Button>
        <Button
          size="compact-sm"
          radius={"md"}
          variant="default"
          disabled={isLoading}
          onClick={prevStep}
        >
          Trở về
        </Button>
        <Button
          size="compact-sm"
          radius={"md"}
          disabled={isLoading}
          onClick={() => handleCreateBooking()}
        >
          {active === 2 ? "Đặt vé ngay" : "Tiếp"}
        </Button>
      </Group>
    </Modal>
  );
}

export default ModalConfirmBook;
