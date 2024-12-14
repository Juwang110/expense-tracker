import React from "react";
import { Button, Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import developer from "../assets/developer.jpg";

// About me page text card with title and paragraph using Flowbite Card
// with a navigation button to contact page
export function AboutMe() {
  const navigate = useNavigate();
  return (
    <Card className="max-w border-none shadow-none h-full mx-auto">
      <h1 className="text-4xl font-bold tracking-tight text-gray-950 dark:text-white">
        About me
      </h1>
      <div className="flex items-stretch px-10 py-5 border-t border-gray-400 dark:border-gray-400">
        <div className="flex flex-col justify-between max-w-md text-left font-normal text-gray-700 dark:text-gray-400">
          <p>
            Hello, my name is Justin and I'm the developer of this website
            application! I was interested in doing a personal project over the
            summer after my Freshman year to advance my rudimentary knowledge of
            React.js. As I was reading The Millionaire Next Door I was inspired
            to create a budgeting app. While I know there are many similar apps
            out there, I thought it would be a good experience with different
            technologies I wanted to further my knowledge of. I'm currently a
            Sophomore at Northeastern University studying Computer Science with
            a minor in Music. My primary interest right now is software
            engineering or cybersecurity depending on where my classes take me.
            I enjoy playing the French Horn, working out, reading, traveling,
            and watching Netflix.
          </p>
          <Button onClick={() => navigate("/Contact")}>Contact me</Button>
        </div>
        <img
          src={developer}
          alt="Picture of developer"
          className="ml-32 max-w-sm h-auto rounded-lg"
        />
      </div>
    </Card>
  );
}
