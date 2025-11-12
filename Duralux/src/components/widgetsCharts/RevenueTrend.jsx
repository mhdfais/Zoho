import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const RevenueTrend = ({ revenueData }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(
      revenueData?.length
        ? revenueData
        : [
            { month: "JAN", revenue: 12000 },
            { month: "FEB", revenue: 58000 },
            { month: "MAR", revenue: 46000 },
            { month: "APR", revenue: 18000 },
          ]
    );
  }, [revenueData]);

  return (
    <div className="bg-white rounded shadow-sm p-4" style={{ height: "20rem" }}>
      <h5
        className="fw-bold mb-4"
        style={{ color: "#111827", fontSize: "1.25rem" }}
      >
        Revenue Trend
      </h5>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          {/* soft grid */}
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />

          {/* month labels */}
          <XAxis
            dataKey="month"
            tick={{ fill: "#94A3B8", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          {/* Y axis */}
          <YAxis
            tick={{ fill: "#94A3B8", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v / 1000}K`}
          />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
            labelStyle={{ color: "#94A3B8", fontSize: 12 }}
            itemStyle={{ color: "#1E293B", fontWeight: 500 }}
          />

          {/* main line with smooth curve and visible points */}
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#1E3A8A"
            strokeWidth={2}
            dot={{ r: 3, fill: "#1E3A8A", strokeWidth: 0 }}
            activeDot={{
              r: 6,
              fill: "#2563EB",
              stroke: "#fff",
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueTrend;
