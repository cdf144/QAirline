import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bookingIcon from "../assets/booking.png";
import bookingBg from "../assets/bookingbg.jpg";
import delayIcon from "../assets/delay.png";
import flightIcon from "../assets/flight.png";
import noteIcon from "../assets/note.png";
import planeIcon from "../assets/plane.png";
import FilledButton from "../components/buttons/Filled";

export const Sidebar: React.FC<{
  isCollapsed: boolean;
  selectedForm: string;
  setSelectedForm: (form: string) => void;
}> = ({ isCollapsed, selectedForm, setSelectedForm }) => {
  const buttons = [
    {
      id: "post-blog",
      label: "Post Blog",
      icon: noteIcon,
    },
    {
      id: "create-flight",
      label: "Create Flight",
      icon: flightIcon,
    },
    {
      id: "booking-stats",
      label: "Booking Stats",
      icon: bookingIcon,
    },
    {
      id: "register-aircraft",
      label: "Register Aircraft",
      icon: planeIcon,
    },
    { id: "change-time", label: "Change Time", icon: delayIcon },
  ];

  return (
    <div
      className={`relative flex flex-col ${
        isCollapsed ? "w-24" : "w-2/12"
      } min-h-screen bg-[#6CADC5] shadow-md transition-all duration-300`}
    >
      <div className={`p-6 bg-white ${isCollapsed ? "text-center" : ""}`}>
        <h2
          className={`text-lg font-bold text-primary ${
            isCollapsed ? "hidden" : "block"
          }`}
        >
          Dashboard
        </h2>
      </div>

      <nav className="flex flex-col space-y-4 p-4">
        {buttons.map((button) => (
          <button
            key={button.id}
            onClick={() => setSelectedForm(button.id)}
            className={`flex items-center ${
              isCollapsed ? "justify-center" : ""
            } w-full px-4 py-2 rounded-3xl shadow-md transition-colors whitespace-nowrap overflow-hidden ${
              selectedForm === button.id
                ? "bg-primary text-white"
                : "bg-white text-gray-600 hover:bg-primary hover:text-white"
            }`}
          >
            <img
              src={button.icon}
              alt={`${button.label} Icon`}
              className="w-7 h-7"
            />
            {!isCollapsed && (
              <span className="ml-2 text-sm font-medium">{button.label}</span>
            )}
          </button>
        ))}

        <Link
          to="/"
          className={`flex items-center whitespace-nowrap overflow-hidden ${
            isCollapsed ? "justify-center" : ""
          } w-full mt-4 px-4 py-2 bg-gray-300 text-gray-600 rounded-3xl shadow-md hover:bg-gray-400 focus:outline-none`}
        >
          ◀ Home
        </Link>
      </nav>
    </div>
  );
};

interface FormLayoutProps {
  children: React.ReactNode;
  submitText: string;
  title: string;
  className?: string;
  onSubmit: (event: React.FormEvent) => void;
}

const FormLayout: React.FC<FormLayoutProps> = ({
  children,
  submitText,
  title,
  className,
  onSubmit,
}) => (
  <div
    className={`bg-white p-8 rounded-md shadow-lg w-11/12 md:w-8/12 space-y-6 ${className}`}
  >
    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
      {title}
    </h1>
    <form onSubmit={onSubmit} className="space-y-4">
      {children}
      <FilledButton text={submitText} size="full" />
    </form>
  </div>
);

