import React from "react";
import NavigationBar from "../components/NavigationBar";
import { AppFooter } from "../components/Footer";
import { LanderCard } from "../components/LanderCard";
import { LanderCarousel } from "../components/LanderCarousel";
import { LanderTools } from "../components/LandingTools";
import { Quote } from "../components/Quote";
import LandingTips from "../components/LandingTips";

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen px-20">
      <NavigationBar />
      <div className="flex flex-grow space-x-4 mt-8">
        <div className="flex-1 flex items-center">
          <div style={{ flex: 1 }}>
            <LanderCard />
          </div>
        </div>
        <div className="flex-1 flex items-center">
          <div style={{ flex: 1 }}>
            <LanderCarousel />
          </div>
        </div>
      </div>
      <Quote></Quote>
      <LanderTools></LanderTools>
      <LandingTips></LandingTips>
      <AppFooter />
    </div>
  );
}
