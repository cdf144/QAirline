import React from "react";

export const ManageBooking: React.FC = () => {
  return (
    <div
      className="flex justify-center items-center w-screen h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/src/assets/Ban_sao_PLANE.jpg')",
      }}
    >
      <div className="bg-white shadow-md rounded-lg p-6 w-[90%] max-w-3xl mt-[100px]">
        <div className="text-center mb-6 border h-[55px] bg-[#4BA1C6] p-4 rounded-full w-[400px] flex items-center justify-center">
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

        <div className="text-black text-xl font-medium mb-4">
          <p>Customize your flight with our wide range of options:</p>
        </div>
        <div className="flex justify-between items-center mt-6 gap-2 mb-20">
          <button className="flex-1 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600">
            Option 1
          </button>
          <button className="flex-1 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600">
            Option 2
          </button>
          <button className="flex-1 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600">
            Option 3
          </button>
          <button className="flex-1 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600">
            Option 4
          </button>
          <button className="flex-1 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600">
            Option 5
          </button>
        </div>
      </div>
      <div className="absolute left-1/2 bottom-10 w-[1000px] h-10 transform -translate-x-1/2 p-4 bg-gray-100 text-black text-lg w-[1000px] text-left pl-12 flex items-center rounded-lg shadow bg-[url('/src/assets/News_Background.png')] bg-cover bg-center">
        <img
          src="/src/assets/documenticon.png"
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
