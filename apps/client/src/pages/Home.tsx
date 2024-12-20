import React, { useEffect, useState } from "react";
import FlightsSection from "../components/FlightsSection";
import HeroSection from "../components/HeroSection";
import StandardLayout from "../layouts/Standard";

export const HomePage: React.FC = () => {
  const [isHeaderTransparent, setIsHeaderTransparent] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const firstSectionHeight =
        document.getElementById("hero-section")?.offsetHeight || 0;
      setIsHeaderTransparent(scrollPosition < firstSectionHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <StandardLayout isHeaderTransparent={isHeaderTransparent}>
      <HeroSection />
      <FlightsSection />
    </StandardLayout>
  );
};

export default HomePage;
