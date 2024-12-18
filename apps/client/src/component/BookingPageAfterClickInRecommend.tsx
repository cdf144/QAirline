import React from "react";

export const BookingPageAfterClickInRecommend: React.FC = () => {
  return (
    <div
      className="flex justify-center items-center w-screen h-screen bg-cover bg-center px-4"
      style={{
        backgroundImage: "url('/src/assets/Bookingbg.jpg')",
      }}
    >
      {/* Container for the form */}
      <div className="w-full max-w-[650px] mt-10 lg:mt-20 bg-white rounded-lg shadow-lg p-6">
        <div className="font-semibold mb-4 text-[#1B304F] text-[32px] lg:text-[50px]">
          Book Flights
        </div>
        <form>
          {/* Row 1: Trip Type & Promotional Code */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            {/* Trip Type */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Trip Type
              </label>
              <select
                className="w-full p-2 border rounded-md text-gray-700 bg-white border-black focus:ring-2 focus:ring-blue-500"
                defaultValue="One-way"
              >
                <option>One-way</option>
                <option>Round-trip</option>
              </select>
            </div>
            {/* Promotional Code */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Promotional Code
              </label>
              <input
                type="text"
                placeholder="Promotional code"
                className="w-full p-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 bg-white border-black"
              />
            </div>
          </div>

          {/* Row 2: Passengers & Class */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            {/* Passengers */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Passengers
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 bg-white border-black"
                placeholder="Enter number of passengers"
                defaultValue="1"
                onFocus={(e) => e.target.select()}
              />
            </div>

            {/* Class */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Class
              </label>
              <select
                className="w-full p-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 bg-white border-black"
                defaultValue="Economy"
              >
                <option>Economy</option>
                <option>Business</option>
              </select>
            </div>
          </div>

          {/* Row 3: From */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              From
            </label>
            <input
              type="text"
              placeholder="Ho Chi Minh City (SGN), Vietnam"
              className="w-full p-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 bg-white border-black"
            />
          </div>

          {/* Row 4: To */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              To
            </label>
            <input
              type="text"
              placeholder="Hanoi (HAN), Vietnam"
              className="w-full p-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 bg-white border-black"
            />
          </div>

          {/* Row 5: Departure & Return */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            {/* Departure */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Departure
              </label>
              <input
                type="date"
                className="w-full p-2 pr-10 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 bg-white border-black"
              />
              <span className="absolute inset-y-0 right-2 flex items-center">
                <img
                  src="/src/assets/lich.png"
                  alt="Calendar Icon"
                  className="h-5 w-5"
                />
              </span>
            </div>

            {/* Return */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Return
              </label>
              <input
                type="date"
                className="w-full p-2 pr-10 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 bg-white border-black"
                disabled
              />
              <span className="absolute inset-y-0 right-2 flex items-center">
                <img
                  src="/src/assets/lich.png"
                  alt="Disabled Icon"
                  className="h-5 w-5"
                />
              </span>
            </div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 rounded-md focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            SEARCH
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPageAfterClickInRecommend;
