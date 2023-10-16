import { useEffect, useState } from "react";
import FormContainer from "../../../components/Forms/FormContainer";
import { ComboboxData, Select, TextInput } from "@mantine/core";

import * as Yup from "yup";
import NormalToast from "../../../components/AllToast/NormalToast";
import apiProvinceVietNam from "../../../untils/apiProvinceVietNam";
import FormAddCinema from "../../../components/Forms/FormCinema/FormAddCinema";

type Props = {};

function AddNewCinemaPage({}: Props) {
  const [loading, setLoading] = useState(true);
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

  const intinialValueForm = {
    cinemaName: "",
    cinemaDescription: "",
  };

  const schema = Yup.object().shape({
    cinemaName: Yup.string().min(
      2,
      "Cinema name should have at least 2 letters"
    ),
    cinemaDescription: Yup.string().min(
      2,
      "Cinema name should have at least 2 letters"
    ),
  });

  const formElement = [
    {
      controlled: false,
      name: "cinemaName",
      inputForm: (
        <TextInput
          radius="md"
          label="Tên rạp chiếu phim"
          withAsterisk
          placeholder="Input placeholder"
        />
      ),
    },

    {
      name: "cinemaDescription",
      controlled: false,
      inputForm: (
        <TextInput
          radius="md"
          label="Mô tả"
          withAsterisk
          placeholder="Input placeholder"
        />
      ),
    },

    {
      controlled: true,
      name: "cinemaCity",
      controlledProps: {
        data: dataProvince.city,
        onChange: (e: unknown) => callApiDistrict(`p/${e}?depth=2`),
      },
      inputForm: (
        <Select
          checkIconPosition="right"
          radius="md"
          label="Thành phố"
          placeholder="Chọn Thành phố"
          maxDropdownHeight={200}
          searchable
          errorProps={(e) => console.log(e)}
        />
      ),
    },
  ];

  async function callApiCity() {
    try {
      const res = await apiProvinceVietNam.callApiCity("?depth=1");
      const convertData = res.map((item: { code: number; name: string }) => {
        return { value: item.code.toString(), label: item.name };
      });
      const cityData = { ...dataProvince, city: convertData };
      setDataProvince(cityData);
    } catch (error) {
      NormalToast({
        title: "Lỗi lấy api tỉnh thành",
        message: "Đã có lỗi xảy ra trong quá trình gọi api lấy tỉnh thành",
        color: "red",
      });
    }
  }

  async function callApiDistrict(api: string) {
    try {
      const res = await apiProvinceVietNam.callApiCity(api);
      const convertData = res.districts.map(
        (item: { code: number; name: string }) => {
          return { value: item.code.toString(), label: item.name };
        }
      );
      const districtData = { ...dataProvince, district: convertData };
      setDataProvince(districtData);
    } catch (error) {
      NormalToast({
        title: "Lỗi lấy api tỉnh thành",
        message: "Đã có lỗi xảy ra trong quá trình gọi api lấy tỉnh thành",
        color: "red",
      });
    }
  }

  useEffect(() => {
    callApiCity();
  }, []);

  return (
    <div>
      AddNewCinemaPage
      <FormAddCinema></FormAddCinema>
    </div>
  );
}

export default AddNewCinemaPage;
