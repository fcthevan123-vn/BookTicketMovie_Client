import {
  ActionIcon,
  Button,
  NumberFormatter,
  TableData,
  Text,
} from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { useAuthenticate } from "../../../hooks";
import { roomTypeServices } from "../../../services";
import { ErrToast } from "../../../components/AllToast/NormalToast";
import { RoomType, UserTS } from "../../../types";
import { IconEdit } from "@tabler/icons-react";
import TableDefault from "../../../components/Tables/TableDefault";
import { modals } from "@mantine/modals";
import { FormRoomType } from "./FormRoomType";

function RoomTypePage() {
  const [, , dataUser] = useAuthenticate();
  const [data, setData] = useState<UserTS>();
  const [tableData, setTableData] = useState<TableData>();
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

  const generateDataTable = useCallback(
    (dataRes: UserTS) => {
      const rows = dataRes.Cinema?.RoomTypes?.map((roomType) => {
        const generateNormalPrice = (
          <div className="grid grid-cols-3">
            <div className="">
              <p className="">Trẻ em: </p>
              <p className="">Người lớn: </p>
              <p className="">Người cao tuổi: </p>
            </div>
            <div className="col-span-2 flex flex-col ">
              {roomType.priceNormal.map((price, index) => (
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
        );

        return [
          roomType.name,
          generateNormalPrice,
          generateNormalPrice,
          <div className="flex gap-3">
            <ActionIcon
              radius={"sm"}
              size={"md"}
              variant="light"
              color="violet"
              aria-label="Settings"
              onClick={() => modalUpdateRoomType(dataRes, roomType)}
            >
              <IconEdit style={{ width: "75%", height: "75%" }} stroke={1.5} />
            </ActionIcon>
          </div>,
        ];
      });

      setTableData({
        head: ["Tên", "Giá vé ngày thường", "Giá vé cuối tuần/ ngày lễ", "#"],
        body: rows,
      });
    },
    [modalUpdateRoomType]
  );

  useEffect(() => {
    getRoomType(dataUser.id);
  }, [dataUser.id, getRoomType]);

  useEffect(() => {
    if (data) {
      generateDataTable(data);
    }
  }, [data, generateDataTable]);
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
      {tableData && (
        <TableDefault
          loading={isLoading}
          data={tableData}
          minWidth={800}
        ></TableDefault>
      )}
    </div>
  );
}

export default RoomTypePage;
