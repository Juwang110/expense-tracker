import React from "react";
import NavigationBar from "../components/NavigationBar";
import { AppFooter } from "../components/Footer";

export default function License() {
  return (
    <div className="flex flex-col min-h-screen px-20 dark:bg-gray-700 dark:text-white">
      <div className="flex flex-col justify-center items-center text-center mt-5">
        <h1 className="text-4xl font-bold tracking-tight text-gray-950 dark:text-white">
          GNU General Public License (GPL) v3
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          This project web application is protected under the GNU General Public
          License (GPL) version 3.
        </p>
        <div className=" text-left max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-6">
            Summary of the GNU GPL v3:
          </h2>
          <ul className="list-disc list-inside mt-3">
            <li>Freedom to use the software for any purpose.</li>
            <li>Freedom to access and modify the source code.</li>
            <li>
              Freedom to distribute copies of the software, including
              modifications, as long as the same GPL v3 license is retained.
            </li>
            <li>The software is provided without warranties.</li>
          </ul>
          <p className="text-base text-gray-700 dark:text-gray-300 mt-3">
            For more details, you can refer to the{" "}
            <a
              href="https://www.gnu.org/licenses/gpl-3.0.en.html"
              className="text-blue-600 hover:underline"
            >
              full text of the GNU GPL v3
            </a>
            .
          </p>
        </div>
      </div>
      <div className="mt-auto">
        <AppFooter />
      </div>
    </div>
  );
}
