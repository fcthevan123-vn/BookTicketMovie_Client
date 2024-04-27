import {
  Button,
  FileInput,
  Select,
  SimpleGrid,
  TextInput,
} from "@mantine/core";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { useCallback, useEffect, useState } from "react";
import apiProvinceVietNam from "../../../untils/apiProvinceVietNam";
import NormalToast, { ErrToast } from "../../AllToast/NormalToast";
import { cinemaServices, userServices } from "../../../services";
import { loadingApi } from "../../../untils/loadingApi";
import { modals } from "@mantine/modals";
import { Cinema } from "../../../types";
import { PreviewImages } from "../../PreviewImage";
import { convertImgLinkToFile } from "../../../untils/helper";

type Props = {
  getAllCinema: () => void;
  cinemaData: Cinema | null;
};

function FormAddCinema({ getAllCinema, cinemaData }: Props) {
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
  const [isLoading, setIsLoading] = useState(true);

  const [valueWard, setValueWard] = useState<null | string>(null);

  const [dataStaff, setDataStaff] = useState([]);

  const getStaff = useCallback(async () => {
    try {
      const res = await userServices.getUserByType("employee");
      if (res.statusCode == 0) {
        setDataStaff(res.convertData);
      }
    } catch (error) {
      ErrToast(error as Error, "getStaff");
    }
  }, []);

  async function callApiCity() {
    try {
      setIsLoading(true);
      const res = await apiProvinceVietNam.callApiCity("");

      const convertData = res.results.map(
        (item: { province_id: string; province_name: string }) => {
          return { value: item.province_id, label: item.province_name };
        }
      );
      const cityData = { ward: [], district: [], city: convertData };
      setDataProvince(cityData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      NormalToast({
        title: "Lỗi lấy api tỉnh thành",
        message: "Đã có lỗi xảy ra trong quá trình gọi api lấy tỉnh thành",
        color: "red",
      });
    }
  }

  async function callApiDistrict(city: string) {
    setIsLoading(true);

    // setValueDistrict(null);
    // setValueWard(null);
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
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      NormalToast({
        title: "Lỗi lấy api tỉnh thành",
        message: "Đã có lỗi xảy ra trong quá trình gọi api lấy tỉnh thành",
        color: "red",
      });
    }
  }

  async function callApiWard(district: string) {
    try {
      setIsLoading(true);

      const res = await apiProvinceVietNam.callApiCity(`ward/${district}`);
      const convertData = res.results.map(
        (item: { ward_id: string; ward_name: string }) => {
          return { value: item.ward_id, label: item.ward_name };
        }
      );

      const wardData = { ...dataProvince, ward: convertData };
      setDataProvince(wardData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      NormalToast({
        title: "Lỗi lấy api tỉnh thành",
        message: "Đã có lỗi xảy ra trong quá trình gọi api lấy phường/xã",
        color: "red",
      });
    }
  }

  const form = useForm<Cinema>({
    initialValues: {
      name: "",
      detailLocation: "",
      userId: "",
      hotline: "",
      imageFile: null,
      status: "open",
    },
    validate: {
      name: hasLength({ min: 2, max: 20 }, "Tên phải có từ 2 - 20 ký tự"),
      detailLocation: hasLength(
        { min: 2, max: 200 },
        "Địa chỉ cụ thể phải có từ 2 - 200 ký tự"
      ),
      userId: isNotEmpty("Nhân viên không được trống"),
      hotline: isNotEmpty("Hotline không được trống"),
      imageFile: isNotEmpty("Hình ảnh không được trống"),
      status: isNotEmpty("Trạng thái không được trống"),
    },
  });

  async function handleSubmit(value: typeof form.values) {
    setIsLoading(true);

    const location = [valueCity, valueDistrict, valueWard];
    const data = {
      name: value.name,
      detailLocation: value.detailLocation,
      location: location as string[],
      userId: value.userId,
      hotline: value.hotline,
      status: value.status,
      imageFile: value.imageFile,
    };

    const api = cinemaServices.createCinema(data);
    const res = await loadingApi(api, "Chỉnh sửa phim");

    if (res) {
      getAllCinema();
      modals.closeAll();
    }
    setIsLoading(false);

    return res;
  }

  const handleSetValueForm = useCallback(async (data: Cinema) => {
    try {
      setIsLoading(true);
      if (data.location) {
        setValueCity(data.location[0]);
        setValueDistrict(data.location[1]);
        setValueWard(data.location[2]);
      }

      const fileImg = await convertImgLinkToFile(
        data.image as string,
        `${data.name}-image.png`
      );
      form.setValues({
        name: data.name,
        hotline: data.hotline,
        detailLocation: data.detailLocation,
        userId: data.userId,
        imageFile: fileImg,
      });

      setIsLoading(false);
    } catch (error) {
      ErrToast(error as Error, "handleSetValueForm");
    }
  }, []);

  useEffect(() => {
    getStaff();
  }, [getStaff]);

  useEffect(() => {
    callApiCity();
  }, []);

  useEffect(() => {
    if (cinemaData?.location) {
      callApiCity();
      callApiDistrict(cinemaData.location[0]);
      callApiWard(cinemaData.location[1]);
    }
  }, []);

  useEffect(() => {
    if (cinemaData?.location) {
      setIsLoading(true);
      handleSetValueForm(cinemaData);
    }
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

          <TextInput
            radius={"md"}
            label="Hotline"
            placeholder="Nhập hotline"
            withAsterisk
            {...form.getInputProps("hotline")}
          />

          <Select
            allowDeselect={false}
            radius={"md"}
            searchable
            withAsterisk
            label="Nhân viên quản lý"
            placeholder="Chọn nhân viên"
            data={dataStaff}
            {...form.getInputProps("userId")}
          />

          <FileInput
            radius={"md"}
            withAsterisk
            label="Hình ảnh"
            placeholder="Chọn hình ảnh của rạp"
            {...form.getInputProps("imageFile")}
          />

          <Select
            allowDeselect={false}
            radius={"md"}
            searchable
            withAsterisk
            label="Trạng thái hoạt động"
            placeholder="Chọn trạng thái"
            defaultValue={"open"}
            data={[
              {
                value: "open",
                label: "Hoạt động",
              },
              {
                value: "closed",
                label: "Đã đóng cửa",
              },
            ]}
            {...form.getInputProps("status")}
          />

          {form.values.imageFile && (
            <PreviewImages
              img={form.values.imageFile}
              width={"auto"}
              height={100}
            ></PreviewImages>
          )}
        </SimpleGrid>
        <Button
          loading={isLoading}
          type="submit"
          size="xs"
          radius={"md"}
          mt={"sm"}
        >
          Lưu
        </Button>
      </form>
    </div>
  );
}

export default FormAddCinema;
