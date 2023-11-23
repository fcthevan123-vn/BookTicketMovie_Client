// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { ActionIcon, Button, List, Text, ThemeIcon } from "@mantine/core";
import { modals } from "@mantine/modals";

import FormAddMovieHall from "../../../components/Forms/FormMovieHall/FormAddMovieHall";
import { useCallback, useEffect } from "react";
import { movieHallServices } from "../../../services";
import { normalApi } from "../../../untils/normalApi";
import { useTableCustom } from "../../../components/Provider/TableFilterProvider";
import TableFilter from "../../../components/TableFilter";
import { IconChevronRight, IconEye } from "@tabler/icons-react";

import moment from "moment";

// type movieHallProps = {
//   name: string;
//   number: number;
//   RoomType: Record<string, unknown>;
//   Layout: Record<string, unknown>;
// };

// type movieHallRows = {
//   name: React.ReactNode;
//   number: React.ReactNode;
//   RoomType: React.ReactNode;
//   Layout: React.ReactNode;
// };

function AdminMovieHallPage() {
  const {
    setRows,
    headers,
    setHeaders,
    dataGloBal,
    setDataGlobal,
    currentSearchValue,
  } = useTableCustom();

  const openModalAdd = () => {
    modals.open({
      title: (
        <Text fw={500} size="lg" c={"blue"}>
          Tạo phòng chiếu phim mới
        </Text>
      ),
      size: "lg",
      children: (
        <FormAddMovieHall getAllMovieHall={getAllMovieHall}></FormAddMovieHall>
      ),
      radius: "md",
      lockScroll: false,
    });
  };

  const openModalViewRoomType = (data: Record<string, unknown>) => {
    modals.open({
      title: (
        <Text fw={500} size="lg" c={"blue"}>
          Xem chi tiết kiểu phòng
        </Text>
      ),
      size: "lg",
      children: (
        <List
          spacing="xs"
          size="sm"
          center
          icon={
            <ThemeIcon color="cyan" size={24} radius="md">
              <IconChevronRight size="1rem" />
            </ThemeIcon>
          }
        >
          <List.Item>Tên: {data.name as string}</List.Item>
          <List.Item>Tỷ lệ giá: {data.priceMultiplier as string}</List.Item>
          <List.Item>
            Ngày tạo: {moment(data.createdAt as Date).format("DD - MM - YYYY")}
          </List.Item>
        </List>
      ),
      radius: "md",
      lockScroll: false,
    });
  };

  const getAllMovieHall = useCallback(async () => {
    const api = movieHallServices.getAllMovieHall();
    const res = await normalApi(api, "getAllMovieHall");
    if (res) {
      setDataGlobal(res);
    }
    return res;
  }, []);

  useEffect(() => {
    if (dataGloBal) {
      const rowRender = dataGloBal.map((row) => {
        return {
          name: <Text fz="sm">{row.name}</Text>,
          number: <Text fz="sm">{row.number}</Text>,
          RoomType: (
            <div className="flex items-center gap-2">
              <Text fz="sm">{row.RoomType.name as string} </Text>
              <ActionIcon
                onClick={() => openModalViewRoomType(row.RoomType)}
                variant="light"
                size="sm"
                aria-label="Settings"
              >
                <IconEye style={{ width: "70%", height: "70%" }} stroke={1.5} />
              </ActionIcon>
            </div>
          ),
          Layout: <Text fz="sm">{row.Layout.name as string}</Text>,
        };
      });

      setRows(rowRender);

      setHeaders([
        {
          label: "Tên phòng chiếu phim",
          value: "name",
          isSortable: true,
        },
        {
          label: "Phòng số",
          value: "number",
          isSortable: false,
        },
        {
          label: "Kiểu phòng",
          value: "RoomType",
          isSortable: false,
        },
        {
          label: "Kiểu bố trí",
          value: "Layout",
          isSortable: false,
        },
      ]);
    }
  }, [dataGloBal]);

  useEffect(() => {
    getAllMovieHall();
  }, [getAllMovieHall]);

  useEffect(() => {
    if (!currentSearchValue) {
      getAllMovieHall();
    }
  }, [currentSearchValue]);

  return (
    <div>
      <div className="flex justify-end mb-3">
        <Button size="xs" radius={"md"} onClick={openModalAdd}>
          Thêm phòng chiếu phim
        </Button>
      </div>

      <TableFilter headers={headers}></TableFilter>
    </div>
  );
}

export default AdminMovieHallPage;
