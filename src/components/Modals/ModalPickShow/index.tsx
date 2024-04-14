import {
  Badge,
  Box,
  ComboboxData,
  LoadingOverlay,
  Modal,
  Notification,
  Paper,
  Select,
  Text,
  rem,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import {
  IconAlertTriangle,
  IconCalendar,
  IconChalkboard,
  IconLocation,
} from "@tabler/icons-react";
import ShowItem from "../../ShowItem";
import apiProvinceVietNam from "../../../untils/apiProvinceVietNam";
import NormalToast from "../../AllToast/NormalToast";
import { useCallback, useEffect, useState } from "react";
import { roomTypeServices, showServices } from "../../../services";
import moment from "moment";
import { DataTableMoviesProps } from "../../Provider/MovieProvider/MovieProvider";
import { Cinema, MovieHall, Show } from "../../../types";

type Props = {
  close: () => void;
  opened: boolean;
  dataMovie: DataTableMoviesProps;
};

type dataShowType = {
  cinema: Cinema;
  allShowsMovieHall: allShowsMovieHallType[];
};

type allShowsMovieHallType = {
  allShows: Show[];
  movieHall: MovieHall;
};

function ModalPickShow({ opened, close, dataMovie }: Props) {
  const [dataProvince, setDataProvince] = useState([]);
  const [dataRoomType, setDataRoomType] = useState<ComboboxData>();
  const [cityControl, setCityControl] = useState<string | null>("92");
  const [dateControl, setDateControl] = useState(new Date());
  const [roomTypeControl, setRoomTypeControl] = useState<string | null>("all");
  const [data, setData] = useState<dataShowType[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const dataShowControl = {
    dateControl: dateControl,
    roomTypeControl: roomTypeControl,
    cityControl: cityControl,
  };

  const titleCustom = (
    <div className="w-full flex justify-between px-20">
      <div className="flex gap-6">
        <DatePickerInput
          leftSection={
            <IconCalendar
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          }
          value={dateControl}
          onChange={(e) => setDateControl(e as Date)}
          valueFormat="DD - MM - YYYY"
          minDate={new Date()}
          placeholder="Chọn ngày muốn xem"
          label="Ngày"
          radius="md"
          styles={{
            label: {
              color: "white",
            },
          }}
        />

        <Select
          leftSection={
            <IconLocation
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          }
          // defaultValue={"92"}
          searchable
          allowDeselect={false}
          checkIconPosition="right"
          label="Thành phố/ Tỉnh"
          value={cityControl}
          onChange={(e) => setCityControl(e)}
          radius="md"
          placeholder="Chọn thành phố của bạn"
          data={dataProvince}
          nothingFoundMessage="Không tìm thấy thành phố"
          styles={{
            label: {
              color: "white",
            },
          }}
        />
      </div>
      <Select
        leftSection={
          <IconChalkboard
            style={{ width: rem(18), height: rem(18) }}
            stroke={1.5}
          />
        }
        // defaultValue={"all"}
        allowDeselect={false}
        checkIconPosition="right"
        value={roomTypeControl}
        onChange={(e) => setRoomTypeControl(e as string)}
        label="Kiểu phòng"
        radius="md"
        placeholder="Chọn kiểu phòng"
        data={dataRoomType}
        styles={{
          label: {
            color: "white",
          },
        }}
      />
    </div>
  );

  const getAllRoomType = useCallback(async () => {
    try {
      const res = await roomTypeServices.getAllRoomType();
      if (res.statusCode === 0) {
        const convertData = res.data.map(
          (item: { id: string; name: string }) => {
            return { value: item.id, label: item.name };
          }
        );
        const combineData = [
          {
            value: "all",
            label: "Tất cả",
          },
          ...convertData,
        ];

        setDataRoomType(combineData);
      }
    } catch (error) {
      const err = error as Error;
      NormalToast({
        title: "getAllRoomType",
        message: err.message,
        color: "red",
      });
    }
  }, []);

  const callApiCity = useCallback(async () => {
    try {
      const res = await apiProvinceVietNam.callApiCity("");

      const convertData = res.results.map(
        (item: { province_id: string; province_name: string }) => {
          return { value: item.province_id, label: item.province_name };
        }
      );
      setDataProvince(convertData);
    } catch (error) {
      const err = error as Error;
      NormalToast({
        title: "callApiCity",
        message: err.message,
        color: "red",
      });
    }
  }, []);

  function filterData(jsonData: dataShowType[]) {
    jsonData.forEach((item) => {
      item.allShowsMovieHall = item.allShowsMovieHall.filter(
        (movieHall) => movieHall.allShows.length !== 0
      );
    });

    const isEmpty = jsonData.every(
      (item) => item.allShowsMovieHall.length === 0
    );

    if (isEmpty) {
      jsonData = [];
    }

    return jsonData;
  }

  const getShows = useCallback(async () => {
    try {
      setIsLoading(true);
      const dateFormatted = moment(dateControl).format("YYYY-MM-DD");

      const res = await showServices.getAllShowBeforePickSeat(
        dataMovie.id,
        roomTypeControl as unknown as string,
        dateFormatted,
        cityControl as unknown as string
      );
      setIsLoading(false);
      if (res.statusCode === 0) {
        const dataClone = res.data;
        const filteredData = filterData(dataClone);
        setData(filteredData);
      }
    } catch (error) {
      const err = error as Error;
      NormalToast({
        title: "getShows",
        message: err.message,
        color: "red",
      });
    }
  }, [cityControl, dataMovie.id, dateControl, roomTypeControl]);

  useEffect(() => {
    callApiCity();
    getAllRoomType();
    getShows();
  }, [callApiCity, getAllRoomType, getShows, opened]);

  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        title={titleCustom}
        fullScreen
        padding={"lg"}
        radius={0}
        styles={{
          header: {
            background: "var(--mantine-color-blue-5)",
          },
          body: {
            marginTop: "15px",
          },
          title: {
            width: "100%",
          },
          content: {
            background: "var(--mantine-color-gray-2)",
          },
        }}
        // transitionProps={{ transition: "fade", duration: 200 }}
      >
        <Paper withBorder shadow="sm" radius="lg    " p="lg">
          <div>
            <div className="flex items-center gap-5 justify-between">
              <Text fw={700} size="lg" c={"blue"} tt={"uppercase"}>
                {dataMovie.title} - {dataMovie.duration} phút
              </Text>
              <div className="flex gap-2">
                {dataMovie.genre.map((g, index) => (
                  <Badge
                    key={index}
                    color="blue"
                    size="md"
                    variant="dot"
                    radius="md"
                  >
                    {g}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Paper>

        <Box pos="relative" mih={100}>
          <div className="mt-4 flex flex-col gap-4">
            <LoadingOverlay
              visible={isLoading}
              zIndex={10}
              overlayProps={{ radius: "md", blur: 2 }}
              loaderProps={{ color: "blue", type: "bars" }}
            />

            {data && data.length > 0 ? (
              data.map((item, index) => (
                <ShowItem
                  dataShow={item}
                  key={index}
                  dataControlShow={dataShowControl}
                ></ShowItem>
              ))
            ) : (
              <Notification
                color="yellow"
                title="Không tìm thấy suất chiếu"
                withCloseButton={false}
                radius={"lg"}
                withBorder
                icon={
                  <IconAlertTriangle
                    style={{ width: rem(20), height: rem(20) }}
                  ></IconAlertTriangle>
                }
              >
                Vui lòng chọn ngày hoặc thành phố/ tỉnh khác để xem suất chiếu
              </Notification>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalPickShow;