const PostBlogForm: React.FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (endpoint: string, method: string, body?: any) => Promise<any>;
}> = ({ onSubmit }) => {
  const [notificationBody, setNotificationBody] = useState("");
  const [newsBody, setNewsBody] = useState("");
  const [promotionBody, setPromotionBody] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const blogPosts = [
      {
        title: "Notification",
        body: notificationBody || null,
        category: "notification",
      },
      { title: "News", body: newsBody || null, category: "news" },
      {
        title: "Promotion",
        body: promotionBody || null,
        category: "promotion",
      },
    ];

    for (const post of blogPosts) {
      if (post.body) {
        await onSubmit("/v1/blog", "POST", post);
      }
    }
  };

  return (
    <FormLayout
      submitText="Post"
      title="Post Information"
      onSubmit={handleSubmit}
      className="mt-12"
    >
      <input
        type="text"
        placeholder="Notification"
        className="w-full p-3 border border-black rounded-md bg-white text-black focus:outline-none"
        value={notificationBody}
        onChange={(event) => {
          setNotificationBody(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="News"
        className="w-full p-3 border border-black rounded-md bg-white text-black focus:outline-none"
        value={newsBody}
        onChange={(event) => {
          setNewsBody(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Promotion"
        className="w-full p-3 border border-black rounded-md bg-white text-black focus:outline-none"
        value={promotionBody}
        onChange={(event) => {
          setPromotionBody(event.target.value);
        }}
      />
    </FormLayout>
  );
};

const CreateFlightForm: React.FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (endpoint: string, method: string, body?: any) => Promise<any>;
}> = ({ onSubmit }) => {
  const [aircraftId, setAircraftId] = useState("");
  const [departureAirportId, setDepartureAirportId] = useState("");
  const [destinationAirportId, setDestinationAirportId] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await onSubmit("/v1/flight", "POST", {
      aircraftId,
      departureAirportId,
      destinationAirportId,
      departureTime,
      arrivalTime,
      status: status ? status : "scheduled",
      price,
    });
  };

  return (
    <FormLayout
      submitText="Submit"
      title="Create Flight"
      onSubmit={handleSubmit}
      className="mt-12"
    >
      <input
        type="text"
        placeholder="Aircraft ID"
        className="w-full p-3 border border-black rounded-md bg-white text-black focus:outline-none"
        value={aircraftId}
        onChange={(event) => {
          setAircraftId(event.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Departure Airport ID"
        className="w-full p-3 border border-black rounded-md bg-white text-black focus:outline-none"
        value={departureAirportId}
        onChange={(event) => {
          setDepartureAirportId(event.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Destination Airport ID"
        className="w-full p-3 border border-black rounded-md bg-white text-black focus:outline-none"
        value={destinationAirportId}
        onChange={(event) => {
          setDestinationAirportId(event.target.value);
        }}
      />

      <input
        type="datetime-local"
        className="w-full p-3 pr-5 border border-black rounded-md bg-white text-black focus:outline-none"
        value={departureTime}
        onChange={(event) => {
          setDepartureTime(event.target.value);
        }}
      />

      <input
        type="datetime-local"
        className="w-full p-3 pr-5 border border-black rounded-md bg-white text-black focus:outline-none"
        value={arrivalTime}
        onChange={(event) => {
          setArrivalTime(event.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Status"
        className="w-full p-3 border border-black rounded-md bg-white text-black focus:outline-none"
        value={status}
        onChange={(event) => {
          setStatus(event.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Price"
        className="w-full p-3 border border-black rounded-md bg-white text-black focus:outline-none"
        value={price}
        onChange={(event) => {
          setPrice(event.target.value);
        }}
      />
    </FormLayout>
  );
};

const BookingStatsPage = () => (
  <div className="space-y-5 w-11/12 md:w-8/12">
    <div className="flex gap-4 bg-white p-4 rounded-3xl shadow-lg max-w-3xl">
      <div className="flex w-full items-center justify-between p-4 bg-green-100 rounded-2xl h-24">
        <span className="text-4xl font-bold text-green-600">5 Lakhs</span>
        <span className="text-gray-600 text-lg">Today's Booking</span>
      </div>
    </div>

    <div className="flex gap-4 bg-white p-4 rounded-3xl shadow-lg max-w-3xl">
      <div className="flex w-full items-center justify-between p-4 bg-blue-100 rounded-lg h-24">
        <span className="text-4xl font-bold text-blue-600">60 Nos</span>
        <span className="text-gray-600 text-lg">Today's Fly Flight</span>
      </div>
    </div>

    <div className="flex gap-4 bg-white p-4 rounded-3xl shadow-lg max-w-3xl">
      <div className="flex w-full items-center justify-between p-4 bg-red-100 rounded-lg h-24">
        <span className="text-4xl font-bold text-red-600">10 Nos</span>
        <span className="text-gray-600 text-lg">30 day's Booking</span>
      </div>
    </div>

    <div className="flex gap-4 bg-white p-4 rounded-3xl shadow-lg max-w-3xl">
      <div className="flex w-full items-center justify-between p-4 bg-yellow-100 rounded-lg h-24">
        <span className="text-4xl font-bold text-yellow-600">90 Per</span>
        <span className="text-gray-600 text-lg">Proceeds</span>
      </div>
    </div>
  </div>
);

const RegisterAircraftForm: React.FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (endpoint: string, method: string, body?: any) => Promise<any>;
}> = ({ onSubmit }) => {
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [economySeat, setEconomySeats] = useState(0);
  const [businessSeat, setBusinessSeats] = useState(0);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await onSubmit("/v1/aircraft", "POST", {
      manufacturer: manufacturer || null,
      model: model || null,
      businessSeat: businessSeat || null,
      economySeat: economySeat || null,
    });
  };

  return (
    <FormLayout
      submitText="Submit"
      title="Register Aircraft"
      onSubmit={handleSubmit}
      className="mt-12"
    >
      <input
        type="text"
        placeholder="Manufacturer"
        className="w-full p-3 border border-black rounded-md bg-white text-black focus:outline-none"
        value={manufacturer}
        onChange={(event) => {
          setManufacturer(event.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Model"
        className="w-full p-3 border border-black rounded-md bg-white text-black focus:outline-none"
        value={model}
        onChange={(event) => {
          setModel(event.target.value);
        }}
      />

      <input
        type="number"
        placeholder="Economy Seats"
        className="w-full p-3 border border-black rounded-md bg-white text-black focus:outline-none"
        value={economySeat}
        onChange={(event) => {
          setEconomySeats(parseInt(event.target.value));
        }}
      />

      <input
        type="number"
        placeholder="Business Seats"
        className="w-full p-3 border border-black rounded-md bg-white text-black focus:outline-none"
        value={businessSeat}
        onChange={(event) => {
          setBusinessSeats(parseInt(event.target.value));
        }}
      />
    </FormLayout>
  );
};

const ChangeTimeForm: React.FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (endpoint: string, method: string, body?: any) => Promise<any>;
}> = ({ onSubmit }) => {
  const [flightCode, setFlightCode] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(flightCode, departureTime, arrivalTime);
    await onSubmit(`/v1/flight/${flightCode}`, "PATCH", {
      departureTime: departureTime || null,
      arrivalTime: arrivalTime || null,
    });
  };

  return (
    <FormLayout
      submitText="Update"
      title="Change Time"
      onSubmit={handleSubmit}
      className="mt-12"
    >
      <input
        type="text"
        placeholder="Flight Code"
        className="w-full p-3 border border-black rounded-md bg-white text-black focus:outline-none"
        value={flightCode}
        onChange={(event) => {
          setFlightCode(event.target.value);
        }}
      />

      <input
        type="datetime-local"
        placeholder="New Departure Time"
        className="w-full p-3 pr-5 border border-black rounded-md bg-white text-black focus:outline-none"
        value={departureTime}
        onChange={(event) => {
          setDepartureTime(event.target.value);
        }}
      />

      <input
        type="datetime-local"
        placeholder="New Arrival Time"
        className="w-full p-3 pr-5 border border-black rounded-md bg-white text-black focus:outline-none"
        value={arrivalTime}
        onChange={(event) => {
          setArrivalTime(event.target.value);
        }}
      />
    </FormLayout>
  );
};

export const AdminPage: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedForm, setSelectedForm] = useState<string>("post-blog");
  const [resultMessage, setResultMessage] = useState<string | null>(null);

  const handleResize = () => {
    if (window.innerWidth < 1024) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (endpoint: string, method: string, body?: any) => {
    setResultMessage(null);
    try {
      const response = await fetch(
        new URL(endpoint, import.meta.env.VITE_API_BASE_URL).toString(),
        {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: body ? JSON.stringify(body) : undefined,
          credentials: "include",
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Operation failed");
      }

      const data = await response.json();
      setResultMessage("Operation successful");
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        setResultMessage(`Operation failed: ${error.message}`);
      } else {
        setResultMessage("Operation failed: An unknown error occurred");
      }
      return null;
    }
  };

  const renderForm = () => {
    switch (selectedForm) {
      case "post-blog":
        return <PostBlogForm onSubmit={handleSubmit} />;
      case "create-flight":
        return <CreateFlightForm onSubmit={handleSubmit} />;
      case "booking-stats":
        return <BookingStatsPage />;
      case "register-aircraft":
        return <RegisterAircraftForm onSubmit={handleSubmit} />;
      case "change-time":
        return <ChangeTimeForm onSubmit={handleSubmit} />;
      default:
        return <h1>Select an option from the sidebar</h1>;
    }
  };

  return (
    <div
      className="flex w-screen min-h-screen"
      style={{
        backgroundImage: `url(${bookingBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Sidebar
        isCollapsed={isCollapsed}
        selectedForm={selectedForm}
        setSelectedForm={setSelectedForm}
      />
      <div className="flex justify-center items-center flex-1">
        {renderForm()}
        {resultMessage && (
          <div className="absolute bottom-4 left-4 text-black bg-white p-4 rounded shadow-md">
            {resultMessage}
          </div>
        )}
      </div>
    </div>
  );
};
