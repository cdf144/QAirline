import React from "react";
import { Link } from "react-router-dom";
import formBg from "../assets/Booking_bg.png";
import bookingBg from "../assets/bookingbg.jpg";
import FilledButton from "../components/buttons/Filled";
import OutlinedButton from "../components/buttons/Outlined";
import StandardLayout from "../layouts/Standard";

export const LoginPage: React.FC = () => {
  return (
    <StandardLayout>
      <div
        className="flex flex-col justify-center items-center w-screen min-h-screen bg-cover bg-center px-4"
        style={{
          backgroundImage: `url(${bookingBg})`,
        }}
      >
        <div
          className="w-full max-w-screen-md mt-12 shadow-md rounded-3xl flex flex-col pt-10 bg-white bg-cover bg-center"
          style={{
            backgroundImage: `url(${formBg})`,
          }}
        >
          <div className="px-6 py-6">
            <SelectButton />

            <div className="my-4 text-lg lg:text-xl font-bold text-gray-700">
              Login
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 mt-1 border bg-white rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-black"
                  placeholder="Enter your email"
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

              <div className="flex justify-end space-x-2 text-black text-sm lg:text-base">
                <Link to="/signup" className="text-white no-underline">
                  <a href="#" className="hover:underline text-black">
                    Sign-up
                  </a>
                </Link>
                <span>|</span>
                <Link to="/forgot-password" className="text-white no-underline">
                  <a href="#" className="hover:underline text-black">
                    Forgot your password
                  </a>
                </Link>
              </div>

              <div className="flex justify-center py-2 mt-4">
                <FilledButton text="LOGIN" size="full" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
};

export const SelectButton: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8 mb-6">
      <Link to="/booking" className="text-white no-underline">
        <OutlinedButton text="Booking" size="large" color="secondary" />
      </Link>

      <Link to="/manage" className="text-white no-underline">
        <OutlinedButton text="Manage Booking" size="large" />
      </Link>
    </div>
  );
};

export default SelectButton;
