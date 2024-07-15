import { AppFooter } from "../components/Footer";
import React, { useEffect, useState } from "react";
import axios from "axios";

/*
Fetch the PSAVERT data to show the average savings rate in the U.S.
Compare the user's savings rate to this average.
*/

export default function Comp() {
  const [fredData, setFredData] = useState(null);

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
          Filler
        </h1>
        <div>
          <h2>FRED Data:</h2>
          {fredData ? (
            <pre>{JSON.stringify(fredData, null, 2)}</pre>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <AppFooter></AppFooter>
    </div>
  );
}
