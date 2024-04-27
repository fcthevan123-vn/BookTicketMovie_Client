import { useCallback, useEffect, useState } from "react";
import { cinemaServices, movieServices, showServices } from "../../../services";
import { useTableCustom } from "../../../components/Provider/TableFilterProvider";
import {
  ActionIcon,
  Button,
  Select,
  SimpleGrid,
  Text,
  TextInput,
  ThemeIcon,
  Tooltip,
  rem,
} from "@mantine/core";
import { IconAlarm, IconPlus, IconTrash } from "@tabler/icons-react";
import TableFilter from "../../../components/TableFilter";
import { modals } from "@mantine/modals";
import { Cinema, MovieTS } from "../../../types";
import { DateTimePicker } from "@mantine/dates";
import { loadingApi } from "../../../untils/loadingApi";
import NormalToast, {
  ErrToast,
} from "../../../components/AllToast/NormalToast";
import { dateAdd } from "../../../untils/helper";
import moment from "moment";

function FormAddShow({
  updateData,
  movieData,
}: {
  updateData: () => void;
  movieData: MovieTS;
}) {
  const [dataMovieHall, setDataMovieHall] = useState([]);

  const [movieHall, setMovieHall] = useState(null);

  const [startTime, setStartTime] = useState<Date>();
  const [updatedTime, setUpdatedTime] = useState<Date>();
  const [dateShow, setDateShow] = useState<Date>();

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

  const generateEndDate = useCallback(
    (date: Date) => {
      const updatedDate = dateAdd(date, "minute", movieData.duration);
      setUpdatedTime(updatedDate);
    },
    [movieData.duration]
  );

  const handleSubmitData = async () => {
    let timeCheckEnd;

    if (updatedTime) {
      timeCheckEnd = dateAdd(updatedTime, "minute", 16);
    }
    const timeCheckStart = moment(startTime).subtract(16, "m").toDate();

    const dataPass = {
      movieId: movieData.id,
      date: dateShow,
      movieHallId: movieHall,
      startTime: startTime,
      endTime: updatedTime,
      timeCheckStart: timeCheckStart,
      timeCheckEnd: timeCheckEnd,
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
    if (movieData && startTime) {
      generateEndDate(startTime);
    }
  }, [generateEndDate, movieData, startTime]);

  useEffect(() => {
    getAllMovieHall();
  }, [getAllMovieHall]);

  return (
    <div>
      <SimpleGrid cols={1}>
        <TextInput
          radius={"md"}
          label="Phim"
          value={movieData.title}
          readOnly
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

        <div className="grid grid-cols-2 gap-5">
          <DateTimePicker
            radius={"md"}
            label="Chọn ngày và giờ chiếu: "
            description="Suất chiếu phải được tạo trước 1 ngày"
            minDate={new Date()}
            maxDate={moment(movieData.endDate).toDate()}
            onChange={(e) => {
              setDateShow(e as Date);
              setStartTime(e as Date);
            }}
          />

          <DateTimePicker
            radius={"md"}
            label="Giờ kết thúc: "
            description="Hệ thống sẽ tự động điền"
            value={updatedTime}
            readOnly
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
  const [allShows, setAllShows] = useState<MovieTS[]>([]);

  const { setRows, headers, setHeaders, currentSearchValue } = useTableCustom();

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

  const openModalAdd = (data: MovieTS) => {
    modals.open({
      title: (
        <Text fw={500} size="lg" c={"blue"}>
          Thêm suất chiếu mới
        </Text>
      ),
      size: "lg",
      children: (
        <FormAddShow
          updateData={getAllShowByMovie}
          movieData={data}
        ></FormAddShow>
      ),
      radius: "md",
      lockScroll: false,
    });
  };

  const getAllShowByMovie = useCallback(async () => {
    try {
      const res = await movieServices.getAllShowByMovie();
      if (res.statusCode == 0) {
        setAllShows(res.data);
      }
    } catch (error) {
      ErrToast(error as Error, "getAllShowByMovie");
    }
  }, []);

  useEffect(() => {
    if (allShows) {
      const rowRender = allShows.map((row) => {
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
            row.Shows && row.Shows.length > 0 ? (
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
                        {moment(show.startTime).format("HH:mm")} ~{" "}
                        {moment(show.endTime).format("HH:mm")}
                      </Text>
                      |
                      <Text fz="sm">
                        {moment(show.date).format("DD/MM/YYYY")}
                      </Text>
                      |
                      <Text fz="sm">
                        {show.MovieHall.name} - {show.MovieHall.Cinema.name}
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

          action: (
            <Tooltip label="Thêm suất chiếu mới">
              <ActionIcon
                variant="filled"
                radius="md"
                aria-label="Settings"
                onClick={() => openModalAdd(row)}
              >
                <IconPlus
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Tooltip>
          ),
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
        {
          label: "#",
          value: "action",
          isSortable: false,
        },
      ]);
    }
  }, [allShows]);

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
        <Button size="compact-sm" radius={"md"}>
          Thêm suất chiếu
        </Button>
      </div>
      <TableFilter headers={headers}></TableFilter>
    </div>
  );
};

export default ShowTimePage;
