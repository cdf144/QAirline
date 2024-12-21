import React, { useEffect, useState } from "react";
import OutlinedButton from "../components/buttons/Outlined";
import { useAuth } from "../context/AuthContext";
import StandardLayout from "../layouts/Standard";

interface Booking {
  _id: string;
  code: string;
  classType: string;
  createdAt: string;
  tickets: Ticket[];
}

interface Ticket {
  seat: string;
  outboundFlightId: Flight;
  returnFlight?: Flight;
}

interface Flight {
  code: string;
  departureAirportId: Airport;
  destinationAirportId: Airport;
  departureTime: string;
  arrivalTime: string;
}

interface Airport {
  code: string;
  country: string;
  city: string;
}

export const ManageBookingPage: React.FC = () => {
  const { email } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userResponse = await fetch(
          new URL(
            `/v1/user/${email}`,
            import.meta.env.VITE_API_BASE_URL,
          ).toString(),
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (!userResponse.ok) {
          throw new Error("Failed to fetch user");
        }

        const userData = await userResponse.json();
        const userId = userData._id;

        const bookingsResponse = await fetch(
          new URL(
            `/v1/booking/user/${userId}`,
            import.meta.env.VITE_API_BASE_URL,
          ).toString(),
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (!bookingsResponse.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const bookingsData = await bookingsResponse.json();
        setBookings(bookingsData);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [email]);

  const handleCancelBooking = async (bookingId: string) => {
    try {
      const response = await fetch(
        new URL(
          `/v1/booking/user/${bookingId}`,
          import.meta.env.VITE_API_BASE_URL,
        ).toString(),
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      setBookings(bookings.filter((booking) => booking._id !== bookingId));
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
      console.error("Error cancelling booking:", error);
    }
  };

  return (
    <StandardLayout>
      <div className="flex flex-col justify-start items-center w-screen min-h-screen px-4 text-black pt-32">
        <h1 className="text-3xl font-bold mb-4">Manage Bookings</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="p-4 border border-gray-300 rounded mb-4 w-11/12 md:w-2/3"
          >
            <p>Booking Code: {booking.code}</p>
            <p>Class Type: {booking.classType}</p>
            <p>Created At: {new Date(booking.createdAt).toLocaleString()}</p>
            <h2 className="text-xl font-bold mt-2">Tickets:</h2>
            {booking.tickets.map((ticket, index) => (
              <div key={index} className="mb-2">
                <p>Seat: {ticket.seat}</p>
                <p>Outbound Flight: {ticket.outboundFlightId.code}</p>
                <p>
                  {ticket.outboundFlightId.departureAirportId.city} (
                  {ticket.outboundFlightId.departureAirportId.code}) -{" "}
                  {ticket.outboundFlightId.destinationAirportId.city} (
                  {ticket.outboundFlightId.destinationAirportId.code})
                </p>
                <p>
                  Departure:{" "}
                  {new Date(
                    ticket.outboundFlightId.departureTime,
                  ).toLocaleString()}
                </p>
                <p>
                  Arrival:{" "}
                  {new Date(
                    ticket.outboundFlightId.arrivalTime,
                  ).toLocaleString()}
                </p>
                {ticket.returnFlight && (
                  <>
                    <p>Return Flight: {ticket.returnFlight.code}</p>
                    <p>
                      {ticket.returnFlight.departureAirportId.city} (
                      {ticket.returnFlight.departureAirportId.code}) -{" "}
                      {ticket.returnFlight.destinationAirportId.city} (
                      {ticket.returnFlight.destinationAirportId.code})
                    </p>
                    <p>
                      Departure:{" "}
                      {new Date(
                        ticket.returnFlight.departureTime,
                      ).toLocaleString()}
                    </p>
                    <p>
                      Arrival:{" "}
                      {new Date(
                        ticket.returnFlight.arrivalTime,
                      ).toLocaleString()}
                    </p>
                  </>
                )}
              </div>
            ))}
            <OutlinedButton
              text="Cancel Booking"
              onClick={() => handleCancelBooking(booking._id)}
            />
          </div>
        ))}
      </div>
    </StandardLayout>
  );
};

export default ManageBookingPage;
