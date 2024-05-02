import {
  Button,
  FileInput,
  NumberInput,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { MenuFoodTS } from "../../../types";
import { PreviewImages } from "../../../components/PreviewImage";
import { ErrToast } from "../../../components/AllToast/NormalToast";
import { foodServices } from "../../../services";
import { loadingApi } from "../../../untils/loadingApi";
import { modals } from "@mantine/modals";
import { useCallback, useEffect } from "react";

type Props = {
  isUpdate: boolean;
  dataUpdate?: MenuFoodTS;
  getAll: () => Promise<void>;
};

function FormFood({ isUpdate, dataUpdate, getAll }: Props) {
  const form = useForm<MenuFoodTS>({
    initialValues: {
      id: "",
      name: "",
      price: 1,
      image: "",
      imageFile: null,
      status: "open",
    },
    validate: {
      name: isNotEmpty("Tên không được trống"),
      price: isNotEmpty("Giá tiền không được trống"),
      // imageFile: isNotEmpty("Hình ảnh không được trống"),
    },
  });

  const handleSetValueForm = useCallback(
    async (data: MenuFoodTS) => {
      try {
        // setIsLoading(true);

        form.setValues({
          id: data.id,
          name: data.name,
          price: data.price,
          image: data.image,
          status: data.status,
        });
      } catch (error) {
        ErrToast(error as Error, "handleSetValueForm");
      } finally {
        // setIsLoading(false);
      }
    },
    [form]
  );

  async function handleCreate(data: typeof form.values) {
    try {
      if (!data.imageFile) {
        return form.setErrors({
          imageFile: "Hình ảnh không được trống",
        });
      }

      const title = "Thêm món ăn & nước uống";
      const api = foodServices.createFood(data);

      const res = await loadingApi(api, title);

      if (res) {
        await getAll();
        modals.closeAll();
      }
      return true;
    } catch (error) {
      ErrToast(error as Error, "handleSubmit");
    }
  }

  async function handleUpdate(data: typeof form.values) {
    try {
      const title = "Chỉnh sửa món ăn & nước uống";
      const api = foodServices.updateFood(data);

      const res = await loadingApi(api, title);

      if (res) {
        await getAll();
        modals.closeAll();
      }
      return true;
    } catch (error) {
      ErrToast(error as Error, "handleUpdate");
    }
  }

  async function handleSubmit(data: typeof form.values, isUpdate: boolean) {
    try {
      if (isUpdate) {
        await handleUpdate(data);
      } else {
        await handleCreate(data);
      }
    } catch (error) {
      ErrToast(error as Error, "handleSubmit");
    }
  }

  useEffect(() => {
    if (dataUpdate) {
      // setIsLoading(true);
      handleSetValueForm(dataUpdate);
    }
  }, [dataUpdate]);

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values, isUpdate))}>
      <div className="grid grid-cols-2 gap-4">
        <Text
          fs="italic"
          ta={"center"}
          fw={500}
          c={"dimmed"}
          className="col-span-2"
        >
          Đồ ăn & nước được thêm sẽ được áp dụng cho toàn bộ hệ thống
        </Text>
        <TextInput
          label="Tên"
          placeholder="Nhập tên"
          radius={"md"}
          {...form.getInputProps("name")}
        />

        <NumberInput
          label="Giá tiền (VND)"
          placeholder="Nhập giá tiền"
          radius={"md"}
          min={1}
          {...form.getInputProps("price")}
        />

        <FileInput
          accept="image/png,image/jpeg"
          label="Hình ảnh"
          radius={"md"}
          clearable
          placeholder="Chọn hình ảnh"
          {...form.getInputProps("imageFile")}
        />

        <Select
          label="Trạng thái"
          radius={"md"}
          allowDeselect={false}
          defaultValue={"open"}
          data={[
            {
              value: "open",
              label: "Đang bán",
            },
            {
              value: "closed",
              label: "Ngừng bán",
            },
          ]}
          {...form.getInputProps("status")}
        />

        {form.values.imageFile && (
          <PreviewImages
            img={form.values.imageFile}
            width={"auto"}
            height={140}
          ></PreviewImages>
        )}

        {!form.values.imageFile && dataUpdate && (
          <PreviewImages
            img={dataUpdate.image}
            width={"auto"}
            height={140}
          ></PreviewImages>
        )}
      </div>

      <Button
        //   loading={isLoading}
        type="submit"
        size="sm"
        radius={"md"}
        mt={"sm"}
      >
        Lưu
      </Button>
    </form>
  );
}

export default FormFood;
