import React from "react";
import StandardLayout from "../layouts/Standard";

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

export const FlightsPage: React.FC = () => {
  return (
    <StandardLayout>
      <div className="flex flex-col justify-center items-center w-screen min-h-screen px-4 text-9xl text-black">
        Flights
      </div>
    </StandardLayout>
  );
};

export default FlightsPage;
