import { AppFooter } from "../components/Footer";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Label, TextInput, Button, Alert } from "flowbite-react";
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

// Savings rate comparison page allows the user to fill out a form and
// calculate their personal savings rate. This page showcases the Federal
// Reserve Economic Data API and gives insight on the comparison between the
// user's savings rate and the average in the U.S. while also showing the
// FRED savings rate data iin a line chart
export default function Comp() {
  const [fredData, setFredData] = useState(null);
  const [allFredData, setAllFredData] = useState(null);
  const [savings, setSavings] = useState(null);
  const [dpi, setDPI] = useState(null);
  const [savingRate, setSavingRate] = useState(null);
  const [incompleteAlert, setIncompleteAlert] = useState(false);

  // Handles form submission and calculates savings rate,
  // conditionally sets incomplete alert state
  function handleSubmit() {
    const rate = (savings / dpi) * 100;
    setSavingRate(rate);
    if (savings == null || dpi == null) {
      setIncompleteAlert(true);
    } else {
      setIncompleteAlert(false);
    }
  }

  // Fetches the FRED API data from the PSAVERT series on run
  // and formats it to work with a line chart
  useEffect(() => {
    const fetchFredData = async (seriesID = "PSAVERT") => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/fred_data_mostrecent`,
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
          `${process.env.REACT_APP_BACKEND_URL}/api/fred_data`,
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

  // Renders the Savings Rate Comparison page with a form, a reseults page, conditional alerts,
  // and the FRED savings rate line chart.
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
                onChange={(e) => {
                  const value = e.target.value;
                  setSavings(value === "" ? null : Number(value));
                  setSavingRate(null);
                }}
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
                onChange={(e) => {
                  const value = e.target.value;
                  setDPI(value === "" ? null : Number(value));
                  setSavingRate(null);
                }}
                className="mt-2"
              />
            </div>
            <Button onClick={handleSubmit}>Submit</Button>
            {incompleteAlert && (
              <Alert
                color="warning"
                onDismiss={() => setIncompleteAlert(false)}
              >
                <span className="font-medium">Field alert!</span> Please fill in
                all fields
              </Alert>
            )}
          </form>
        </Card>

        {dpi !== null && savings !== null && savingRate !== null && (
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
