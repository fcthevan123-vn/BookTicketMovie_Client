import { useCallback, useEffect, useState } from "react";
import { IconBrandCashapp } from "@tabler/icons-react";
import NormalToast from "../../../components/AllToast/NormalToast";
import { useAuthenticate } from "../../../hooks";
import { Box, NumberFormatter, Select, Text, Transition } from "@mantine/core";
import { userServices } from "../../../services";
import { DateInput } from "@mantine/dates";
import { AreaChart } from "@mantine/charts";
import { useSetState } from "@mantine/hooks";
import StatItem from "../../../components/StatItem/StatItem";

function UserStatisticPage() {
  const [, , dataUser] = useAuthenticate();
  const [isMount, setIsMount] = useState(false);

  const [queryData, setQueryData] = useSetState({
    timeType: "days",
    date: new Date(),
  });

  const [dataChart, setDataChart] = useSetState({
    bookingStatistic: [
      {
        date: "18/05/02",
        "Tiền đã chi": 18,
      },
    ],
    countBookingStatistic: [
      {
        date: "18/05/02",
        "Lượt đặt vé": 18,
      },
    ],
    totalBooking: 0,
    totalPrice: 0,
    totalReview: 0,
  });

  const getUserBookingStatistic = useCallback(
    async (userId: string, dataQuery: typeof queryData) => {
      setIsMount(false);
      try {
        const res = await userServices.getUserStatistic(
          userId,
          dataQuery.date,
          dataQuery.timeType
        );
        if (res.statusCode === 0) {
          setDataChart(res.data);
        }
      } catch (error) {
        const err = error as Error;
        NormalToast({
          title: "getUserBookingStatistic",
          color: "red",
          message: err.message,
        });
      } finally {
        setTimeout(() => {
          setIsMount(true);
        }, 250);
      }
    },
    [setDataChart]
  );

  useEffect(() => {
    getUserBookingStatistic(dataUser.id, queryData);
  }, [dataUser.id, getUserBookingStatistic, queryData]);
  return (
    <div className="">
      <Box mb={"lg"} px={"md"}>
        <div className=" rounded-t-xl py-4 items-center">
          <div className="grid grid-cols-3 gap-10 mb-8">
            <StatItem
              data={{
                icon: IconBrandCashapp,
                title: "Tổng số tiền đã chi",
                color: "blue",
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                stat: (
                  <NumberFormatter
                    value={dataChart.totalPrice}
                    suffix=" VND"
                    thousandSeparator
                  ></NumberFormatter>
                ),
              }}
            ></StatItem>

            <StatItem
              data={{
                icon: IconBrandCashapp,
                title: "Số lượt đặt vé",
                color: "teal",
                stat: dataChart.totalBooking,
              }}
            ></StatItem>

            <StatItem
              data={{
                icon: IconBrandCashapp,
                title: "Số lượng đánh giá",
                color: "orange",
                stat: dataChart.totalReview,
              }}
            ></StatItem>
          </div>
          <div className="">
            <Text size="lg" fw={700}>
              Thống kê dành cho bạn
            </Text>

            <div className="flex gap-5 items-end mt-1">
              <div className="flex gap-2">
                <Text size="sm" fw={400}>
                  Ngày:
                </Text>

                <DateInput
                  value={queryData.date}
                  onChange={(e) =>
                    setQueryData({
                      date: e as Date,
                    })
                  }
                  maxDate={new Date()}
                  size="xs"
                  radius={"md"}
                  placeholder="Date input"
                  w={130}
                  valueFormat="DD/MM/YYYY"
                />
              </div>
              <div className="flex gap-2">
                <Text size="sm" fw={400}>
                  Thống kê theo:
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
          </div>
        </div>

        <Transition
          mounted={isMount}
          transition="pop-top-left"
          duration={500}
          timingFunction="ease"
        >
          {(styles) => (
            <div style={styles}>
              <div className="grid grid-cols-2 gap-5">
                <div className=" shadow rounded-xl border-2">
                  <div className="p-5">
                    <Text
                      ta={"center"}
                      c={"dimmed"}
                      pb={"sm"}
                      size="xs"
                      fs={"italic"}
                    >
                      Biểu đồ đặt vé
                    </Text>
                    <AreaChart
                      h={350}
                      withLegend
                      legendProps={{
                        verticalAlign: "bottom",
                        height: 50,
                      }}
                      data={dataChart.countBookingStatistic}
                      dataKey="date"
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
                    <Text
                      ta={"center"}
                      c={"dimmed"}
                      pb={"sm"}
                      size="xs"
                      fs={"italic"}
                    >
                      Biểu đồ tiền đã chi
                    </Text>
                    <AreaChart
                      h={350}
                      withLegend
                      legendProps={{
                        verticalAlign: "bottom",
                        height: 50,
                      }}
                      data={dataChart.bookingStatistic}
                      dataKey="date"
                      series={[{ name: "Tiền đã chi", color: "green.6" }]}
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
      </Box>
    </div>
  );
}

export default UserStatisticPage;
