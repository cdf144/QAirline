import { Link } from "react-router-dom";
import HANPoster from "../assets/HAN.png";
import OutlinedButton from "./buttons/Outlined";

const FlightsSection: React.FC = () => {
  return (
    <div className="p-8 md:p-20 bg-[#F2F4F7]">
      <div className="text-center text-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold m-4 md:m-16">
        Browse Flights
      </div>

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
              src={HANPoster}
              alt="Recommendation"
              className="h-32 md:h-40 w-full object-cover"
            />
            <div className="p-4 text-[#1B304F] bg-white">
              <h3 className="font-bold text-sm md:text-base">HAN - SGN</h3>
              <p>Departure:</p>
              <p>Arrival:</p>
              <p>From (VND)</p>
              <p className="font-bold text-lg text-[20px] md:text-[30px] text-right mb-2 mt-2">
                8,688,668
              </p>
              <p className="text-gray-500 text-sm">Một chiều/Phổ thông</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center m-12 mt-16">
        <Link to="/">
          <OutlinedButton text="View more" size="extraLarge" />
        </Link>
      </div>
    </div>
  );
};

export default FlightsSection;
