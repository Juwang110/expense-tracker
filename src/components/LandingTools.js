import React from "react";
export function LanderTools() {
  return (
    <section class="bg-gray-50 dark:bg-gray-800">
      <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div class="mb-8 max-w-screen-md lg:mb-16">
          <h2 class="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">
            Designed for the everyday user
          </h2>
          <p class="text-gray-500 sm:text-xl dark:text-gray-400">
            An easy to use website application which stores data and gives
            digestible financial insights
          </p>
        </div>

        <div class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          <div class="flex flex-col items-center">
            <div class="text-center">
              <h3 class="mb-2 text-xl font-bold dark:text-white">
                Profile Survey
              </h3>
              <p class="text-gray-500 dark:text-gray-400">
                Fillable for each month, this survey collects expense data. A
                pie chart displays your breakdown and a table shows expense
                percent change from the previous month.
              </p>
            </div>
          </div>
          <div class="flex flex-col items-center">
            <div class="text-center">
              <h3 class="mb-2 text-xl font-bold dark:text-white">
                Expenditure history
              </h3>
              <p class="text-gray-500 dark:text-gray-400">
                Collects the history of all expenditure data and enables you to
                display a line chart filterable by each category compared to
                total expenses for that month.
              </p>
            </div>
          </div>
          <div class="flex flex-col items-center">
            <div class="text-center">
              <h3 class="mb-2 text-xl font-bold dark:text-white">
                Budget Goals
              </h3>
              <p class="text-gray-500 dark:text-gray-400">
                Set and manage budget goals for different expense categories
                given the month/year. Navigate to the your profile to see goal
                results.
              </p>
            </div>
          </div>
          <div class="flex flex-col items-center">
            <div class="text-center">
              <h3 class="mb-2 text-xl font-bold dark:text-white">
                Wealth Calculator
              </h3>
              <p class="text-gray-500 dark:text-gray-400">
                Inspired by The Millionaire Next Door, this tool allows you to
                calculate your net worth and expected net worth giving insight
                on how well you are accumulating wealth.
              </p>
            </div>
          </div>
          <div class="flex flex-col items-center">
            <div class="text-center">
              <h3 class="mb-2 text-xl font-bold dark:text-white">
                More to come!
              </h3>
              <p class="text-gray-500 dark:text-gray-400">
                Stay tuned! This application is still in development and there
                are more features that will be avaliable.
              </p>
            </div>
          </div>
          <div class="flex flex-col items-center">
            <div class="text-center">
              <h3 class="mb-2 text-xl font-bold dark:text-white">
                More to come!
              </h3>
              <p class="text-gray-500 dark:text-gray-400">
                Stay tuned! This application is still in development and there
                are more features that will be avaliable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
