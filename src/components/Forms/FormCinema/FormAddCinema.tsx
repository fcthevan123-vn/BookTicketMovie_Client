import { Button, Select, SimpleGrid, TextInput } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import apiProvinceVietNam from "../../../untils/apiProvinceVietNam";
import NormalToast from "../../AllToast/NormalToast";
import { cinemaServices } from "../../../services";
import { loadingApi } from "../../../untils/loadingApi";
import { modals } from "@mantine/modals";

function FormAddCinema({ getAllCinema }: { getAllCinema: () => void }) {
  const [dataProvince, setDataProvince] = useState({
    city: [
      {
        value: "",
        label: "",
      },
    ],
    district: [
      {
        value: "",
        label: "",
      },
    ],
    ward: [
      {
        value: "",
        label: "",
      },
    ],
  });

  const [valueCity, setValueCity] = useState<null | string>(null);
  const [valueDistrict, setValueDistrict] = useState<null | string>(null);

  const [valueWard, setValueWard] = useState<null | string>(null);

  async function callApiCity() {
    try {
      const res = await apiProvinceVietNam.callApiCity("");
      console.log("res", res);

      const convertData = res.results.map(
        (item: { province_id: string; province_name: string }) => {
          return { value: item.province_id, label: item.province_name };
        }
      );
      const cityData = { ward: [], district: [], city: convertData };
      setDataProvince(cityData);
    } catch (error) {
      NormalToast({
        title: "Lỗi lấy api tỉnh thành",
        message: "Đã có lỗi xảy ra trong quá trình gọi api lấy tỉnh thành",
        color: "red",
      });
    }
  }

  async function callApiDistrict(city: string) {
    setValueDistrict(null);
    setValueWard(null);
    setValueCity(city);
    try {
      const res = await apiProvinceVietNam.callApiCity(`district/${city}`);

      const convertData = res.results.map(
        (item: { district_id: string; district_name: string }) => {
          return { value: item.district_id, label: item.district_name };
        }
      );

      const districtData = { ...dataProvince, district: convertData };
      setDataProvince(districtData);
    } catch (error) {
      console.log(error);
      NormalToast({
        title: "Lỗi lấy api tỉnh thành",
        message: "Đã có lỗi xảy ra trong quá trình gọi api lấy tỉnh thành",
        color: "red",
      });
    }
  }

  async function callApiWard(district: string) {
    try {
      const res = await apiProvinceVietNam.callApiCity(`ward/${district}`);
      console.log("res", res);
      const convertData = res.results.map(
        (item: { ward_id: string; ward_name: string }) => {
          return { value: item.ward_id, label: item.ward_name };
        }
      );

      const wardData = { ...dataProvince, ward: convertData };
      setDataProvince(wardData);
    } catch (error) {
      console.log(error);
      NormalToast({
        title: "Lỗi lấy api tỉnh thành",
        message: "Đã có lỗi xảy ra trong quá trình gọi api lấy phường/xã",
        color: "red",
      });
    }
  }

  const form = useForm({
    initialValues: {
      name: "",
      detailLocation: "",
    },
    validate: {
      name: hasLength({ min: 2, max: 20 }, "Tên phải có từ 2 - 20 ký tự"),
      detailLocation: hasLength(
        { min: 2, max: 200 },
        "Địa chỉ cụ thể phải có từ 2 - 200 ký tự"
      ),
    },
  });

  async function handleSubmit(value: typeof form.values) {
    const location = [valueCity, valueDistrict, valueWard];
    const data = {
      name: value.name,
      detailLocation: value.detailLocation,
      location: location,
    };

    const api = cinemaServices.createCinema(data);
    const res = await loadingApi(api, "Chỉnh sửa phim");

    if (res) {
      getAllCinema();
      modals.closeAll();
    }

    return res;
  }

  useEffect(() => {
    callApiCity();
  }, []);

  return (
    <div>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <SimpleGrid cols={2}>
          <TextInput
            radius="md"
            label="Tên rạp phim"
            withAsterisk
            placeholder="Nhập tên rạp phim"
            {...form.getInputProps("name")}
          />
          <TextInput
            radius="md"
            label="Địa chỉ cụ thể"
            withAsterisk
            placeholder="Nhập địa chỉ cụ thể"
            {...form.getInputProps("detailLocation")}
          />
          <Select
            allowDeselect={false}
            radius={"md"}
            searchable
            label="Tỉnh thành"
            placeholder="Chọn tỉnh thành"
            withAsterisk
            value={valueCity}
            onChange={(e) => {
              callApiDistrict(e as string);
            }}
            data={dataProvince.city}
          />
          <Select
            allowDeselect={false}
            radius={"md"}
            searchable
            withAsterisk
            label="Quận/ Huyện"
            placeholder="Chọn quận/ huyện"
            data={dataProvince.district}
            value={valueDistrict}
            onChange={(e) => {
              setValueWard(null);
              setValueDistrict(e as string);

              callApiWard(e as string);
            }}
          />
          <Select
            allowDeselect={false}
            radius={"md"}
            searchable
            withAsterisk
            label="Phường xã"
            placeholder="Chọn phường/ xã"
            data={dataProvince.ward}
            value={valueWard}
            onChange={(e) => {
              setValueWard(e as string);
            }}
          />
        </SimpleGrid>
        <Button type="submit" size="xs" radius={"md"} mt={"md"}>
          Lưu
        </Button>
      </form>
    </div>
  );
}

export default FormAddCinema;
