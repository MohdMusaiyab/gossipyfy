import React from "react";
import Hero from "./components/General/Hero";
import Features from "./components/General/Features";
import About from "./components/General/About";
import PriceSection from "./components/General/PriceSection";

const page = () => {
  return (
    <div>
      <Hero />
      <About />
      <Features />
      <PriceSection />
    </div>
  );
};

export default page;
