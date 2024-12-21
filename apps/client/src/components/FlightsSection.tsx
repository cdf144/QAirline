import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HANPoster from "../assets/HAN.png";
import SGNPoster from "../assets/HCM.jpeg";
import OutlinedButton from "./buttons/Outlined";

interface FlightInfoFull {
  code: string;
  aircraftId: {
    manufacturer: string;
    model: string;
  };
  departureAirportId: {
    code: string;
    country: string;
    city: string;
  };
  destinationAirportId: {
    code: string;
    country: string;
    city: string;
  };
  departureTime: Date;
  arrivalTime: Date;
  price: string;
}

const FlightsSection: React.FC = () => {
  const [flights, setFlights] = useState<FlightInfoFull[]>([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch(
          new URL(
            "/v1/flight/full",
            import.meta.env.VITE_API_BASE_URL,
          ).toString(),
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch flights");
        }

        const data = await response.json();
        setFlights(data.slice(0, 8));
        console.log("Fetched flights:", data);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlights();
  }, []);

  return (
    <div className="p-8 md:p-20 bg-[#F2F4F7]">
      <div className="text-center text-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold m-4 md:m-16">
        Browse Flights
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {flights.map((flight, index) => (
          <div
            key={index}
            className={`border rounded-lg shadow-lg overflow-hidden ${
              index % 2 === 1
                ? "border-tertiary border-2"
                : "border-secondary border-2"
            }`}
          >
            <img
              src={
                flight.destinationAirportId.code === "HAN"
                  ? HANPoster
                  : SGNPoster
              }
              alt="Recommendation"
              className="h-32 md:h-40 w-full object-cover"
            />
            <div className="p-4 text-[#1B304F] bg-white">
              <h3 className="font-bold text-sm md:text-base">
                {flight.departureAirportId.city} (
                {flight.departureAirportId.code}) -{" "}
                {flight.destinationAirportId.city} (
                {flight.destinationAirportId.code})
              </h3>
              <p>Departure: {flight.departureTime.toLocaleString()}</p>
              <p>Arrival: {flight.arrivalTime.toLocaleString()}</p>
              <p className="mt-2">From (VND)</p>
              <p className="font-bold text-lg text-[20px] md:text-[30px] text-right mb-2 mt-2">
                {flight.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center m-12 mt-16">
        <Link to="/flights">
          <OutlinedButton text="View more" size="extraLarge" />
        </Link>
      </div>
    </div>
  );
};

export default FlightsSection;
