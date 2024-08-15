import { Button, Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export function LanderCard() {
  const navigate = useNavigate();

  return (
    <Card className="max-w-md border-none shadow-none h-full">
      <h5 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
        Welcome to your free budgeting and wealth insight tool, SpendTrack!
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400 py-3">
        This is a multipurpose budgeting insight web application for you to
        create an account, input monthly expenses, and gain insights based on
        them. The full list of tools is described below but SpendTrack has a
        wealth calculator based on The Millionaire Next Door, budget history and
        charts, and goal setting with more features to come!
      </p>
      <Button onClick={() => navigate("/About")}>Read more</Button>
    </Card>
  );
}
