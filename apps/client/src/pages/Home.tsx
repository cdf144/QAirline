import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import StandardLayout from "../layouts/Standard";

export const HomePage: React.FC = () => {
  const [isHeaderTransparent, setIsHeaderTransparent] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const firstSectionHeight =
        document.getElementById("hero-section")?.offsetHeight || 0;
      setIsHeaderTransparent(scrollPosition < firstSectionHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <StandardLayout isHeaderTransparent={isHeaderTransparent}>
      <HeroSection />

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
          {/* FAQ Item 1 */}
          <div className="flex flex-col items-center mr-10 p-4 bg-[#91CDE4] rounded-lg shadow-md w-[150px] sm:w-[200px] md:w-[300px]">
            <div className="bg-white p-4 rounded-full mt-4">
              <img
                src="/src/assets/react.svg"
                alt="Q&A 1"
                className="h-12 sm:h-16 md:h-20 w-12 sm:w-16 md:w-20"
              />
            </div>
            <p className="mt-2 font-bold text-sm sm:text-lg md:text-[50px] sm:mt-[50px] md:mt-[100px] mb-[20px] sm:mb-[50px] md:mb-[100px]">
              Q&A 1
            </p>
          </div>

          {/* FAQ Item 2 */}
          <div className="flex flex-col items-center mr-10 p-4 bg-[#91CDE4] rounded-lg shadow-md w-[150px] sm:w-[200px] md:w-[300px]">
            <div className="bg-white p-4 rounded-full mt-4">
              <img
                src="/src/assets/react.svg"
                alt="Q&A 2"
                className="h-12 sm:h-16 md:h-20 w-12 sm:w-16 md:w-20"
              />
            </div>
            <p className="mt-2 font-bold mr-10 text-sm sm:text-lg md:text-[50px] sm:mt-[50px] md:mt-[100px] mb-[20px] sm:mb-[50px] md:mb-[100px]">
              Q&A 2
            </p>
          </div>

          {/* FAQ Item 3 */}
          <div className="flex flex-col items-center p-4 bg-[#91CDE4] rounded-lg shadow-md w-[150px] sm:w-[200px] md:w-[300px]">
            <div className="bg-white p-4 rounded-full mt-4">
              <img
                src="/src/assets/react.svg"
                alt="Q&A 3"
                className="h-12 sm:h-16 md:h-20 w-12 sm:w-16 md:w-20"
              />
            </div>
            <p className="mt-2 font-bold text-sm sm:text-lg md:text-[50px] sm:mt-[50px] md:mt-[100px] mb-[20px] sm:mb-[50px] md:mb-[100px]">
              Q&A 3
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <button className="px-4 md:px-6 py-2 w-40 sm:w-[200px] md:w-[250px] h-[50px] sm:h-[60px] md:h-[80px] bg-primary text-white rounded-full border-white hover:bg-blue-900 text-sm sm:text-lg md:text-[35px] mt-[20px] sm:mt-[50px] md:mt-[100px]">
            View More
          </button>
          <button className="px-4 md:px-6 py-2 w-40 sm:w-[200px] md:w-[250px] h-[50px] sm:h-[60px] md:h-[80px] bg-white text-[#1B304F] rounded-full border-[#1B304F] hover:bg-blue-100 text-sm sm:text-lg md:text-[35px] mt-[20px] sm:mt-[50px] md:mt-[100px]">
            See All
          </button>
        </div>
      </div>
    </StandardLayout>
  );
};

export default HomePage;