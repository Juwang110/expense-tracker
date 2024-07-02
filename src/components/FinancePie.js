import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function FinancePie() {
  const [data, setData] = useState([]);
  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#C71585",
    "#FF8C00",
    "#4CAF50",
    "#673AB7",
    "#FF5722",
    "#795548",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/all_expenses",
          { id: localStorage.getItem("id") }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const total = data.reduce(
    (accumulator, currentValue) => accumulator + currentValue.value,
    0
  );

  const dataWithPercentage = data.map((item) => ({
    ...item,
    percent: ((item.value / total) * 100).toFixed(2),
  }));

  const renderCustomTooltip = (props) => {
    const { active, payload } = props;
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div
          style={{
            backgroundColor: "#fff",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          <p>
            <strong>{data.category}</strong>
          </p>
          <p>Percentage: {data.percent}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={dataWithPercentage}
          dataKey="value"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          label
        >
          {dataWithPercentage.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip content={renderCustomTooltip} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
