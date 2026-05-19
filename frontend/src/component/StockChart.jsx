import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function StockChart({ stockData, ticker }) {
  if (!Array.isArray(stockData) || stockData.length === 0) {
    return <p>No chart data available.</p>;
  }

  const chartData = stockData
    .map((item) => ({
      date: item.datetime,
      close: Number(item.close),
      open: Number(item.open),
      high: Number(item.high),
      low: Number(item.low),
      volume: Number(item.volume),
    }))
    .filter((item) => item.date && !isNaN(item.close))
    .reverse();

  const formatXAxis = (dateStr) => {
    const date = new Date(dateStr);

    if (isNaN(date.getTime())) {
      return "";
    }

    if (dateStr.includes(":")) {
      return date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });
    }

    return date.toLocaleDateString([], {
      month: "short",
      day: "numeric",
    });
  };

  const formatTooltipDate = (dateStr) => {
    const date = new Date(dateStr);

    if (isNaN(date.getTime())) {
      return dateStr;
    }

    if (dateStr.includes(":")) {
      return date.toLocaleString([], {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
    }

    return date.toLocaleDateString([], {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || payload.length === 0) {
      return null;
    }

    const data = payload[0].payload;

    return (
      <div className="chart-tooltip">
        <p className="tooltip-date">{formatTooltipDate(label)}</p>
        <p>Close: ${data.close.toFixed(2)}</p>
        <p>Open: ${data.open.toFixed(2)}</p>
        <p>High: ${data.high.toFixed(2)}</p>
        <p>Low: ${data.low.toFixed(2)}</p>
        <p>Volume: {data.volume.toLocaleString()}</p>
      </div>
    );
  };

  return (
    <div className="stock-chart-card">
      <h2>{ticker} Price Chart</h2>

      <div style={{ width: "100%", height: "420px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 35, left: 10, bottom: 25 }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="date"
              tickFormatter={formatXAxis}
              tick={{ fontSize: 12 }}
              tickMargin={12}
              minTickGap={45}
              interval="preserveStartEnd"
            />

            <YAxis
              domain={["auto", "auto"]}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `$${Number(value).toFixed(0)}`}
              width={60}
            />

            <Tooltip content={<CustomTooltip />} />

            <Line
              type="monotone"
              dataKey="close"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default StockChart;