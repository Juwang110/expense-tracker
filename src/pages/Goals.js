import React, { useState } from "react";
import { AppFooter } from "../components/Footer";
import {
  Dropdown,
  TextInput,
  Button,
  Alert,
  Card,
  Table,
  Modal,
} from "flowbite-react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Goals page allowing users to add financial expenditure goals,
// see existing goals, and delete goals
export default function Goals() {
  const [month, setMonth] = useState(getCurrentMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [goals, setGoals] = useState([]);
  const [myGoals, setMyGoals] = useState([]);
  const [intAlert, setIntAlert] = useState(false);
  const [stringAlert, setStringAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const navigate = useNavigate();

  // Navigates to financial profile page
  function handleProfile() {
    navigate("/FinancialProfile");
  }

  //
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

  // Fetchs goals to display on current goals whenever a goal is added/deleted
  useEffect(() => {
    fetchGoals();
  }, [successAlert, deleteAlert]);

  // Retrieves all existing goals for this user
  const fetchGoals = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/get_goals`,
        {
          id: localStorage.getItem("id"),
        }
      );
      setMyGoals(response.data);
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  };

  // Gets today's month
  function getCurrentMonth() {
    const date = new Date();
    const options = { month: "long" };
    return date.toLocaleDateString("en-US", options);
  }

  // Saves and adds the new goals to the database
  async function handleSave() {
    setIntAlert(false);
    setStringAlert(false);
    setSuccessAlert(false);
    setDeleteAlert(false);
    let allGoalsValid = true;

    // For each goal if the goal is incompletely filled out or
    // has invalid inputs the page displays a conditional alert
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
      } else if (
        ((goal.amount == "") & (goal.category != "expense category")) |
        (goal.change != "increase/decrease") |
        (goal.unit != "amount/percentage of")
      ) {
        allGoalsValid = false;
        setIntAlert(true);
        return;
      }
    });

    // If all goals are valid, adds each goal to the database
    if (allGoalsValid) {
      try {
        await Promise.all(
          goals.map((goal) => {
            if (goal.amount !== "") {
              axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/add_goal`, {
                id: goal.user_id,
                category: goal.category,
                unit: goal.unit,
                amount: goal.amount,
                change_by: goal.change,
                goal_month: goal.goal_month,
                goal_year: goal.goal_year,
              });
            }
            return Promise.resolve();
          })
        );
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
        setSuccessAlert(true);
        fetchGoals();
      } catch (error) {
        console.error("Error adding goal:", error);
      }
    }
  }

  // Function to display a new goal for the user to fill out
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

  // Can the string be converted to an int
  function canBeConvertedToInt(str) {
    return /^\d+$/.test(str);
  }

  // Updates the goal given the index, key and value
  function updateGoal(index, key, value) {
    const newGoals = [...goals];
    newGoals[index][key] = value;
    setGoals(newGoals);
  }

  // Changes the month state to the given month
  function handleMonthChange(selectedMonth) {
    setMonth(selectedMonth);
  }

  // Changes the year state to the given year
  function handleYearChange(selectedYear) {
    setYear(selectedYear);
  }

  // Deletes the goal given the goal id from the database
  function handleDelete(id) {
    setDeleteAlert(false);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/delete_goal`, {
        goal_id: id,
      })
      .then((response) => {
        setDeleteAlert(true);
      })
      .catch((error) => {
        console.error("Error deleting goal:", error);
      });
  }

  // For each goal returns a table row with that goal's information
  function goalCell() {
    return myGoals.map((myGoal, index) => (
      <Table.Row
        key={index}
        className="bg-white dark:border-gray-700 dark:bg-gray-800"
      >
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          {myGoal[2]}
        </Table.Cell>
        <Table.Cell>{myGoal[0]}</Table.Cell>
        <Table.Cell>{myGoal[6]}</Table.Cell>
        <Table.Cell>{myGoal[7]}</Table.Cell>
        <Table.Cell>{myGoal[5]}</Table.Cell>
        <Table.Cell>{myGoal[3]}</Table.Cell>
        <Table.Cell>{myGoal[4]}</Table.Cell>
        <Table.Cell>
          <a
            href="#"
            onClick={() => handleDelete(myGoal[0])}
            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
          >
            Delete
          </a>
        </Table.Cell>
      </Table.Row>
    ));
  }

  // Constructs the goal table
  function constructTable() {
    return (
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>ID</Table.HeadCell>
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

  // Renders adding goal section where after a goal is filled out an empty one appears,
  // a more info button is displayed to show an info modal,
  // a current goals list is also displayed with deletion functionality and
  // a button to navigate to the financial profile.
  // There is conditional rendering of incomplete and invalid alerts as well as
  // an success alert and a goal deletion alert.
  return (
    <div className="flex flex-col min-h-screen px-20 dark:bg-gray-700">
      <div className="flex flex-col py-3 flex-1 px-20">
        <h1 className="text-4xl font-bold mt-5 dark:text-white">
          Add new goals
        </h1>
        <a
          href="#"
          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
          onClick={() => setShowInfoModal(true)}
        >
          More Info
        </a>
        {showInfoModal && (
          <Modal show={showInfoModal} onClose={() => setShowInfoModal(false)}>
            <Modal.Header>Note</Modal.Header>
            <Modal.Body>
              <div className="space-y-6 ">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  This is the goals section. Here you can add financial goals
                  and see what goals you currently have.
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  The financial profile will update depending on your goals and
                  show you how your budget must change to meet these goals or,
                  if the month has passed it will show you how far off you were.
                </p>
              </div>
            </Modal.Body>
          </Modal>
        )}
        <p className="flex items-center space-x-2 py-4 dark:text-white">
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
          <div key={index} className="mb-4 dark:text-white">
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
                    onClick={() => updateGoal(index, "category", "transport")}
                  >
                    Transport
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => updateGoal(index, "category", "flights")}
                  >
                    Flights
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => updateGoal(index, "category", "housing")}
                  >
                    Housing
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => updateGoal(index, "category", "food")}
                  >
                    Food
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => updateGoal(index, "category", "medical")}
                  >
                    Medical
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => updateGoal(index, "category", "wellness")}
                  >
                    Wellness
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => updateGoal(index, "category", "loans")}
                  >
                    Loans
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      updateGoal(index, "category", "entertainment")
                    }
                  >
                    Entertainment
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => updateGoal(index, "category", "clothing")}
                  >
                    Clothing
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => updateGoal(index, "category", "insurance")}
                  >
                    Insurance
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => updateGoal(index, "category", "miscitems")}
                  >
                    MiscItems
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => updateGoal(index, "category", "saveinvest")}
                  >
                    SaveInvest
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => updateGoal(index, "category", "miscexpense")}
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
        <div className="py-4">
          {intAlert && (
            <Alert
              color={"dark" ? "dark" : "warning"}
              onDismiss={() => setIntAlert(false)}
            >
              <span className="font-medium">Alert!</span> Please make sure all
              amount inputs are integers
            </Alert>
          )}
          {stringAlert && (
            <Alert
              color={"dark" ? "dark" : "warning"}
              onDismiss={() => setStringAlert(false)}
            >
              <span className="font-medium">Alert!</span> Please make sure all
              of the dropdowns have a value
            </Alert>
          )}
          {successAlert && (
            <Alert
              color={"dark" ? "dark" : "success"}
              onDismiss={() => setSuccessAlert(false)}
            >
              <span className="font-medium">Alert!</span> Monthly goals have
              been successfully added
            </Alert>
          )}
        </div>
        <h1 className="text-4xl font-bold py-5 dark:text-white">
          My current goals
        </h1>

        {constructTable()}
        {deleteAlert && (
          <Alert
            color={"dark" ? "dark" : "success"}
            className="mt-4"
            onDismiss={() => setDeleteAlert(false)}
          >
            <span className="font-medium">Alert!</span> Monthly goal has been
            successfully deleted
          </Alert>
        )}
        <div className="py-4 px-4">
          <p className="mb-2 dark:text-white">
            Navigate to financial profile to see goal updates
          </p>
          <Button onClick={handleProfile}>Financial Profile</Button>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}
