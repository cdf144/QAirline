import React, { useRef } from "react";
import bookingBgSquare from "../assets/booking-bg-square.jpg";
import docIcon from "../assets/doc-icon.png";
import StandardLayout from "../layouts/Standard";

export const BookingPage: React.FC = () => {
  return (
    <StandardLayout>
      <div
        className="flex flex-col justify-center items-center w-screen min-h-screen bg-cover bg-center px-4"
        style={{
          backgroundImage: `url(${bookingBgSquare})`,
        }}
      >
        {/* Search Box */}
        <div
          className="bg-white rounded-lg shadow-lg w-[90%] max-w-[800px] p-6 md:p-8 bg-cover bg-center mx-auto mt-[150px]"
          style={{
            backgroundImage: "url('/src/assets/Booking_bg.png')",
          }}
        >
          {/* Tabs */}
          <SelectButton />

          {/* Flight Type Radio Buttons */}
          <div className="mb-6 mt-8 flex flex-col md:flex-row justify-start space-y-4 md:space-y-0 md:space-x-10">
            <div className="flex items-center">
              <input
                type="radio"
                id="one-way"
                name="flight-type"
                className="mr-2 w-5 h-5"
              />
              <label htmlFor="one-way" className="text-gray-500 font-semibold">
                One Way
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="round-trip"
                name="flight-type"
                className="mr-2 w-5 h-5"
              />
              <label
                htmlFor="round-trip"
                className="text-gray-500 font-semibold"
              >
                Round Trip
              </label>
            </div>
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* From Input */}
            <div>
              <p className="text-black">From</p>
              <input
                type="text"
                placeholder="Departure"
                className="w-full p-3 border rounded-lg bg-white border-[#1B304F] text-black"
              />
            </div>

            {/* To Input */}
            <div>
              <p className="text-black">To</p>
              <input
                type="text"
                placeholder="Destination"
                className="w-full p-3 border rounded-lg bg-white border-[#1B304F] text-black"
              />
            </div>

            {/* Depart Input */}
            <div className="relative">
              <p className="text-black">Depart</p>
              <div className="flex items-center">
                <input
                  type="date"
                  className="w-full p-3 border rounded-lg placeholder-gray-400 bg-white border-[#1B304F] text-black pr-10"
                />
                <img
                  src="/src/assets/lich.png"
                  alt="Calendar icon"
                  className="absolute right-3 top-[50%] translate-y-[-50%] w-[20px] h-[20px] pointer-events-none"
                />
              </div>
            </div>

            {/* Return Input */}
            <div className="relative">
              <p className="text-black">Return</p>
              <div className="flex items-center">
                <input
                  type="date"
                  className="w-full p-3 border rounded-lg placeholder-gray-400 bg-white border-[#1B304F] text-black pr-10"
                />
                <img
                  src="/src/assets/lich.png"
                  alt="Calendar icon"
                  className="absolute right-3 top-[50%] translate-y-[-50%] w-[20px] h-[20px] pointer-events-none"
                />
              </div>
            </div>

            {/* Passengers Input */}
            <div>
              <p className="text-black">Passengers</p>
              <input
                type="number"
                placeholder="Number of Passengers"
                className="w-full p-3 border rounded-lg bg-white border-[#1B304F] text-black"
                min="1"
              />
            </div>

            {/* Promotion Code Input */}
            <div>
              <p className="text-black">Promotion Code</p>
              <input
                type="text"
                placeholder="Enter Promo Code"
                className="w-full p-3 border rounded-lg bg-white border-[#1B304F] text-black"
              />
            </div>
          </div>

          {/* Button */}
          <div className="mt-6 flex justify-center">
            <button className="px-8 py-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 w-full max-w-[600px] text-lg md:text-2xl">
              FIND FLIGHT
            </button>
          </div>
        </div>

        {/* News Section */}
        <div className="mt-[50px] h-10 w-full max-w-[1000px] p-4 bg-gray-100 text-black text-lg text-left flex items-center rounded-lg shadow bg-[url('/src/assets/News_bg.png')] bg-cover bg-center">
          <img src={docIcon} alt="News icon" className="h-5 w-5" />
          <span className="font-semibold ml-2">News:</span>
          <span className="ml-2">
            Discover the latest travel updates and promotions!
          </span>
        </div>
      </div>
    </StandardLayout>
  );
};

export const SelectButton: React.FC = () => {
  const cashButton = useRef<HTMLButtonElement | null>(null);
  const milesButton = useRef<HTMLButtonElement | null>(null);
  const cashMilesButton = useRef<HTMLButtonElement | null>(null);

  const handleButtonClick = (buttonName: string) => {
    if (cashButton.current)
      cashButton.current.classList.remove("bg-primary", "text-white");
    if (milesButton.current)
      milesButton.current.classList.remove("bg-primary", "text-white");
    if (cashMilesButton.current)
      cashMilesButton.current.classList.remove("bg-primary", "text-white");

    if (buttonName === "Cash" && cashButton.current) {
      cashButton.current.classList.add("bg-primary", "text-white");
    } else if (buttonName === "Miles" && milesButton.current) {
      milesButton.current.classList.add("bg-primary", "text-white");
    } else if (buttonName === "Cash & Miles" && cashMilesButton.current) {
      cashMilesButton.current.classList.add("bg-primary", "text-white");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
      <button
        ref={cashButton}
        className="w-full md:w-[200px] font-bold py-2 px-6 border-[#1B304F] bg-white text-[#1B304F] hover:bg-primary hover:text-white"
        onClick={() => handleButtonClick("Cash")}
      >
        Cash
      </button>
      <button
        ref={milesButton}
        className="w-full md:w-[200px] font-bold py-2 px-6 border-[#1B304F] bg-white text-[#1B304F] hover:bg-primary hover:text-white"
        onClick={() => handleButtonClick("Miles")}
      >
        Miles
      </button>
      <button
        ref={cashMilesButton}
        className="w-full md:w-[200px] font-bold py-2 px-6 border-[#1B304F] bg-white text-[#1B304F] hover:bg-primary hover:text-white"
        onClick={() => handleButtonClick("Cash & Miles")}
      >
        Cash & Miles
      </button>
    </div>
  );
};

export default SelectButton;
