import React, { useEffect, useState } from "react";
import { Table, Accordion, Button } from "flowbite-react";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";

export default function FinanceGoals() {
  const [goalData, setGoalData] = useState([]);
  const [filledDates, setFilledDates] = useState([]);
  const [achievedStatus, setAchievedStatus] = useState({});
  const [checkedStatus, setCheckedStatus] = useState({});
  const [showAllGoals, setShowAllGoals] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/get_goals",
          { id: localStorage.getItem("id") }
        );
        setGoalData(response.data);

        const response1 = await axios.post(
          "http://localhost:5000/api/get_dates",
          { id: localStorage.getItem("id") }
        );
        setFilledDates(response1.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchAchievedStatus = async () => {
      const status = {};
      const checked = {};
      for (const goal of completedGoals) {
        const achieved = await goalAchieved(
          goal[2],
          goal[5],
          goal[3],
          goal[4],
          goal[6],
          goal[7]
        );
        status[goal[0]] = achieved;
        if (achieved.endsWith("good job!")) {
          checked[goal[0]] = true;
        } else {
          checked[goal[0]] = false;
        }
      }
      setAchievedStatus(status);
      setCheckedStatus(checked);
    };
    fetchAchievedStatus();
  }, [goalData, filledDates]);

  const isGoalCompleted = (goal) => {
    return filledDates.some(
      (date) => date[0] === goal[7] && date[1] === goal[6]
    );
  };

  const inProgressGoals = goalData.filter((goal) => !isGoalCompleted(goal));
  const completedGoals = goalData
    .filter((goal) => isGoalCompleted(goal))
    .sort((a, b) => {
      const dateA = new Date(a[6], a[7] - 1);
      const dateB = new Date(b[6], b[7] - 1);
      return dateB - dateA;
    });

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

  const goalAchieved = async (category, change, unit, amount, year, month) => {
    try {
      const { month: prevMonth, year: prevYear } = getPreviousMonthYear(
        month,
        year
      );
      const response = await axios.post(
        "http://localhost:5000/api/get_category",
        { id: localStorage.getItem("id"), category: category }
      );

      const prevData = response.data.find(
        (item) => item[3] == prevYear && item[4] == prevMonth
      );

      const currentData = response.data.find(
        (item) => item[3] == year && item[4] == month
      );

      const prevExpense = prevData[2];
      const currentExpense = currentData[2];

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

  const goalCell = (goals) => {
    return goals.map((goal, index) => (
      <Table.Row
        key={index}
        className="bg-white dark:border-gray-700 dark:bg-gray-800"
      >
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          {goal[2]}
        </Table.Cell>
        <Table.Cell>{goal[0]}</Table.Cell>
        <Table.Cell>{goal[6]}</Table.Cell>
        <Table.Cell>{goal[7]}</Table.Cell>
        <Table.Cell>{goal[5]}</Table.Cell>
        <Table.Cell>{goal[3]}</Table.Cell>
        <Table.Cell>{goal[4]}</Table.Cell>
      </Table.Row>
    ));
  };

  const goalCellCompleted = (goals) => {
    return goals.map((goal, index) => {
      const goalId = parseInt(goal[0], 10);

      return (
        <Table.Row
          key={index}
          className="bg-white dark:border-gray-700 dark:bg-gray-800"
        >
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {goal[2]}
          </Table.Cell>
          <Table.Cell>{goal[0]}</Table.Cell>
          <Table.Cell>{goal[6]}</Table.Cell>
          <Table.Cell>{goal[7]}</Table.Cell>
          <Table.Cell>{goal[5]}</Table.Cell>
          <Table.Cell>{goal[3]}</Table.Cell>
          <Table.Cell>{goal[4]}</Table.Cell>

          <Table.Cell>
            {achievedStatus.hasOwnProperty(goalId)
              ? achievedStatus[goalId].toString()
              : "Not Achieved"}
          </Table.Cell>
        </Table.Row>
      );
    });
  };

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

  const constructCompletedTable = (title, goals) => {
    const visibleGoals = goals.slice(0, 5);
    const hiddenGoals = goals.slice(5);

    return (
      <div className="overflow-x-auto mb-6">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <Accordion collapseAll>
          {visibleGoals.map((goal, index) => (
            <Accordion.Panel key={index}>
              <Accordion.Title className="text-gray-900 dark:text-white dark:bg-gray-800">
                <span className="flex items-center space-x-2">
                  {goal[2]} - {goal[6]} {goal[7]}
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
                    {achievedStatus[goal[0]]}
                  </p>
                  <p>
                    <strong>Original goal: </strong>
                    {goal[5]} {goal[2]} by {goal[3]} {goal[4]}
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
                        {goal[2]} - {goal[6]} {goal[7]}
                        {checkedStatus[goal[0]] ? (
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
                          {achievedStatus[goal[0]]}
                        </p>
                        <p>
                          <strong>Original goal: </strong>
                          {goal[5]} {goal[2]} by {goal[3]} {goal[4]}
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

  return (
    <div>
      {constructTable("In Progress Goals", inProgressGoals)}
      {constructCompletedTable("Recently Completed", completedGoals)}
    </div>
  );
}
