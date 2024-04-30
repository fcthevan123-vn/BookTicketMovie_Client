import {
  Button,
  Chip,
  Group,
  NumberInput,
  Text,
  TextInput,
} from "@mantine/core";
import { IconArmchair } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { SeatType } from "../../../types";
import { isNotEmpty, useForm } from "@mantine/form";
import { ErrToast } from "../../../components/AllToast/NormalToast";
import { seatServices } from "../../../services";
import { loadingApi } from "../../../untils/loadingApi";
import { modals } from "@mantine/modals";

type Props = {
  data: SeatType[];
  staffId: string;
  getSeatType: () => Promise<void>;
};

const colorData = [
  {
    value: "dark",
    label: "Đen",
  },

  {
    value: "red",
    label: "Đỏ",
  },
  {
    value: "pink",
    label: "Hồng",
  },
  {
    value: "grape",
    label: "Nho",
  },
  {
    value: "violet",
    label: "Tím",
  },
  {
    value: "indigo",
    label: "Xanh đậm",
  },
  {
    value: "blue",
    label: "Xanh nước biển",
  },

  {
    value: "cyan",
    label: "Lục lam",
  },
  {
    value: "teal",
    label: "Xanh nhạt",
  },
  {
    value: "green",
    label: "Xanh lá cây",
  },
  {
    value: "lime",
    label: "Chanh",
  },
  {
    value: "yellow",
    label: "Vàng",
  },
  {
    value: "orange",
    label: "Cam",
  },
];

function FormSeatType({ data, staffId, getSeatType }: Props) {
  const [colorValue, setColorValue] = useState<string>();
  const [isError, setIsError] = useState<boolean>(false);
  const form = useForm({
    initialValues: {
      name: "",
      price: null,
    },
    validate: {
      name: isNotEmpty("Tên không được để trống"),
      price: isNotEmpty("Giá tiền cộng thêm không được để trống"),
    },
  });

  async function handleSubmit(
    data: typeof form.values,
    color: string | undefined
  ) {
    try {
      if (!color) {
        return setIsError(true);
      } else {
        setIsError(false);
      }
      const dataPass = {
        ...data,
        color: color,
        staffId: staffId,
      };

      const api = seatServices.createSeatType(dataPass);

      const res = await loadingApi(api, "Thêm loại ghế");

      if (res) {
        await getSeatType();
        modals.closeAll();
      }
    } catch (error) {
      ErrToast(error as Error, "handleSubmit");
    }
  }

  const items = useMemo(() => {
    const colorDataValues = colorData.map((color) => color.value);

    const filterColor = colorDataValues.filter(
      (color) => !data.some((item) => item.color === color)
    );

    return (
      <Group>
        {filterColor.map((color, index) => (
          <Chip
            styles={{
              label: {
                width: "60px",
                height: "50px",
                background: `var(--mantine-color-${color}-6)`,
              },
            }}
            value={color}
            key={index}
            radius={"md"}
          >
            <div className="flex justify-center">
              <IconArmchair color="white"></IconArmchair>
            </div>
          </Chip>
        ))}
      </Group>
    );
  }, [data]);

  return (
    <div>
      <form
        onSubmit={form.onSubmit((values) => handleSubmit(values, colorValue))}
      >
        <div className="grid grid-cols-2 gap-5">
          <TextInput
            label="Tên loại ghế"
            radius={"md"}
            placeholder={"Nhập tên loại ghế"}
            {...form.getInputProps(`name`)}
          />

          <NumberInput
            label="Giá tiền cộng thêm (VND)"
            radius={"md"}
            min={1}
            placeholder={"Nhập giá tiền"}
            {...form.getInputProps(`price`)}
          />
        </div>

        <div className="mt-4 mb-2">
          <Text fw={500} size="sm" mb={"sm"}>
            Màu sắc
          </Text>
          {/* <Box className="w-[50px] h-[50px] bg-red-500"></Box> */}
          <Chip.Group
            multiple={false}
            value={colorValue}
            onChange={(e) => setColorValue(e)}
          >
            {items}
          </Chip.Group>
          {isError ? (
            <Text fw={400} size="xs" mt={5} c={"red"}>
              Chưa chọn màu sắc
            </Text>
          ) : null}
        </div>

        <Button mt={"md"} type="submit" size="sm" radius={"md"}>
          Lưu
        </Button>
      </form>
    </div>
  );
}

export default FormSeatType;
