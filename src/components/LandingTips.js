import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export default function LandingTips() {
  const navigate = useNavigate();
  return (
    <div class="flex flex-col items-center text-center py-10">
      <h5 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
        How to get started
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400 py-7">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <Button onClick={() => navigate("/FinancialProfile")}>My Finances</Button>
    </div>
  );
}
