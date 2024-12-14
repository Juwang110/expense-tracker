import React, { useEffect, useState } from "react";
import { Table, Accordion, Button } from "flowbite-react";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";

// A list of incomplete and completed goals to display to the user
export default function FinanceGoals() {
  const [goalData, setGoalData] = useState([]);
  const [filledDates, setFilledDates] = useState([]);
  const [achievedStatus, setAchievedStatus] = useState({});
  const [checkedStatus, setCheckedStatus] = useState({});
  const [showAllGoals, setShowAllGoals] = useState(false);

  // On render fetches the user's goals and the dates the survey was filled out for
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/get_goals`,
          { id: localStorage.getItem("id") }
        );

        setGoalData(response.data);

        const response1 = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/get_dates`,
          { id: localStorage.getItem("id") }
        );
        setFilledDates(response1.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Fetches whether or not each goal in completed goals was achieved using goalAchieved()
  // Stores this data as well as if each goal was met, rerenders if goals or dates change
  useEffect(() => {
    const fetchAchievedStatus = async () => {
      const status = {};
      const checked = {};
      for (const goal of completedGoals) {
        const achieved = await goalAchieved(
          goal["category"],
          goal["change_by"],
          goal["unit"],
          goal["amount"],
          goal["goal_year"],
          goal["goal_month"]
        );
        status[goal["id"]] = achieved;
        if (achieved.endsWith("good job!")) {
          checked[goal["id"]] = true;
        } else {
          checked[goal["id"]] = false;
        }
      }
      setAchievedStatus(status);
      setCheckedStatus(checked);
    };
    fetchAchievedStatus();
  }, [goalData, filledDates]);

  // Given a goal, determines if a survey has been filled out so that the goal has been completed
  const isGoalCompleted = (goal) => {
    return filledDates.some(
      (date) =>
        date["month"] === goal["goal_month"] &&
        date["year"] === goal["goal_year"]
    );
  };

  // Sets goals in progress, where the financial survey has been completed for that goals month/year
  const inProgressGoals = goalData.filter((goal) => !isGoalCompleted(goal));

  // Sets completed goals, and sorts it by most recent first
  const completedGoals = goalData
    .filter((goal) => isGoalCompleted(goal))
    .sort((a, b) => {
      const dateA = new Date(a[6], a[7] - 1);
      const dateB = new Date(b[6], b[7] - 1);
      return dateB - dateA;
    });

  // Gets the previous month and year given a month and year
  function getPreviousMonthYear(month, year) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthIndex = monthNames.indexOf(month);
    let prevMonthIndex = monthIndex - 1;
    let prevYear = year;
    if (prevMonthIndex < 0) {
      prevMonthIndex = 11;
      prevYear = year - 1;
    }
    return { month: monthNames[prevMonthIndex], year: prevYear };
  }

  // Returns a message depending on if a goal was met and by how far off
  // Given goal category, how the category monthly expense should be changed, by what unit (percent/amount),
  // by how much, and the year and month of the goal
  const goalAchieved = async (category, change, unit, amount, year, month) => {
    try {
      // Gets the previous month/year of the goal month/year
      const { month: prevMonth, year: prevYear } = getPreviousMonthYear(
        month,
        year
      );
      // Gets all of the data from the goal's category for the user
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/get_category`,
        { id: localStorage.getItem("id"), category: category }
      );

      // Sets previous data to the monthly expense the month/year before
      const prevData = response.data.find(
        (item) => item["year"] == prevYear && item["month"] == prevMonth
      );

      // Sets current data to the monthly expense of the goal's month/year
      const currentData = response.data.find(
        (item) => item["year"] == year && item["month"] == month
      );

      const prevExpense =
        prevData && prevData["monthly_expense"] !== undefined
          ? prevData["monthly_expense"]
          : "invalid";
      const currentExpense = currentData["monthly_expense"];

      if (prevExpense === "invalid") {
        return "No data for previous month/year";
      }

      // Returns a message depending on how close/far the user was to meeting their goal
      if (change === "decrease") {
        if (unit === "a percentage of") {
          const percentChange =
            ((currentExpense - prevExpense) / prevExpense) * 100;
          const sign = percentChange >= 0 ? "+" : "";
          if (percentChange > 0) {
            return (
              "Oh no, you worked against your goal! You changed expenses by " +
              sign +
              percentChange.toFixed(2) +
              "%"
            );
          } else if (Math.abs(percentChange) >= amount) {
            return (
              "You changed expenses by " +
              sign +
              percentChange.toFixed(2) +
              "% good job!"
            );
          } else if (percentChange === 0) {
            return (
              "You didn't change expenses at all! It stayed at " +
              currentExpense
            );
          } else {
            return (
              "Almost made it! You changed expenses by " +
              sign +
              percentChange.toFixed(2) +
              "%"
            );
          }
        } else if (unit === "an amount of") {
          const changeAmount = prevExpense - currentExpense;
          const sign = changeAmount >= 0 ? "+" : "";
          if (changeAmount > 0) {
            return (
              "Oh no, you worked against your goal! You changed expenses by " +
              sign +
              changeAmount
            );
          } else if (Math.abs(changeAmount) >= amount) {
            return (
              "You changed expenses by " + sign + changeAmount + ", good job!"
            );
          } else if (changeAmount === 0) {
            return (
              "You didn't change expenses at all! It stayed at " +
              currentExpense
            );
          } else {
            return (
              "Almost made it! You changed expenses by " + sign + changeAmount
            );
          }
        }
      } else if (change === "increase") {
        if (unit === "a percentage of") {
          const percentChange =
            ((currentExpense - prevExpense) / prevExpense) * 100;
          const sign = percentChange >= 0 ? "+" : "";
          if (percentChange < 0) {
            return (
              "Oh no, you worked against your goal! You changed expenses by " +
              sign +
              percentChange.toFixed(2) +
              "%"
            );
          } else if (percentChange >= amount) {
            return (
              "You changed expenses by " +
              sign +
              percentChange.toFixed(2) +
              "% good job!"
            );
          } else if (percentChange === 0) {
            return (
              "You didn't change expenses at all! It stayed at " +
              currentExpense
            );
          } else {
            return (
              "Almost made it! You changed expenses by " +
              sign +
              percentChange.toFixed(2) +
              "%"
            );
          }
        } else if (unit === "an amount of") {
          const changeAmount = currentExpense - prevExpense;
          const sign = changeAmount >= 0 ? "+" : "";
          if (changeAmount < 0) {
            return (
              "Oh no, you worked against your goal! You changed expenses by " +
              sign +
              changeAmount
            );
          } else if (changeAmount >= amount) {
            return (
              "You changed expenses by " + sign + changeAmount + ", good job!"
            );
          } else if (changeAmount === 0) {
            return (
              "You didn't change expenses at all! It stayed at " +
              currentExpense
            );
          } else {
            return (
              "Almost made it! You changed expenses by " + sign + changeAmount
            );
          }
        }
      } else {
        return "Invalid change type.";
      }
    } catch (error) {
      console.error("data error:", error);
      return "error";
    }
  };

  // Builds a table row for each goal given
  const goalCell = (goals) => {
    return goals.map((goal, index) => (
      <Table.Row
        key={index}
        className="bg-white dark:border-gray-700 dark:bg-gray-800"
      >
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          {goal["category"]}
        </Table.Cell>
        <Table.Cell>{goal["id"]}</Table.Cell>
        <Table.Cell>{goal["goal_year"]}</Table.Cell>
        <Table.Cell>{goal["goal_month"]}</Table.Cell>
        <Table.Cell>{goal["change_by"]}</Table.Cell>
        <Table.Cell>{goal["unit"]}</Table.Cell>
        <Table.Cell>{goal["amount"]}</Table.Cell>
      </Table.Row>
    ));
  };

  // Builds a table row for each goal given (for completed goals)
  const goalCellCompleted = (goals) => {
    return goals.map((goal, index) => {
      const goalId = parseInt(goal[0], 10);

      return (
        <Table.Row
          key={index}
          className="bg-white dark:border-gray-700 dark:bg-gray-800"
        >
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {goal["category"]}
          </Table.Cell>
          <Table.Cell>{goal["id"]}</Table.Cell>
          <Table.Cell>{goal["goal_year"]}</Table.Cell>
          <Table.Cell>{goal["goal_month"]}</Table.Cell>
          <Table.Cell>{goal["change_by"]}</Table.Cell>
          <Table.Cell>{goal["unit"]}</Table.Cell>
          <Table.Cell>{goal["amount"]}</Table.Cell>

          <Table.Cell>
            {Object.prototype.hasOwnProperty.call(achievedStatus, goalId)
              ? achievedStatus[goalId].toString()
              : "Not Achieved"}
          </Table.Cell>
        </Table.Row>
      );
    });
  };

  // Constructs a table for in progress goals
  const constructTable = (title, goals) => {
    return (
      <div className="overflow-x-auto mb-6">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <Table>
          <Table.Head>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Year</Table.HeadCell>
            <Table.HeadCell>Month</Table.HeadCell>
            <Table.HeadCell>Change</Table.HeadCell>
            <Table.HeadCell>Unit</Table.HeadCell>
            <Table.HeadCell>Amount</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">{goalCell(goals)}</Table.Body>
        </Table>
      </div>
    );
  };

  // Constructs accordian table for completed goals
  const constructCompletedTable = (title, goals) => {
    // Limits visible goals to 5 most recent
    const visibleGoals = goals.slice(0, 5);
    // Users can click a button to show all goals
    const hiddenGoals = goals.slice(5);

    return (
      <div className="overflow-x-auto mb-6">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <Accordion collapseAll>
          {visibleGoals.map((goal, index) => (
            <Accordion.Panel key={index}>
              <Accordion.Title className="text-gray-900 dark:text-white dark:bg-gray-800">
                <span className="flex items-center space-x-2">
                  {goal["category"]} - {goal["goal_year"]} {goal["goal_month"]}
                  {checkedStatus[goal[0]] ? (
                    <FaCheckCircle className="ml-2 mt-0.5" color="green" />
                  ) : (
                    <FaCircleXmark className="ml-2 mt-0.5" color="red" />
                  )}
                </span>
              </Accordion.Title>
              <Accordion.Content>
                <div className="p-4 dark:bg-gray-800 rounded">
                  <p>
                    <strong>Status: </strong>
                    {achievedStatus[goal["id"]]}
                  </p>
                  <p>
                    <strong>Original goal: </strong>
                    {goal["change_by"]} {goal["category"]} by {goal["unit"]}{" "}
                    {goal["amount"]}
                  </p>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
          ))}
        </Accordion>
        {hiddenGoals.length > 0 && (
          <div>
            {!showAllGoals && (
              <Button className="mt-4" onClick={() => setShowAllGoals(true)}>
                Show More Goals
              </Button>
            )}
            {showAllGoals && (
              <Accordion collapseAll>
                {hiddenGoals.map((goal, index) => (
                  <Accordion.Panel key={index}>
                    <Accordion.Title className="text-gray-900 dark:text-white dark:bg-gray-800">
                      <span className="flex items-center space-x-2">
                        {goal["category"]} - {goal["goal_year"]}{" "}
                        {goal["goal_month"]}
                        {checkedStatus[goal["id"]] ? (
                          <FaCheckCircle
                            className="ml-2 mt-0.5"
                            color="green"
                          />
                        ) : (
                          <FaCircleXmark className="ml-2 mt-0.5" color="red" />
                        )}
                      </span>
                    </Accordion.Title>
                    <Accordion.Content>
                      <div className="p-4 dark:bg-gray-800 rounded">
                        <p>
                          <strong>Status: </strong>
                          {achievedStatus[goal["id"]]}
                        </p>
                        <p>
                          <strong>Original goal: </strong>
                          {goal["decrease"]} {goal["category"]} by{" "}
                          {goal["unit"]} {goal["amount"]}
                        </p>
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                ))}
              </Accordion>
            )}
          </div>
        )}
        {showAllGoals && (
          <Button className="mt-4" onClick={() => setShowAllGoals(false)}>
            Hide More Goals
          </Button>
        )}
      </div>
    );
  };

  // Renders an in progress goal table and an accordian table for completed goals
  return (
    <div>
      {constructTable("In Progress Goals", inProgressGoals)}
      {constructCompletedTable("Recently Completed", completedGoals)}
    </div>
  );
}
