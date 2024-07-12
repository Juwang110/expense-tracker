import React from "react";
import NavigationBar from "../components/NavigationBar";
import userIcon from "../assets/userIcon.png";
import { AppFooter } from "../components/Footer";
import { AboutMe } from "../components/AboutMe";
import AboutTimeline from "../components/AboutTimeline";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen px-20">
      <NavigationBar />
      <div className="flex flex-col justify-center text-center py-3 items-center flex-1">
        <h1 className="text-4xl font-bold tracking-tight text-gray-950 dark:text-white">
          About Money
        </h1>
        <p className="py-4 px-56">
          A budgeting and expenditure insight application with more features to
          come!
        </p>
        <img
          src={userIcon}
          alt="Picture of developer"
          className="w-64 h-auto py-10"
        />
        <p className="py-4">
          Money is a multi-purpose expenditure and budgeting insight app that is
          still under development with more functionality to be added. You can
          calculate your net and expected net worth, set monthly budget goals,
          view expenditure history, and view budget breakdowns and
          visualizations. The idea for creating Money stemmed from the novel The
          Millionaire Next Door. I began reading this book during the summer
          after my freshman year of college and thought it would be cool to
          create a budgeting web application that would help me learn full-stack
          web development while keeping me interested. I previously worked with
          basic React.js principles and I learned SQL just prior. I have never
          worked on both front and back end and decided this would be a great
          learning opportunity. This website is not meant to be unique or
          original, it is just a passion project of mine that I enjoy creating
          and updating. Money uses React.js, Tailwind.css, Flowbite-react,
          MySQL, Flask, and ReCharts.
        </p>
        <div className="py-5 w-full">
          <AboutTimeline></AboutTimeline>
          <AboutMe></AboutMe>
        </div>
      </div>
      <AppFooter></AppFooter>
    </div>
  );
}
