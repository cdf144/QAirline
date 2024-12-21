import Fuse from "fuse.js";
import React, { useEffect, useState } from "react";
import Autosuggest from "react-autosuggest";
import HANPoster from "../assets/HAN.png";
import SGNPoster from "../assets/HCM.jpeg";
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
  const [flights, setFlights] = useState<FlightInfoFull[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<FlightInfoFull[]>([]);

  const flightsPerPage = 16;

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
        setFlights(data);
        console.log("Fetched flights:", data);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlights();
  }, []);

  // Fuzzy search
  const fuse = new Fuse(flights, {
    keys: [
      "departureAirportId.city",
      "destinationAirportId.city",
      "code",
      "departureAirportId.code",
      "destinationAirportId.code",
    ],
    threshold: 0.3,
  });

  const filteredFlights = searchTerm
    ? fuse.search(searchTerm).map((result) => result.item)
    : flights;

  // Pagination
  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = filteredFlights.slice(
    indexOfFirstFlight,
    indexOfLastFlight,
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Autocomplete
  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : fuse.search(inputValue).map((result) => result.item);
  };

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion: FlightInfoFull) => suggestion.code;

  const renderSuggestion = (suggestion: FlightInfoFull) => (
    <div>
      {suggestion.departureAirportId.city} ({suggestion.departureAirportId.code}
      ) - {suggestion.destinationAirportId.city} (
      {suggestion.destinationAirportId.code})
    </div>
  );

  return (
    <StandardLayout>
      <div className="p-8 md:p-20 bg-[#F2F4F7]">
        <div className="text-center text-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold m-4 md:m-16">
          Browse Flights
        </div>

        <div className="flex justify-center mb-8">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={{
              placeholder: "Search flights...",
              value: searchTerm,
              onChange: (_e, { newValue }) => setSearchTerm(newValue),
            }}
            theme={{
              container: "relative w-64 md:w-96",
              input:
                "p-2 border border-gray-500 rounded-md text-black w-64 md:w-96",
              suggestionsContainer: "absolute z-10 w-full",
              suggestionsList: "bg-white border border-gray-500 rounded-md",
              suggestion: "p-2 text-black cursor-pointer",
            }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentFlights.map((flight, index) => (
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
                <p>
                  Flight Code: <strong>{flight.code}</strong>
                </p>
                <p>
                  Departure: {new Date(flight.departureTime).toLocaleString()}
                </p>
                <p>Arrival: {new Date(flight.arrivalTime).toLocaleString()}</p>
                <p className="mt-2">From (VND)</p>
                <p className="font-bold text-lg text-[20px] md:text-[30px] text-right mb-2 mt-2">
                  {flight.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          {Array.from(
            { length: Math.ceil(filteredFlights.length / flightsPerPage) },
            (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`px-4 py-2 mx-1 border rounded ${
                  currentPage === i + 1
                    ? "bg-primary text-white"
                    : "bg-white text-primary"
                }`}
              >
                {i + 1}
              </button>
            ),
          )}
        </div>
      </div>
    </StandardLayout>
  );
};

export default FlightsPage;
