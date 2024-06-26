import {
  ActionIcon,
  Badge,
  Button,
  Modal,
  NumberFormatter,
  Select,
  SimpleGrid,
  Text,
  TextInput,
} from "@mantine/core";
import { useAuthenticate } from "../../../hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { movieHallServices } from "../../../services";
import { ErrToast } from "../../../components/AllToast/NormalToast";
import { MovieHall, UserTS } from "../../../types";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { loadingApi } from "../../../untils/loadingApi";
import {
  MRT_ColumnDef,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import ConfirmAction from "../../../components/ConfirmAction/ConfirmAction";

type FormAddMovieHallProps = {
  opened: boolean;
  close: () => void;
  data: UserTS;
  getAll: () => Promise<void>;
  isUpdate: boolean;
  dataUpdate: MovieHall | undefined;
};

type selectDataType = {
  roomTypesData: {
    value: string;
    label: string;
  }[];
  layoutsData: {
    value: string;
    label: string;
  }[];
};

function FormAddMovieHall({
  opened,
  close,
  data,
  getAll,
  isUpdate,
  dataUpdate,
}: FormAddMovieHallProps) {
  const selectData: selectDataType = {
    roomTypesData: [],
    layoutsData: [],
  };
  const [isConfirm, setIsConfirm] = useState(false);
  if (data.Cinema?.RoomTypes) {
    const roomTypesData = data.Cinema?.RoomTypes.map((rt) => {
      return {
        value: rt.id,
        label: rt.name,
      };
    });
    selectData.roomTypesData = roomTypesData;
  }
  if (data.Cinema?.Layouts) {
    const layoutsData = data.Cinema?.Layouts.map((l) => {
      return {
        value: l.id,
        label: l.name,
      };
    });
    selectData.layoutsData = layoutsData;
  }

  const form = useForm({
    initialValues: {
      id: "",
      name: "",
      layoutId: "",
      cinemaId: data?.Cinema?.id,
      roomTypeId: "",
      status: "open",
    },
    validate: {
      name: hasLength({ min: 2, max: 200 }, "Tên phải có từ 2 - 200 ký tự"),
      roomTypeId: isNotEmpty("Kiểu phòng không được trống"),
      layoutId: isNotEmpty("Kiểu bố trí không được trống"),
    },
  });

  async function handleSubmit(data: typeof form.values) {
    try {
      let api;
      let title = "Thêm phòng mới mới";
      if (isUpdate) {
        api = movieHallServices.updateMovieHall(data);
        title = "Chỉnh sửa phòng";
      } else {
        api = movieHallServices.createMovieHall(data);
      }
      const res = await loadingApi(api, title);

      if (res) {
        form.reset();
        close();
        await getAll();
      }
      return true;
    } catch (error) {
      ErrToast(error as Error, "handleSubmit");
    }
  }

  useEffect(() => {
    form.reset();
    if (isUpdate && dataUpdate) {
      form.setValues({
        id: dataUpdate.id,
        name: dataUpdate.name,
        roomTypeId: dataUpdate.roomTypeId,
        cinemaId: dataUpdate.cinemaId,
        layoutId: dataUpdate.layoutId,
        status: dataUpdate.status,
      });
    }
  }, [dataUpdate, isUpdate]);

  return (
    <Modal
      size={"lg"}
      opened={opened}
      radius={"md"}
      onClose={() => {
        setIsConfirm(false);
        close();
      }}
      title={
        <Text fw={700} c={"violet"}>
          {isUpdate ? "Chỉnh sửa phòng" : "Thêm phòng mới"}
        </Text>
      }
    >
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <SimpleGrid cols={2}>
          <TextInput
            radius="md"
            label="Tên phòng chiếu"
            withAsterisk
            placeholder="Nhập tên phòng chiếu"
            {...form.getInputProps("name")}
          />
          <TextInput
            radius={"md"}
            label="Rạp chiếu"
            value={data.Cinema?.name}
            disabled
            placeholder="Chọn rạp chiếu"
            withAsterisk
          />
          <Select
            allowDeselect={false}
            radius={"md"}
            searchable
            withAsterisk
            disabled={isUpdate ? true : false}
            data={selectData.roomTypesData}
            label="Có kiểu phòng"
            placeholder="Chọn kiểu phòng"
            {...form.getInputProps("roomTypeId")}
          />
          <Select
            allowDeselect={false}
            radius={"md"}
            searchable
            data={selectData.layoutsData}
            withAsterisk
            disabled={isUpdate ? true : false}
            label="Kiểu bố trí"
            placeholder="Chọn kiểu bố trí ghế"
            {...form.getInputProps("layoutId")}
          />

          <Select
            allowDeselect={false}
            radius={"md"}
            searchable
            data={[
              {
                value: "open",
                label: "Hoạt động",
              },
              {
                value: "closed",
                label: "Đóng cửa",
              },
            ]}
            withAsterisk
            label="Trạng thái"
            placeholder="Chọn kiểu bố trí ghế"
            {...form.getInputProps("status")}
          />
        </SimpleGrid>

        {isUpdate && (
          <div>
            <ConfirmAction
              setDisable={setIsConfirm}
              textCheck="Tôi đã xác nhận"
            ></ConfirmAction>
          </div>
        )}

        <Button
          disabled={isConfirm}
          type="submit"
          size="xs"
          radius={"md"}
          mt={"md"}
        >
          Lưu
        </Button>
      </form>
    </Modal>
  );
}

function ManageMovieHall() {
  const [, , dataUser] = useAuthenticate();
  const [opened, { open, close }] = useDisclosure(false);
  const [data, setData] = useState<UserTS>();
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState<MovieHall>();

  const getAllMovieHall = useCallback(async (staffId: string) => {
    try {
      setIsLoading(true);
      const res = await movieHallServices.getMovieHallByStaff(staffId);

      if (res.statusCode == 0) {
        setData(res.data);
      }
    } catch (error) {
      ErrToast(error as Error, "getAllMovieHall");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const columns = useMemo<MRT_ColumnDef<MovieHall>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Tên",
      },
      {
        accessorKey: "RoomType.name",
        header: "Kiểu phòng",
      },
      {
        // accessorKey: "priceNormal",
        id: "price",
        header: "Giá vé",
        size: 400,
        accessorFn: (row) =>
          row.RoomType
            ? `
        ${row.RoomType.priceNormal.join(",")} ${row.RoomType.priceHoliday.join(
                ","
              )}`
            : "",
        Cell: ({ row }) => (
          <div className="grid grid-cols-3">
            <div className="mt-5">
              <p className="">Trẻ em: </p>
              <p className="">Người lớn: </p>
              <p className="">Người cao tuổi: </p>
            </div>
            <div className="flex flex-col">
              <p className="font-semibold">Ngày thường</p>
              {row.original.RoomType &&
                row.original.RoomType.priceNormal.map((price, index) => (
                  <p key={index}>
                    <NumberFormatter
                      thousandSeparator="."
                      decimalSeparator=","
                      value={price}
                    />
                    {" VND"}
                  </p>
                ))}
            </div>
            <div className="flex flex-col">
              <p className="font-semibold">Cuối tuần, ngày lễ</p>
              {row.original.RoomType.priceHoliday.map((price, index) => (
                <p key={index}>
                  <NumberFormatter
                    thousandSeparator="."
                    decimalSeparator=","
                    value={price}
                  />
                  {" VND"}
                </p>
              ))}
            </div>
          </div>
        ),
      },
      {
        accessorKey: "Layout.name",
        header: "Kiểu bố trí",
      },
      {
        id: "status",
        accessorFn: (row) =>
          row.status == "open" ? "Hoạt động" : "Đã đóng cửa",
        header: "Trạng thái",
        Cell: ({ row }) =>
          row.original.status === "open" ? (
            <Badge color="violet" variant="light" size="md" radius="sm">
              Hoạt động
            </Badge>
          ) : (
            <Badge color="red" variant="light" size="md" radius="sm">
              Đã đóng của
            </Badge>
          ),
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: data ? (data?.Cinema?.MovieHalls as MovieHall[]) : [],
    enableColumnPinning: true,
    mantineSearchTextInputProps: {
      placeholder: "Tìm kiếm",
      radius: "md",
    },
    initialState: {
      showGlobalFilter: true,
    },
    enableRowActions: true,
    positionActionsColumn: "last",
    state: {
      isLoading: isLoading,
    },
    mantinePaperProps: {
      radius: "md",
    },
    renderRowActions: ({ row }) => (
      <div className="flex gap-2">
        <ActionIcon
          variant="light"
          aria-label="Settings"
          radius={"md"}
          size={"lg"}
          onClick={() => {
            setDataUpdate(row.original);
            setIsUpdate(true);
            open();
          }}
        >
          <IconEdit style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
      </div>
    ),
  });

  useEffect(() => {
    getAllMovieHall(dataUser.id);
  }, [dataUser.id, getAllMovieHall]);

  return (
    <div className="px-3">
      {data && (
        <FormAddMovieHall
          isUpdate={isUpdate}
          dataUpdate={dataUpdate}
          data={data}
          getAll={() => getAllMovieHall(dataUser.id)}
          opened={opened}
          close={close}
        ></FormAddMovieHall>
      )}
      <div className="mb-3 flex justify-end">
        <Button
          size="xs"
          radius={"md"}
          onClick={() => {
            setIsUpdate(false);
            open();
          }}
        >
          Thêm phòng mới
        </Button>
      </div>
      <MantineReactTable table={table} />
    </div>
  );
}

export default ManageMovieHall;
