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
          <p className="text-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-6">
            Safe Skies & Smart Prices
          </p>
          <p className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black">
            Your perfect choice to discover the world
          </p>
        </div>

        <div className="lg:w-1/2 m-8 flex flex-col lg:flex-row items-start lg:items-center justify-between lg:justify-normal">
          <Link to="/booking" className="mx-4 my-2">
            <FilledButton text="Booking" size="extraLarge" />
          </Link>
          <Link to="/manage" className="mx-4 my-2 text-white no-underline">
            <FilledButton
              text="Manage Booking"
              size="extraLarge"
              color="secondary"
            />
          </Link>
        </div>

        {/* <div
          className="mt-[50px] md:mt-[100px] mx-auto p-4 bg-gray-100 text-black text-base md:text-lg w-full md:w-[1000px] h-auto md:h-[40px] text-left pl-4 md:pl-10 flex items-center bg-cover bg-center rounded-lg"
          style={{
            backgroundImage: "url('/src/assets/News_bg.png')",
          }}
        >
          <img
            src="/src/assets/news.png"
            alt="News icon"
            className="h-5 w-5 mr-1"
          />
          <span className="font-semibold">News:</span>
        </div> */}
      </div>
    </div>
  );
};

export default HeroSection;
