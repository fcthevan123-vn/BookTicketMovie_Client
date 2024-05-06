import {
  Badge,
  Box,
  Divider,
  NumberFormatter,
  Select,
  Text,
  ThemeIcon,
  Transition,
} from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { userServices } from "../../../services";
import {
  IconChartBar,
  IconCurrencyDong,
  IconMovie,
  IconSlideshow,
  IconTicket,
  IconUser,
  TablerIconsProps,
} from "@tabler/icons-react";
import { AreaChart } from "@mantine/charts";
import StatItem from "../../../components/StatItem/StatItem";
import { PreviewImages } from "../../../components/PreviewImage";
import { useSetState } from "@mantine/hooks";
import { Cinema, MovieTS } from "../../../types";
import { IconTheater } from "@tabler/icons-react";
import { IconBrandZoom } from "@tabler/icons-react";
import { IconStar } from "@tabler/icons-react";
import { DateInput } from "@mantine/dates";

type StatItemType = {
  icon: (props: TablerIconsProps) => JSX.Element;
  title: string;
  stat: string | number;
  color: string;
};

type dataSelectType = {
  cinema: {
    value: string;
    label: string;
  }[];

  movieHall: {
    value: string;
    label: string;
    cinemaId: string;
  }[];

  movie: {
    value: string;
    label: string;
  }[];
};

