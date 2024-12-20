import React from "react";
import { Link } from "react-router-dom";
import qairlineLogo from "../assets/qairline-logo.png";
import { useAuth } from "../context/AuthContext";
import FilledButton from "./buttons/Filled";

interface HeaderProps {
  transparent: boolean;
}

const Header: React.FC<HeaderProps> = ({ transparent }) => {
  const { isAuthenticated } = useAuth();

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors ${
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

        {isAuthenticated ? <ProfileButton /> : <LoginSignupButtons />}
      </div>
    </header>
  );
};

const LoginSignupButtons: React.FC = () => {
  return (
    <div className="top-0 right-0 px-2 flex space-x-4 z-10">
      <Link to="/login">
        <FilledButton text="Login" color="white" textColor="neutral-700" />
      </Link>
      <Link to="/signup" className="text-white no-underline">
        <FilledButton text="Sign Up" color="secondary" />
      </Link>
    </div>
  );
};

const ProfileButton: React.FC = () => {
  return (
    <Link to="/profile">
      <FilledButton text="Profile" color="white" textColor="neutral-700" />
    </Link>
  );
};

export default Header;
