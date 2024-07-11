import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import axios from "axios";

export default function FinanceGoals() {
  const [goalData, setGoalData] = useState([]);
  const [filledDates, setFilledDates] = useState([]);

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
    console.log(filledDates);
  }, [filledDates]);

  const isGoalCompleted = (goal) => {
    return filledDates.some(
      (date) => date[0] === goal[7] && date[1] === goal[6]
    );
  };

  const inProgressGoals = goalData.filter((goal) => !isGoalCompleted(goal));
  const completedGoals = goalData.filter((goal) => isGoalCompleted(goal));

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

  return (
    <div>
      {constructTable("In Progress Goals", inProgressGoals)}
      {constructTable("Completed Goals", completedGoals)}
    </div>
  );
}
