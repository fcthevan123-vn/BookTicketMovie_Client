import { useCallback, useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  ActionIcon,
  AppShell,
  Badge,
  Box,
  Burger,
  Button,
  Divider,
  Group,
  List,
  Paper,
  ScrollArea,
  Select,
  Text,
  ThemeIcon,
} from "@mantine/core";
import LayoutSeat from "../../components/LayoutSeat";
import classes from "./PickSeatPage.module.css";
import {
  IconArrowLeft,
  IconCheck,
  IconCircleCheck,
  IconMail,
  IconMapPin,
  IconPhone,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
import { useAuthenticate } from "../../hooks";
import { Icon123 } from "@tabler/icons-react";
import NormalToast from "../../components/AllToast/NormalToast";
import { Link, useParams } from "react-router-dom";
import { seatServices } from "../../services";
import { SeatStatus } from "../../types";
import PaymentPreview from "../../components/PaymentPreview";
import { usePickSeatContext } from "../../components/Provider/PickSeatProvider";
import moment from "moment";

function PickSeatPage() {
  const [opened, { toggle }] = useDisclosure();
  const { id } = useParams();
  const [, , dataUser] = useAuthenticate();

  const {
    seatSelected,
    dataTotal,
    setDataTotal,
    seatNumberControl,
    setSeatNumberControl,
  } = usePickSeatContext();

  const [seatPicked, setSeatPicked] = useState<SeatStatus[] | null>(null);

  const getAllSeats = useCallback(
    async (id: string) => {
      try {
        const res = await seatServices.getAllSeatsByShowId(id);
        if (res.statusCode === 0) {
          setDataTotal(res.data);
          setSeatPicked(res.seatPicked);
        }
      } catch (error) {
        const err = error as Error;
        NormalToast({
          title: "getAllSeats",
          color: "red",
          message: err.message,
        });
      }
    },
    [setDataTotal]
  );

  useEffect(() => {
    getAllSeats(id as string);
  }, [getAllSeats]);

  return (
    <AppShell
      header={{ height: 70 }}
      footer={{ height: 80 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      aside={{
        width: 300,
        breakpoint: "md",
        collapsed: { desktop: false, mobile: true },
      }}
      padding="md"
    >
      <AppShell.Header
        style={{
          background:
            "linear-gradient(to right, var(--mantine-color-violet-filled),var(--mantine-color-pink-filled)",
        }}
      >
        <Group h="100%" w={"100%"} px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <div className="flex w-full justify-between px-3">
            <div className="flex gap-4 items-center">
              <Link to={`/select-show/${dataTotal?.movieId}`}>
                <ActionIcon
                  variant="subtle"
                  color="rgba(255, 255, 255, 1)"
                  size="lg"
                  aria-label="Settings"
                  radius={"md"}
                >
                  <IconArrowLeft
                    style={{ width: "70%", height: "70%" }}
                    stroke={1.5}
                  />
                </ActionIcon>
              </Link>

              <div className="flex flex-col gap-1">
                <div className="flex gap-3">
                  <Text c={"white"} size="md" fw={500}>
                    {dataTotal?.Movie?.title} - {dataTotal?.Movie?.duration}{" "}
                    phút
                  </Text>
                  <Divider
                    size={"sm"}
                    color={"white"}
                    my={3}
                    orientation="vertical"
                  ></Divider>
                  <Text c={"white"} size="md" fw={500}>
                    {moment(dataTotal?.startTime).format("HH:mm")} {" - "}
                    {moment(dataTotal?.endTime).format("HH:mm")}
                  </Text>
                </div>

                <div className="flex gap-3">
                  <Text c={"white"} size="md" fw={500}>
                    {dataTotal?.MovieHall.name}
                  </Text>
                  <Divider
                    size={"sm"}
                    color={"white"}
                    my={3}
                    orientation="vertical"
                  ></Divider>
                  <Text c={"white"} size="md" fw={500}>
                    {dataTotal?.MovieHall.Cinema.name}
                  </Text>
                </div>
              </div>
            </div>

            <div>
              <Select
                checkIconPosition="right"
                size="xs"
                w={100}
                radius={"md"}
                label={<p className="text-white">Số ghế</p>}
                placeholder="Pick value"
                data={["1", "2", "3", "4", "5"]}
                onChange={(e) => setSeatNumberControl(e as string)}
                value={seatNumberControl}
                allowDeselect={false}
              />
            </div>
          </div>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="sm">
        <ScrollArea scrollbarSize={6}>
          <div className="flex flex-col items-center gap-4 ">
            <Badge variant="filled" size="lg" radius="md">
              Thông tin người dùng
            </Badge>

            <Paper shadow="sm" withBorder p={"sm"} radius={"md"}>
              <List
                spacing="md"
                size="md"
                center
                icon={
                  <ThemeIcon
                    color="violet"
                    variant="filled"
                    size={30}
                    radius="md"
                  >
                    <IconCircleCheck size="1.25rem" />
                  </ThemeIcon>
                }
              >
                <List.Item
                  icon={
                    <ThemeIcon
                      color="violet"
                      variant="filled"
                      size={30}
                      radius="md"
                    >
                      <IconUser size="1.25rem" />
                    </ThemeIcon>
                  }
                >
                  {dataUser.fullName}
                </List.Item>

                <List.Item
                  icon={
                    <ThemeIcon
                      color="violet"
                      variant="filled"
                      size={30}
                      radius="md"
                    >
                      <IconMail size="1.25rem" />
                    </ThemeIcon>
                  }
                >
                  {dataUser.email}
                </List.Item>
                <List.Item
                  icon={
                    <ThemeIcon
                      color="violet"
                      variant="filled"
                      size={30}
                      radius="md"
                    >
                      <IconPhone size="1.25rem" />
                    </ThemeIcon>
                  }
                >
                  {dataUser.phone}
                </List.Item>
                <List.Item
                  icon={
                    <ThemeIcon
                      color="violet"
                      variant="filled"
                      size={30}
                      radius="md"
                    >
                      <Icon123 size="1.25rem" />
                    </ThemeIcon>
                  }
                >
                  {dataUser.age}
                </List.Item>
                <List.Item
                  icon={
                    <ThemeIcon
                      color="violet"
                      variant="filled"
                      size={30}
                      radius="md"
                    >
                      <IconUsers size="1.25rem" />
                    </ThemeIcon>
                  }
                >
                  {dataUser.gender}
                </List.Item>
                <List.Item
                  icon={
                    <ThemeIcon
                      color="violet"
                      variant="filled"
                      size={30}
                      radius="md"
                    >
                      <IconMapPin size="1.25rem" />
                    </ThemeIcon>
                  }
                >
                  {dataUser.address}
                </List.Item>
              </List>

              <div className="mt-5">
                <Text c={"dimmed"} fs="italic" size="sm">
                  Hệ thống sẽ dựa vào thông tin người dùng ở trên để tạo hoá đơn
                  của vé. Nếu bạn không muốn dùng thông tin trên thì có thể nhấn
                  nút tạo mới ở bên dưới.
                </Text>

                <Button
                  variant="filled"
                  mt={"sm"}
                  size="compact-sm"
                  radius="md"
                  onClick={() =>
                    NormalToast({
                      title: "Cập nhật sau",
                      message: "Chức năng này sẽ được cập nhật sau",
                      color: "orange",
                    })
                  }
                >
                  Tạo thông tin mới
                </Button>
              </div>
            </Paper>

            {/* <MovieHallPreview></MovieHallPreview> */}
          </div>
        </ScrollArea>
        {/* <AppShell.Section grow my="sm" component={ScrollArea}> */}

        {/* </AppShell.Section> */}
      </AppShell.Navbar>
      <AppShell.Main>
        <LayoutSeat
          dataSeatsPicked={seatPicked}
          dataSeats={dataTotal}
        ></LayoutSeat>
      </AppShell.Main>
      <AppShell.Aside p="sm">
        <div className="flex justify-center flex-col items-center gap-3">
          <Badge variant="filled" size="lg" radius="md">
            Thông tin thanh toán
          </Badge>

          <div>
            {seatSelected.length > 0 && <PaymentPreview></PaymentPreview>}
          </div>
        </div>
      </AppShell.Aside>

      <AppShell.Footer p="md">
        <div className="flex  justify-center gap-12">
          <div className="flex justify-center items-center gap-6">
            <div className="flex flex-col justify-center items-center gap-1">
              <Box
                className={classes.box}
                style={{
                  background: "var(--mantine-color-gray-1)",
                  border: "1.5px solid var(--mantine-color-blue-4)",
                }}
              ></Box>
              <Text size="xs" c={"dimmed"}>
                Có thể chọn
              </Text>
            </div>
            <div className="flex flex-col justify-center items-center gap-1">
              <Box
                className={classes.box}
                style={{
                  background: "var(--mantine-color-blue-6)",
                }}
              >
                <div className="flex justify-center items-center h-full">
                  <IconCheck color="white" size="1rem" stroke={3} />
                </div>
              </Box>
              <Text size="xs" c={"dimmed"}>
                Đang chọn
              </Text>
            </div>
            <div className="flex flex-col justify-center items-center gap-1">
              <Box
                className={classes.box}
                style={{
                  background: "var(--mantine-color-gray-4)",
                }}
              ></Box>
              <Text size="xs" c={"dimmed"}>
                Không thể chọn
              </Text>
            </div>
          </div>
          <Divider size={"md"} my={6} orientation="vertical"></Divider>
          <div className="flex justify-center items-center gap-6">
            <div className="flex flex-col justify-center items-center gap-1">
              <Box
                className={classes.box}
                style={{
                  background: "var(--mantine-color-gray-1)",
                  border: "1.5px solid var(--mantine-color-blue-4)",
                }}
              ></Box>
              <Text size="xs" c={"dimmed"}>
                Ghế thường
              </Text>
            </div>
            <div className="flex flex-col justify-center items-center gap-1">
              <Box
                className={classes.box}
                style={{
                  background: "var(--mantine-color-gray-1)",
                  border: "1.5px solid var(--mantine-color-green-4)",
                }}
              ></Box>
              <Text size="xs" c={"dimmed"}>
                Ghế VIP
              </Text>
            </div>
            <div className="flex flex-col justify-center items-center gap-1">
              <Box
                className={classes.box}
                style={{
                  background: "var(--mantine-color-gray-1)",
                  border: "1.5px solid var(--mantine-color-violet-4)",
                }}
              ></Box>
              <Text size="xs" c={"dimmed"}>
                Ghế Sweet
              </Text>
            </div>
          </div>
        </div>
      </AppShell.Footer>
    </AppShell>
  );
}

export default PickSeatPage;
