import {
  Image,
  Rating,
  ActionIcon,
  Select,
  rem,
  Divider,
  Badge,
  LoadingOverlay,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import {
  IconArrowLeft,
  IconCalendar,
  IconLocation,
  IconTheater,
} from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cinemaServices, reviewServices } from "../../services";
import { ErrToast } from "../../components/AllToast/NormalToast";
import { Cinema, MovieHall, MovieTS, Show } from "../../types";
import moment from "moment";
import { useSetState } from "@mantine/hooks";
import apiProvinceVietNam from "../../untils/apiProvinceVietNam";
import { getAllNameProvince } from "../../untils/helper";

type dataShowType = {
  cinema: Cinema;
  allShowsMovieHall: allShowsMovieHallType[];
};

type allShowsMovieHallType = {
  allShows: Show[];
  movieHall: MovieHall;
};

type movieDataType = {
  rating: {
    totalCount: number;
    average: number;
  };
  movie: MovieTS;
};

type DataQueryType = {
  city: string;
  district: string;
  selectedDate: Date;
  cinema: string | null;
  movieId: string;
};

function ShowTime({ data }: { data: allShowsMovieHallType }) {
  return (
    <div className="mt-1">
      <Badge variant="outline" size="lg" color="violet" radius="sm">
        {data.movieHall.name}
      </Badge>

      <div className="mt-5 grid grid-cols-6 2xl:grid-cols-8 gap-4">
        {data.allShows.map((show, index) => (
          <Link key={index} to={`/pick-seat-by-show/${show.id}`}>
            <div className="font-thin border w-[120px] py-2 px-3 shadow-sm r rounded cursor-pointer transition duration-500 ease-in-out hover:bg-violet-500 hover:text-white flex flex-col items-center">
              <p>{moment(show.startTime).format("HH:mm")}</p>
              <p className="mt-1 text text-xs  ">
                {show.availableSeats - show.bookedSeats}/{show.availableSeats}{" "}
                ghế
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ShowOfCinema({ data }: { data: dataShowType }) {
  const [nameProvince, setNameProvince] = useState("");
  const getNameProvince = useCallback(async () => {
    try {
      const res = await getAllNameProvince(
        data.cinema.location as string[],
        ", "
      );

      setNameProvince(res as string);
    } catch (error) {
      ErrToast(error as Error, "getNameProvince");
    }
  }, [data.cinema.location]);

  useEffect(() => {
    getNameProvince();
  }, [getNameProvince]);

  return (
    <div className="w-3/4 rounded-md shadow border-2 p-7 mb-10">
      <div className="grid gap-3">
        <p className="text-xl font-bold text-violet-500">{data.cinema.name}</p>

        <div className="flex gap-5 text-sm items-center text-gray-400 font-light">
          <p className="">
            {data.cinema.detailLocation}, {nameProvince}
          </p>
          -<p className="cursor-pointer hover:underline">Xem Bản đồ</p>
        </div>

        <div className="flex flex-col gap-7">
          <>
            {data.allShowsMovieHall.map((item, index) => (
              <ShowTime data={item} key={index}></ShowTime>
            ))}
          </>
        </div>
      </div>
    </div>
  );
}

function SelectShowPage() {
  const location = useLocation();
  const pathname = location.pathname;
  const id = pathname.substring(pathname.lastIndexOf("/") + 1);
  const [movieData, setMovieData] = useState<movieDataType>();
  const [showData, setShowData] = useState<dataShowType[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataSelect, setDataSelect] = useSetState({
    city: [
      {
        value: "92",
        label: "Thành phố Cần Thơ",
      },
    ],
    district: [
      {
        value: "",
        label: "",
      },
    ],
    cinema: [],
  });

  const [dataQuery, setDataQuery] = useSetState<DataQueryType>({
    city: "92",
    district: "-1",
    selectedDate: new Date(),
    cinema: null,
    movieId: id,
  });

  const getMovie = useCallback(async () => {
    try {
      const res = await reviewServices.calculateStar(id);

      setMovieData({
        rating: res.data,
        movie: res.movieData,
      });
    } catch (error) {
      ErrToast(error as Error, "getMovie");
    }
  }, [id]);

  const getCity = useCallback(async () => {
    try {
      setIsLoading(true);
      setDataSelect({
        cinema: [],
      });
      const res = await apiProvinceVietNam.callApiCity("");

      const convertData = res.results.map(
        (item: { province_id: string; province_name: string }) => {
          return { value: item.province_id, label: item.province_name };
        }
      );
      setDataSelect({
        city: convertData,
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      ErrToast(error as Error, "getCity");
    }
  }, [setDataSelect]);

  const getDistrict = useCallback(
    async (city: string) => {
      try {
        setIsLoading(true);
        const res = await apiProvinceVietNam.callApiCity(`district/${city}`);

        const allDistrict = [
          {
            value: "-1",
            label: "Tất cả",
          },
        ];

        const convertData = res.results.map(
          (item: { district_id: string; district_name: string }) => {
            return { value: item.district_id, label: item.district_name };
          }
        );

        const combineData = allDistrict.concat(convertData);

        setDataSelect({
          district: combineData,
        });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);

        ErrToast(error as Error, "getCity");
      }
    },
    [setDataSelect]
  );

  const getAllCinema = useCallback(
    async (data: typeof dataQuery) => {
      setIsLoading(true);
      setShowData(undefined);
      try {
        const res = await cinemaServices.getCinemaHaveShows(data);

        const allCinema = [
          {
            value: "-1",
            label: "Tất cả rạp",
          },
        ];

        if (res.statusCode === 0 && res.data.length > 0) {
          const combineData = allCinema.concat(res.data);
          setDataSelect({ cinema: combineData as never[] });
          if (res.allShows) {
            setShowData(res.allShows.data);
          }
        }
        setIsLoading(false);
      } catch (error) {
        ErrToast(error as Error, "getAllCinema");
      }
    },
    [setDataSelect]
  );

  useEffect(() => {
    getMovie();
  }, [getMovie]);

  useEffect(() => {
    getCity();
  }, [getCity]);

  useEffect(() => {
    getDistrict(dataQuery.city);
  }, [dataQuery.city, getDistrict]);

  useEffect(() => {
    getAllCinema(dataQuery);
  }, [dataQuery, getAllCinema]);

  return (
    <div className="">
      <div className="">
        <div className="relative h-max w-full">
          <div className="absolute z-50 top-5 left-3">
            <Link to={`/movie/${id}`}>
              <ActionIcon
                variant="transparent"
                color="white"
                aria-label="Settings"
                size={"xl"}
              >
                <IconArrowLeft
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Link>
          </div>
          <div className="absolute bg-gradient-to-r from-pink-500 to-teal-300 w-full z-20 ">
            <div className="grid grid-cols-4 gap-8 pt-6 pb-20 backdrop-blur-sm bg-black/25 xl:px-52 px-16 ">
              <div className="xl:col-span-1 col-span-2 flex justify-center">
                <Image
                  radius="md"
                  h={320}
                  w={280}
                  fit="cover"
                  src={movieData?.movie.images[0]}
                />
              </div>

              <div className="xl:col-span-3 col-span-2 flex flex-col gap-1 text-white">
                <p className="text-3xl font-semibold">
                  {movieData?.movie.title}
                </p>

                <p className="text-md">
                  {movieData?.movie.genre.join(" - ").toUpperCase()}
                </p>

                <div>
                  <Rating
                    value={movieData?.rating.average}
                    fractions={2}
                    readOnly
                  />
                  <p className="text-xs font-extralight italic text-gray-200/75">
                    Dựa trên {movieData?.rating.totalCount} đánh giá
                  </p>
                </div>

                <div className="py-1">
                  <p className="text-sm font-thin flex gap-1">
                    <span className="text-gray-200/75 font-semibold">
                      Ngày khởi chiếu:
                    </span>{" "}
                    {moment(movieData?.movie.releaseDate).format("L")}
                  </p>
                  <p className="text-sm font-thin flex gap-1 mt-1">
                    <span className="text-gray-200/75 font-semibold">
                      Ngày kết thúc:
                    </span>{" "}
                    {moment(movieData?.movie.endDate).format("L")}
                  </p>
                </div>

                <div className="py-1">
                  <p className="text-sm font-thin flex gap-1">
                    <span className="text-gray-200/75 font-semibold">
                      Đạo diễn:
                    </span>{" "}
                    {movieData?.movie.directors.join(" - ")}
                  </p>
                  <p className="text-sm font-thin flex gap-1 mt-1">
                    <span className="text-gray-200/75 font-semibold">
                      Diễn viên:
                    </span>{" "}
                    {movieData?.movie.actors.join(" - ")}
                  </p>
                </div>

                <div className="py-1">
                  <p className="text-sm font-thin flex gap-1">
                    <span className="text-gray-200/75 font-semibold">
                      Phụ đề:
                    </span>{" "}
                    {movieData?.movie.subtitle}
                  </p>
                  <p className="text-sm font-thin flex gap-1 mt-1">
                    <span className="text-gray-200/75 font-semibold">
                      Quốc gia
                    </span>{" "}
                    {movieData?.movie.country}
                  </p>
                </div>

                <div className="py-1">
                  <p className="text-sm font-thin flex gap-1">
                    <span className="text-gray-200/75 font-semibold">
                      Thời lượng phim:
                    </span>{" "}
                    {movieData?.movie.duration} phút
                  </p>
                  <p className="text-sm font-thin flex gap-1">
                    <span className="text-gray-200/75 font-semibold">
                      Độ tuổi yêu cầu:
                    </span>{" "}
                    <Badge color="teal" radius="sm">
                      {movieData?.movie.ageRequire}
                    </Badge>
                  </p>
                </div>
              </div>
            </div>

            <div
              className="absolute z-30 -bottom-10 bg-white border rounded-md shadow-lg  m-auto w-fit left-0 right-0
 "
            >
              <div className=" my-4 ">
                <div className="flex justify-center px-8 gap-10">
                  <DatePickerInput
                    leftSection={
                      <IconCalendar
                        style={{ width: rem(18), height: rem(18) }}
                        stroke={1.5}
                      />
                    }
                    disabled={isLoading}
                    value={dataQuery.selectedDate}
                    onChange={(e) => {
                      setDataSelect({
                        cinema: [],
                      });
                      setDataQuery({
                        selectedDate: e as Date,
                        cinema: null,
                      });
                    }}
                    valueFormat="DD - MM - YYYY"
                    minDate={new Date()}
                    placeholder="Chọn ngày muốn xem"
                    label="Ngày"
                    radius="md"
                  />

                  <Select
                    leftSection={
                      <IconLocation
                        style={{ width: rem(18), height: rem(18) }}
                        stroke={1.5}
                      />
                    }
                    searchable
                    disabled={isLoading}
                    allowDeselect={false}
                    checkIconPosition="right"
                    value={dataQuery.city}
                    data={dataSelect.city}
                    onChange={(e) => {
                      setDataSelect({
                        cinema: [],
                      });
                      setDataQuery({
                        city: e as string,
                        district: "-1",
                        cinema: null,
                      });
                    }}
                    label="Thành phố/ Tỉnh"
                    radius="md"
                    placeholder="Chọn thành phố của bạn"
                    nothingFoundMessage="Không tìm thấy thành phố"
                  />

                  <Select
                    leftSection={
                      <IconLocation
                        style={{ width: rem(18), height: rem(18) }}
                        stroke={1.5}
                      />
                    }
                    searchable
                    disabled={isLoading}
                    allowDeselect={false}
                    checkIconPosition="right"
                    label="Quận/ Huyện"
                    defaultValue={"-1"}
                    value={dataQuery.district}
                    data={dataSelect.district}
                    radius="md"
                    onChange={(e) => {
                      setDataSelect({
                        cinema: [],
                      });
                      setDataQuery({
                        district: e as string,
                        cinema: null,
                      });
                    }}
                    placeholder="Chọn thành phố của bạn"
                    nothingFoundMessage="Không tìm thấy thành phố"
                  />

                  <Select
                    leftSection={
                      <IconTheater
                        style={{ width: rem(18), height: rem(18) }}
                        stroke={1.5}
                      />
                    }
                    searchable
                    disabled={isLoading}
                    allowDeselect={false}
                    checkIconPosition="right"
                    label="Rạp chiếu"
                    value={
                      dataSelect.cinema.length > 0 && dataQuery.cinema == null
                        ? "-1"
                        : dataQuery.cinema
                    }
                    data={dataSelect.cinema}
                    onChange={(e) =>
                      setDataQuery({
                        cinema: e as string,
                      })
                    }
                    radius="md"
                    placeholder="Chọn rạp chiếu"
                    nothingFoundMessage="Không tìm thấy rạp chiếu"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative top-[500px] ">
        <LoadingOverlay
          visible={isLoading}
          zIndex={10}
          overlayProps={{ blur: 2 }}
        />
        <Divider size="md" color="violet.2" mx={100}></Divider>

        <div className="flex flex-col justify-center items-center mt-8">
          {showData && showData.length > 0 ? (
            <>
              {showData.map((show, index) => (
                <ShowOfCinema key={index} data={show}></ShowOfCinema>
              ))}
            </>
          ) : (
            <div className="border-2 w-3/4 rounded-lg px-4 py-10 shadow-md border-gray-300">
              <p className="text-xl text-center text-gray-400 font-extralight">
                Không tìm thấy suất chiếu
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SelectShowPage;
