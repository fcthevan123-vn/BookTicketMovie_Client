import { Button, NumberInput, Text, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { RoomType, UserTS } from "../../../types";
import { roomTypeServices } from "../../../services";
import { ErrToast } from "../../../components/AllToast/NormalToast";
import { loadingApi } from "../../../untils/loadingApi";
import { modals } from "@mantine/modals";
import { useEffect, useState } from "react";
import ConfirmAction from "../../../components/ConfirmAction/ConfirmAction";

type FormRoomTypeProps = {
  data: UserTS;
  getAllRoomType: () => Promise<void>;
  isUpdate: boolean;
  dataUpdate?: RoomType;
};

type formTypes = {
  id: string;
  name: string;
  cinemaId: string | undefined;
  priceHolidayChildren: number | undefined;
  priceHolidayAdult: number | undefined;
  priceHolidayOlder: number | undefined;
  priceNormalChildren: number | undefined;
  priceNormalAdult: number | undefined;
  priceNormalOlder: number | undefined;
};

export function FormRoomType({
  data,
  getAllRoomType,
  isUpdate,
  dataUpdate,
}: FormRoomTypeProps) {
  const [isConfirm, setIsConfirm] = useState(false);

  const form = useForm<formTypes>({
    initialValues: {
      id: "",
      name: "",
      cinemaId: data?.Cinema?.id,
      priceHolidayChildren: undefined,
      priceHolidayAdult: undefined,
      priceHolidayOlder: undefined,
      priceNormalChildren: undefined,
      priceNormalAdult: undefined,
      priceNormalOlder: undefined,
    },
    validate: {
      name: isNotEmpty("Tên không được trống"),
      priceHolidayChildren: isNotEmpty("Giá tiền không được để trống"),
      priceHolidayAdult: isNotEmpty("Giá tiền không được để trống"),
      priceHolidayOlder: isNotEmpty("Giá tiền không được để trống"),
      priceNormalChildren: isNotEmpty("Giá tiền không được để trống"),
      priceNormalAdult: isNotEmpty("Giá tiền không được để trống"),
      priceNormalOlder: isNotEmpty("Giá tiền không được để trống"),
    },
  });

  async function handleSubmit(data: typeof form.values) {
    try {
      let dataPass;
      let title;
      let api;

      if (isUpdate) {
        dataPass = {
          id: data?.id,
          name: data.name,
          cinemaId: data.cinemaId,
          priceNormal: [
            data.priceNormalChildren,
            data.priceNormalAdult,
            data.priceNormalOlder,
          ],
          priceHoliday: [
            data.priceHolidayChildren,
            data.priceHolidayAdult,
            data.priceHolidayOlder,
          ],
        };
        title = "Chỉnh sửa kiểu phòng";

        api = roomTypeServices.updateRoomType(dataPass);
      } else {
        dataPass = {
          id: "",
          name: data.name,
          cinemaId: data.cinemaId,
          priceNormal: [
            data.priceNormalChildren,
            data.priceNormalAdult,
            data.priceNormalOlder,
          ],
          priceHoliday: [
            data.priceHolidayChildren,
            data.priceHolidayAdult,
            data.priceHolidayOlder,
          ],
        };
        title = "Thêm kiểu phòng";
        api = roomTypeServices.createRoomType(dataPass);
      }

      const res = await loadingApi(api, title);

      if (res) {
        getAllRoomType();
        modals.closeAll();
        form.reset();
      }

      return true;
    } catch (error) {
      ErrToast(error as Error, "handleSubmit");
    }
  }

  useEffect(() => {
    if (dataUpdate && isUpdate) {
      form.setValues({
        id: dataUpdate.id,
        name: dataUpdate.name,
        cinemaId: data?.Cinema?.id,
        priceHolidayChildren: dataUpdate.priceHoliday[0],
        priceHolidayAdult: dataUpdate.priceHoliday[1],
        priceHolidayOlder: dataUpdate.priceHoliday[2],
        priceNormalChildren: dataUpdate.priceNormal[0],
        priceNormalAdult: dataUpdate.priceNormal[1],
        priceNormalOlder: dataUpdate.priceNormal[2],
      });
    }
  }, [dataUpdate]);

  return (
    <div>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          placeholder="Nhập tên của kiểu phòng"
          mb={"md"}
          withAsterisk
          label="Tên kiểu phòng"
          radius={"md"}
          {...form.getInputProps("name")}
        ></TextInput>

        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <div>
              <Text fw={500} size="md">
                Giá ngày thường
              </Text>
              <Text c="dimmed" size="xs">
                Từ thứ 2 đến thứ 6
              </Text>
            </div>
            <NumberInput
              label="Trẻ em"
              placeholder="Nhập giá tiền"
              suffix=" VND"
              min={1}
              hideControls
              withAsterisk
              radius={"md"}
              {...form.getInputProps("priceNormalChildren")}
            />{" "}
            <NumberInput
              label="Người lớn"
              placeholder="Nhập giá tiền"
              suffix=" VND"
              min={1}
              hideControls
              withAsterisk
              radius={"md"}
              {...form.getInputProps("priceNormalAdult")}
            />
            <NumberInput
              label="Người cao tuổi"
              placeholder="Nhập giá tiền"
              suffix=" VND"
              radius={"md"}
              min={1}
              hideControls
              withAsterisk
              {...form.getInputProps("priceNormalOlder")}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div>
              <Text fw={500} size="md">
                Giá cuối tuần/ Ngày lễ
              </Text>
              <Text c="dimmed" size="xs">
                Thứ 7, Chủ Nhật và các ngày lễ lớn
              </Text>
            </div>
            <NumberInput
              label="Trẻ em"
              placeholder="Nhập giá tiền"
              suffix=" VND"
              min={1}
              hideControls
              withAsterisk
              radius={"md"}
              {...form.getInputProps("priceHolidayChildren")}
            />{" "}
            <NumberInput
              label="Người lớn"
              placeholder="Nhập giá tiền"
              suffix=" VND"
              min={1}
              hideControls
              withAsterisk
              radius={"md"}
              {...form.getInputProps("priceHolidayAdult")}
            />
            <NumberInput
              label="Người cao tuổi"
              placeholder="Nhập giá tiền"
              suffix=" VND"
              radius={"md"}
              min={1}
              hideControls
              withAsterisk
              {...form.getInputProps("priceHolidayOlder")}
            />
          </div>
        </div>

        {isUpdate && (
          <div>
            <ConfirmAction
              setDisable={() => setIsConfirm(true)}
              textCheck="Tôi đã xác nhận"
            ></ConfirmAction>
          </div>
        )}

        <Button
          disabled={isConfirm}
          size="xs"
          type="submit"
          radius={"md"}
          mt={"md"}
        >
          Lưu
        </Button>
      </form>
    </div>
  );
}
