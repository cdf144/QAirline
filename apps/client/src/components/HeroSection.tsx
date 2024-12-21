import { Link } from "react-router-dom";
import homebg from "../assets/homebg.png";
import FilledButton from "./buttons/Filled";

const HeroSection: React.FC = () => {
  return (
    <div
      id="hero-section"
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${homebg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col justify-evenly h-full px-2 md:px-16">
        <div className="w-2/5 m-8 mt-36">
          <p className="text-primary italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            Safe Skies & Smart Prices
          </p>
          <p className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black">
            Your perfect choice to discover the world
          </p>
        </div>

        <div className="lg:w-1/2 m-8 flex flex-col lg:flex-row items-start lg:items-center justify-between lg:justify-normal">
          <Link to="/blog" className="mx-4 my-2">
            <FilledButton text="Blog" size="extraLarge" />
          </Link>
          <Link to="/manage" className="mx-4 my-2 text-white no-underline">
            <FilledButton
              text="Manage Booking"
              size="extraLarge"
              color="secondary"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
