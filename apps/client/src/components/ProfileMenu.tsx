import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const ProfileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="flex items-center px-3 py-2 bg-white text-neutral-700 rounded-full focus:outline-none"
      >
        <span className="mr-2 font-bold">Profile</span>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
          <Link
            to="/profile"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            View Profile
          </Link>
          <Link
            to="/tickets"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            View Tickets
          </Link>
          <Link
            to="/admin"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            Admin Page
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
