import React from "react";
import Hero from "./components/Hero";
import Features from "./components/Features";
import About from "./components/About";
import PriceSection from "./components/PriceSection";

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
