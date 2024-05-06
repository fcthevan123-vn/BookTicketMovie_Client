import { useCallback, useEffect, useState } from "react";
import { ErrToast } from "../../../components/AllToast/NormalToast";
import { cinemaServices, userServices } from "../../../services";
import { useAuthenticate } from "../../../hooks";
import { TablerIconsProps } from "@tabler/icons-react";
import { useSetState } from "@mantine/hooks";
import { BookingTypeTS, Cinema, MovieHall, Show } from "../../../types";
import {
  Badge,
  Box,
  Divider,
  Image,
  NumberFormatter,
  Select,
  Text,
  ThemeIcon,
  Transition,
} from "@mantine/core";
import { AreaChart } from "@mantine/charts";
import { DateInput } from "@mantine/dates";
import { PreviewImages } from "../../../components/PreviewImage";
import moment from "moment";
import { Link } from "react-router-dom";

type dataSelectType = {
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

type recentDataType = {
  recentBooking: BookingTypeTS[];
  recentShow: Show[];
};

function Dashboard() {
  const [, , dataUser] = useAuthenticate();
  const [dataCinema, setDataCinema] = useState<Cinema>();
  const [recentData, setRecentData] = useState<recentDataType>();
  const [queryData, setQueryData] = useSetState({
    cinema: "-1",
    movie: "-1",
    movieHall: "-1",
    timeType: "days",
  });
  const [isMounted, setIsMounted] = useSetState({
    page: false,
    chart: false,
  });
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
  });
  const [dataSelect, setDataSelect] = useSetState<dataSelectType>({
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

  const getCinemaByStaffId = useCallback(
    async (staffId: string) => {
      try {
        console.log("staffId", staffId);
        const res = await cinemaServices.getCinemaByStaffId(staffId);
        const getMovieHall = await userServices.getAdminDashboard();

        setDataCinema(res.data);
        const filterMovieHall = getMovieHall.dataSelect.movieHall.filter(
          (movieHall: MovieHall) => movieHall.cinemaId == res.data.id
        );

        setDataSelect({
          movieHall: filterMovieHall,
          movie: getMovieHall.dataSelect.movie,
        });
        setQueryData({
          cinema: res.data.id,
        });
      } catch (error) {
        ErrToast(error as Error, "getCinemaByStaff");
      }
    },
    [setDataSelect, setQueryData]
  );

  const advancedStatistic = useCallback(
    async (data: typeof queryData) => {
      try {
        const res = await userServices.advanceStatistic(data);
        setDataChart({
          booking: res.countBookingStatistic,
          revenue: res.bookingStatistic,
          totalBooking: res.totalBooking,
          totalSum: res.totalSum,
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

  const getRecentData = useCallback(async (cinemaId: string) => {
    try {
      const res = await userServices.statisticCinema(cinemaId);
      if (res.statusCode == 0) {
        const dataConvert = {
          recentBooking: res.recentBooking,
          recentShow: res.recentShow,
        };
        setRecentData(dataConvert);
      } else {
        setRecentData([] as unknown as undefined);
      }
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  useEffect(() => {
    setIsMounted({
      page: true,
    });
  }, [setIsMounted]);

  useEffect(() => {
    setIsMounted({
      chart: false,
    });
    advancedStatistic(queryData);
  }, [advancedStatistic, queryData]);

  useEffect(() => {
    if (dataUser.id.length > 0) {
      getCinemaByStaffId(dataUser.id);
    }
  }, [dataUser.id, getCinemaByStaffId]);

  useEffect(() => {
    if (dataCinema != undefined) {
      getRecentData(dataCinema.id as string);
    }
  }, [dataCinema, getRecentData]);

  return (
    <div>
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
                {/* {console.log("dataAreaChart", dataAreaChart)} */}
                <Badge
                  size="xl"
                  radius={"sm"}
                  tt="capitalize"
                  variant="gradient"
                  gradient={{ from: "violet", to: "pink", deg: 90 }}
                >
                  {dataCinema?.name} | {dataCinema?.locationName}
                </Badge>
                <Box mb={"lg"}>
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
                                series={[
                                  { name: "Doanh thu", color: "green.6" },
                                ]}
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

                  <div className="grid grid-cols-2 gap-5 mt-7">
                    <div className="shadow p-3 rounded-xl border-2">
                      <div className="flex justify-between items-end">
                        <Text fw={700} size="lg">
                          Các suất chiếu gần nhất
                        </Text>

                        <a href={"/employee/all-show"}>
                          <p className="text-xs font-semibold cursor-pointer hover:underline hover:text-gray-400">
                            Xem tất cả
                          </p>
                        </a>
                      </div>

                      <div className="mt-3 flex flex-col gap-8">
                        {recentData &&
                          recentData.recentShow &&
                          recentData.recentShow.map((show) => (
                            <div
                              className="flex justify-between items-end"
                              key={show.id}
                            >
                              <div className="flex gap-4 items-end">
                                <PreviewImages
                                  img={
                                    show?.Movie?.images
                                      ? show?.Movie?.images[0]
                                      : ""
                                  }
                                  width={75}
                                  height={75}
                                ></PreviewImages>
                                <div className="flex">
                                  <div>
                                    <Text fw={700}>{show.Movie?.title}</Text>
                                    <Text size="sm" fw={500} c={"dimmed"}>
                                      {show.Movie?.duration} phút
                                    </Text>
                                    <Text size="sm" fw={500} c={"dimmed"}>
                                      {show.MovieHall?.name}
                                    </Text>
                                  </div>

                                  <Divider
                                    size="sm"
                                    mx={"md"}
                                    orientation="vertical"
                                  />

                                  <div>
                                    <Text fw={700}>
                                      {moment(show.date).format("DD/MM/YYYY")}
                                    </Text>
                                    <Text size="sm" fw={500} c={"dimmed"}>
                                      Bắt đầu:{" "}
                                      {moment(show.startTime).format("HH:mm")}
                                    </Text>
                                    <Text size="sm" fw={500} c={"dimmed"}>
                                      Kết thúc:{" "}
                                      {moment(show.endTime).format("HH:mm")}
                                    </Text>
                                  </div>
                                </div>
                              </div>

                              <Text size="sm" fw={400} c={"dimmed"}>
                                {moment(show.startTime).fromNow()}
                              </Text>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="shadow p-3 rounded-xl border-2 ">
                      <div className="flex justify-between items-end">
                        <Text fw={700} size="lg">
                          Những vé vừa được đặt
                        </Text>

                        <a href={"/employee/manage-booking"}>
                          <p className="text-xs font-semibold cursor-pointer hover:underline hover:text-gray-400">
                            Xem tất cả
                          </p>
                        </a>
                      </div>
                      <div className="mt-3 flex flex-col gap-8">
                        {recentData &&
                          recentData.recentBooking &&
                          recentData.recentBooking.map((booking) => (
                            <div
                              key={booking.id}
                              className="grid grid-cols-4 border-l-8 border-l-violet-500 ps-2 py-1 divide-x-2 divide-gray-300 "
                            >
                              <div>
                                <Text fw={700}>{booking.User?.fullName}</Text>
                                <Text size="sm" fw={500} c={"dimmed"} truncate>
                                  {booking.User?.email}
                                </Text>
                                <Text size="sm" fw={500} c={"dimmed"}>
                                  {booking.User?.phone}
                                </Text>
                              </div>

                              <div className="ps-3">
                                <Text fw={700} truncate>
                                  {booking.Show.Movie?.title}
                                </Text>
                                <Text size="sm" fw={500} c={"dimmed"}>
                                  {booking.Show.Movie?.duration} phút
                                </Text>
                                <Text size="sm" fw={500} c={"dimmed"}>
                                  {booking.Show.MovieHall?.name}
                                </Text>
                              </div>

                              <div className="ps-3">
                                <Text fw={700}>
                                  {moment(booking.Show.date).format(
                                    "DD/MM/YYYY"
                                  )}
                                </Text>
                                <Text size="sm" fw={500} c={"dimmed"}>
                                  Bắt đầu:{" "}
                                  {moment(booking.Show.startTime).format(
                                    "HH:mm"
                                  )}
                                </Text>
                                <Text size="sm" fw={500} c={"dimmed"}>
                                  Kết thúc:{" "}
                                  {moment(booking.Show.endTime).format("HH:mm")}
                                </Text>
                              </div>

                              <div className="ps-3">
                                <Text fw={700}>
                                  <NumberFormatter
                                    value={booking.totalPrice}
                                    suffix=" VND"
                                    thousandSeparator
                                  ></NumberFormatter>
                                </Text>
                                <Text size="sm" fw={500} c={"dimmed"} truncate>
                                  Ghế:{" "}
                                  {booking.SeatStatuses.map(
                                    (seat) => `${seat.Seat.name},`
                                  )}
                                </Text>
                                <Text size="sm" fw={500} c={"dimmed"}>
                                  {moment(booking.createdAt).fromNow()}
                                </Text>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </Box>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </div>
  );
}

export default Dashboard;
