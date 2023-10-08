import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "10 tuổi",

    pv: 2400,
    amt: 2400,
  },
  {
    name: "10 - 20 tuổi",
    pv: 1398,
    amt: 2210,
  },
  {
    name: "20 - 30 tuổi",

    pv: 9800,
    amt: 2290,
  },
  {
    name: "30 - 40 tuổi",

    pv: 3908,
    amt: 2000,
  },
  {
    name: "Trên 40 tuổi",
    pv: 4800,
    amt: 2181,
  },
];

export default function ChartCustom() {
  return (
    <BarChart
      width={700}
      height={350}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      barSize={20}
    >
      <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <CartesianGrid strokeDasharray="3 3" />
      <Bar
        dataKey="pv"
        label="Độ tuổi"
        fill="#6499E9"
        background={{ fill: "#eee" }}
      />
    </BarChart>
  );
}
