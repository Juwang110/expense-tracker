import { Button, Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";

// Simple landing page text card with button to navigate to About page
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
        them. The full list of tools is described below but in short, SpendTrack
        has a wealth calculator and other features inspired by the novel The
        Millionaire Next Door.
      </p>
      <Button onClick={() => navigate("/About")}>Read more</Button>
    </Card>
  );
}
