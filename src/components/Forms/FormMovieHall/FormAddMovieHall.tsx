import {
  Button,
  NumberInput,
  Select,
  SimpleGrid,
  TextInput,
} from "@mantine/core";
import { hasLength, isInRange, useForm } from "@mantine/form";
import { useCallback, useEffect, useState } from "react";

import {
  cinemaServices,
  layoutServices,
  roomTypeServices,
} from "../../../services";
import { normalApi } from "../../../untils/normalApi";

function FormAddMovieHall() {
  const [roomType, setRoomType] = useState([]);
  const [cinema, setCinema] = useState<string | null>(null);
  const [layout, setLayout] = useState([]);

  const [dataSelect, setDataSelect] = useState({
    cinema: [
      {
        value: "",
        label: "",
      },
    ],
    roomType: [
      {
        value: "",
        label: "",
      },
    ],
    layout: [
      {
        value: "",
        label: "",
      },
    ],
  });

  const form = useForm({
    initialValues: {
      name: "",
      number: 0,
    },
    validate: {
      name: hasLength({ min: 2, max: 20 }, "Tên phải có từ 2 - 20 ký tự"),
      number: isInRange({ min: 1 }, "Số phòng phải lớn hơn 0"),
    },
  });

  const getAllCinema = useCallback(async () => {
    const api = cinemaServices.getAllCinemas();
    const res = await normalApi(api, "getAllCinema");
    if (res) {
      //   console.log(res);
      const convertData = res.map((item: { id: string; name: string }) => {
        return { value: item.id, label: item.name };
      });
      const combineData = { ...dataSelect, cinema: convertData };
      setDataSelect(combineData as never);
    }
    return res;
  }, []);

  const getAllRoomType = useCallback(async () => {
    const api = roomTypeServices.getAllRoomType();
    const res = await normalApi(api, "getAllRoomType");
    if (res) {
      const convertData = res.map((item: { id: string; name: string }) => ({
        value: item.id,
        label: item.name,
      }));
      setDataSelect((prevData) => ({
        ...prevData,
        roomType: convertData,
      }));
    }
    return res;
  }, []);

  const getAllLayout = useCallback(async () => {
    const api = layoutServices.getAllLayout();
    const res = await normalApi(api, "getAllLayout");
    if (res) {
      const convertData = res.map((item: { id: string; name: string }) => ({
        value: item.id,
        label: item.name,
      }));
      setDataSelect((prevData) => ({
        ...prevData,
        layout: convertData,
      }));
    }
    return res;
  }, []);

  useEffect(() => {
    getAllCinema();
    getAllRoomType();
    getAllLayout();
  }, [getAllCinema, getAllLayout, getAllRoomType]);

  return (
    <div>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <SimpleGrid cols={2}>
          <TextInput
            radius="md"
            label="Tên rạp phim"
            withAsterisk
            placeholder="Nhập tên rạp phim"
            {...form.getInputProps("name")}
          />
          <NumberInput
            radius="md"
            label="Phòng số"
            withAsterisk
            placeholder="Nhập số phòng"
            {...form.getInputProps("number")}
          />
          <Select
            allowDeselect={false}
            radius={"md"}
            searchable
            label="Thuộc rạp chiếu"
            placeholder="Chọn rạp chiếu"
            withAsterisk
            // value={cinema}
            data={dataSelect.cinema}
          />
          <Select
            allowDeselect={false}
            radius={"md"}
            searchable
            withAsterisk
            label="Có kiểu phòng"
            placeholder="Chọn kiểu phòng"
            data={dataSelect.roomType}
          />
          <Select
            allowDeselect={false}
            radius={"md"}
            searchable
            withAsterisk
            label="Kiểu bố trí"
            placeholder="Chọn kiểu bố trí ghế"
            data={dataSelect.layout}
          />
        </SimpleGrid>
        <Button type="submit" size="xs" radius={"md"} mt={"md"}>
          Lưu
        </Button>
      </form>
    </div>
  );
}

export default FormAddMovieHall;
