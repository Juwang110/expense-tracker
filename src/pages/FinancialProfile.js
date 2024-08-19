import React from "react";
import FinancialSurvey from "../components/FinancialSurvey";
import FinancePie from "../components/FinancePie";
import NavigationBar from "../components/NavigationBar";
import { AppFooter } from "../components/Footer";
import FinanceHistory from "../components/FinanceHistory";
import FinanceGoals from "../components/FinanceGoals";

// Financial profile page with a lengthy monthly expense survey form,
// A budget breakdown pie chart showing the monthly expense for each category
// in the selected month/year and the percent change from the previous month,
// A Goals section showing in progress goals and completed goals,
// and a Expenditure history line chart comparing one selected category's monthly expenses
// compared to the total expenses for that month/year
export default function FinancialProfile() {
  const username = localStorage.getItem("username");

  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-700">
      <div className="flex flex-col items-center justify-center flex-1 px-8 py-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
          Hello, {username}
        </h1>
        <div className="w-full max-w-3xl py-8 dark:text-white">
          <FinancialSurvey />
          <div className="mt-8 dark:text-white">
            <FinancePie />
          </div>
          <div className="mt-8">
            <FinanceGoals />
          </div>
          <div className="py-8">
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
              Expenditure history
            </h2>
            <FinanceHistory />
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}
