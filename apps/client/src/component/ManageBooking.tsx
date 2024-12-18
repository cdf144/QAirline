import React from "react";

export const ManageBooking: React.FC = () => {
  return (
    <div
      className="flex flex-col justify-center items-center w-screen min-h-screen bg-cover bg-center px-4"
      style={{
        backgroundImage: "url('/src/assets/bookingbg.jpg')",
      }}
    >
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl mt-[250px]">
        <div className="text-center mb-6 border h-[55px] bg-[#4BA1C6] p-4 rounded-full w-full max-w-[400px] mx-auto flex items-center justify-center">
          <h2 className="text-lg font-semibold text-white">
            Reservation Code/Ticket Number
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-[60px]">
          <input
            type="text"
            placeholder="Reservation Code/Ticket Number"
            className="flex-1 border border-black bg-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="flex-1 border border-black bg-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="bg-yellow-400 text-black font-semibold py-2 px-4 rounded-md hover:bg-yellow-500">
            SEARCH
          </button>
        </div>

        <div className="text-black text-xl font-medium mb-4 text-center md:text-left">
          <p>Customize your flight with our wide range of options:</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-6 mb-20">
          <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600">
            Option 1
          </button>
          <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600">
            Option 2
          </button>
          <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600">
            Option 3
          </button>
          <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600">
            Option 4
          </button>
          <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600">
            Option 5
          </button>
        </div>
      </div>
      <div className="mt-[80px] h-10 w-full max-w-[1000px] p-4 bg-gray-100 text-black text-lg text-left flex items-center rounded-lg shadow bg-[url('/src/assets/News_bg.png')] bg-cover bg-center">
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

export default ManageBooking;
