import { Button, Card } from "flowbite-react";

export function LanderCard() {
  return (
    <Card className="max-w-md border-none shadow-none">
      <h5 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
        Welcome to your free budgeting and wealth insight tool, money!
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Aliquam vestibulum
        morbi blandit cursus risus at ultrices mi. Cras pulvinar mattis nunc
        sed. Ultrices tincidunt arcu non sodales neque sodales ut etiam. At
        auctor urna nunc id cursus metus aliquam.
      </p>
      <Button>
        Read more
        <svg
          className="-mr-1 ml-2 h-4 w-4"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </Button>
    </Card>
  );
}
