import { Divider, RingProgress, ThemeIcon } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import {
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

type Props = {};

const DashboardPage = (props: Props) => {
  const [dataUser, setDataUser] = useState({
    percentMale: 1,
    percentFemale: 1,
    countMale: 1,
    countFemale: 1,
  });
  const data = [
    {
      name: "Tháng 1",
      "Người dùng": 4000,
    },
    {
      name: "Tháng 2",
      "Người dùng": 3000,
    },
    {
      name: "Tháng 3",
      "Người dùng": 2000,
    },
    {
      name: "Tháng 4",
      "Người dùng": 2780,
    },
    {
      name: "Tháng 5",
      "Người dùng": 1890,
    },
    {
      name: "Tháng 6",
      "Người dùng": 2390,
    },
    {
      name: "Tháng 7",
      "Người dùng": 3490,
    },
  ];

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
  }, [getStatisticUser]);

  return (
    <div>
      <div>
        <p className="my-4 font-medium text-lg italic">
          Thống kê số lượng người dùng đăng ký
        </p>
        <div className="flex justify-center ">
          <BarChart
            width={1150}
            height={400}
            data={data}
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

      <div>
        <p className="my-4 font-medium text-lg ">
          Thống kê số lượng người dùng đăng ký
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
