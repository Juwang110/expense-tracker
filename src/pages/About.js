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
          Volutpat odio facilisis mauris sit amet massa. Tempus urna et pharetra
          pharetra massa massa ultricies mi quis.
        </p>
        <img
          src={userIcon}
          alt="Picture of developer"
          className="w-64 h-auto py-10"
        />
        <p className="py-4">
          Eros in cursus turpis massa tincidunt. Sit amet mauris commodo quis
          imperdiet. Dapibus ultrices in iaculis nunc. Lacus suspendisse
          faucibus interdum posuere lorem ipsum dolor sit. Quis blandit turpis
          cursus in hac. Diam ut venenatis tellus in metus vulputate. Vel orci
          porta non pulvinar neque laoreet suspendisse. Et malesuada fames ac
          turpis egestas. Ut sem nulla pharetra diam. Auctor augue mauris augue
          neque gravida in fermentum et sollicitudin. Arcu felis bibendum ut
          tristique et. Pellentesque habitant morbi tristique senectus et netus.
          Adipiscing enim eu turpis egestas pretium aenean pharetra. Aenean
          pharetra magna ac placerat vestibulum lectus mauris ultrices. In nibh
          mauris cursus mattis molestie a iaculis at. Massa tincidunt dui ut
          ornare lectus sit amet est placerat. Suspendisse in est ante in nibh.
          Libero id faucibus nisl tincidunt eget nullam non. Bibendum ut
          tristique et egestas quis ipsum suspendisse ultrices gravida. Viverra
          nam libero justo laoreet sit amet cursus sit amet.
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
