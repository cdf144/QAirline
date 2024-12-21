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
      id: "flight-detail",
      label: "Flight Detail",
      icon: flightIcon,
    },
    {
      id: "booking-detail",
      label: "Booking Detail",
      icon: bookingIcon,
    },
    {
      id: "plane-detail",
      label: "Plane Detail",
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
}

const FormLayout: React.FC<FormLayoutProps> = ({
  children,
  submitText,
  title,
  className,
}) => (
  <div
    className={`bg-white p-8 rounded-md shadow-lg w-11/12 md:w-8/12 space-y-6 ${className}`}
  >
    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
      {title}
    </h1>
    {children}
    <FilledButton text={submitText} size="full" />
  </div>
);

const PostBlogForm = () => (
  <FormLayout submitText="Post" title="Post Information" className="mt-[120px]">
    <input
      type="text"
      placeholder="Introduction"
      className="w-full p-3 border border-black rounded-md bg-white text-black focus:outline-none"
    />
    <input
      type="text"
      placeholder="Promotion"
      className="w-full p-3 border border-black rounded-md bg-white text-black focus:outline-none"
    />
    <input
      type="text"
      placeholder="Announcement"
      className="w-full p-3 border border-black rounded-md bg-white text-black focus:outline-none"
    />
    <input
      type="text"
      placeholder="News"
      className="w-full p-3 border border-black rounded-md bg-white text-black focus:outline-none"
    />
  </FormLayout>
);

const FlightDetailForm = () => (
  <FormLayout submitText="Submit" title="Flight Detail" className="mt-[120px]">
    <input
      type="text"
      placeholder="Flight Number"
      className="w-full p-3 border border-black rounded-md bg-white text-black focus:outline-none"
    />
    <input
      type="text"
      placeholder="Flight Code"
      className="w-full p-3 border border-black rounded-md bg-white text-black focus:outline-none"
    />
    <input
      type="text"
      placeholder="Plane Type"
      className="w-full p-3 border border-black rounded-md bg-white text-black focus:outline-none"
    />
    <input
      type="text"
      placeholder="Departure"
      className="w-full p-3 border border-black rounded-md bg-white text-black focus:outline-none"
    />
    <input
      type="text"
      placeholder="Destination"
      className="w-full p-3 border border-black rounded-md bg-white text-black focus:outline-none"
    />
    <input
      type="time"
      className="w-full p-3 pr-5 border border-black rounded-md bg-white text-black focus:outline-none"
      style={{
        backgroundImage: 'url("/src/assets/clock.jpeg")',
        backgroundSize: "20px 20px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 21px center",
      }}
    />
  </FormLayout>
);

const BookingDetailForm = () => (
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

const PlaneDetailForm = () => (
  <FormLayout submitText="Submit" title="Plane Detail" className="mt-[120px]">
    <input
      type="text"
      placeholder="Plane Code"
      className="w-full p-3 border border-black rounded-md bg-white text-black focus:outline-none"
    />
    <input
      type="text"
      placeholder="Manufacturer"
      className="w-full p-3 border border-black rounded-md bg-white text-black focus:outline-none"
    />
    <input
      type="date"
      placeholder="dd/mm/yyyy"
      className="w-full p-3 pr-5 border border-black rounded-md bg-white text-black focus:outline-none placeholder-gray-400"
      style={{
        backgroundImage: 'url("/src/assets/lich.png")',
        backgroundSize: "20px 20px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 20px center",
      }}
    />
    <input
      type="number"
      placeholder="Business Seats"
      className="w-full p-3 border border-black rounded-md bg-white text-black focus:outline-none"
    />
    <input
      type="number"
      placeholder="Economy Seats"
      className="w-full p-3 border border-black rounded-md bg-white text-black focus:outline-none"
    />
  </FormLayout>
);

const ChangeTimeForm = () => (
  <FormLayout submitText="Update" title="Change Time" className="mt-[100px]">
    <input
      type="text"
      placeholder="Flight Code"
      className="w-full p-3 border border-black rounded-md bg-white text-black focus:outline-none"
    />
    <input
      type="time"
      className="w-full p-3 pr-5 border border-black rounded-md bg-white text-black focus:outline-none"
      style={{
        backgroundImage: 'url("/src/assets/clock.jpeg")',
        backgroundSize: "20px 20px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 21px center",
      }}
    />
  </FormLayout>
);

export const AdminPage: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedForm, setSelectedForm] = useState<string>("post-blog");

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

  const renderForm = () => {
    switch (selectedForm) {
      case "post-blog":
        return <PostBlogForm />;
      case "flight-detail":
        return <FlightDetailForm />;
      case "booking-detail":
        return <BookingDetailForm />;
      case "plane-detail":
        return <PlaneDetailForm />;
      case "change-time":
        return <ChangeTimeForm />;
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
      </div>
    </div>
  );
};
