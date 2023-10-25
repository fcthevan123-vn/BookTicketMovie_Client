import {
  BackgroundImage,
  Box,
  Button,
  Center,
  Divider,
  Group,
  Modal,
  Paper,
  Stepper,
  Text,
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

type Props = {
  opened: boolean;
  close: () => void;
};

function ModalConfirmBook({ opened, close }: Props) {
  const [active, setActive] = useState(0);
  const [, , dataUser] = useAuthenticate();

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

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
        <Stepper.Step label="Final step" description="Get full access">
          Step 3 content: Get full access
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>
      <Group justify="center" mt="xl">
        <Button
          size="compact-sm"
          radius={"md"}
          color="red"
          variant="outline"
          onClick={close}
        >
          Đóng
        </Button>
        <Button
          size="compact-sm"
          radius={"md"}
          variant="default"
          onClick={prevStep}
        >
          Trở về
        </Button>
        <Button size="compact-sm" radius={"md"} onClick={nextStep}>
          Tiếp
        </Button>
      </Group>
    </Modal>
  );
}

export default ModalConfirmBook;
