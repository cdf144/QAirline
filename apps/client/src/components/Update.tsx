import React, { useState } from "react";

export const Sidebar: React.FC<{
  isCollapsed: boolean;
  toggleSidebar: () => void;
  selectedForm: string;
  setSelectedForm: (form: string) => void;
}> = ({ isCollapsed, toggleSidebar, selectedForm, setSelectedForm }) => {
  const buttons = [
    {
      id: "postInformation",
      label: "Post Information",
      icon: "/src/assets/note.png",
    },
    {
      id: "flightDetail",
      label: "Flight Detail",
      icon: "/src/assets/plane.png",
    },
    {
      id: "planeDetail",
      label: "Plane Detail",
      icon: "/src/assets/flight.png",
    },
    { id: "changeTime", label: "Change Time", icon: "/src/assets/delay.png" },
  ];

  return (
    <div
      className={`relative flex flex-col ${
        isCollapsed ? "w-[80px]" : "w-[250px]"
      } min-h-screen bg-[#6CADC5] shadow-md transition-all duration-300`}
    >
      <div className={`p-6 bg-white ${isCollapsed ? "text-center" : ""}`}>
        <h2
          className={`text-lg font-bold text-[#1B304F] text-[40px] ${
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
            } w-full px-4 py-2 rounded-md shadow-md ${
              selectedForm === button.id
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-blue-600 hover:text-white"
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

        {/* Nút thu gọn/mở rộng */}
        <button
          onClick={toggleSidebar}
          className={`flex items-center ${
            isCollapsed ? "justify-center" : ""
          } w-full mt-4 px-4 py-2 bg-gray-300 text-gray-600 rounded-md shadow-md hover:bg-gray-400 focus:outline-none`}
        >
          {isCollapsed ? "▶" : "◀ Collapse"}
        </button>
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
    className={`bg-white p-8 rounded-md shadow-lg w-[600px] space-y-6 ${className}`}
  >
    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
      {title}
    </h1>
    {children}
    <button className="w-full py-3 mt-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition text-lg">
      {submitText}
    </button>
  </div>
);

const PostInformationForm = () => (
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
      className="w-full p-3 border border-black rounded-md bg-white text-black focus:outline-none placeholder-gray-400"
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

export const Update: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedForm, setSelectedForm] = useState<string>("postInformation");

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const renderForm = () => {
    switch (selectedForm) {
      case "postInformation":
        return <PostInformationForm />;
      case "flightDetail":
        return <FlightDetailForm />;
      case "planeDetail":
        return <PlaneDetailForm />;
      case "changeTime":
        return <ChangeTimeForm />;
      default:
        return <h1>Select an option from the sidebar</h1>;
    }
  };

  return (
    <div
      className="flex w-screen min-h-screen"
      style={{
        backgroundImage: 'url("/src/assets/bookingbg.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Sidebar
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
        selectedForm={selectedForm}
        setSelectedForm={setSelectedForm}
      />
      <div className="flex justify-center items-center flex-1">
        {renderForm()}
      </div>
    </div>
  );
};
