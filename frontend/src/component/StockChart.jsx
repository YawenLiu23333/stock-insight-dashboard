import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function StockChart({ data }) {
    
  return (
    <LineChart width={600} height={350} data={data}>
      <CartesianGrid />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Line dataKey="close" />
    </LineChart>
  );
}
export default StockChart