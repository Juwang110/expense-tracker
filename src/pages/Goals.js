import React, { useState } from "react";
import NavigationBar from "../components/NavigationBar";
import { AppFooter } from "../components/Footer";
import {
  Dropdown,
  TextInput,
  Button,
  Alert,
  Card,
  Table,
} from "flowbite-react";
import { useEffect } from "react";
import axios from "axios";

export default function Goals() {
  const [month, setMonth] = useState(getCurrentMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [goals, setGoals] = useState([]);
  const [myGoals, setMyGoals] = useState([]);
  const [intAlert, setIntAlert] = useState(false);
  const [stringAlert, setStringAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);

  useEffect(() => {
    setGoals([
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
  }, [month, year]);

  useEffect(() => {
    fetchGoals();
    if (successAlert) {
      fetchGoals();
    }
  }, [successAlert]);

  useEffect(() => {
    console.log(myGoals);
  }, [myGoals]);

  const fetchGoals = async () => {
    console.log(localStorage.getItem("id"));
    try {
      const response = await axios.post("http://localhost:5000/api/get_goals", {
        id: localStorage.getItem("id"),
      });
      setMyGoals(response.data);
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  };

  function getCurrentMonth() {
    const date = new Date();
    const options = { month: "long" };
    return date.toLocaleDateString("en-US", options);
  }

  function handleSave() {
    setIntAlert(false);
    setStringAlert(false);
    setSuccessAlert(false);
    let allGoalsValid = true;

    goals.forEach((goal) => {
      if (goal.amount !== "") {
        if (!canBeConvertedToInt(goal.amount)) {
          allGoalsValid = false;
          setIntAlert(true);
          return;
        } else if (
          (goal.category == "expense category") |
          (goal.change == "increase/decrease") |
          (goal.unit == "amount/percentage of")
        ) {
          allGoalsValid = false;
          setStringAlert(true);
          return;
        }
      }
    });

    if (allGoalsValid) {
      setSuccessAlert(true);
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
              console.log(response.data.message);
            })
            .catch((error) => {
              console.error("Error adding goal:", error);
            });
        }
      });
    }
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

  function canBeConvertedToInt(str) {
    return /^\d+$/.test(str);
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

  function goalCell() {
    return myGoals.map((myGoal, index) => (
      <Table.Row
        key={index}
        className="bg-white dark:border-gray-700 dark:bg-gray-800"
      >
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          {myGoal[2]} {/* Category */}
        </Table.Cell>
        <Table.Cell>{myGoal[6]}</Table.Cell> {/* Year */}
        <Table.Cell>{myGoal[7]}</Table.Cell> {/* Month */}
        <Table.Cell>{myGoal[5]}</Table.Cell> {/* Change */}
        <Table.Cell>{myGoal[3]}</Table.Cell> {/* Unit */}
        <Table.Cell>{myGoal[4]}</Table.Cell> {/* Amount */}
        <Table.Cell>
          <a
            href="#"
            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
          >
            Delete
          </a>
        </Table.Cell>
      </Table.Row>
    ));
  }

  function constructTable() {
    return (
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Year</Table.HeadCell>
            <Table.HeadCell>Month</Table.HeadCell>
            <Table.HeadCell>Change</Table.HeadCell>
            <Table.HeadCell>Unit</Table.HeadCell>
            <Table.HeadCell>Amount</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Delete</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">{goalCell()}</Table.Body>
        </Table>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen px-20">
      <NavigationBar />
      <div className="flex flex-col py-3 flex-1 px-20">
        <p className="flex items-center space-x-2 py-4">
          In the month of&nbsp;
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
          &nbsp;year:
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
            <Card>
              <p className="flex items-center space-x-2">
                I want to&nbsp;
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
                &nbsp;my
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
                    onClick={() =>
                      updateGoal(index, "category", "Entertainment")
                    }
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
                &nbsp;expenses by
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
            </Card>
          </div>
        ))}
        <Button onClick={handleSave}>Save Goals</Button>
        {intAlert && (
          <Alert color="warning" onDismiss={() => setIntAlert(false)}>
            <span className="font-medium">Alert!</span> Please make sure all
            amount inputs are integers
          </Alert>
        )}
        {stringAlert && (
          <Alert color="warning" onDismiss={() => setStringAlert(false)}>
            <span className="font-medium">Alert!</span> Please make sure all of
            the dropdowns have a value
          </Alert>
        )}
        {successAlert && (
          <Alert color="success" onDismiss={() => setSuccessAlert(false)}>
            <span className="font-medium">Alert!</span> Monthly goals have been
            successfully added
          </Alert>
        )}
        <h1 className="text-4xl font-bold">My current goals</h1>
        {constructTable()}
      </div>
      <AppFooter />
    </div>
  );
}
