import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <Link to="/" className="text-xl font-bold">
            QAirline
          </Link>
        </div>

        <div className="flex space-x-4 mb-4 md:mb-0">
          <Link to="/about" className="hover:underline">
            About Us
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
          <Link to="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
        </div>

        <div className="ml-0 md:ml-20"></div>
      </div>

      <div className="container mx-auto text-center mt-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} QAirline. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
