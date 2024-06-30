import React from "react";
import { Button, Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import userIcon from "../assets/userIcon.png";
import developer from "../assets/developer.jpg";

export function AboutMe() {
  const navigate = useNavigate();
  return (
    <Card className="max-w border-none shadow-none h-full mx-auto">
      <h1 className="text-4xl font-bold tracking-tight text-gray-950 dark:text-white">
        About me
      </h1>
      <div className="flex items-stretch px-10 py-5 border-t border-gray-400 dark:border-gray-800">
        <div className="flex flex-col justify-between max-w-md text-left font-normal text-gray-700 dark:text-gray-400">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam
            vestibulum morbi blandit cursus risus at ultrices mi. Cras pulvinar
            mattis nunc sed. Ultrices tincidunt arcu non sodales neque sodales
            ut etiam. At auctor urna nunc id cursus metus aliquam. Vel orci
            porta non pulvinar. At augue eget arcu dictum varius duis at.
            Pulvinar sapien et ligula ullamcorper malesuada proin. Nullam ac
            tortor vitae purus faucibus ornare suspendisse. Purus sit amet
            volutpat consequat. Lectus magna fringilla urna porttitor. Nunc eget
            lorem dolor sed viverra ipsum. Consequat ac felis donec et odio
            pellentesque. Sapien pellentesque habitant morbi tristique senectus
            et netus et. Sed risus pretium quam vulputate dignissim. Facilisis
            leo vel fringilla est.
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
