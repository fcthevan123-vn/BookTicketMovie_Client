import {
  ActionIcon,
  Badge,
  Button,
  NumberFormatter,
  Text,
} from "@mantine/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuthenticate } from "../../../hooks";
import { roomTypeServices } from "../../../services";
import { ErrToast } from "../../../components/AllToast/NormalToast";
import { RoomType, UserTS } from "../../../types";
import { IconEdit, IconPlayerPause } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { FormRoomType } from "./FormRoomType";
import {
  MRT_ColumnDef,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";

function RoomTypePage() {
  const [, , dataUser] = useAuthenticate();
  const [data, setData] = useState<UserTS>();
  const [isLoading, setIsLoading] = useState(true);

  const getRoomType = useCallback(async (staffId: string) => {
    try {
      setIsLoading(true);
      const res = await roomTypeServices.getAllRoomType(staffId);
      setData(res.data);
    } catch (error) {
      ErrToast(error as Error, "getRoomType");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const modalAddRoomType = (data: UserTS) =>
    modals.open({
      title: (
        <Text fw={700} c={"violet"}>
          Thêm kiểu phòng
        </Text>
      ),
      radius: "md",
      size: "lg",
      children: (
        <>
          <FormRoomType
            isUpdate={false}
            getAllRoomType={() => getRoomType(dataUser.id)}
            data={data}
          ></FormRoomType>
        </>
      ),
    });

  const modalUpdateRoomType = useCallback(
    (data: UserTS, dataUpdate: RoomType) =>
      modals.open({
        title: (
          <Text fw={700} c={"violet"}>
            Chỉnh sửa kiểu phòng
          </Text>
        ),
        radius: "md",
        size: "lg",
        children: (
          <>
            <FormRoomType
              isUpdate={true}
              getAllRoomType={() => getRoomType(dataUser.id)}
              data={data}
              dataUpdate={dataUpdate}
            ></FormRoomType>
          </>
        ),
      }),
    [dataUser.id, getRoomType]
  );

  const columns = useMemo<MRT_ColumnDef<RoomType>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Tên",
      },
      {
        id: "priceNormal",
        header: "Giá vé ngày thường",
        size: 400,
        accessorFn: (row) =>
          row.priceNormal
            ? `
        ${row.priceNormal.join(",")} ${row.priceHoliday.join(",")}`
            : "",
        Cell: ({ row }) => (
          <div className="grid grid-cols-3">
            <div className="">
              <p className="">Trẻ em: </p>
              <p className="">Người lớn: </p>
              <p className="">Người cao tuổi: </p>
            </div>
            <div className="col-span-2 flex flex-col ">
              {row.original.priceNormal.map((price, index) => (
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
        id: "priceHoliday",
        header: "Giá vé cuối tuần/ Ngày lễ",
        size: 400,
        accessorFn: (row) =>
          row.priceHoliday
            ? `
        ${row.priceHoliday.join(",")} ${row.priceHoliday.join(",")}`
            : "",
        Cell: ({ row }) => (
          <div className="grid grid-cols-3">
            <div className="">
              <p className="">Trẻ em: </p>
              <p className="">Người lớn: </p>
              <p className="">Người cao tuổi: </p>
            </div>
            <div className="col-span-2 flex flex-col ">
              {row.original.priceHoliday.map((price, index) => (
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
        id: "status",
        accessorFn: (row) =>
          row.status == "open" ? "Khả dụng" : "Không khả dụng",
        header: "Trạng thái",
        Cell: ({ row }) =>
          row.original.status === "open" ? (
            <Badge color="violet" variant="light" size="md" radius="sm">
              Khả dụng
            </Badge>
          ) : (
            <Badge color="red" variant="light" size="md" radius="sm">
              Không khả dụng
            </Badge>
          ),
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: data ? (data?.Cinema?.RoomTypes as RoomType[]) : [],
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
          onClick={() => modalUpdateRoomType(data as UserTS, row.original)}
        >
          <IconEdit style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>

        <ActionIcon
          variant="light"
          aria-label="Settings"
          radius={"md"}
          size={"lg"}
          color="red"
          // onClick={() => modalUpdateRoomType(data as UserTS, row.original)}
        >
          <IconPlayerPause
            style={{ width: "70%", height: "70%" }}
            stroke={1.5}
          />
        </ActionIcon>
      </div>
    ),
  });

  useEffect(() => {
    getRoomType(dataUser.id);
  }, [dataUser.id, getRoomType]);

  return (
    <div className="px-3">
      <div className="mb-3 flex justify-end">
        {data && (
          <Button
            onClick={() => modalAddRoomType(data)}
            size="xs"
            radius={"md"}
          >
            Thêm kiểu phòng mới
          </Button>
        )}
      </div>
      <MantineReactTable table={table} />
    </div>
  );
}

export default RoomTypePage;
