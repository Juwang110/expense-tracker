import React, { useState } from "react";
import NavigationBar from "../components/NavigationBar";
import { AppFooter } from "../components/Footer";
import { Dropdown, TextInput, Button } from "flowbite-react";
import { useEffect } from "react";
import axios from "axios";

export default function Goals() {
  const [month, setMonth] = useState(getCurrentMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const [goals, setGoals] = useState([
    {
      category: "expense category",
      change: "increase/decrease",
      unit: "amount/percentage of",
      amount: "",
      user_id: localStorage.getItem("id"),
      goal_month: month,
      goal_year: year,
    },
  ]);

  function getCurrentMonth() {
    const date = new Date();
    const options = { month: "long" };
    return date.toLocaleDateString("en-US", options);
  }

  function handleSave() {
    goals.forEach((goal) => {
      if (goal.amount !== "") {
        axios
          .post("http://localhost:5000/api/add_goal", {
            id: goal.user_id,
            category: goal.category,
            unit: goal.unit,
            amount: goal.amount,
            change_by: goal.change,
            goal_month: goal.goal_month,
            goal_year: goal.goal_year,
          })
          .then((response) => {
            console.log(response.data.message); // Handle success message if needed
          })
          .catch((error) => {
            console.error("Error adding goal:", error);
          });
      }
    });
  }

  function addNewGoal() {
    setGoals([
      ...goals,
      {
        category: "expense category",
        change: "increase/decrease",
        unit: "amount/percentage of",
        amount: "",
        user_id: localStorage.getItem("id"),
        goal_month: month,
        goal_year: year,
      },
    ]);
  }

  function updateGoal(index, key, value) {
    const newGoals = [...goals];
    newGoals[index][key] = value;
    setGoals(newGoals);
  }

  function handleMonthChange(selectedMonth) {
    setMonth(selectedMonth);
  }

  function handleYearChange(selectedYear) {
    setYear(selectedYear);
  }

  return (
    <div className="flex flex-col min-h-screen px-20">
      <NavigationBar />
      <div className="flex flex-col justify-center text-center py-3 items-center flex-1">
        <p>
          In the month of
          <Dropdown label={month} inline>
            <Dropdown.Item onClick={() => handleMonthChange("January")}>
              January
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleMonthChange("February")}>
              February
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleMonthChange("March")}>
              March
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleMonthChange("April")}>
              April
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleMonthChange("May")}>
              May
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleMonthChange("June")}>
              June
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleMonthChange("July")}>
              July
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleMonthChange("August")}>
              August
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleMonthChange("September")}>
              September
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleMonthChange("October")}>
              October
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleMonthChange("November")}>
              November
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleMonthChange("December")}>
              December
            </Dropdown.Item>
          </Dropdown>
          year:
          <Dropdown label={year} inline>
            <Dropdown.Item onClick={() => handleYearChange("2024")}>
              2024
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleYearChange("2025")}>
              2025
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleYearChange("2026")}>
              2026
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleYearChange("2027")}>
              2027
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleYearChange("2028")}>
              2028
            </Dropdown.Item>
          </Dropdown>
        </p>
        {goals.map((goal, index) => (
          <div key={index} className="mb-4">
            <p>
              I want to
              <Dropdown label={goal.change} inline>
                <Dropdown.Item
                  onClick={() => updateGoal(index, "change", "decrease")}
                >
                  decrease
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => updateGoal(index, "change", "increase")}
                >
                  increase
                </Dropdown.Item>
              </Dropdown>
              my
              <Dropdown label={goal.category} inline>
                <Dropdown.Item
                  onClick={() => updateGoal(index, "category", "Transport")}
                >
                  Transport
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => updateGoal(index, "category", "Flights")}
                >
                  Flights
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => updateGoal(index, "category", "Housing")}
                >
                  Housing
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => updateGoal(index, "category", "Food")}
                >
                  Food
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => updateGoal(index, "category", "Medical")}
                >
                  Medical
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => updateGoal(index, "category", "Wellness")}
                >
                  Wellness
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => updateGoal(index, "category", "Loans")}
                >
                  Loans
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => updateGoal(index, "category", "Entertainment")}
                >
                  Entertainment
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => updateGoal(index, "category", "Clothing")}
                >
                  Clothing
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => updateGoal(index, "category", "Insurance")}
                >
                  Insurance
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => updateGoal(index, "category", "MiscItems")}
                >
                  MiscItems
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => updateGoal(index, "category", "SaveInvest")}
                >
                  SaveInvest
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => updateGoal(index, "category", "MiscExpense")}
                >
                  MiscExpense
                </Dropdown.Item>
              </Dropdown>
              expenses by
              <Dropdown label={goal.unit} inline>
                <Dropdown.Item
                  onClick={() => updateGoal(index, "unit", "a percentage of")}
                >
                  a percentage of
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => updateGoal(index, "unit", "an amount of")}
                >
                  an amount of
                </Dropdown.Item>
              </Dropdown>
              <TextInput
                id="small"
                type="text"
                sizing="sm"
                value={goal.amount}
                onChange={(e) => {
                  updateGoal(index, "amount", e.target.value);
                  if (e.target.value !== "" && index === goals.length - 1) {
                    addNewGoal();
                  }
                }}
              />
            </p>
          </div>
        ))}
        <Button onClick={handleSave}>Save Goals</Button>
      </div>
      <AppFooter />
    </div>
  );
}
