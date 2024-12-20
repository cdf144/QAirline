import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import StandardLayout from "../layouts/Standard";

const ForgotPasswordPage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("Member Number");

  // Function to handle option change
  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    // Ensure Member Number is selected when the page loads
    setSelectedOption("Member Number");
  }, []); // Empty dependency array ensures this only runs on mount

  return (
    <StandardLayout>
      <div
        className="flex flex-col justify-center items-center w-screen min-h-screen bg-cover bg-center px-4"
        style={{
          backgroundImage: "url('src/assets/bookingbg.jpg')",
        }}
      >
        {/* Header */}
        <div
          className="w-full max-w-[600px] lg:h-[470px] lg:mt-[200px] shadow-md rounded-lg flex flex-col pt-10 bg-white bg-cover bg-center"
          style={{
            backgroundImage: "url('/src/assets/Booking_bg.png')",
          }}
        >
          <div className="px-6 py-6">
            {/* Navigation Buttons */}
            <SelectButton />

            {/* Forgot Password Form */}
            <h2 className="mb-4 text-lg lg:text-xl font-bold text-gray-700">
              Forgot Password
            </h2>
            <div className="space-y-4">
              {/* Radio Buttons Row */}
              <div className="flex space-x-6">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="member"
                    name="option"
                    value="Member Number"
                    checked={selectedOption === "Member Number"}
                    onChange={handleOptionChange}
                    className="mr-2"
                  />
                  <label
                    htmlFor="member"
                    className="text-sm font-medium text-gray-600"
                  >
                    Member Number
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="email"
                    name="option"
                    value="Email"
                    checked={selectedOption === "Email"}
                    onChange={handleOptionChange}
                    className="mr-2"
                  />
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-600"
                  >
                    Email
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="phone"
                    name="option"
                    value="Phone Number"
                    checked={selectedOption === "Phone Number"}
                    onChange={handleOptionChange}
                    className="mr-2"
                  />
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-gray-600"
                  >
                    Phone Number
                  </label>
                </div>
              </div>

              {/* Conditional Form Rendering */}
              {selectedOption === "Member Number" && (
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Member Number
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 mt-1 border bg-white rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-black"
                    placeholder="Enter your member number"
                  />
                </div>
              )}
              {selectedOption === "Email" && (
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 mt-1 border bg-white rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-black"
                    placeholder="Enter your email"
                  />
                </div>
              )}
              {selectedOption === "Phone Number" && (
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 mt-1 border bg-white rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-black"
                    placeholder="Enter your phone number"
                  />
                </div>
              )}
              {/* Links */}
              <div className="flex justify-end space-x-2 text-black text-sm lg:text-base mt-4">
                <Link to="/login" className="text-white no-underline">
                  <a href="#" className="hover:underline text-black">
                    Login
                  </a>
                </Link>
                <span>|</span>
                <Link to="/signup" className="text-white no-underline">
                  <a href="#" className="hover:underline text-black">
                    Sign-up
                  </a>
                </Link>
              </div>
              {/* Adjusted margin for the submit button */}
              <div className="mt-[50px]">
                <button className="w-full py-2 text-black text-lg lg:text-xl bg-yellow-500 rounded hover:bg-yellow-600">
                  SUBMIT
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* News Section */}
        <div className="mt-[60px] h-10 w-full max-w-[1000px] p-4 bg-gray-100 text-black text-lg text-left flex items-center rounded-lg shadow bg-[url('/src/assets/News_bg.png')] bg-cover bg-center">
          <img
            src="/src/assets/docuicon.png"
            alt="News icon"
            className="h-5 w-5"
          />
          <span className="font-semibold ml-2">News:</span>
          <span className="ml-2">
            Discover the latest travel updates and promotions!
          </span>
        </div>
      </div>
    </StandardLayout>
  );
};

const SelectButton: React.FC = () => {
  const bookingButton = useRef<HTMLButtonElement | null>(null);
  const manageButton = useRef<HTMLButtonElement | null>(null);

  const handleButtonClick = (buttonName: string) => {
    // Reset button states
    if (bookingButton.current)
      bookingButton.current.classList.remove("bg-primary", "text-white");
    if (manageButton.current)
      manageButton.current.classList.remove("bg-primary", "text-white");

    // Add selected state
    if (buttonName === "Booking" && bookingButton.current) {
      bookingButton.current.classList.add("bg-primary", "text-white");
    } else if (buttonName === "Manage" && manageButton.current) {
      manageButton.current.classList.add("bg-primary", "text-white");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center space-y-4 lg:space-y-0 lg:space-x-8 mb-6">
      <Link to="/booking" className="text-white no-underline">
        <button
          ref={bookingButton}
          className="w-full lg:w-[250px] h-[50px] lg:h-[60px] text-base lg:text-xl font-bold py-2 px-6 border-[#1B304F] bg-white text-[#1B304F] hover:bg-primary hover:text-white focus:bg-primary focus:text-white"
          onClick={() => handleButtonClick("Booking")}
        >
          Booking
        </button>
      </Link>
      <Link to="/manage" className="text-white no-underline">
        <button
          ref={manageButton}
          className="w-full lg:w-[250px] h-[50px] lg:h-[60px] text-base lg:text-xl font-bold py-2 px-6 border-[#1B304F] bg-white text-[#1B304F] hover:bg-primary hover:text-white focus:bg-primary focus:text-white"
          onClick={() => handleButtonClick("Manage")}
        >
          Manage
        </button>
      </Link>
    </div>
  );
};

export default ForgotPasswordPage;
