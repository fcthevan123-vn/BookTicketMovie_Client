import {
  ActionIcon,
  Box,
  Button,
  NumberInput,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";
import { ErrToast } from "../../../components/AllToast/NormalToast";
import { SeatType } from "../../../types";
import { layoutServices, seatServices } from "../../../services";
import { loadingApi } from "../../../untils/loadingApi";
import { modals } from "@mantine/modals";

// {
//     getAllLayout,
//   }: {
//     getAllLayout: () => Promise<void>;
//   }

type Props = {
  employeeId: string;
  getAllLayout: () => Promise<void>;
};

type seatTypeSelectType = {
  value: string;
  label: string;
};

export function FormLayout({ employeeId, getAllLayout }: Props) {
  // const [seatTypeData, setSeatTypeData] = useState<SeatType[]>();
  const [seatTypeSelect, seatSeatTypeSelect] = useState<seatTypeSelectType[]>(
    []
  );

  const getAllSeatTypes = useCallback(async (staffId: string) => {
    try {
      const res = await seatServices.getAllSeatType(staffId);

      const convertData = res.data.map((seatType: SeatType) => {
        return {
          value: seatType.id,
          label: seatType.name,
        };
      });

      seatSeatTypeSelect(convertData);
    } catch (error) {
      ErrToast(error as Error, "getAllSeatTypes");
    }
  }, []);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      layout: [{ rows: 2, seatType: "", key: randomId() }],
      seatsPerRow: 1,
      name: "",
    },
    validate: {
      layout: {
        rows: isNotEmpty("Số hàng không được trống"),
        seatType: isNotEmpty("Kiểu ghế không được trống"),
      },
      seatsPerRow: isNotEmpty("Số ghế không được trống"),
      name: isNotEmpty("Tên không được để trống"),
    },
  });

  async function handleSubmit(data: typeof form.values) {
    try {
      const dataPass = {
        ...data,
        totalRows: data.layout.reduce(
          (partialSum, a) => partialSum + a.rows,
          0
        ),
        staffId: employeeId,
      };

      const api = layoutServices.createLayout(dataPass);

      const res = await loadingApi(api, "Thêm kiểu bố trí ghế");

      if (res) {
        await getAllLayout();
        modals.closeAll();
      }

      return true;
    } catch (error) {
      ErrToast(error as Error, "handleSubmit");
    }
  }

  const fields = form.getValues().layout.map((item, index) => (
    <div className="flex gap-6" key={item.key}>
      <NumberInput
        radius={"md"}
        placeholder="Chọn số hàng"
        min={1}
        className="flex-1"
        max={20}
        clampBehavior="strict"
        withAsterisk
        defaultValue={1}
        key={form.key(`layout.${index}.rows`)}
        {...form.getInputProps(`layout.${index}.rows`)}
      />

      <Select
        radius={"md"}
        className="flex-1"
        placeholder="Chọn số hàng"
        data={seatTypeSelect}
        key={form.key(`layout.${index}.seatType`)}
        {...form.getInputProps(`layout.${index}.seatType`)}
      />

      <div>
        <ActionIcon
          color="red"
          h={"100%"}
          variant="light"
          radius={"md"}
          w={35}
          onClick={() => form.removeListItem("layout", index)}
        >
          <IconTrash size="1rem" />
        </ActionIcon>
      </div>
    </div>
  ));

  useEffect(() => {
    getAllSeatTypes(employeeId);
  }, [employeeId, getAllSeatTypes]);

  return (
    <div>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Box mx="auto">
          {fields.length > 0 ? (
            <div className="flex mb-2">
              <Text className="flex-1" fw={500} size="sm">
                Số hàng ghế
              </Text>

              <Text className="flex-1" fw={500} size="sm">
                Loại ghế
              </Text>
            </div>
          ) : (
            <Text c="dimmed" ta="center">
              Không có gì ở đây
            </Text>
          )}

          <div className="flex flex-col gap-5">{fields}</div>
          <div className="flex  gap-5">
            <TextInput
              radius={"md"}
              className={"flex-1 mt-4"}
              label="Tên"
              placeholder="Nhập tên kiểu bố trí"
              withAsterisk
              {...form.getInputProps(`name`)}
            />
            <NumberInput
              radius={"md"}
              className={"flex-1 mt-4"}
              label="Số ghế trong 1 hàng"
              placeholder="Chọn số ghế"
              min={1}
              max={20}
              clampBehavior="strict"
              withAsterisk
              {...form.getInputProps(`seatsPerRow`)}
            />
            <span className="w-[35px]"></span>
          </div>

          <div className="flex mt-5 items-center gap-3">
            <Button
              radius={"md"}
              size="compact-sm"
              onClick={() =>
                form.insertListItem("layout", {
                  rows: 2,
                  seatType: "",
                  key: randomId(),
                })
              }
            >
              Thêm hàng ghế
            </Button>

            <Button
              type="submit"
              size="compact-sm"
              radius={"md"}
              //   onClick={() => handleSubmit()}
            >
              Lưu
            </Button>
          </div>
        </Box>
      </form>
    </div>
  );
}
