import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "flowbite-react";
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
  const placeholderData = [{ category: "No Data", value: 1 }];
  const colors = [
    "#1E3A8A", // Dark blue
    "#2563EB", // Medium blue
    "#3B82F6", // Blue
    "#60A5FA", // Light blue
    "#256D85", // Medium-dark blue
    "#003366", // Darker blue
    "#002244", // Very dark blue
    "#111827", // Almost black
    "#1F2937", // Very dark gray
    "#374151", // Dark gray
    "#4B5563", // Medium-dark gray
    "#6B7280", // Gray
    "#9CA3AF", // Light gray
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

  if (data.length === 0) {
    return (
      <div style={{ textAlign: "center" }}>
        <p>Fill in survey to populate pie chart</p>
        <Card href="#" className="max-w-lg mx-auto">
          <ResponsiveContainer width="100%" height={500}>
            <PieChart>
              <Pie
                data={placeholderData}
                dataKey="value"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label
              >
                <Cell key={`cell-0`} fill={colors[0]} />
              </Pie>
              <Tooltip content={renderCustomTooltip} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    );
  } else {
    return (
      <Card href="#" className="max-w-lg mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Budget Breakdown
        </h1>
        <ResponsiveContainer width="100%" height={500}>
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
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip content={renderCustomTooltip} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    );
  }
}
