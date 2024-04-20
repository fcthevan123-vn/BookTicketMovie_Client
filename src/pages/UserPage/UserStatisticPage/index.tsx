import { useCallback, useEffect, useState } from "react";
import { IconBrandCashapp, IconTicket } from "@tabler/icons-react";
import NormalToast from "../../../components/AllToast/NormalToast";
import { useAuthenticate } from "../../../hooks";
import { Divider, Tabs, rem } from "@mantine/core";
import { AreaChart, BarChart } from "@mantine/charts";
import { userServices } from "../../../services";
import { StatsGrid } from "../../../components/Stats/StatsGrid/StatsGrid";

function UserStatisticPage() {
  const [, , dataUser] = useAuthenticate();

  const [data, setData] = useState({
    bookingStatistic: [],
    moneyStatistic: [],
  });

  const iconStyle = { width: rem(16), height: rem(16) };

  const getUserBookingStatistic = useCallback(async () => {
    try {
      const res = await userServices.getUserStatistic(dataUser.id);
      if (res.statusCode === 0) {
        setData((prevData) => ({
          ...prevData,
          bookingStatistic: res.data,
        }));
      }
    } catch (error) {
      const err = error as Error;
      NormalToast({
        title: "getUserBookingStatistic",
        color: "red",
        message: err.message,
      });
    }
  }, [dataUser.id]);

  const getUserMoneyStatistic = useCallback(async () => {
    try {
      const res = await userServices.getUserMoneyStatistic(dataUser.id);
      if (res.statusCode === 0) {
        setData((prevData) => ({
          ...prevData,
          moneyStatistic: res.data,
        }));
      }
    } catch (error) {
      const err = error as Error;
      NormalToast({
        title: "getUserMoneyStatistic",
        color: "red",
        message: err.message,
      });
    }
  }, [dataUser.id]);

  useEffect(() => {
    getUserBookingStatistic();
    getUserMoneyStatistic();
  }, [getUserBookingStatistic, getUserMoneyStatistic]);
  return (
    <div className="">
      <Tabs variant="pills" radius="sm" defaultValue="ticketStatistic">
        <Tabs.List>
          <Tabs.Tab
            value="ticketStatistic"
            leftSection={<IconTicket style={iconStyle} />}
          >
            Thống kê đặt vé
          </Tabs.Tab>
          <Tabs.Tab
            value="moneyStatistic"
            leftSection={<IconBrandCashapp style={iconStyle} />}
          >
            Thống kê chi tiêu
          </Tabs.Tab>
        </Tabs.List>

        <Divider my={"lg"} size={"sm"}></Divider>

        <Tabs.Panel value="ticketStatistic">
          {data && data.bookingStatistic.length > 0 ? (
            <div className="mx-10">
              <BarChart
                h={500}
                data={data.bookingStatistic}
                dataKey="month"
                series={[
                  {
                    name: "successBooking",
                    label: "Vé hoàn thành",
                    color: "teal.7",
                  },
                  {
                    name: "pendingBooking",
                    label: "Vé chờ duyệt",
                    color: "violet.7",
                  },
                  { name: "cancelBooking", label: "Vé đã huỷ", color: "red.6" },
                ]}
                withLegend
                xAxisLabel="Thời gian"
                yAxisLabel="Số lượng vé"
              />
            </div>
          ) : (
            <p>Bạn chưa đặt vé lần nào trong 6 tháng gần đây</p>
          )}
        </Tabs.Panel>

        <Tabs.Panel value="moneyStatistic">
          <div className="mx-10">
            <AreaChart
              h={500}
              data={data.moneyStatistic}
              withLegend
              dataKey="month"
              xAxisLabel="Thời gian"
              yAxisLabel="Tổng tiền đã chi (VND)"
              yAxisProps={{ width: 90 }}
              fillOpacity={0.6}
              series={[
                {
                  name: "totalMoney",
                  label: "Tổng tiền đã chi trong tháng",
                  color: "violet.6",
                },
              ]}
              curveType="linear"
              gridAxis="x"
            />
            <p className="text-center italic text-sm mt-3 text-gray-500">
              Lưu ý: Thống kê chỉ dựa trên những vé đã được khách hàng thanh
              toán thành công
            </p>

            {/* <StatsGrid></StatsGrid> */}
          </div>
          {/* {console.log("data.moneyStatistic", data.moneyStatistic)} */}
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}

export default UserStatisticPage;
