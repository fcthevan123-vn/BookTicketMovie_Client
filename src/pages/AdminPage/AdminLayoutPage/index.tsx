import { Button, NumberInput, Select, Text, TextInput } from "@mantine/core";

import React, { useCallback, useEffect, useState } from "react";
import { layoutType } from "../../../types";
import { layoutServices } from "../../../services";
import NormalToast from "../../../components/AllToast/NormalToast";
import { useTableCustom } from "../../../components/Provider/TableFilterProvider";
import TableFilter from "../../../components/TableFilter";
import { modals } from "@mantine/modals";

function FormCreateLayout({
  getAllLayout,
}: {
  getAllLayout: () => Promise<void>;
}) {
  const [rowSeatSummary, setRowSeatSummary] = useState({
    sweetRows: 1,
    vipRows: 1,
    normalRows: 1,
    totalCol: 1,
    layoutName: "",
  });

  async function handleSubmit() {
    try {
      const dataPass = {
        name: rowSeatSummary.layoutName,
        rows:
          rowSeatSummary.vipRows +
          rowSeatSummary.normalRows +
          rowSeatSummary.sweetRows,
        seatsPerRow: rowSeatSummary.totalCol,
        normalRows: rowSeatSummary.normalRows,
        sweetRows: rowSeatSummary.sweetRows,
        vipRows: rowSeatSummary.vipRows,
      };

      const res = await layoutServices.createLayout(dataPass);
      if (res.statusCode === 0) {
        await getAllLayout();
        NormalToast({
          title: "Tạo kiểu bố trí",
          message: res.message,
          color: "green",
        });
        modals.closeAll();
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-6">
        <TextInput
          radius={"md"}
          // value={rowSeatSummary.layoutName}
          onChange={(e) =>
            setRowSeatSummary((prev) => ({
              ...prev,
              layoutName: e.target.value,
            }))
          }
          label="Tên kiểu bố trí"
          placeholder="Nhập tên kiểu bố trí"
        />
        <NumberInput
          radius={"md"}
          label="Số hàng ghế Sweet"
          description="Ở phần cao nhất của phòng chiếu phim"
          placeholder="Chọn số hàng"
          min={1}
          max={6}
          withAsterisk
          defaultValue={1}
          onChange={(e) =>
            setRowSeatSummary((prev) => ({
              ...prev,
              sweetRows: e as number,
            }))
          }
        />

        <NumberInput
          radius={"md"}
          withAsterisk
          label="Số hàng ghế VIP"
          description="Ở phần cao nhất của phòng chiếu phim"
          placeholder="Chọn số hàng"
          min={1}
          max={6}
          defaultValue={1}
          onChange={(e) =>
            setRowSeatSummary((prev) => ({
              ...prev,
              vipRows: e as number,
            }))
          }
        />

        <NumberInput
          radius={"md"}
          withAsterisk
          label="Số hàng ghế thường"
          description="Ở phần cao nhất của phòng chiếu phim"
          placeholder="Chọn số hàng"
          min={1}
          max={6}
          defaultValue={1}
          onChange={(e) =>
            setRowSeatSummary((prev) => ({
              ...prev,
              normalRows: e as number,
            }))
          }
        />

        <NumberInput
          radius={"md"}
          withAsterisk
          label="Số ghế trong 1 hàng"
          description="Mỗi hàng sẽ có cột ghế tương ứng"
          placeholder="Chọn số ghế"
          min={6}
          max={10}
          defaultValue={6}
          onChange={(e) =>
            setRowSeatSummary((prev) => ({
              ...prev,
              totalCol: e as number,
            }))
          }
        />
      </div>

      <Button
        size="compact-sm"
        mt={"md"}
        radius={"md"}
        onClick={() => handleSubmit()}
      >
        Lưu
      </Button>
    </div>
  );
}

function AdminLayoutPage() {
  const [data, setData] = useState<layoutType[]>([]);

  const {
    setRows,
    headers,
    setHeaders,
    limitRow,
    setIsLoading,
    activePage,
    setTotalPagination,
    currentSearchValue,
    totalPagination,
    setActivePage,
  } = useTableCustom();

  const getAllLayout = useCallback(async () => {
    try {
      const res = await layoutServices.getAllLayout();
      if (res.statusCode === 0) {
        setData(res.data);
      }
    } catch (error) {
      const err = error as Error;
      NormalToast({
        title: "Lỗi xảy ra khi lấy kiểu bố trí",
        color: "red",
        message: err.message,
      });
    }
  }, []);

  const openModalAdd = () =>
    modals.open({
      size: "md",
      title: <p className="font-medium text-sky-500">Thêm kiểu bố trí mới</p>,
      children: (
        <FormCreateLayout getAllLayout={getAllLayout}></FormCreateLayout>
      ),
      radius: "md",
    });

  useEffect(() => {
    if (data) {
      const rowRender = data.map((row) => {
        return {
          name: <Text fz="sm">{row.name}</Text>,
          rows: <Text fz="sm">{row.rows}</Text>,
          seatsPerRow: <Text fz="sm">{row.seatsPerRow}</Text>,
          action: (
            <Button size="compact-xs" variant="outline" radius={"md"}>
              Xem chi tiết
            </Button>
          ),
        };
      });

      setRows(rowRender);

      setHeaders([
        {
          label: "Tên kiểu bố trí",
          value: "name",
          isSortable: true,
        },
        {
          label: "Số hàng",
          value: "rows",
          isSortable: false,
        },
        {
          label: "Số ghế của mỗi hàng",
          value: "seatsPerRow",
          isSortable: false,
        },
        {
          label: "#",
          value: "action",
          isSortable: false,
        },
      ]);
    }
  }, [data]);

  useEffect(() => {
    getAllLayout();
  }, [getAllLayout]);

  return (
    <div>
      <div>
        <div className="flex justify-end mb-3">
          <Button size="xs" radius={"md"} onClick={openModalAdd}>
            Thêm kiểu bố trí
          </Button>
        </div>

        <TableFilter headers={headers}></TableFilter>
      </div>
    </div>
  );
}

export default AdminLayoutPage;
