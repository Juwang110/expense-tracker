import { Button, Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export function LanderCard() {
  const navigate = useNavigate();

  return (
    <Card className="max-w-md border-none shadow-none h-full">
      <h5 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
        Welcome to your free budgeting and wealth insight tool, money!
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400 py-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Aliquam vestibulum
        morbi blandit cursus risus at ultrices mi. Cras pulvinar mattis nunc
        sed. Ultrices tincidunt arcu non sodales neque sodales ut etiam. At
        auctor urna nunc id cursus metus aliquam.
      </p>
      <Button onClick={() => navigate("/About")}>Read more</Button>
    </Card>
  );
}
