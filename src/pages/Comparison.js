import { AppFooter } from "../components/Footer";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Label, TextInput, Button } from "flowbite-react";

/*
Fetch the PSAVERT data to show the average savings rate in the U.S.
Compare the user's savings rate to this average.
*/

export default function Comp() {
  const [fredData, setFredData] = useState(null);
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
    };

    fetchFredData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen px-20 dark:bg-gray-700">
      <div class="flex flex-col justify-center text-center py-3 items-center flex-1">
        <h1 className="text-4xl font-bold tracking-tight text-gray-950 dark:text-white">
          Compare
        </h1>
        <p className="dark:text-white">
          Using the Federal Reserve Economic Data for the United States, this
          calculator allows you to determine your savings rate and compare it to
          the average personal savings rate in the United States. The FRED data
          is updated monthly.
        </p>

        <Card className="w-full md:w-1/2 p-6">
          <form className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white mb-3">
              Savings amount for this month
            </h2>
            <div className="mb-2 block">
              <Label htmlFor="savings" value="Monthly savings" />
            </div>
            <TextInput
              id="savings"
              required
              type="number"
              helperText={<>This data is not stored*</>}
              value={savings}
              onChange={(e) => setSavings(Number(e.target.value))}
            />
            <div className="mb-2 block">
              <Label htmlFor="dpi" value="Monthly disposible income" />
            </div>
            <TextInput
              id="dpi"
              required
              type="number"
              value={dpi}
              helperText={<>This data is not stored*</>}
              onChange={(e) => setDPI(Number(e.target.value))}
            />
            <Button onClick={handleSubmit}>Submit</Button>
          </form>
        </Card>
        {savingRate !== null && (
          <div>
            <p>Your Savings Rate: {savingRate.toFixed(2)}%</p>
            <p>
              National Average Savings Rate:{" "}
              {parseFloat(fredData.value).toFixed(2)}%
            </p>
            <p>
              {savingRate > fredData.value
                ? "You are saving more than the national average!"
                : "You are saving less than the national average."}
            </p>
          </div>
        )}
      </div>
      <AppFooter></AppFooter>
    </div>
  );
}
