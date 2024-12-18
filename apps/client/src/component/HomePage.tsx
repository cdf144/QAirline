import React from "react";
import { Link } from "react-router-dom";

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-full">
      {/* Section 1: Header & Hero */}
      <div
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/homebg.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {/* Header */}
        <div className="absolute top-0 right-0 flex p-6 space-x-4">
          <Link to="/login">
            <button className="px-6 py-2 w-32 md:w-40 bg-[#1B304F] text-white rounded-full border-white">
              Login
            </button>
          </Link>
          <Link to="/signUP" className="text-white no-underline">
            <button className="px-6 py-2 w-32 md:w-40 bg-white text-[#1B304F] rounded-full border-blue-800">
              Sign Up
            </button>
          </Link>
        </div>

        {/* Hero Content */}
        <div className="flex flex-col justify-center h-full text-center text-white px-4">
          <div className="relative flex items-start justify-start pl-4 md:pl-10 pt-20">
            <div className="text-[#1B304F] max-w-3xl">
              <h1 className="text-xl md:text-4xl lg:text-5xl font-bold mb-6 ml-4 md:ml-[20px] mt-[100px] md:mt-[150px]">
                Safe skies & smart prices
              </h1>
              <h1 className="text-xl md:text-4xl lg:text-5xl font-bold mb-6 ml-4 md:ml-[20px]">
                your perfect choice to
              </h1>
              <h1 className="text-xl md:text-4xl lg:text-5xl font-bold ml-4 md:ml-[20px]">
                discover the world
              </h1>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-5">
            <Link to="/booking" className="text-white no-underline">
              <button className="px-6 py-2 w-full md:w-[300px] h-[60px] ml-0 md:ml-[50px] mt-[50px] md:mt-[100px] bg-[#1B304F] text-white text-lg md:text-[30px] rounded-full shadow hover:bg-opacity-90 border-white">
                Booking
              </button>
            </Link>
            <Link to="/manage" className="text-white no-underline">
              <button className="px-6 py-2 w-full md:w-[300px] h-[60px] ml-0 md:ml-[50px] mt-[50px] md:mt-[100px] bg-white text-[#1B304F] text-lg md:text-[30px] rounded-full shadow hover:bg-opacity-90 border-blue-800">
                Manager Booking
              </button>
            </Link>
          </div>

          {/* News Section */}
          <div
            className="mt-[50px] md:mt-[100px] mx-auto p-4 bg-gray-100 text-black text-base md:text-lg w-full md:w-[1000px] h-auto md:h-[40px] text-left pl-4 md:pl-10 flex items-center bg-cover bg-center rounded-lg"
            style={{
              backgroundImage: "url('/src/assets/News_bg.png')",
            }}
          >
            <img
              src="/src/assets/news.png"
              alt="News icon"
              className="h-5 w-5 mr-1"
            />
            <span className="font-semibold">News:</span>
          </div>
        </div>
      </div>

      {/* Section 3: Recommendations */}
      <div className="p-8 md:p-20 bg-[#F2F4F7]">
        <h2 className="text-center font-semibold text-2xl md:text-[50px] text-[#1B304F] mb-4 md:mb-[100px]">
          RECOMMEND FOR YOU
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className={`border rounded-lg shadow-lg overflow-hidden ${
                index % 2 === 1
                  ? "border-purple-500 border-2"
                  : "border-blue-500 border-2"
              }`}
            >
              <img
                src="/src/assets/HCM.jpeg"
                alt="Recommendation"
                className="h-32 md:h-40 w-full object-cover"
              />
              <div className="p-4 text-[#1B304F] bg-white">
                <h3 className="font-bold text-sm md:text-base">
                  Từ Hà Nội (HAN) đến Thành phố Hồ Chí Minh (SGN)
                </h3>
                <p>Ngày đi: ab/cd/ef</p>
                <p>Chỉ từ (VND)</p>
                <p className="font-bold text-lg text-[20px] md:text-[30px] text-right mb-2 mt-2">
                  8,688,668
                </p>
                <p className="text-gray-500 text-sm">Một chiều/Phổ thông</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <button
            className="px-10 py-4 bg-white border-2 border-[#7FF4E1] text-[#1B304F] font-bold text-lg md:text-2xl rounded-lg hover:bg-green-100 shadow-[0_0_5px_#6ee7b7] mt-[30px] md:mt-[60px]"
            style={{
              textShadow: "0 0 3px #6ee7b7, 0 0 10px #6ee7b7",
            }}
          >
            VIEW MORE
          </button>
        </div>
      </div>

      {/* Section 4: FAQs */}
      <div className="p-4 md:p-12 bg-gray-100">
        <h2 className="text-center font-semibold mb-[50px] md:mb-[100px] text-[#1B304F] text-2xl md:text-[50px]">
          Explore Our FAQs
        </h2>
        <div className="flex flex-wrap justify-center gap-6 mt-6 md:mt-12">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 bg-[#91CDE4] rounded-lg shadow-md w-[200px] md:w-[300px]"
            >
              <div className="bg-white p-4 rounded-full mt-4">
                <img
                  src="/src/assets/react.svg"
                  alt="Q&A"
                  className="h-16 md:h-20 w-16 md:w-20"
                />
              </div>
              <p className="mt-2 font-bold text-lg md:text-[50px] mt-[50px] md:mt-[100px] mb-[50px] md:mb-[100px]">
                Q&A {index + 1}
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center space-x-4 mt-6">
          <button className="px-4 md:px-6 py-2 w-40 md:w-[250px] h-[60px] md:h-[80px] bg-[#1B304F] text-white rounded-full border-white hover:bg-blue-900 text-sm md:text-[35px] mt-[50px] md:mt-[100px]">
            View More
          </button>
          <button className="px-4 md:px-6 py-2 w-40 md:w-[250px] h-[60px] md:h-[80px] bg-white text-[#1B304F] rounded-full border-[#1B304F] hover:bg-blue-100 text-sm md:text-[35px] mt-[50px] md:mt-[100px]">
            See All
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
