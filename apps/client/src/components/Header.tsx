import React from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
  transparent: boolean;
}

const Header: React.FC<HeaderProps> = ({ transparent }) => {
  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        transparent ? "bg-transparent" : "bg-[#AEBBCF] shadow-md"
      }`}
    >
      <div className="container flex mx-auto justify-between items-center p-2 md:p-4">
        <Link to="/">
          <img
            src="/src/assets/qairline.png"
            alt="QAirline Logo"
            className="h-12 md:h-16"
          />
        </Link>

        <div className="top-0 right-0 px-2 flex space-x-4 z-10">
          <Link to="/login">
            <button className="w-24 md:w-36 h-10 md:h-10 bg-[#1B304F] text-white rounded-full border-white flex items-center justify-center whitespace-nowrap">
              Login
            </button>
          </Link>
          <Link to="/signup" className="text-white no-underline">
            <button className="w-24 md:w-36 h-10 md:h-10 bg-white text-[#1B304F] rounded-full border-blue-800 flex items-center justify-center whitespace-nowrap">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