const DashboardPage = () => {
  const [dataChart, setDataChart] = useSetState({
    booking: [
      {
        date: "18/05/02",
        "Doanh thu": 18,
      },
    ],
    revenue: [
      {
        date: "18/05/02",
        "Lượt đặt vé": 18,
      },
    ],
    totalBooking: 0,
    totalSum: 0,
    trendingMovie: {
      bookingCount: 0,
      bookingSum: 0,
      movie: {} as MovieTS,
    },
    trendingCinema: {
      cinemaCount: 0,
      max: 0,
      cinemaTrending: {} as Cinema,
    },
  });
  const [dataDashBoard, setDataDashBoard] = useState<StatItemType[]>();
  const [queryData, setQueryData] = useSetState({
    cinema: "-1",
    movie: "-1",
    movieHall: "-1",
    timeType: "days",
  });
  const [dataSelect, setDataSelect] = useSetState<dataSelectType>({
    cinema: [
      {
        value: "-1",
        label: "",
      },
    ],
    movieHall: [
      {
        value: "-1",
        label: "",
        cinemaId: "-1",
      },
    ],
    movie: [
      {
        value: "-1",
        label: "",
      },
    ],
  });
  const [isMounted, setIsMounted] = useSetState({
    page: false,
    chart: false,
  });
  const [dataDaily, setDataDaily] = useSetState({
    countReview: 0,
    countShow: 0,
    countUser: 0,
    countBooking: 0,
    statisticUser: null,
  });
  const [dateSelect, setDateSelect] = useState(new Date());

  const getDashBoard = useCallback(async () => {
    try {
      const res = await userServices.getAdminDashboard();
      const dataConvert = [
        {
          icon: IconUser,
          title: "Người dùng",
          stat: res.data.countUser,
          color: "blue",
        },
        {
          icon: IconMovie,
          title: "Phim",
          stat: res.data.countMovie,
          color: "cyan",
        },
        {
          icon: IconTheater,
          title: "Rạp phim",
          stat: res.data.countCinema,
          color: "green",
        },
        {
          icon: IconBrandZoom,
          title: "Phòng chiếu phim",
          stat: res.data.countMovieHall,
          color: "pink",
        },
        {
          icon: IconStar,
          title: "Đánh giá",
          stat: res.data.countReview,
          color: "orange",
        },
      ];

      setDataDashBoard(dataConvert);
      setDataSelect(res.dataSelect);
    } catch (error) {
      console.log("error", error);
    }
  }, [setDataSelect]);

  const advancedStatistic = useCallback(
    async (data: typeof queryData) => {
      try {
        const res = await userServices.advanceStatistic(data);
        setDataChart({
          booking: res.countBookingStatistic,
          revenue: res.bookingStatistic,
          totalBooking: res.totalBooking,
          totalSum: res.totalSum,
          trendingCinema: res.cinemaTrending,
          trendingMovie: res.movieTrendingData,
        });
      } catch (error) {
        console.log("error", error);
      } finally {
        setTimeout(() => {
          setIsMounted({
            chart: true,
          });
        }, 300);
      }
    },
    [setDataChart, setIsMounted]
  );

  const dailyStatictic = useCallback(
    async (date: Date) => {
      try {
        const res = await userServices.dailyStatistic(date);
        console.log("res", res);
        setDataDaily({
          countReview: res.countReview,
          countShow: res.countShow,
          countUser: res.countUser,
          countBooking: res.countBooking,
          statisticUser: res.statisticUser,
        });
      } catch (error) {
        console.log("error", error);
      }
    },
    [setDataDaily]
  );

  useEffect(() => {
    getDashBoard();
  }, [getDashBoard]);

  useEffect(() => {
    dailyStatictic(dateSelect);
  }, [dailyStatictic, dateSelect]);

  useEffect(() => {
    setIsMounted({
      page: true,
    });
  }, [setIsMounted]);

  useEffect(() => {
    setIsMounted({
      chart: false,
    });
    getDashBoard();
    advancedStatistic(queryData);
  }, [advancedStatistic, getDashBoard, queryData]);

  return (
    <Transition
      mounted={isMounted.page}
      transition="pop-top-left"
      duration={600}
      timingFunction="ease"
    >
      {(styles) => (
        <div style={styles}>
          <div>
            <div>
              <div className="grid grid-cols-5 gap-10 pb-3">
                {dataDashBoard &&
                  dataDashBoard.map((item, index) => (
                    <StatItem data={item} key={index}></StatItem>
                  ))}
              </div>

              {/* {console.log("dataAreaChart", dataAreaChart)} */}
              <Box my={"lg"}>
                <div className="flex justify-between rounded-t-xl py-4 items-center">
                  <div className="">
                    <Text size="lg" fw={700}>
                      Thống kê doanh thu đặt vé
                    </Text>

                    <div className="flex gap-3 items-end mt-1">
                      <Text size="sm" fw={400}>
                        Thời gian:
                      </Text>

                      <Select
                        size="xs"
                        radius={"md"}
                        allowDeselect={false}
                        defaultValue={"days"}
                        w={100}
                        data={[
                          {
                            value: "days",
                            label: "Ngày",
                          },
                          {
                            value: "weeks",
                            label: "Tuần",
                          },
                          {
                            value: "months",
                            label: "Tháng",
                          },
                        ]}
                        value={queryData.timeType}
                        onChange={(e) =>
                          setQueryData({
                            timeType: e as string,
                          })
                        }
                        searchable
                      ></Select>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Select
                      size="sm"
                      radius={"md"}
                      placeholder="Chọn Phim"
                      data={dataSelect.movie}
                      label="Phim"
                      value={queryData.movie}
                      onChange={(e) =>
                        setQueryData({
                          movie: e as string,
                        })
                      }
                      searchable
                      clearable
                    ></Select>

                    <Select
                      size="sm"
                      radius={"md"}
                      label="Phòng chiếu"
                      placeholder="Chọn Phòng"
                      data={dataSelect.movieHall}
                      onChange={(e) =>
                        setQueryData({
                          movieHall: e as string,
                        })
                      }
                      value={queryData.movieHall}
                      disabled={queryData.cinema == "-1" ? true : false}
                      searchable
                      clearable
                    ></Select>

                    <Select
                      size="sm"
                      radius={"md"}
                      label="Rạp chiếu"
                      placeholder="Chọn Rạp chiếu"
                      data={dataSelect.cinema}
                      value={queryData.cinema}
                      onChange={(e) => {
                        const filterMovieHall = dataSelect.movieHall.filter(
                          (movieHall) => movieHall.cinemaId == e
                        );
                        setDataSelect({
                          movieHall: filterMovieHall,
                        });
                        setQueryData({
                          movieHall: null as unknown as string,
                          cinema: e as string,
                        });
                      }}
                      searchable
                      clearable
                    ></Select>
                  </div>
                </div>

                <Transition
                  mounted={isMounted.chart}
                  transition="pop-top-left"
                  duration={500}
                  timingFunction="ease"
                >
                  {(styles) => (
                    <div style={styles}>
                      <div className="grid grid-cols-2 gap-5">
                        <div className=" shadow rounded-xl border-2">
                          <div className="p-5">
                            <AreaChart
                              h={350}
                              withLegend
                              legendProps={{
                                verticalAlign: "bottom",
                                height: 50,
                              }}
                              data={dataChart.booking}
                              dataKey="date"
                              yAxisLabel="Lượt đặt vé"
                              series={[
                                { name: "Vé thành công", color: "blue.4" },
                                { name: "Vé bị huỷ", color: "red.4" },
                              ]}
                              curveType="linear"
                              yAxisProps={{ width: 60 }}
                              fillOpacity={0.6}
                              gridAxis="xy"
                              areaChartProps={{ syncId: "groceries" }}
                            />

                            {/* <Divider size={"sm"} my="lg" /> */}
                          </div>
                        </div>

                        <div className=" shadow rounded-xl border-2">
                          {/* <Divider m="xl" size={"sm"} /> */}
                          <div className="p-5">
                            <AreaChart
                              h={350}
                              withLegend
                              legendProps={{
                                verticalAlign: "bottom",
                                height: 50,
                              }}
                              data={dataChart.revenue}
                              dataKey="date"
                              yAxisLabel="Tổng số tiền (VND)"
                              series={[{ name: "Doanh thu", color: "green.6" }]}
                              curveType="linear"
                              yAxisProps={{
                                width: 85,
                              }}
                              tickLine="xy"
                              fillOpacity={0.7}
                              gridAxis="xy"
                              areaChartProps={{ syncId: "groceries" }}
                            />

                            {/* <Divider size={"sm"} my="lg" /> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Transition>

                <div className="grid grid-cols-3 gap-5 mt-7">
                  <div className="shadow p-3 rounded-xl border-2">
                    <div className="flex gap-3 items-center">
                      <ThemeIcon variant="light" radius="md" size="55">
                        <IconChartBar style={{ width: "70%", height: "70%" }} />
                      </ThemeIcon>
                      <div>
                        <Text fw={500} c={"dimmed"} size="md">
                          Lượt đặt vé toàn hệ thống
                        </Text>
                        <Text fw={700} size="xl">
                          {dataChart.totalBooking}
                        </Text>
                      </div>
                    </div>
                    <Divider my="lg" size={"sm"} />

                    <div className="flex gap-3 items-center">
                      <ThemeIcon variant="light" radius="md" size="55">
                        <IconCurrencyDong
                          style={{ width: "70%", height: "70%" }}
                        />
                      </ThemeIcon>
                      <div>
                        <Text fw={500} c={"dimmed"} size="md">
                          Tổng doanh thu (VND)
                        </Text>

                        <Text fw={700} size="xl">
                          <NumberFormatter
                            suffix=" VND"
                            thousandSeparator
                            value={dataChart.totalSum}
                          ></NumberFormatter>
                        </Text>
                      </div>
                    </div>
                  </div>

                  <div className="shadow p-3 rounded-xl border-2 col-span-2">
                    <div>
                      <Badge
                        size="md"
                        variant="gradient"
                        radius={"md"}
                        gradient={{ from: "grape", to: "red", deg: 214 }}
                      >
                        Top trending
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 mt-3">
                      {dataChart.trendingMovie && (
                        <div className="flex gap-2">
                          <PreviewImages
                            width={120}
                            height={120}
                            img={
                              dataChart?.trendingMovie?.movie.images
                                ? dataChart?.trendingMovie?.movie?.images[0]
                                : "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                            }
                          ></PreviewImages>

                          <div className="flex gap-1 flex-col justify-end">
                            <Text fw={700} size="lg">
                              {dataChart.trendingMovie.movie.title
                                ? dataChart.trendingMovie.movie.title
                                : ""}
                            </Text>
                            <Text lineClamp={1} fw={500} size="sm" c={"dimmed"}>
                              {dataChart.trendingMovie.movie.genre
                                ? dataChart.trendingMovie.movie.genre.join(
                                    " - "
                                  )
                                : ""}
                            </Text>
                            <Text fw={500} size="sm" c={"dimmed"}>
                              Lượt đặt vé:{" "}
                              {dataChart.trendingMovie.bookingCount}
                            </Text>
                            <Text fw={500} size="sm" c={"dimmed"}>
                              Doanh thu:{" "}
                              <NumberFormatter
                                suffix=" VND"
                                thousandSeparator
                                value={dataChart.trendingMovie.bookingSum}
                              ></NumberFormatter>
                            </Text>
                          </div>
                        </div>
                      )}

                      {dataChart?.trendingCinema?.cinemaTrending && (
                        <div className="flex gap-2">
                          <PreviewImages
                            width={120}
                            height={120}
                            img={
                              dataChart?.trendingCinema?.cinemaTrending?.image
                                ? dataChart?.trendingCinema?.cinemaTrending
                                    .image
                                : "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                            }
                          ></PreviewImages>

                          <div className="flex gap-1 flex-col justify-end">
                            <Text tt="capitalize" fw={700} size="lg">
                              {dataChart.trendingCinema.cinemaTrending.name
                                ? dataChart.trendingCinema.cinemaTrending.name
                                : ""}
                            </Text>

                            <Text lineClamp={1} fw={500} size="sm" c={"dimmed"}>
                              {dataChart.trendingCinema.cinemaTrending
                                .locationName
                                ? dataChart.trendingCinema.cinemaTrending
                                    .locationName
                                : ""}
                            </Text>
                            <Text fw={500} size="sm" c={"dimmed"}>
                              Lượt đặt vé:{" "}
                              {dataChart.trendingCinema.cinemaTrending
                                .locationName
                                ? dataChart.trendingCinema.cinemaCount
                                : ""}
                            </Text>
                            <Text fw={500} size="sm" c={"dimmed"}>
                              Doanh thu:
                              <NumberFormatter
                                suffix=" VND"
                                thousandSeparator
                                value={dataChart.trendingCinema.max}
                              ></NumberFormatter>
                            </Text>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Box>
            </div>
            <Divider mt="xl" mb={"md"} size={"sm"} />

            <div className="grid grid-cols-8 gap-5">
              <div className="col-span-2 flex flex-col justify-end">
                <div className="flex gap-3">
                  <Text size="lg" fw={700}>
                    Thống kê ngày:
                  </Text>
                  <DateInput
                    value={dateSelect}
                    onChange={(e) => setDateSelect(e as Date)}
                    valueFormat="DD/MM/YYYY"
                    maxDate={new Date()}
                    w={110}
                    size="xs"
                    radius={"md"}
                  />
                </div>
                <div className="shadow mt-4 p-3 rounded-xl border-2 flex flex-col gap-5">
                  <div className="flex justify-between">
                    <ThemeIcon
                      color="orange"
                      variant="light"
                      radius="md"
                      size="xl"
                    >
                      <IconStar style={{ width: "70%", height: "70%" }} />
                    </ThemeIcon>

                    <div>
                      <Text size="sm" c={"dimmed"} fw={600} ta={"right"}>
                        Đánh giá
                      </Text>
                      <Text ta={"right"} fw={700}>
                        {dataDaily.countReview}
                      </Text>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <ThemeIcon
                      color="cyan"
                      variant="light"
                      radius="md"
                      size="xl"
                    >
                      <IconSlideshow style={{ width: "70%", height: "70%" }} />
                    </ThemeIcon>

                    <div>
                      <Text size="sm" c={"dimmed"} fw={600} ta={"right"}>
                        Suất chiếu
                      </Text>
                      <Text ta={"right"} fw={700}>
                        {dataDaily.countShow}
                      </Text>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <ThemeIcon
                      color="blue"
                      variant="light"
                      radius="md"
                      size="xl"
                    >
                      <IconTicket style={{ width: "70%", height: "70%" }} />
                    </ThemeIcon>

                    <div>
                      <Text size="sm" c={"dimmed"} fw={600} ta={"right"}>
                        Đặt vé
                      </Text>
                      <Text ta={"right"} fw={700}>
                        {dataDaily.countBooking}
                      </Text>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <ThemeIcon
                      color="indigo"
                      variant="light"
                      radius="md"
                      size="xl"
                    >
                      <IconUser style={{ width: "70%", height: "70%" }} />
                    </ThemeIcon>

                    <div>
                      <Text size="sm" c={"dimmed"} fw={600} ta={"right"}>
                        Người đăng ký
                      </Text>
                      <Text ta={"right"} fw={700}>
                        {dataDaily.countShow}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
              <div className="shadow mt-4 p-3 col-span-6 rounded-xl border-2">
                {dataDaily.statisticUser && (
                  <AreaChart
                    h={300}
                    withLegend
                    legendProps={{
                      verticalAlign: "middle",
                      height: 50,
                    }}
                    data={dataDaily.statisticUser}
                    dataKey="ageRange"
                    yAxisLabel="SL người dùng"
                    series={[
                      { name: "Nam", color: "blue.4" },
                      { name: "Nữ", color: "red.4" },
                    ]}
                    curveType="linear"
                    yAxisProps={{ width: 60 }}
                    fillOpacity={0.6}
                    gridAxis="xy"
                    areaChartProps={{ syncId: "groceries" }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
};

export default DashboardPage;
