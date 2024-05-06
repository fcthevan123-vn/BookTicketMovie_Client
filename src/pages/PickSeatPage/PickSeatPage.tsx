import { useCallback, useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  ActionIcon,
  AppShell,
  Badge,
  Box,
  Burger,
  Divider,
  Group,
  Text,
  ThemeIcon,
  Tooltip,
} from "@mantine/core";
import LayoutSeat from "../../components/LayoutSeat";
import classes from "./PickSeatPage.module.css";
import { IconArrowLeft, IconCheck, IconHelp, IconX } from "@tabler/icons-react";
import NormalToast from "../../components/AllToast/NormalToast";
import { Link, useParams } from "react-router-dom";
import { seatServices } from "../../services";
import { SeatStatus } from "../../types";
import PaymentPreview from "../../components/PaymentPreview";
import { usePickSeatContext } from "../../components/Provider/PickSeatProvider";
import moment from "moment";
import { selectAgeRequire } from "../../untils/helper";

function PickSeatPage() {
  const [opened, { toggle }] = useDisclosure();
  const { id } = useParams();
  // const [, , dataUser] = useAuthenticate();

  const { seatSelected, dataTotal, setDataTotal } = usePickSeatContext();

  const [seatPicked, setSeatPicked] = useState<SeatStatus[] | null>(null);

  const getAllSeats = useCallback(
    async (id: string) => {
      try {
        const res = await seatServices.getAllSeatsByShowId(id);
        if (res.statusCode === 0) {
          console.log("res.data", res.data);
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

  function generateAgeRequired(ageRequire: string) {
    const result = selectAgeRequire.filter((age) => age.label == ageRequire);

    if (result.length > 0) {
      return result[0].detail;
    }
  }

  useEffect(() => {
    getAllSeats(id as string);
  }, [getAllSeats, id]);

  return (
    <AppShell
      layout="alt"
      header={{ height: 70 }}
      footer={{ height: 80 }}
      aside={{
        width: 400,
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
                  <Divider
                    size={"sm"}
                    color={"white"}
                    my={3}
                    orientation="vertical"
                  ></Divider>

                  <div className="flex">
                    <Text c={"white"} size="md" fw={500}>
                      Độ tuổi:
                    </Text>
                    <div className="flex ms-1 items-center">
                      <Badge color="teal" radius="sm" size="md" ms={"sm"}>
                        {dataTotal?.Movie?.ageRequire}
                      </Badge>
                      <Tooltip
                        color="teal.8"
                        withArrow
                        label={generateAgeRequired(
                          dataTotal?.Movie?.ageRequire as string
                        )}
                      >
                        <ActionIcon
                          size={"sm"}
                          variant="transparent"
                          color="white"
                          aria-label="Settings"
                          className="ms-1"
                        >
                          <IconHelp
                            style={{ width: "80%", height: "80%" }}
                            stroke={1.5}
                          />
                        </ActionIcon>
                      </Tooltip>
                    </div>
                  </div>
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
          </div>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <LayoutSeat
          dataSeatsPicked={seatPicked}
          dataSeats={dataTotal}
        ></LayoutSeat>
      </AppShell.Main>
      <AppShell.Aside>
        <div className="w-full">
          <div>
            <Badge
              variant="filled"
              size="lg"
              w={"100%"}
              py={"lg"}
              mb={"md"}
              radius="0"
              h={70}
            >
              Thông tin thanh toán
            </Badge>
            <Text size="sm" px={"sm"} pb={"sm"} c={"orange"} fw={500}>
              Giá vé ở đây được mặc định là người lớn, nếu bạn đặt vé cho trẻ em
              hoặc người cao tuôi, vui lòng mua vé trực tiếp tại quầy.
            </Text>
          </div>

          <div className="px-4">
            {seatSelected.length > 0 && <PaymentPreview></PaymentPreview>}
          </div>
        </div>
      </AppShell.Aside>

      <AppShell.Footer p="sm">
        <div className="flex  justify-center gap-12">
          <div className="flex justify-center items-center gap-6">
            <div className="flex flex-col justify-center items-center gap-1">
              <Box
                className={classes.box}
                style={{
                  background: "var(--mantine-color-blue-6)",
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
                  background: "var(--mantine-color-violet-6)",
                  border: `2px solid rgb(241 241 241 / 81%)`,
                  boxShadow:
                    "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
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
              <ThemeIcon color="gray.4" h={30} w={30} radius={"8px"}>
                <IconX style={{ width: "70%", height: "70%" }} />
              </ThemeIcon>

              <Text size="xs" c={"dimmed"}>
                Không thể chọn
              </Text>
            </div>
          </div>
          <Divider size={"md"} my={6} orientation="vertical"></Divider>
          <div className="flex justify-center items-center gap-6">
            {dataTotal?.MovieHall?.Cinema?.SeatTypes?.map((item) => (
              <div className="flex flex-col justify-center items-center gap-1">
                <Box
                  className={classes.box}
                  style={{
                    background: `var(--mantine-color-${item.color}-6)`,
                  }}
                ></Box>
                <Text size="xs" c={"dimmed"}>
                  {item.name}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </AppShell.Footer>
    </AppShell>
  );
}

export default PickSeatPage;
