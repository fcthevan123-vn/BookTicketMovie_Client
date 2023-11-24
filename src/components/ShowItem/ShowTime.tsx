import { Card, Select, Text, rem } from "@mantine/core";
import React from "react";

import classes from "./ShowTime.module.css";
import { modals } from "@mantine/modals";
import { IconChalkboard } from "@tabler/icons-react";
import LayoutSeat from "../LayoutSeat";
import { Show } from "../../types";
import moment from "moment";
import { useAuthenticate } from "../../hooks";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  dataShow: Show;
};

function ShowTime({ dataShow }: Props) {
  const [isLogged, ,] = useAuthenticate();
  const navigate = useNavigate();
  const location = useLocation();

  const titleCustom = (
    <div className="w-full flex justify-between px-20">
      <div className="flex gap-2 flex-col">
        <Text fw={700} size="xl" c={"white"}>
          Spider man
        </Text>
        <Text c={"white"} size="sm">
          Rap chieu 1 | Phong chieu 1 | 8:30 ~ 10:30 20/10/2023
        </Text>
      </div>
      <Select
        leftSection={
          <IconChalkboard
            style={{ width: rem(18), height: rem(18) }}
            stroke={1.5}
          />
        }
        w={120}
        allowDeselect={false}
        checkIconPosition="right"
        defaultValue={"1"}
        label="Số lượng ghế"
        radius="md"
        placeholder="Chọn số ghế"
        data={["1", "2", "3", "4"]}
        styles={{
          label: {
            color: "white",
          },
        }}
      />
    </div>
  );

  const openModal = () =>
    modals.open({
      title: titleCustom,
      fullScreen: true,
      radius: 0,
      children: <LayoutSeat></LayoutSeat>,
      styles: {
        header: {
          background: "var(--mantine-color-blue-5)",
        },
        body: {
          marginTop: "15px",
          //   height: "100%",
        },
        title: {
          width: "100%",
        },
        content: {
          background: "var(--mantine-color-gray-1)",
          //   height: "100%",
        },
      },
      transitionProps: {
        transition: "pop-top-left",
        duration: 300,
      },
      //   onClose: () => alert("Are you sure you want to close"),
    });

  const openModalConfirmBook = () =>
    modals.openConfirmModal({
      title: (
        <Text c={"blue"} fw={600}>
          Chuyển hướng trang để tiến hành đặt vé
        </Text>
      ),
      radius: "lg",
      children: (
        <>
          <Text size="sm">
            Hệ thống sẽ mở ra một cửa số mới để bạn có thể lựa chọn ghế ngồi.
          </Text>
          <Text size="sm">Nhấn đồng ý để xác nhận chuyển trang.</Text>
        </>
      ),

      labels: { confirm: "Đồng ý", cancel: "Huỷ" },
      confirmProps: {
        radius: "md",

        size: "compact-sm",
      },
      cancelProps: {
        radius: "md",
        size: "compact-sm",
      },
      // onCancel: () => console.log("Cancel"),
      onConfirm: () => navigate(`/pick-seat-by-show/${dataShow.id}`),
    });

  const openModalConfirmLogin = () =>
    modals.openConfirmModal({
      title: (
        <Text c={"red"} fw={600}>
          Hiện tại bạn chưa đăng nhập
        </Text>
      ),
      radius: "lg",
      children: (
        <>
          <Text size="sm">
            Bạn cần phải đăng nhập để có thể đặt vé xem phim.
          </Text>
          <Text size="sm">
            Nếu muốn tới trang đăng nhập ngay hãy nhấn nút đồng ý.
          </Text>
        </>
      ),
      color: "red",
      labels: { confirm: "Đồng ý", cancel: "Huỷ" },
      confirmProps: {
        radius: "md",
        color: "red",
        size: "compact-sm",
      },
      cancelProps: {
        radius: "md",
        size: "compact-sm",
      },
      onCancel: () => console.log("Cancel"),
      onConfirm: () =>
        navigate(
          `/register?forwardTo=${location.pathname + `&open=modalPickShow`}`
        ),
    });

  function checkLoginStatus() {
    if (!isLogged) {
      openModalConfirmLogin();
    } else {
      openModalConfirmBook();
    }
  }

  return (
    <div>
      <Card
        shadow="sm"
        className={classes.card}
        padding="lg"
        radius="md"
        withBorder
        // onClick={open}
        onClick={() => checkLoginStatus()}
      >
        {/* {console.log("location.path", location.pathname)} */}
        <Card.Section>
          <Text ta={"center"} py={15} size="md">
            {dataShow.startTime} ~ {dataShow.endTime}
          </Text>
        </Card.Section>

        <Card.Section
          style={{
            borderTop: "1px solid var(--mantine-color-gray-3)",
          }}
        >
          <Text size="sm" py={3} c={"dimmed"} ta={"center"}>
            {dataShow.availableSeats}/{dataShow.totalSeats} ghế ngồi
          </Text>
        </Card.Section>
      </Card>
    </div>
  );
}

export default ShowTime;
