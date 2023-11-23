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
    name: "Tháng 1",
    order: 0,
  },
  {
    name: "Tháng 2",
    order: 1,
  },
  {
    name: "Tháng 3",

    order: 5,
  },
  {
    name: "Tháng 4",
    order: 2,
  },
  {
    name: "Tháng 5",
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
