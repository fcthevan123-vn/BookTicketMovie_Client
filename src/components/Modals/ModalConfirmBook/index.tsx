import {
  BackgroundImage,
  Box,
  Button,
  Center,
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
import React, { useState } from "react";
import { useAuthenticate } from "../../../hooks";
import TicketPreview from "../../TicketPreview";
import { SelectNackAndDrink } from "../../SelectSnackAndDrink";
import { usePickSeatContext } from "../../Provider/PickSeatProvider";
import bookingServices from "../../../services/bookingServices";
import { loadingApi } from "../../../untils/loadingApi";

type Props = {
  opened: boolean;
  close: () => void;
};

function ModalConfirmBook({ opened, close }: Props) {
  const [active, setActive] = useState(0);
  const [, , dataUser] = useAuthenticate();

  const { allPrice, seatSelected, dataTotal, isLoading, setIsLoading } =
    usePickSeatContext();

  const nextStep = () =>
    setActive((current) => (current < 2 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  async function handleCreateBooking() {
    if (active < 2) {
      nextStep();
    } else {
      const seatIds = seatSelected.map((seat) => seat.id);

      const data = {
        userId: dataUser.id,
        paymentMethod: "direct",
        seatIds: seatIds,
        totalPrice: allPrice.totalPrice,
        showId: dataTotal?.id,
        isPaid: false,
      };

      try {
        const api = bookingServices.createBooking(data);
        const res = await loadingApi(api, "Đặt vé xem phim");

        if (res) {
          console.log(res);
        }

        return res;
      } catch (error) {
        console.log("error", error);
      }

      // const api = await bookingServices.createBooking(data);
      // const res = await loadingApi(api, "Đang đặt vé");
      // setIsLoading(true);
      // if (res) {
      //   setIsLoading(false);

      //   console.log(res);
      // }

      // return res;
    }
  }

  return (
    <Modal
      lockScroll={false}
      opened={opened}
      centered
      radius={"lg"}
      size={"xl"}
      onClose={close}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      title={
        <Text c={"blue"} fw={600} size="lg">
          Xác nhận thanh toán
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
            <div
              className="flex flex-col gap-5 justify-center border border-gray-200 px-10 rounded-xl shadow-md items-center "
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
                className="bg-gradient-to-r from-cyan-500 to-blue-500"
                // style={{ background: "var(--mantine-color-blue-6)" }}
              >
                <div>
                  <Text fz="xs" tt="uppercase" c="white">
                    Thông tin người dùng
                  </Text>

                  <Text fz="lg" fw={500} c="white" td={"underline"}>
                    {dataUser.fullName}
                  </Text>

                  <Group wrap="nowrap" justify="start" gap={10} mt={3}>
                    <IconAt stroke={1.5} size="1rem" color="white" />
                    <Text fz="xs" c="white">
                      {dataUser.email}
                    </Text>
                  </Group>

                  <Group wrap="nowrap" justify="start" gap={10} mt={5}>
                    <IconPhoneCall stroke={1.5} size="1rem" color="white" />
                    <Text fz="xs" c="white">
                      {dataUser.phone}
                    </Text>
                  </Group>

                  <Group wrap="nowrap" justify="start" gap={10} mt={5}>
                    <IconMapPin stroke={1.5} size="1rem" color="white" />
                    <Text fz="xs" c="white">
                      {dataUser.address}
                    </Text>
                  </Group>
                  <Group wrap="nowrap" justify="start" gap={10} mt={5}>
                    <IconCalendarEvent stroke={1.5} size="1rem" color="white" />
                    <Text fz="xs" c="white">
                      {dataUser.age} tuổi
                    </Text>
                  </Group>
                </div>
              </Paper>

              <div
                className="bg-gradient-to-r p-3 from-cyan-500 to-blue-500 w-full"
                style={{
                  borderRadius: "var(--mantine-radius-md)",
                }}
              >
                <SelectNackAndDrink></SelectNackAndDrink>
              </div>
            </div>
          </div>
        </Stepper.Step>

        <Stepper.Step label="Bước 2" description="Kiểm tra vé xem phim">
          <TicketPreview></TicketPreview>
        </Stepper.Step>
        {/* <Stepper.Step label="Bước 3" description="Xác nhận thanh toán">
          Step 3 content: Get full access
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
                className="bg-gradient-to-r from-cyan-500 to-blue-500"
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

                  {/* <div>
                    <Button variant="light" size="xs">
                      Button
                    </Button>
                  </div> */}
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
