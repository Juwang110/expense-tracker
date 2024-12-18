import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Dropdown, Table } from "flowbite-react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Pie chart which displays all monthly expenses for a specified month/year
// and a table to show each category and its percent change from last month/year
export default function FinancePie() {
  const [data, setData] = useState([]);
  const [prevData, setPrevData] = useState([]);
  const [month, setMonth] = useState(getCurrentMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [prevMonth, setPrevMonth] = useState(
    getPreviousMonthYear(month, year).month
  );
  const [prevYear, setPrevYear] = useState(
    getPreviousMonthYear(month, year).year
  );

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

  // Gets today's month
  function getCurrentMonth() {
    const date = new Date();
    const options = { month: "long" };
    return date.toLocaleDateString("en-US", options);
  }

  // Sets new previous month/year based on user month change
  function handleMonthChange(selectedMonth) {
    setMonth(selectedMonth);
    setPrevMonth(getPreviousMonthYear(selectedMonth, year).month);
    setPrevYear(getPreviousMonthYear(selectedMonth, year).year);
  }

  // Sets new previous month/year based on user year change
  function handleYearChange(selectedYear) {
    setYear(selectedYear);
    setPrevMonth(getPreviousMonthYear(month, selectedYear).month);
    setPrevYear(getPreviousMonthYear(month, selectedYear).year);
  }

  // Gets the previous month/year given a month and a year
  function getPreviousMonthYear(month, year) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthIndex = monthNames.indexOf(month);
    let prevMonthIndex = monthIndex - 1;
    let prevYear = year;
    if (prevMonthIndex < 0) {
      prevMonthIndex = 11;
      prevYear = year - 1;
    }
    return { month: monthNames[prevMonthIndex], year: prevYear };
  }

  // Fetches all expenses from the selected month/year of the user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/all_expenses`,
          { id: localStorage.getItem("id"), month: month, year: year }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [month, year]);

  // Fetches all expenses from the previous month/year of the selected month/year of the user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/all_expenses`,
          { id: localStorage.getItem("id"), month: prevMonth, year: prevYear }
        );
        setPrevData(response.data);
      } catch (error) {
        console.error("No Data, Error:", error);
      }
    };
    fetchData();
  }, [prevMonth, prevYear]);

  // Gets total value from all monthly values
  const total = data.reduce(
    (accumulator, currentValue) => accumulator + currentValue.value,
    0
  );

  // Adds percent key for each item
  const dataWithPercentage = data.map((item) => ({
    ...item,
    percent: ((item.value / total) * 100).toFixed(2),
  }));

  // Creates custom tooltip for pie chart to display percentage on mouse hover
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
            color: "#000",
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

  // For each category, creates a table row
  const expenseCell = (data, prevData) => {
    // Maps survey data and adds previous expense key in order to calculate percent difference
    const dataWithPrevValue = data.map((expense) => {
      const prevExpense = prevData.find(
        (item) => item.category === expense.category
      );
      return { ...expense, prevValue: prevExpense ? prevExpense.value : 0 };
    });

    return dataWithPrevValue.map((expense, index) => (
      <Table.Row
        key={index}
        className="bg-white dark:border-gray-700 dark:bg-gray-800"
      >
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          {expense.category}
        </Table.Cell>
        <Table.Cell>{expense.value}</Table.Cell>
        <Table.Cell>
          {/*Displays percent change from previous month */}
          {(() => {
            if (expense.prevValue !== 0) {
              return `${(
                ((expense.value - expense.prevValue) / expense.prevValue) *
                100
              ).toFixed(2)}`;
            } else {
              return "No data for prev month";
            }
          })()}
          %
        </Table.Cell>
      </Table.Row>
    ));
  };

  // Constructs the expense table
  function constructTable() {
    return (
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Value</Table.HeadCell>
            <Table.HeadCell>% Change from prev month</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {expenseCell(data, prevData)}
          </Table.Body>
        </Table>
      </div>
    );
  }

  // If there is no data for the specified month/year return an empty pie chart, else
  // create the filled pie chart with the table for each category and percent change
  if (data.length === 0) {
    return (
      <div style={{ textAlign: "center" }}>
        <p className="dark:text-white">No survey data for this month/year</p>
        <Card className="max-w-lg mx-auto">
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
      <Card className="max-w-lg mx-auto ">
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
        {constructTable()}
      </Card>
    );
  }
}
