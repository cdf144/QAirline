import React, { useRef } from "react";
import { Link } from "react-router-dom";

export const SignUpPage: React.FC = () => {
  return (
    <div
      className="flex flex-col justify-center items-center w-screen min-h-screen bg-cover bg-center px-4"
      style={{
        backgroundImage: "url('src/assets/bookingbg.jpg')",
      }}
    >
      {/* Header */}
      <div
        className="w-full max-w-[600px] lg:h-[550px] lg:mt-[150px] shadow-md rounded-lg flex flex-col pt-10 bg-white bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/Booking_bg.png')",
        }}
      >
        <div className="px-6 py-6">
          {/* Navigation Buttons */}
          <SelectButton />

          {/* Login Form */}
          <h2 className="mb-4 text-lg lg:text-xl font-bold text-gray-700">
            SIGN UP
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Member number or email or phone
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 mt-1 border bg-white rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-black"
                placeholder="Enter your email or phone"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full px-3 py-2 mt-1 border rounded-md bg-white focus:outline-none focus:ring focus:ring-blue-300 text-black"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Re-fill Password
              </label>
              <div className="relative">
                <input
                  type="re-fill_password"
                  className="w-full px-3 py-2 mt-1 border rounded-md bg-white focus:outline-none focus:ring focus:ring-blue-300 text-black"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 text-black text-sm lg:text-base">
              <Link to="/login" className="text-white no-underline">
                <a href="#" className="hover:underline text-black">
                  Login
                </a>
              </Link>
              <span>|</span>
              <Link to="/forgotPassword" className="text-white no-underline">
                <a href="#" className="hover:underline text-black">
                  Forgot your password
                </a>
              </Link>
            </div>
            <button className="w-full py-2 mt-4 text-black text-lg lg:text-xl bg-yellow-500 rounded hover:bg-yellow-600">
              LOGIN
            </button>
          </form>
        </div>
      </div>

      {/* News Section */}
      <div className="mt-[45px] h-10 w-full max-w-[1000px] p-4 bg-gray-100 text-black text-lg text-left flex items-center rounded-lg shadow bg-[url('/src/assets/News_bg.png')] bg-cover bg-center">
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
  );
};
export const SelectButton: React.FC = () => {
  const bookingButton = useRef<HTMLButtonElement | null>(null);
  const manageButton = useRef<HTMLButtonElement | null>(null);

  const handleButtonClick = (buttonName: string) => {
    // Reset button states
    if (bookingButton.current)
      bookingButton.current.classList.remove("bg-[#1B304F]", "text-white");
    if (manageButton.current)
      manageButton.current.classList.remove("bg-[#1B304F]", "text-white");

    // Add selected state
    if (buttonName === "Booking" && bookingButton.current) {
      bookingButton.current.classList.add("bg-[#1B304F]", "text-white");
    } else if (buttonName === "Manage" && manageButton.current) {
      manageButton.current.classList.add("bg-[#1B304F]", "text-white");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center space-y-4 lg:space-y-0 lg:space-x-8 mb-6">
      <Link to="/booking" className="text-white no-underline">
        <button
          ref={bookingButton}
          className="w-full lg:w-[250px] h-[50px] lg:h-[60px] text-base lg:text-xl font-bold py-2 px-6 border-[#1B304F] bg-white text-[#1B304F] hover:bg-[#1B304F] hover:text-white focus:bg-[#1B304F] focus:text-white"
          onClick={() => handleButtonClick("Booking")}
        >
          Booking
        </button>
      </Link>
      <Link to="/manage" className="text-white no-underline">
        <button
          ref={manageButton}
          className="w-full lg:w-[250px] h-[50px] lg:h-[60px] text-base lg:text-xl font-bold py-2 px-6 border-[#1B304F] bg-white text-[#1B304F] hover:bg-[#1B304F] hover:text-white focus:bg-[#1B304F] focus:text-white"
          onClick={() => handleButtonClick("Manage")}
        >
          Manage
        </button>
      </Link>
    </div>
  );
};
