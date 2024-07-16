import { AppFooter } from "../components/Footer";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Label, TextInput, Button } from "flowbite-react";
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

export default function Comp() {
  const [fredData, setFredData] = useState(null);
  const [allFredData, setAllFredData] = useState(null);
  const [savings, setSavings] = useState(null);
  const [dpi, setDPI] = useState(null);
  const [savingRate, setSavingRate] = useState(null);

  function handleSubmit() {
    const rate = (savings / dpi) * 100;
    setSavingRate(rate);
  }

  useEffect(() => {
    const fetchFredData = async (seriesID = "PSAVERT") => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/fred_data_mostrecent",
          {
            params: { series_id: seriesID },
          }
        );
        setFredData(response.data);
      } catch (error) {
        console.error("Error fetching FRED data:", error);
      }
      try {
        const response = await axios.get(
          "http://localhost:5000/api/fred_data",
          {
            params: { series_id: "PSAVERT" },
          }
        );
        const transformedData = response.data.observations.map((obs) => ({
          date: obs.date,
          value: parseFloat(obs.value),
        }));
        setAllFredData(transformedData);
      } catch (error) {
        console.error("Error fetching FRED all data:", error);
      }
    };

    fetchFredData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen px-4 md:px-20 dark:bg-gray-700">
      <div className="flex flex-col justify-center text-center py-6 items-center flex-1">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
          Compare Your Savings Rate
        </h1>
        <p className="dark:text-white mb-8 text-lg max-w-2xl">
          Using the Federal Reserve Economic Data for the United States, this
          calculator allows you to determine your savings rate and compare it to
          the average personal savings rate in the United States. The FRED data
          is updated monthly.
        </p>

        <Card className="w-full md:w-1/2 p-8 shadow-lg">
          <form className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
              Enter Your Financial Details
            </h2>
            <div className="mb-4">
              <Label htmlFor="savings" value="Monthly Savings" />
              <TextInput
                id="savings"
                required
                type="number"
                placeholder="Enter your savings"
                helperText={<>This data is not stored*</>}
                value={savings}
                onChange={(e) => setSavings(Number(e.target.value))}
                className="mt-2"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="dpi" value="Monthly Disposable Income" />
              <TextInput
                id="dpi"
                required
                type="number"
                placeholder="Enter your disposable income"
                helperText={<>This data is not stored*</>}
                value={dpi}
                onChange={(e) => setDPI(Number(e.target.value))}
                className="mt-2"
              />
            </div>
            <Button onClick={handleSubmit}>Submit</Button>
          </form>
        </Card>

        {savingRate !== null && (
          <Card className="w-full p-6 mx-auto my-4">
            <div className=" text-center">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                Results
              </h2>
              <p className="text-xl text-gray-900 dark:text-white">
                Your Savings Rate:&nbsp;
                <span className="font-bold">{savingRate.toFixed(2)}%</span>
              </p>
              <p className="text-xl text-gray-900 dark:text-white">
                National Average Savings Rate:&nbsp;
                <span className="font-bold">
                  {fredData ? parseFloat(fredData.value).toFixed(2) : "N/A"}%
                </span>
              </p>
              <p className="text-xl text-gray-900 dark:text-white mt-4">
                {savingRate > fredData?.value
                  ? "You are saving more than the national average! 🎉"
                  : "You are saving less than the national average. Keep going!"}
                <p className="mt-4">
                  The date the data was updated last is:&nbsp;
                  <span className="font-bold">{fredData.date}</span>
                </p>
              </p>
            </div>
          </Card>
        )}
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white py-4">
          Full FRED history of personal savings rate
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={allFredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <AppFooter />
    </div>
  );
}
