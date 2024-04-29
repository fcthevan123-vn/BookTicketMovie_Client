import {
  Button,
  FileInput,
  Select,
  SimpleGrid,
  TextInput,
} from "@mantine/core";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { useCallback, useEffect, useState } from "react";
import { ErrToast } from "../../AllToast/NormalToast";
import { cinemaServices, userServices } from "../../../services";
import { loadingApi } from "../../../untils/loadingApi";
import { modals } from "@mantine/modals";
import { Cinema } from "../../../types";
import { PreviewImages } from "../../PreviewImage";
import {
  convertImgLinkToFile,
  getAllCity,
  getDistrictFromCity,
  getWardFromDistrict,
} from "../../../untils/helper";
import { useSetState } from "@mantine/hooks";

type Props = {
  isUpdate: boolean;
  getAllCinema: () => void;
  cinemaData: Cinema | null;
};

type SelectDataType = {
  city:
    | undefined
    | {
        value: string;
        label: string;
      }[];
  district:
    | undefined
    | {
        value: string;
        label: string;
      }[];
  ward:
    | undefined
    | {
        value: string;
        label: string;
      }[];
};

function FormAddCinema({ isUpdate, getAllCinema, cinemaData }: Props) {
  const [selectData, setSelectData] = useSetState<SelectDataType>({
    city: undefined,
    district: undefined,
    ward: undefined,
  });

  const [isLoading, setIsLoading] = useState(true);

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

  const callApiCity = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await getAllCity();
      setSelectData({
        city: result,
      });
    } catch (error) {
      ErrToast(error as Error, "callApiCity");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const callApiDistrict = useCallback(async (city: string) => {
    try {
      setIsLoading(true);
      const result = await getDistrictFromCity(city);
      setSelectData({
        district: result,
      });
    } catch (error) {
      ErrToast(error as Error, "callApiDistrict");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const callApiWard = useCallback(async (ward: string) => {
    try {
      console.log("ward", ward);
      setIsLoading(true);
      const result = await getWardFromDistrict(ward);
      setSelectData({
        ward: result,
      });
    } catch (error) {
      ErrToast(error as Error, "callApiWard");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const form = useForm<Cinema>({
    initialValues: {
      id: "",
      name: "",
      detailLocation: "",
      userId: "",
      hotline: "",
      imageFile: null,
      status: "open",
      city: null,
      district: null,
      ward: null,
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
      city: isNotEmpty("Thành phố/ Tỉnh không được trống"),
      district: isNotEmpty("Quận/ Huyện không được trống"),
      ward: isNotEmpty("Phường/ Xã không được trống"),
    },
  });

  async function handleSubmit(value: typeof form.values) {
    setIsLoading(true);

    const location = [value.city, value.district, value.ward];
    const data = {
      name: value.name,
      detailLocation: value.detailLocation,
      location: location as string[],
      userId: value.userId,
      hotline: value.hotline,
      status: value.status,
      imageFile: value.imageFile,
      id: value.id,
    };

    let api;

    if (isUpdate) {
      api = cinemaServices.updateCinema(data);
    } else {
      api = cinemaServices.createCinema(data);
    }

    const res = await loadingApi(
      api,
      `${isUpdate ? "Chỉnh sửa rạp" : "Thêm rạp mới"}`
    );

    if (res) {
      getAllCinema();
      modals.closeAll();
    }
    setIsLoading(false);

    return res;
  }

  const handleSetValueForm = useCallback(
    async (data: Cinema) => {
      try {
        setIsLoading(true);

        const fileImg = await convertImgLinkToFile(
          data.image as string,
          `${data.name}-image.png`
        );
        if (data.location) {
          form.setValues({
            name: data.name,
            hotline: data.hotline,
            detailLocation: data.detailLocation,
            userId: data.userId,
            imageFile: fileImg,
            city: data.location[0],
            district: data.location[1],
            ward: data.location[2],
            id: data.id,
          });
        }
      } catch (error) {
        ErrToast(error as Error, "handleSetValueForm");
      } finally {
        setIsLoading(false);
      }
    },
    [form]
  );

  useEffect(() => {
    getStaff();
  }, [getStaff]);

  useEffect(() => {
    callApiCity();
  }, [callApiCity]);

  useEffect(() => {
    if (form.values.city) {
      callApiDistrict(form.values.city);
    }
  }, [callApiDistrict, form.values.city]);

  useEffect(() => {
    if (form.values.district) {
      callApiWard(form.values.district);
    }
  }, [callApiWard, form.values.district]);

  useEffect(() => {
    if (cinemaData) {
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
            label="Thành phố/ Tỉnh"
            placeholder="Chọn thành phố/ tỉnh"
            withAsterisk
            disabled={isLoading}
            data={selectData.city}
            {...form.getInputProps("city")}
            onChange={(e) => {
              form.setValues({
                city: e,
                district: null,
                ward: null,
              });
            }}
          />
          <Select
            allowDeselect={false}
            radius={"md"}
            searchable
            withAsterisk
            label="Quận/ Huyện"
            disabled={isLoading}
            placeholder="Chọn quận/ huyện"
            data={selectData.district}
            {...form.getInputProps("district")}
            onChange={(e) => {
              form.setValues({
                district: e,
                ward: null,
              });
            }}
          />
          <Select
            allowDeselect={false}
            radius={"md"}
            searchable
            withAsterisk
            label="Phường xã"
            disabled={isLoading}
            placeholder="Chọn phường/ xã"
            data={selectData.ward}
            {...form.getInputProps("ward")}
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
