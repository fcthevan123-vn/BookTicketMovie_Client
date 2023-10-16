import { Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import React from "react";
import FormAddCinema from "../../../components/Forms/FormCinema/FormAddCinema";

type Props = {};

function AdminCinemaPage({}: Props) {
  const openModalAdd = () => {
    modals.open({
      title: (
        <Text fw={500} size="lg" c={"blue"}>
          Tạo rạp phim mới
        </Text>
      ),
      size: "lg",
      children: <FormAddCinema></FormAddCinema>,
      radius: "md",
      lockScroll: false,
    });
  };
  return (
    <div>
      <Button radius={"md"} onClick={openModalAdd}>
        Thêm rạp phim mới
      </Button>

      <h3>Cinema page</h3>
    </div>
  );
}

export default AdminCinemaPage;
