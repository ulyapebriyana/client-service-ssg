/** @format */
"use client";
import React from "react";
import {
  BarChart as BarGraph,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Bar,
} from "recharts";

type Props = {
  revenueData: { name: string; total: number }[];
};

export default function BarChart({ revenueData }: Props) {
  const reversedData = [...revenueData].reverse();
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <BarGraph data={reversedData}>
        <XAxis
          dataKey={"name"}
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
          tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
        />
        <Bar dataKey={"total"} radius={[4, 4, 0, 0]} fill="#F97316" />
      </BarGraph>
    </ResponsiveContainer>
  );
}
