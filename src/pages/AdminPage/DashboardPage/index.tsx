import { Divider, RingProgress, ThemeIcon } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { userServices } from "../../../services";
import { IconMan, IconPhoto, IconWoman } from "@tabler/icons-react";
import bookingServices from "../../../services/bookingServices";

type Props = {};

const DashboardPage = (props: Props) => {
  const [dataUser, setDataUser] = useState({
    percentMale: 1,
    percentFemale: 1,
    countMale: 1,
    countFemale: 1,
  });
  const [dataBarChart, setDataBarChart] = useState();
  const [dataAreaChart, SetDataAreaChart] = useState();

  const getStatisticUserRegister = useCallback(async () => {
    try {
      const res = await userServices.getStatisticRegister();
      if (res.statusCode == 0) {
        setDataBarChart(res.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  const getStatisticBooking = useCallback(async () => {
    try {
      const res = await bookingServices.getStatistic();
      if (res.statusCode == 0) {
        SetDataAreaChart(res.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  const getStatisticUser = useCallback(async () => {
    try {
      const res = await userServices.getStatistic();
      if (res.statusCode == 0) {
        const female = parseInt(res.data.countFemale);
        const male = parseInt(res.data.countMale);
        const percentFemale = Math.round((female / (male + female)) * 100);
        const percentMale = Math.round((male / (male + female)) * 100);
        const dataPass = {
          percentMale: percentMale,
          percentFemale: percentFemale,
          countMale: parseInt(res.data.countMale),
          countFemale: parseInt(res.data.countFemale),
        };

        setDataUser(dataPass);
      }
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  useEffect(() => {
    getStatisticUser();
    getStatisticBooking();
    getStatisticUserRegister();
  }, [getStatisticBooking, getStatisticUser, getStatisticUserRegister]);

  return (
    <div>
      <div>
        <p className="my-4 font-medium text-lg italic">
          Thống kê doanh thu của hệ thống
        </p>
        <div className="flex justify-center ">
          <AreaChart
            width={1100}
            height={400}
            data={dataAreaChart}
            margin={{
              top: 10,
              right: 30,
              left: 70,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Doanh thu"
              stroke="#39A7FF"
              fill="#AEDEFC"
            />
          </AreaChart>
        </div>
      </div>
      <Divider my="xl" size={"sm"} mx={"md"} />

      <div>
        <p className="my-4 font-medium text-lg italic">
          Thống kê số lượng người dùng đăng ký trong 5 tuần gần nhất
        </p>
        <div className="flex justify-center ">
          <BarChart
            width={1150}
            height={400}
            data={dataBarChart}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={20}
          >
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 10, right: 10 }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar
              dataKey="Người dùng"
              fill="#FF8080"
              background={{ fill: "#eee" }}
            />
          </BarChart>
        </div>
      </div>

      <Divider my="xl" size={"sm"} mx={"md"} />

      <div>
        <p className="my-4 font-medium text-lg italic ">
          Thống kê giới tính của người dùng
        </p>
        <div className="flex justify-center ">
          <RingProgress
            size={280}
            label={
              <div className="flex justify-center flex-col gap-5">
                <div className="flex justify-center items-center gap-2">
                  <ThemeIcon radius={"md"}>
                    <IconMan style={{ width: "70%", height: "70%" }} />
                  </ThemeIcon>
                  <p className="font-bold">Nam</p>
                  <p className="text-xs text-gray-600">
                    {dataUser.countMale} | {dataUser.percentMale}%
                  </p>
                </div>

                <div className="flex  justify-center items-center gap-2">
                  <ThemeIcon color="#FF8080" radius={"md"}>
                    <IconWoman style={{ width: "70%", height: "70%" }} />
                  </ThemeIcon>
                  <p className="font-bold">Nữ</p>
                  <p className="text-xs text-gray-600">
                    {dataUser.countFemale} | {dataUser.percentFemale}%
                  </p>
                </div>
              </div>
            }
            thickness={16}
            roundCaps
            sections={[
              { value: dataUser.percentMale, color: "blue" },
              { value: dataUser.percentFemale, color: "#FF8080" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
