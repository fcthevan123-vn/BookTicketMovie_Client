import {
  ActionIcon,
  Badge,
  Button,
  NumberFormatter,
  Text,
  Transition,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import FormFood from "./FormFood";
import { useCallback, useEffect, useMemo, useState } from "react";
import { foodServices } from "../../../services";
import { ErrToast } from "../../../components/AllToast/NormalToast";
import { MenuFoodTS } from "../../../types";
import {
  MRT_ColumnDef,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { IconEdit, IconPlayerPause } from "@tabler/icons-react";
import { PreviewImages } from "../../../components/PreviewImage";
import { loadingApi } from "../../../untils/loadingApi";

function ManageFoodPage() {
  const [data, setData] = useState<MenuFoodTS[]>();
  const [isMount, setIsMount] = useState(false);

  async function ChangeStatus(status: string, id: string) {
    try {
      console.log("id", id);
      const api = foodServices.changeStatus(status, id);

      const res = await loadingApi(api, "Chỉnh sửa trạng thái");

      if (res) {
        await getAllFood("-1");
      }
      return true;
    } catch (error) {
      ErrToast(error as Error, "GetAllFood");
    }
  }

  const getAllFood = useCallback(async (status?: string) => {
    try {
      const res = await foodServices.getFood(status);
      setData(res.data);
    } catch (error) {
      ErrToast(error as Error, "GetAllFood");
    }
  }, []);

  const openAddFood = (getAll: () => Promise<void>) => {
    modals.open({
      title: (
        <Text fw={500} c={"violet"}>
          Thêm món ăn & nước
        </Text>
      ),
      size: "lg",
      radius: "md",
      children: <FormFood getAll={getAll} isUpdate={false}></FormFood>,
    });
  };

  const openUpdateFood = (
    dataUpdate: MenuFoodTS,
    update: boolean,
    getAll: () => Promise<void>
  ) => {
    modals.open({
      title: (
        <Text fw={500} c={"violet"}>
          Chỉnh sửa món ăn & nước
        </Text>
      ),
      size: "lg",
      radius: "md",
      children: (
        <FormFood
          getAll={getAll}
          dataUpdate={dataUpdate}
          isUpdate={update}
        ></FormFood>
      ),
    });
  };

  // Change Status
  const openChangeStatus = (data: MenuFoodTS) =>
    modals.openConfirmModal({
      title: (
        <Text fw={700} c={"red"}>{`Xác nhận tạm ngừng bán ${data.name}`}</Text>
      ),
      children: (
        <Text size="sm">
          Hành động này quan trọng đến mức nó sẽ ảnh hưởng tới cả toàn bộ hệ
          thống và cả người dùng. Hãy cân nhắc trước khi thực hiện.
        </Text>
      ),
      radius: "md",
      confirmProps: {
        radius: "md",
        size: "xs",
        color: "red",
      },
      cancelProps: {
        radius: "md",
        size: "xs",
      },

      labels: { confirm: "Đồng ý", cancel: "Huỷ" },
      onConfirm: () => ChangeStatus("closed", data.id as string),
      // onConfirm: () => console.log("Confirmed"),
    });

  const columns = useMemo<MRT_ColumnDef<MenuFoodTS>[]>(
    () => [
      {
        header: "Tên",
        accessorKey: "name",
      },
      {
        id: "price",
        header: "Giá tiền",
        accessorFn: (row) => row.price,
        enableResizing: false,
        Cell: ({ row }) => (
          <NumberFormatter
            thousandSeparator
            value={row.original.price}
            suffix=" VND"
          />
        ),
        size: 300,
      },
      {
        id: "image",
        header: "Hình Ảnh",
        enableResizing: false,
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <PreviewImages
            width={200}
            height={100}
            img={row.original.image}
          ></PreviewImages>
        ),
        size: 300,
      },
      {
        id: "status",
        accessorFn: (row) => (row.status == "open" ? "Đang bán" : "Ngừng bán"),
        header: "Trạng thái",
        Cell: ({ row }) =>
          row.original.status === "open" ? (
            <Badge color="violet" variant="light" size="md" radius="sm">
              Đang bán
            </Badge>
          ) : (
            <Badge color="red" variant="light" size="md" radius="sm">
              Ngừng bán
            </Badge>
          ),
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: data ? data : [],
    // enableColumnResizing: true,
    enableGrouping: true,
    enableColumnDragging: false,
    enableStickyHeader: true,
    positionToolbarAlertBanner: "none",
    mantineTableContainerProps: { style: { maxHeight: 600 } },
    mantinePaperProps: {
      radius: "md",
    },
    enableRowActions: true,
    positionActionsColumn: "last",
    renderTopToolbarCustomActions: () => (
      <div>
        <Button
          size="xs"
          radius={"sm"}
          className="m-1"
          onClick={() => openAddFood(() => getAllFood("-1"))}
        >
          Thêm món ăn & nước uống
        </Button>
      </div>
    ),
    renderRowActions: ({ row }) => (
      <div className="flex gap-2">
        <ActionIcon
          variant="light"
          aria-label="Settings"
          radius={"md"}
          size={"lg"}
          onClick={() => {
            openUpdateFood(row.original, true, () => getAllFood("-1"));
          }}
        >
          <IconEdit style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
        <ActionIcon
          color="red"
          aria-label="Settings"
          radius={"md"}
          variant="light"
          size={"lg"}
          onClick={() => {
            openChangeStatus(row.original);
          }}
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
    getAllFood("-1");
  }, [getAllFood]);

  useEffect(() => {
    setIsMount(true);
  }, []);

  return (
    <div>
      <Transition
        mounted={isMount}
        transition="fade"
        duration={500}
        timingFunction="ease"
      >
        {(styles) => (
          <div style={styles}>
            <MantineReactTable table={table} />
          </div>
        )}
      </Transition>
      {/* <MantineReactTable table={table} /> */}
    </div>
  );
}

export default ManageFoodPage;
