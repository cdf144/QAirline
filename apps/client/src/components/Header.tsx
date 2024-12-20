import React from "react";
import { Link } from "react-router-dom";
import qairlineLogo from "../assets/qairline-logo.png";
import FilledSecondaryButton from "./buttons/FilledSecondary";
import FilledTertiaryButton from "./buttons/FilledTertiary";

interface HeaderProps {
  transparent: boolean;
}

const Header: React.FC<HeaderProps> = ({ transparent }) => {
  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        transparent ? "bg-transparent" : "bg-primary shadow-md"
      }`}
    >
      <div className="container flex mx-auto justify-between items-center p-2 md:p-4">
        <Link to="/">
          <img
            src={qairlineLogo}
            alt="QAirline Logo"
            className="h-12 md:h-16"
          />
        </Link>

        <div className="top-0 right-0 px-2 flex space-x-4 z-10">
          <Link to="/login">
            <FilledTertiaryButton text="Login" />
          </Link>
          <Link to="/signup" className="text-white no-underline">
            <FilledSecondaryButton text="Sign Up" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
