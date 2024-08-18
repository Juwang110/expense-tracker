import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Dropdown, Spinner, Card } from "flowbite-react";

// Line chart that displays one category's monthly expense compared to total expenses for that month/year
export default function FinanceHistory() {
  const [categoryData, setCategoryData] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const [saveExpenseData, setSaveExpenseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState("SaveInvest");

  // Fetches all data from specified category and total expenses for each month
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/get_category",
          { id: localStorage.getItem("id"), category: category }
        );
        setCategoryData(response.data);

        const responseTotals = await axios.post(
          "http://localhost:5000/api/total_expenses",
          { id: localStorage.getItem("id") }
        );
        setTotalData(responseTotals.data);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [category]);

  // Sets SaveExpense object to use for line chart
  useEffect(() => {
    // If data is present, creates new object with time, category monthly expense and total expense
    // for each month/year filled out
    if (categoryData.length > 0 && totalData.length > 0) {
      const updatedData = [];

      categoryData.forEach((value) => {
        const monthYear = `${value[4]} ${value[3]}`;
        updatedData.push({
          time: monthYear,
          [category]: value[2],
          Total_Expenditures: "",
        });
      });

      totalData.forEach(
        (value) => {
          const monthYear = `${value[0]} ${value[1]}`;
          const existingIndex = updatedData.findIndex(
            (item) => item.time === monthYear
          );

          if (existingIndex !== -1) {
            updatedData[existingIndex].Total_Expenditures = parseInt(value[2]);
          }
        },
        [categoryData]
      );

      // Sorts the object by most recent
      updatedData.sort((a, b) => {
        const dateA = new Date(a.time);
        const dateB = new Date(b.time);
        return dateA - dateB;
      });

      setSaveExpenseData(updatedData);
    }
  }, [categoryData, totalData]);

  // Handles when user selects a different category, updating state
  function handleCategoryChange(selectedCategory) {
    setCategory(selectedCategory);
  }

  // Renders a card with the line chart and selectable month/year dropdowns
  return (
    <div>
      {isLoading ? (
        <Spinner aria-label="Loading data..." />
      ) : (
        <Card>
          <h2 className="text-xl font-semibold mb-4">
            {category} compared to total expenses in usd
          </h2>
          <Dropdown label={category} inline>
            <Dropdown.Item onClick={() => handleCategoryChange("Transport")}>
              Transport
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleCategoryChange("Flights")}>
              Flights
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleCategoryChange("Housing")}>
              Housing
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleCategoryChange("Food")}>
              Food
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleCategoryChange("Medical")}>
              Medical
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleCategoryChange("Wellness")}>
              Wellness
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleCategoryChange("Loans")}>
              Loans
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleCategoryChange("Entertainment")}
            >
              Entertainment
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleCategoryChange("Clothing")}>
              Clothing
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleCategoryChange("Insurance")}>
              Insurance
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleCategoryChange("MiscItems")}>
              MiscItems
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleCategoryChange("SaveInvest")}>
              SaveInvest
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleCategoryChange("MiscExpense")}>
              MiscExpense
            </Dropdown.Item>
          </Dropdown>

          <ResponsiveContainer width="100%" height={300}>
            {/*Line chart comparing one category's monthly expense to total expenses for that month/year*/}
            <LineChart
              data={saveExpenseData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={category} stroke="#8884d8" />
              <Line
                type="monotone"
                dataKey="Total_Expenditures"
                stroke="#82ca9d"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      )}
    </div>
  );
}
