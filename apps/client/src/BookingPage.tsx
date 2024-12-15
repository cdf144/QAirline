import React, { useRef } from "react";

export const BookingPage: React.FC = () => {
  return (
    <div
      className="flex flex-col w-screen h-full relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/src/assets/Ban_sao_PLANE.jpg')",
      }}
    >
      {/* Search Box */}
      <div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg w-[800px] p-8 bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/Booking_background.png')",
        }}
      >
        {/* Tabs */}
        <SelectButton />

        {/* Flight Type Radio Buttons */}
        <div className="mb-6 mt-10 flex justify-start space-x-10">
          <div className="flex items-center">
            <input
              type="radio"
              id="one-way"
              name="flight-type"
              className="mr-2 w-6 h-6 text-xl"
            />
            <label htmlFor="one-way" className="text-gray-500 font-semibold">
              One Way
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="round-trip"
              name="flight-type"
              className="mr-2 w-6 h-6 text-xl"
            />
            <label htmlFor="round-trip" className="text-gray-500 font-semibold">
              Round Trip
            </label>
          </div>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* From Input */}
          <div>
            <p className="text-black">From</p>
            <input
              type="text"
              placeholder="Departure"
              className="w-full p-3 border rounded-lg bg-white border-[#1B304F] text-black"
            />
          </div>

          {/* To Input */}
          <div>
            <p className="text-black">To</p>
            <input
              type="text"
              placeholder="Destination"
              className="w-full p-3 border rounded-lg bg-white border-[#1B304F] text-black"
            />
          </div>

          {/* Depart Input */}
          <div className="relative">
            <p className="text-black">Depart</p>
            <div className="flex items-center">
              <input
                type="date"
                className="w-full p-3 border rounded-lg placeholder-gray-400 bg-white border-[#1B304F] text-black pr-10"
              />
              <img
                src="/src/assets/lich.png"
                alt="Calendar icon"
                className="absolute right-3 top-[50%] translate-y-[-50%] mt-3 mr-8 w-[25px] h-[25px] pointer-events-none"
              />
            </div>
          </div>

          {/* Return Input */}
          <div className="relative">
            <p className="text-black">Return</p>
            <div className="flex items-center">
              <input
                type="date"
                className="w-full p-3 border rounded-lg placeholder-gray-400 bg-white border-[#1B304F] text-black pr-10"
              />
              <img
                src="/src/assets/lich.png"
                alt="Calendar icon"
                className="absolute right-3 top-[50%] translate-y-[-50%] mt-3 mr-8 w-[25px] h-[25px] pointer-events-none"
              />
            </div>
          </div>

          {/* Passengers Input */}
          <div>
            <p className="text-black">Passengers</p>
            <input
              type="number"
              placeholder="Number of Passengers"
              className="w-full p-3 border rounded-lg bg-white border-[#1B304F] text-black"
              min="1"
            />
          </div>

          {/* Promotion Code Input */}
          <div>
            <p className="text-black">Promotion Code</p>
            <input
              type="text"
              placeholder="Enter Promo Code"
              className="w-full p-3 border rounded-lg bg-white border-[#1B304F] text-black"
            />
          </div>
        </div>

        {/* Button */}
        <div className="mt-6 flex justify-center">
          <button className="px-12 py-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 w-full max-w-[600px] h-15 text-2xl">
            FIND FLIGHT
          </button>
        </div>
      </div>

      {/* News Section */}
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

export const SelectButton: React.FC = () => {
  // Sử dụng useRef để tham chiếu các nút
  const cashButton = useRef<HTMLButtonElement | null>(null);
  const milesButton = useRef<HTMLButtonElement | null>(null);
  const cashMilesButton = useRef<HTMLButtonElement | null>(null);

  // Hàm xử lý sự kiện khi nhấn nút
  const handleButtonClick = (buttonName: string) => {
    // Reset trạng thái các nút về ban đầu
    if (cashButton.current)
      cashButton.current.classList.remove("bg-[#1B304F]", "text-white");
    if (milesButton.current)
      milesButton.current.classList.remove("bg-[#1B304F]", "text-white");
    if (cashMilesButton.current)
      cashMilesButton.current.classList.remove("bg-[#1B304F]", "text-white");

    // Đặt trạng thái đã chọn cho nút tương ứng
    if (buttonName === "Cash" && cashButton.current) {
      cashButton.current.classList.add("bg-[#1B304F]", "text-white");
    } else if (buttonName === "Miles" && milesButton.current) {
      milesButton.current.classList.add("bg-[#1B304F]", "text-white");
    } else if (buttonName === "Cash & Miles" && cashMilesButton.current) {
      cashMilesButton.current.classList.add("bg-[#1B304F]", "text-white");
    }
  };

  return (
    <div className="flex justify-center space-x-8 mb-6">
      <button
        ref={cashButton}
        className="w-[200px] font-bold py-2 px-6 border-[#1B304F] bg-white text-[#1B304F] hover:bg-[#1B304F] hover:text-white focus:bg-[#1B304F] focus:text-white"
        onClick={() => handleButtonClick("Cash")}
      >
        Cash
      </button>
      <button
        ref={milesButton}
        className="w-[200px] font-bold py-2 px-6 border-[#1B304F] bg-white text-[#1B304F] hover:bg-[#1B304F] hover:text-white focus:bg-[#1B304F] focus:text-white"
        onClick={() => handleButtonClick("Miles")}
      >
        Miles
      </button>

      <button
        ref={cashMilesButton}
        className="w-[200px] font-bold py-2 px-6 border-[#1B304F] bg-white text-[#1B304F] hover:bg-[#1B304F] hover:text-white focus:bg-[#1B304F] focus:text-white"
        onClick={() => handleButtonClick("Cash & Miles")}
      >
        Cash & Miles
      </button>
    </div>
  );
};

export default SelectButton;
