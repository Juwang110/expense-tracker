import React from "react";
import { AppFooter } from "../components/Footer";
import { List } from "flowbite-react";

export default function Resources() {
  return (
    <div className="flex flex-col min-h-screen px-20 dark:bg-gray-700">
      <div class="flex flex-col  text-center py-3 items-center flex-1">
        <h1 className="text-4xl font-bold tracking-tight text-gray-950 dark:text-white py-5">
          Resources
        </h1>
        <List>
          <List.Item>
            User icon and logo designed by&nbsp;
            <a
              href="https://www.freepik.com/"
              className="text-blue-500 hover:text-blue-700 underline"
            >
              Freepik
            </a>
          </List.Item>
          <List.Item>
            Budget category inspiration from&nbsp;
            <a
              href="https://localfirstbank.com/article/budgeting-101-personal-budget-categories/?fb_content_cat=fb-tsm"
              className="text-blue-500 hover:text-blue-700 underline"
            >
              First Bank
            </a>
          </List.Item>
          <List.Item>
            Component library from&nbsp;
            <a
              href="https://flowbite-react.com/"
              className="text-blue-500 hover:text-blue-700 underline"
            >
              Flowbite
            </a>
          </List.Item>
          <List.Item>
            Landing page&nbsp;
            <a
              href="https://github.com/themesberg/tailwind-landing-page"
              className="text-blue-500 hover:text-blue-700 underline"
            >
              inspiration
            </a>
          </List.Item>
          <List.Item>
            About page stock photo by{" "}
            <a
              href="https://unsplash.com/@smigielski?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
              className="text-blue-500 hover:text-blue-700 underline"
            >
              Adam Śmigielski
            </a>{" "}
            on{" "}
            <a
              href="https://unsplash.com/photos/a-person-holding-a-cell-phone-in-front-of-a-stock-chart-K5mPtONmpHM?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
              className="text-blue-500 hover:text-blue-700 underline"
            >
              Unsplash
            </a>
          </List.Item>
        </List>
      </div>
      <AppFooter></AppFooter>
    </div>
  );
}
