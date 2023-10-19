import { Button, Text } from "@mantine/core";

import { useCallback, useEffect, useState } from "react";
import { layoutType } from "../../../types";
import { layoutServices } from "../../../services";
import NormalToast from "../../../components/AllToast/NormalToast";
import { useTableCustom } from "../../../components/Provider/TableFilterProvider";
import TableFilter from "../../../components/TableFilter";

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
          <Button size="xs" radius={"md"}>
            Thêm kiểu bố trí
          </Button>
        </div>

        <TableFilter headers={headers}></TableFilter>
      </div>
    </div>
  );
}

export default AdminLayoutPage;
