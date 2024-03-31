import { useCallback, useEffect, useRef, useState } from "react";
import {
  cinemaServices,
  movieHallServices,
  movieServices,
  showServices,
} from "../../../services";
import { normalApi } from "../../../untils/normalApi";
import { useTableCustom } from "../../../components/Provider/TableFilterProvider";
import {
  ActionIcon,
  Button,
  List,
  Select,
  SimpleGrid,
  Text,
  TextInput,
  ThemeIcon,
  rem,
} from "@mantine/core";
import {
  IconAlarm,
  IconClock,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import TableFilter from "../../../components/TableFilter";
import moment from "moment";
import { modals } from "@mantine/modals";
import { Cinema, MovieTS } from "../../../types";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { loadingApi } from "../../../untils/loadingApi";
import NormalToast from "../../../components/AllToast/NormalToast";

function FormAddShow({ updateData }: { updateData: () => void }) {
  const [dataMovie, setDataMovie] = useState([]);
  const [dataMovieHall, setDataMovieHall] = useState([]);
  const [detailDataMovie, setDetailDataMovie] = useState([]);

  const [movie, setMovie] = useState(null);
  const [movieHall, setMovieHall] = useState(null);

  const [startTime, setStartTime] = useState("");
  const [updatedTime, setUpdatedTime] = useState("");
  const [dateShow, setDateShow] = useState<Date>();

  const refStart = useRef<HTMLInputElement>(null);

  const pickerControlStart = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => refStart.current?.showPicker()}
    >
      <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
  );

  const getAllShowByMovie = useCallback(async () => {
    try {
      const res = await movieServices.getAllShowByMovie();
      if (res.statusCode === 0) {
        const formatData = res.data.map((data: MovieTS) => {
          return {
            value: data.id,
            label: `${data.title} - ${data.duration} phút`,
          };
        });
        setDataMovie(formatData);
        setDetailDataMovie(res.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  const getAllMovieHall = useCallback(async () => {
    try {
      const res = await cinemaServices.getAllCinemas();
      if (res.statusCode === 0) {
        const data = res.data.map((data: Cinema) => {
          const itemsMovie = data.MovieHalls.map((movieHall) => {
            return {
              value: movieHall.id,
              label: `${movieHall.name} - Kiểu phòng ${movieHall.RoomType.name} - ${movieHall.Layout.name}`,
            };
          });
          return {
            group: data.name,
            items: itemsMovie,
          };
        });

        setDataMovieHall(data);
      }
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  const generateEndDate = (date: string) => {
    // console.log("dataMovie", dataMovie);
    const movieSelected: MovieTS[] = detailDataMovie.filter(
      (item: MovieTS) => item.id == movie
    );

    setStartTime(date);
    const startDate = moment(date, "HH:mm");
    const updatedDate = startDate.add(movieSelected[0].duration, "minutes");
    const updatedTime = updatedDate.format("HH:mm");
    setUpdatedTime(updatedTime);
  };

  const handleSubmitData = async () => {
    const dataPass = {
      movieId: movie,
      date: dateShow,
      movieHallId: movieHall,
      startTime: startTime,
      endTime: updatedTime,
    };

    const api = showServices.createShow(dataPass);
    const res = await loadingApi(api, "Tạo suất chiếu");

    if (res) {
      await updateData();
      modals.closeAll();
      window.location.reload();
    }

    return res;
  };

  useEffect(() => {
    if (movie) {
      generateEndDate(startTime);
    }
  }, [movie]);

  useEffect(() => {
    getAllMovieHall();
    getAllShowByMovie();
  }, [getAllMovieHall, getAllShowByMovie]);

  return (
    <div>
      <SimpleGrid cols={1}>
        <Select
          radius={"md"}
          placeholder="Vui lòng chọn tên phim"
          label="Phim: "
          allowDeselect={false}
          data={dataMovie}
          withAsterisk
          onChange={(e) => setMovie(e as null)}
          searchable
        />

        <Select
          radius={"md"}
          placeholder="Đọc kỹ thông tin trước khi chọn"
          label="Phòng chiếu: "
          allowDeselect={false}
          data={dataMovieHall}
          withAsterisk
          onChange={(e) => setMovieHall(e as null)}
          searchable
        />

        <DatePickerInput
          radius={"md"}
          label="Ngày: "
          placeholder="Chọn ngày"
          withAsterisk
          minDate={new Date()}
          onChange={(e) => setDateShow(e as Date)}
        />

        <div className="flex gap-5">
          <TimeInput
            className="w-1/2"
            radius={"md"}
            withAsterisk
            disabled={!movie ? true : false}
            label="Thời gian bắt đầu: "
            ref={refStart}
            rightSection={pickerControlStart}
            onChange={(e) => generateEndDate(e.target.value as string)}
          />
          {/* {console.log("updatedTime", updatedTime)} */}
          <TimeInput
            className="w-1/2"
            radius={"md"}
            disabled={!movie ? true : false}
            withAsterisk
            readOnly
            value={updatedTime}
            label="Thời gian kết thúc: "
          />
        </div>
      </SimpleGrid>
      <Button
        onClick={() => handleSubmitData()}
        type="submit"
        size="xs"
        radius={"md"}
        mt={"md"}
      >
        Lưu
      </Button>
    </div>
  );
}

const ShowTimePage = () => {
  const {
    setRows,
    headers,
    setHeaders,
    dataGloBal,
    setDataGlobal,
    currentSearchValue,
  } = useTableCustom();

  // const [dataMovie, setDataMovie] = useState<MovieTS[]>([]);

  // const mulData = useState({
  //   movie: [],
  //   cinema: [],
  //   movieHall: [],
  //   layout
  // })

  const openModalDelete = (showId: string) =>
    modals.openConfirmModal({
      title: (
        <p className="text-red-500 font-medium text-lg">
          Xác nhận xoá suất chiếu
        </p>
      ),
      radius: "md",
      children: (
        <Text size="sm" fw={500}>
          LƯU Ý RẰNG KHI XOÁ SẼ ẢNH HƯỞNG TỚI CÁC KHÁCH ĐÃ ĐẶT XUẤT CHIẾU NÀY.
          XIN THẬN TRỌNG!!!
        </Text>
      ),
      centered: true,
      confirmProps: {
        radius: "md",
        color: "red",
      },
      cancelProps: {
        radius: "md",
      },
      labels: { confirm: "Đồng ý", cancel: "Huỷ" },
      onCancel: () => console.log("Cancel"),
      onConfirm: async () => {
        try {
          const res = await showServices.deleteShow(showId);
          if (res.statusCode === 0) {
            await getAllShowByMovie();

            NormalToast({
              title: "Xoá show",
              color: "green",
              message: res.message,
            });
            modals.closeAll();
          }
        } catch (error) {
          const err = error as Error;
          NormalToast({
            title: "Xoá show",
            color: "red",
            message: err.message,
          });
        }
      },
    });

  const openModalAdd = () => {
    modals.open({
      title: (
        <Text fw={500} size="lg" c={"blue"}>
          Thêm suất chiếu mới
        </Text>
      ),
      size: "lg",
      children: <FormAddShow updateData={getAllShowByMovie}></FormAddShow>,
      radius: "md",
      lockScroll: false,
    });
  };

  const getAllShowByMovie = useCallback(async () => {
    const api = movieServices.getAllShowByMovie();
    const res = await normalApi(api, "getAllShowByMovie");
    if (res) {
      setDataGlobal(res);
    }
    return res;
  }, [setDataGlobal]);

  useEffect(() => {
    if (dataGloBal) {
      const rowRender = dataGloBal.map((row: any) => {
        return {
          infoMovie: (
            <div>
              <Text fz="md" fw={500}>
                {row.title}
              </Text>

              <Text fz="sm">{row.language}</Text>
              <Text fz="sm">{row.genre.join("-")}</Text>
            </div>
          ),
          dateShowing: (
            <div>
              <Text fz="sm">
                Từ: {moment(row.releaseDate).format("DD/MM/YYYY")}
              </Text>
              <Text fz="sm">
                Từ: {moment(row.endDate).format("DD/MM/YYYY")}
              </Text>
            </div>
          ),
          showTime:
            row.Shows.length > 0 ? (
              <div className="flex gap-3 flex-col justify-center">
                {row.Shows.map((show, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between items-center w-full gap-10"
                  >
                    <div className="flex gap-2 items-center">
                      <ThemeIcon color="violet" size={28} radius="xl">
                        <IconAlarm
                          style={{ width: rem(22), height: rem(22) }}
                        />
                      </ThemeIcon>
                      <Text fz="sm" fw={700}>
                        {show.startTime} ~ {show.endTime}
                      </Text>
                      |
                      <Text fz="sm">
                        {moment(show.date).format("DD/MM/YYYY")}
                      </Text>
                      |
                      <Text fz="sm">
                        {show.MovieHall.name} - {show.MovieHall.Cinema.name}
                      </Text>
                      |
                      <Text fz="sm">
                        {show.MovieHall.Layout.name} - Phòng{" "}
                        {show.MovieHall.RoomType.name}
                      </Text>
                    </div>
                    <div className="flex gap-2 items-center">
                      <ActionIcon
                        variant="filled"
                        color="red"
                        radius="md"
                        aria-label="Settings"
                        onClick={() => openModalDelete(show.id)}
                      >
                        <IconTrash
                          style={{ width: "70%", height: "70%" }}
                          stroke={1.5}
                        />
                      </ActionIcon>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Text fz="sm" fs={"italic"}>
                Phim này hiện chưa có suất chiếu!
              </Text>
            ),
          // number: <Text fz="sm">{row.number}</Text>,
          // RoomType: (
          //   <div className="flex items-center gap-2">
          //     <Text fz="sm">{row.RoomType.name as string} </Text>
          //     {/* <ActionIcon
          //       onClick={() => openModalViewRoomType(row.RoomType)}
          //       variant="light"
          //       size="sm"
          //       aria-label="Settings"
          //     >
          //       <IconEye style={{ width: "70%", height: "70%" }} stroke={1.5} />
          //     </ActionIcon> */}
          //   </div>
          // ),
          // Layout: <Text fz="sm">{row.Layout.name as string}</Text>,
        };
      });

      setRows(rowRender);

      setHeaders([
        {
          label: "Thông tin phim",
          value: "infoMovie",
          isSortable: true,
        },
        {
          label: "Ngày diễn ra",
          value: "dateShowing",
          isSortable: false,
        },
        {
          label: "Thông tin các suất chiếu phim",
          value: "showTime",
          isSortable: false,
        },
        // {
        //   label: "Kiểu phòng",
        //   value: "RoomType",
        //   isSortable: false,
        // },
        // {
        //   label: "Kiểu bố trí",
        //   value: "Layout",
        //   isSortable: false,
        // },
      ]);
    }
  }, [dataGloBal]);

  useEffect(() => {
    getAllShowByMovie();
  }, [getAllShowByMovie]);

  useEffect(() => {
    if (!currentSearchValue) {
      getAllShowByMovie();
    }
  }, [currentSearchValue]);

  return (
    <div>
      <div className="flex justify-end mb-3">
        <Button size="xs" radius={"md"} onClick={openModalAdd}>
          Thêm suất chiếu
        </Button>
      </div>
      <TableFilter headers={headers}></TableFilter>
    </div>
  );
};

export default ShowTimePage;
