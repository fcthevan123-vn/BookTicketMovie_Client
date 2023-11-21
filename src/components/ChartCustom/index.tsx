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
    name: "Dưới 10 tuổi",
    order: 0,
  },
  {
    name: "10 - 20 tuổi",
    order: 1,
  },
  {
    name: "20 - 30 tuổi",

    order: 5,
  },
  {
    name: "30 - 40 tuổi",
    order: 2,
  },
  {
    name: "Trên 40 tuổi",
    order: 1,
  },
];

export default function ChartCustom() {
  return (
    <BarChart
      width={1000}
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
      <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <CartesianGrid strokeDasharray="3 3" />
      <Bar
        dataKey="order"
        label="Lượt đặt vé vé"
        fill="#6499E9"
        background={{ fill: "#eee" }}
      />
    </BarChart>
  );
}
