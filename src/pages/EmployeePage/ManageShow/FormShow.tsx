import { useCallback, useEffect, useMemo, useState } from "react";
import { Cinema, MovieTS } from "../../../types";
import { cinemaServices, showServices } from "../../../services";
import { dateAdd } from "../../../untils/helper";
import moment from "moment";
import { loadingApi } from "../../../untils/loadingApi";
import { Button, Select, SimpleGrid } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { modals } from "@mantine/modals";
import NormalToast from "../../../components/AllToast/NormalToast";
import { useAuthenticate } from "../../../hooks";

type Props = {
  updateData: () => Promise<void>;
  movieData: MovieTS[];
};

function FormShow({ updateData, movieData }: Props) {
  const [dataMovieHall, setDataMovieHall] = useState([]);
  const [movieHall, setMovieHall] = useState(null);
  const [startTime, setStartTime] = useState<Date>();
  const [updatedTime, setUpdatedTime] = useState<Date>();
  const [dateShow, setDateShow] = useState<Date>();
  const [movieValue, setMovieValue] = useState("");
  const [movie, setMovie] = useState<MovieTS>();
  const [, , dataUser] = useAuthenticate();

  //   console.log("movieData", movieData);

  const generateMovieSelect = useMemo(() => {
    return movieData.map((item) => {
      return {
        value: item.id as string,
        label: `${item.title} - ${item.duration} phút`,
      };
    });
  }, [movieData]);

  const getAllMovieHall = useCallback(async () => {
    try {
      const res = await cinemaServices.getAllCinemas();
      if (res.statusCode === 0) {
        const filterCinema = res.data.filter(
          (data: Cinema) => data.userId == dataUser.id
        );

        const data = filterCinema.map((data: Cinema) => {
          const itemsMovie = data.MovieHalls!.map((movieHall) => {
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
      if (movie) {
        const updatedDate = dateAdd(date, "minute", movie.duration);
        setUpdatedTime(updatedDate);
      }
    },
    [movie]
  );

  const handleSubmitData = async (
    movie: MovieTS,
    startTime: Date,
    updatedTime: Date,
    dateShow: Date,
    movieHall: string
  ) => {
    if (!movie || !startTime || !updatedTime || !movieHall || !dateShow) {
      return NormalToast({
        title: "Thiếu dữ liệu",
        message: "Hãy kiểm tra các thông tin  và thử lại ",
        color: "orange",
      });
    }
    let timeCheckEnd;

    if (updatedTime) {
      timeCheckEnd = dateAdd(updatedTime, "minute", 16);
    }
    const timeCheckStart = moment(startTime).subtract(16, "m").toDate();

    const dataPass = {
      movieId: movie.id,
      date: dateShow,
      movieHallId: movieHall,
      startTime: startTime,
      endTime: updatedTime,
      timeCheckStart: timeCheckStart,
      timeCheckEnd: timeCheckEnd,
    };

    console.log("dataPass", dataPass);

    const api = showServices.createShow(dataPass);
    const res = await loadingApi(api, "Tạo suất chiếu");

    if (res) {
      await updateData();
      modals.closeAll();
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

  useEffect(() => {
    const filterMovie = movieData.filter((item) => item.id == movieValue);

    setMovie(filterMovie[0]);
  }, [movieData, movieValue]);

  return (
    <div>
      <SimpleGrid cols={1}>
        <Select
          radius={"md"}
          placeholder="Đọc kỹ thông tin trước khi chọn"
          label="Phim: "
          allowDeselect={false}
          data={generateMovieSelect}
          withAsterisk
          onChange={(e) => setMovieValue(e as string)}
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

        <div className="grid grid-cols-2 gap-5">
          <DateTimePicker
            radius={"md"}
            label="Chọn ngày và giờ chiếu: "
            description="Suất chiếu phải được tạo trước 1 ngày"
            minDate={new Date()}
            maxDate={moment(movie?.endDate).toDate()}
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
        onClick={() =>
          handleSubmitData(
            movie as MovieTS,
            startTime as Date,
            updatedTime as Date,
            dateShow as Date,
            movieHall as unknown as string
          )
        }
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

export default FormShow;
