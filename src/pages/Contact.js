import React from "react";
import NavigationBar from "../components/NavigationBar";
import { ContactMe } from "../components/ContactMe";
import { AppFooter } from "../components/Footer";

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen px-20 dark:bg-gray-700">
      <div class="flex flex-col justify-center text-center py-3 items-center flex-1">
        <h1 className="text-4xl font-bold tracking-tight text-gray-950 dark:text-white">
          Contact Me
        </h1>
        <ContactMe></ContactMe>
      </div>
      <AppFooter></AppFooter>
    </div>
  );
}
