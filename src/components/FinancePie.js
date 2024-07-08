import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Dropdown, List, Label } from "flowbite-react";
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
  const [month, setMonth] = useState(getCurrentMonth());
  const [year, setYear] = useState(new Date().getFullYear());
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

  function getCurrentMonth() {
    const date = new Date();
    const options = { month: "long" };
    return date.toLocaleDateString("en-US", options);
  }

  function handleMonthChange(selectedMonth) {
    setMonth(selectedMonth);
  }

  function handleYearChange(selectedYear) {
    setYear(selectedYear);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/all_expenses",
          { id: localStorage.getItem("id"), month: month, year: year }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [month, year]);

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
        <p>No survey data for this month/year</p>
        <Card href="#" className="max-w-lg mx-auto">
          <p className="flex items-center space-x-2 py-4">
            In the month of&nbsp;
            <Dropdown label={month} inline>
              <Dropdown.Item onClick={() => handleMonthChange("January")}>
                January
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleMonthChange("February")}>
                February
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleMonthChange("March")}>
                March
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleMonthChange("April")}>
                April
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleMonthChange("May")}>
                May
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleMonthChange("June")}>
                June
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleMonthChange("July")}>
                July
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleMonthChange("August")}>
                August
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleMonthChange("September")}>
                September
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleMonthChange("October")}>
                October
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleMonthChange("November")}>
                November
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleMonthChange("December")}>
                December
              </Dropdown.Item>
            </Dropdown>
            &nbsp;year:
            <Dropdown label={year} inline>
              <Dropdown.Item onClick={() => handleYearChange("2024")}>
                2024
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleYearChange("2025")}>
                2025
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleYearChange("2026")}>
                2026
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleYearChange("2027")}>
                2027
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleYearChange("2028")}>
                2028
              </Dropdown.Item>
            </Dropdown>
          </p>
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
        <p className="flex items-center space-x-2 py-4">
          In the month of&nbsp;
          <Dropdown label={month} inline>
            <Dropdown.Item onClick={() => handleMonthChange("January")}>
              January
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleMonthChange("February")}>
              February
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleMonthChange("March")}>
              March
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleMonthChange("April")}>
              April
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleMonthChange("May")}>
              May
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleMonthChange("June")}>
              June
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleMonthChange("July")}>
              July
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleMonthChange("August")}>
              August
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleMonthChange("September")}>
              September
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleMonthChange("October")}>
              October
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleMonthChange("November")}>
              November
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleMonthChange("December")}>
              December
            </Dropdown.Item>
          </Dropdown>
          &nbsp;year:
          <Dropdown label={year} inline>
            <Dropdown.Item onClick={() => handleYearChange("2024")}>
              2024
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleYearChange("2025")}>
              2025
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleYearChange("2026")}>
              2026
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleYearChange("2027")}>
              2027
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleYearChange("2028")}>
              2028
            </Dropdown.Item>
          </Dropdown>
        </p>
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
