import React from "react";
import FinancialSurvey from "../components/FinancialSurvey";
import FinancePie from "../components/FinancePie";
import NavigationBar from "../components/NavigationBar";
import { AppFooter } from "../components/Footer";
import FinanceHistory from "../components/FinanceHistory";
import FinanceGoals from "../components/FinanceGoals";

export default function FinancialProfile() {
  const username = localStorage.getItem("username");

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />
      <div className="flex flex-col items-center justify-center flex-1 px-8 py-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Hello, {username}
        </h1>
        <div className="w-full max-w-3xl py-8">
          <FinancialSurvey />
          <div className="mt-8">
            <FinancePie />
          </div>
          <FinanceGoals></FinanceGoals>
          <div className="py-8">
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Expenditure history
            </h2>
            <FinanceHistory></FinanceHistory>
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}
