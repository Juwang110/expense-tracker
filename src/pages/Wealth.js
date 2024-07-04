import React from "react";
import NavigationBar from "../components/NavigationBar";
import { AppFooter } from "../components/Footer";
import { Button, Card, Label, TextInput, Alert } from "flowbite-react";
import { useState } from "react";

export default function Wealth() {
  const [income, setIncome] = useState(null);
  const [age, setAge] = useState(null);
  const [assets, setAssets] = useState(null);
  const [liabilities, setLiabilities] = useState(null);
  const [netWorth, setNetWorth] = useState(null);
  const [wealthStatus, setWealthStatus] = useState(null);
  const [percentageWealth, setPercentageWealth] = useState(null);
  const [estimatedWorth, setEstimatedWorth] = useState(null);
  const [incompleteAlert, setIncompleteAlert] = useState(false);

  function handleCalc() {
    const expectedNetWorth = (age * income) / 10;
    console.log(expectedNetWorth);
  }

  function calcNetWorth() {
    const actualNetWorth = assets - liabilities;
    console.log(actualNetWorth);
  }

  function wealthCalc() {
    const actualNetWorth = assets - liabilities;
    const expectedNetWorth = (age * income) / 10;
    const percentageWealth = (actualNetWorth / expectedNetWorth) * 100;
    setNetWorth(actualNetWorth);
    setPercentageWealth(percentageWealth);
    setEstimatedWorth(expectedNetWorth);

    if (
      (income == null) |
      (age == null) |
      (assets == null) |
      (liabilities == null)
    ) {
      setIncompleteAlert(true);
    }

    if (actualNetWorth >= 2 * expectedNetWorth) {
      setWealthStatus("PAW"); // Prodigious Accumulator of Wealth
    } else if (actualNetWorth <= 0.5 * expectedNetWorth) {
      setWealthStatus("UAW"); // Under Accumulator of Wealth
    } else {
      setWealthStatus("AAW"); // Average Accumulator of Wealth
    }
  }

  return (
    <div className="flex flex-col min-h-screen px-20">
      <NavigationBar />
      <div className="relative mt-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-950 dark:text-white mb-3">
          Net Worth and Wealth Calculator
        </h1>
        <div className="absolute left-0 bottom-0 w-1/12 h-1 bg-blue-500 mt-1"></div>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-start gap-8 py-6">
        <Card className="w-full md:w-1/2 p-6">
          <form className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white mb-3">
              Estimated net worth
            </h2>
            <div className="mb-2 block">
              <Label htmlFor="income" value="Your annual income" />
            </div>
            <TextInput
              id="income"
              required
              type="number"
              helperText={<>This data is not stored*</>}
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
            />
            <div className="mb-2 block">
              <Label htmlFor="age" value="Your age" />
            </div>
            <TextInput
              id="age"
              required
              type="number"
              value={age}
              helperText={<>This data is not stored*</>}
              onChange={(e) => setAge(Number(e.target.value))}
            />
            <Button onClick={handleCalc}>Calculate</Button>
          </form>
        </Card>
        <Card className="w-full md:w-1/2 p-6">
          <form className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white mb-3">
              Actual net worth
            </h2>
            <div className="mb-2 block">
              <Label htmlFor="assets" value="Your total assets" />
            </div>
            <TextInput
              id="assets"
              required
              type="number"
              helperText={<>This data is not stored*</>}
              value={assets}
              onChange={(e) => setAssets(Number(e.target.value))}
            />
            <div className="mb-2 block">
              <Label htmlFor="liabilities" value="Your total liabilities" />
            </div>
            <TextInput
              id="liabilities"
              required
              type="number"
              helperText={<>This data is not stored*</>}
              value={liabilities}
              onChange={(e) => setLiabilities(Number(e.target.value))}
            />
            <Button onClick={calcNetWorth}>Calculate</Button>
          </form>
        </Card>
      </div>
      <Button onClick={wealthCalc} className="mx-auto my-4">
        Calculate Wealth Status
      </Button>
      {incompleteAlert && (
        <Alert color="warning" onDismiss={() => setIncompleteAlert(false)}>
          <span className="font-medium">Alert!</span> Please fill out all fields
          for your wealth insight
        </Alert>
      )}
      {netWorth !== null && (
        <Card className="w-full p-6 mx-auto my-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white mb-3">
            Results
          </h2>
          <p className="text-lg">
            <strong>Actual Net Worth:</strong> ${netWorth.toLocaleString()}
          </p>
          <p className="text-lg">
            <strong>Estimated Net Worth</strong> ${netWorth.toLocaleString()}
          </p>
          <p className="text-lg">
            <strong>Wealth Status:</strong> ${estimatedWorth.toLocaleString()}
          </p>
          <p className="text-lg">
            <strong>Percentage Wealth:</strong> {percentageWealth.toFixed(2)}%
          </p>
        </Card>
      )}
      <AppFooter />
    </div>
  );
}
