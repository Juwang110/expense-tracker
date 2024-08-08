import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import axios from "axios";

export default function FinanceGoals() {
  const [goalData, setGoalData] = useState([]);
  const [filledDates, setFilledDates] = useState([]);
  const [achievedStatus, setAchievedStatus] = useState({});

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
      for (const goal of completedGoals) {
        const achieved = await goalAchieved(
          goal[2],
          goal[5],
          goal[3],
          goal[4],
          goal[6],
          goal[7]
        );
        console.log(achieved);
        status[goal[0]] = achieved;
      }
      setAchievedStatus(status);
    };
    fetchAchievedStatus();
  }, [goalData, filledDates]);

  useEffect(() => {
    console.log(achievedStatus[47]);
  });

  const isGoalCompleted = (goal) => {
    return filledDates.some(
      (date) => date[0] === goal[7] && date[1] === goal[6]
    );
  };

  const inProgressGoals = goalData.filter((goal) => !isGoalCompleted(goal));
  const completedGoals = goalData.filter((goal) => isGoalCompleted(goal));

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
      console.log(currentExpense);

      if (change === "decrease") {
        if (unit === "a percentage of") {
          return prevExpense - currentExpense >= (amount / 100) * prevExpense;
        } else if (unit === "an amount of") {
          return prevExpense - currentExpense >= amount;
        } else {
          return currentExpense <= amount;
        }
      } else if (change === "increase") {
        if (unit === "a percentage of") {
          return currentExpense - prevExpense >= (amount / 100) * prevExpense;
        } else if (unit === "an amount of") {
          return currentExpense - prevExpense >= amount;
        } else {
          return currentExpense >= amount;
        }
      } else {
        return "invalid";
      }
    } catch (error) {
      console.log("what");
      console.error("data error:", error);
      return "no data for prev month";
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
            <Table.HeadCell>Achieved</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {goalCellCompleted(goals)}
          </Table.Body>
        </Table>
      </div>
    );
  };

  return (
    <div>
      {constructTable("In Progress Goals", inProgressGoals)}
      {constructCompletedTable("Completed Goals", completedGoals)}
    </div>
  );
}
