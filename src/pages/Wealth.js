import React from "react";
import { AppFooter } from "../components/Footer";
import { Button, Card, Label, TextInput, Alert, Modal } from "flowbite-react";
import { useState } from "react";

// Wealth Calculator page with two forms for users to calculate their
// estimated and actual net worth. Results section gives insight on
// how well they are saving/investing with inspiration from
// The Millionaire Next Door novel.
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
  const [showInfoModal, setShowInfoModal] = useState(false);

  // Conditionally renders incomplete alert or calculates actual and estimated net worth
  // and gives the user a tag based on how well they are saving. These calculations and tags
  // are from The Millionaire Next Door.
  function wealthCalc() {
    if (
      (income == null) |
      (age == null) |
      (assets == null) |
      (liabilities == null)
    ) {
      setIncompleteAlert(true);
      setNetWorth(null);
    } else {
      const actualNetWorth = assets - liabilities;
      const expectedNetWorth = (age * income) / 10;
      const percentageWealth = (actualNetWorth / expectedNetWorth) * 100;
      setNetWorth(actualNetWorth);
      setPercentageWealth(percentageWealth);
      setEstimatedWorth(expectedNetWorth);
      setIncompleteAlert(false);
      if (actualNetWorth >= 2 * expectedNetWorth) {
        setWealthStatus("PAW - Prodigious Accumulator of Wealth"); // Prodigious Accumulator of Wealth
      } else if (actualNetWorth <= 0.5 * expectedNetWorth) {
        setWealthStatus("UAW - Under Accumulator of Wealth"); // Under Accumulator of Wealth
      } else {
        setWealthStatus("AAW - Average Accumulator of Wealth"); // Average Accumulator of Wealth
      }
    }
  }

  // Renders the net worth calculator form, with conditionally rendering incomplete alert.
  // Shows a results section and a more info button which displays descriptive modal
  return (
    <div className="flex flex-col min-h-screen px-20 dark:bg-gray-700">
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
              onChange={(e) => {
                const value = e.target.value;
                setIncome(value === "" ? null : Number(value));
              }}
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
              onChange={(e) => {
                const value = e.target.value;
                setAge(value === "" ? null : Number(value));
              }}
            />
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
              onChange={(e) => {
                const value = e.target.value;
                setAssets(value === "" ? null : Number(value));
              }}
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
              onChange={(e) => {
                const value = e.target.value;
                setLiabilities(value === "" ? null : Number(value));
              }}
            />
          </form>
        </Card>
      </div>
      <Button onClick={wealthCalc} className="mx-auto my-4">
        Calculate Wealth Status
      </Button>
      {showInfoModal && (
        <Modal show={showInfoModal} onClose={() => setShowInfoModal(false)}>
          <Modal.Header>Note</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                The estimated wealth formula was taken from the famous novel The
                Millionaire Next Door. It is an extremely rough estimate but
                provides a good benchmark on how well someone is accumulating
                wealth. The formula is calculated by multiplying age by income
                and dividing by ten.
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                There are three different wealth status' according to the book,
                PAW - Prodigious Accumulator of Wealth, UAW - Under Accumulator
                of Wealth, and AAW - Average Accumulator of Wealth. PAW means
                that your net worth is equal to or greater than two times your
                expected. UAW means that is equal to or less than .5 times
                expected. AAW is everywhere in between.
              </p>
            </div>
          </Modal.Body>
        </Modal>
      )}

      {incompleteAlert && (
        <Alert
          color={"dark" ? "dark" : "warning"}
          onDismiss={() => setIncompleteAlert(false)}
          className="mb-4"
        >
          <span className="font-medium">Alert!</span> Please fill out all fields
          for your wealth insight
        </Alert>
      )}
      {netWorth !== null && (
        <Card className="w-full p-6 mx-auto my-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
            Results
          </h2>
          <a
            href="#"
            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
            onClick={() => setShowInfoModal(true)}
          >
            More Info
          </a>
          <p className="text-lg dark:text-white">
            <strong>Actual Net Worth:</strong> ${netWorth.toLocaleString()}
          </p>
          <p className="text-lg dark:text-white">
            <strong>Estimated Net Worth</strong> $
            {estimatedWorth.toLocaleString()}
          </p>
          <p className="text-lg dark:text-white">
            <strong>Wealth Status:</strong> {wealthStatus.toLocaleString()}
          </p>
          <p className="text-lg dark:text-white">
            <strong>Percentage Wealth:</strong> {percentageWealth.toFixed(2)}%
          </p>
        </Card>
      )}
      <AppFooter />
    </div>
  );
}
