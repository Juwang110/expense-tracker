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

export default function FinanceHistory() {
  const [savingsData, setSavingsData] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const [saveExpenseData, setSaveExpenseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseSavings = await axios.post(
          "http://localhost:5000/api/get_category",
          { id: localStorage.getItem("id"), category: "SaveInvest" }
        );
        setSavingsData(responseSavings.data);

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
  }, []);

  useEffect(() => {
    if (savingsData.length > 0 && totalData.length > 0) {
      const updatedData = [];

      savingsData.forEach((value) => {
        const monthYear = `${value[4]} ${value[3]}`;
        updatedData.push({
          time: monthYear,
          saving: value[2],
          expense: "",
        });
      });

      totalData.forEach((value) => {
        const monthYear = `${value[0]} ${value[1]}`;
        const existingIndex = updatedData.findIndex(
          (item) => item.time === monthYear
        );

        if (existingIndex !== -1) {
          updatedData[existingIndex].expense = parseInt(value[2]);
        }
      });

      setSaveExpenseData(updatedData);
    }
  }, [savingsData, totalData]);

  useEffect(() => {
    console.log(saveExpenseData);
  }, [saveExpenseData]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={saveExpenseData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="saving" stroke="#8884d8" />
            <Line type="monotone" dataKey="expense" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
