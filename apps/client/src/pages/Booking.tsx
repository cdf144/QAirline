import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FilledButton from "../components/buttons/Filled";
import OutlinedButton from "../components/buttons/Outlined";
import { useAuth } from "../context/AuthContext";
import StandardLayout from "../layouts/Standard";

interface BookingInfo {
  flightCode: string;
  price: string;
}

interface TicketInfo {
  seat: string;
  classType: string;
}

export const BookingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flightCode, price } = location.state as BookingInfo;
  const { email } = useAuth();
  const [tickets, setTickets] = useState<TicketInfo[]>([]);
  const [seat, setSeat] = useState("");
  const [classType, setClassType] = useState("economy");
  const [loading, setLoading] = useState(false);

  const addTicket = () => {
    setTickets([...tickets, { seat, classType }]);
    setSeat("");
  };

  const handleBooking = async () => {
    setLoading(true);

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

      const flightResponse = await fetch(
        new URL(
          `/v1/flight/${flightCode}`,
          import.meta.env.VITE_API_BASE_URL,
        ).toString(),
        {
          method: "GET",
          credentials: "include",
        },
      );

      if (!flightResponse.ok) {
        throw new Error("Failed to fetch flight");
      }

      const flightData = await flightResponse.json();
      const flightId = flightData._id;

      const bookingResponse = await fetch(
        new URL("/v1/booking", import.meta.env.VITE_API_BASE_URL).toString(),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            classType,
          }),
          credentials: "include",
        },
      );

      if (!bookingResponse.ok) {
        throw new Error("Failed to create booking");
      }

      const bookingData = await bookingResponse.json();
      const bookingId = bookingData._id;

      for (const ticket of tickets) {
        await fetch(
          new URL("/v1/ticket", import.meta.env.VITE_API_BASE_URL).toString(),
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              bookingId,
              tripType: "oneway",
              outboundFlightId: flightId,
              seat: ticket.seat,
              totalPrice: price,
            }),
            credentials: "include",
          },
        );
      }

      navigate("/");
    } catch (error) {
      console.error("Error creating booking and tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StandardLayout>
      <div className="flex flex-col justify-center items-center w-screen min-h-screen px-4 text-black">
        <h1 className="text-3xl font-bold mb-4">Booking</h1>
        <p className="text-xl mb-2">Flight Code: {flightCode}</p>
        <p className="text-xl mb-2">Price: {price}</p>
        <p className="text-xl mb-2">User Email: {email}</p>

        <div className="flex flex-col items-center mb-4">
          <input
            type="text"
            placeholder="Seat"
            value={seat}
            onChange={(e) => setSeat(e.target.value)}
            className="p-2 border border-gray-300 rounded mb-2"
          />
          <select
            value={classType}
            onChange={(e) => setClassType(e.target.value)}
            className="p-2 border border-gray-300 rounded mb-2"
          >
            <option value="economy">Economy</option>
            <option value="business">Business</option>
          </select>
          <OutlinedButton text="Add Ticket" onClick={addTicket} />
        </div>

        <div className="mb-4">
          {tickets.map((ticket, index) => (
            <div
              key={index}
              className="p-2 border border-gray-300 rounded mb-2"
            >
              <p>Seat: {ticket.seat}</p>
              <p>Class Type: {ticket.classType}</p>
            </div>
          ))}
        </div>

        <FilledButton
          text="Confirm Booking"
          onClick={handleBooking}
          size="large"
          loading={loading}
        />
      </div>
    </StandardLayout>
  );
};

export default BookingPage;
