const FAQSection: React.FC = () => {
  return (
    <div className="p-4 md:p-12 bg-gray-100">
      <h2 className="text-center font-semibold mb-[50px] md:mb-[100px] text-[#1B304F] text-2xl md:text-[50px]">
        Các câu hỏi thường gặp
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
          Xem thêm
        </button>
        <button className="px-4 md:px-6 py-2 w-40 sm:w-[200px] md:w-[250px] h-[50px] sm:h-[60px] md:h-[80px] bg-white text-[#1B304F] rounded-full border-[#1B304F] hover:bg-blue-100 text-sm sm:text-lg md:text-[35px] mt-[20px] sm:mt-[50px] md:mt-[100px]">
          Liên hệ
        </button>
      </div>
    </div>
  );
};

export default FAQSection;
