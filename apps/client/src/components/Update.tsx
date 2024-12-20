import React, { useState } from "react";

export const Sidebar: React.FC<{
  isCollapsed: boolean;
  toggleSidebar: () => void;
  selectedForm: string;
  setSelectedForm: (form: string) => void;
}> = ({ isCollapsed, toggleSidebar, selectedForm, setSelectedForm }) => {
  // Bổ sung trong danh sách `buttons`
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
      id: "bookingDetail", // Thêm nút mới
      label: "Booking Detail",
      icon: "/src/assets/booking.png", // Đường dẫn icon tùy bạn thay đổi
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
          className={`text-lg font-bold text-[#1B304F] text-[39px] ${
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
                ? "bg-[#1B304F] text-white"
                : "bg-white text-gray-600 hover:bg-[#1B304F] hover:text-white"
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
const BookingDetailForm = () => (
  <div>
    <div className="flex flex-col gap-4 bg-white p-4  rounded-lg shadow-lg w-[800px]">
      <div className="flex items-center justify-between p-4 bg-green-100 h-[100px] rounded-lg">
        <span className="text-4xl font-bold text-green-600">5 Lakhs</span>
        <span className="text-gray-600 text-lg">Today's Booking</span>
      </div>
    </div>
    <div className="flex flex-col mt-5 gap-4 bg-white p-4 rounded-lg shadow-lg w-[800px]">
      <div className="flex items-center justify-between p-4 bg-blue-100 h-[100px] rounded-lg">
        <span className="text-4xl font-bold text-blue-600">60 Nos</span>
        <span className="text-gray-600 text-lg">Today's Fly Flight</span>
      </div>
    </div>
    <div className="flex flex-col mt-5 gap-4 bg-white p-4 rounded-lg shadow-lg w-[800px]">
      <div className="flex items-center justify-between p-4 bg-red-100 h-[100px] rounded-lg">
        <span className="text-4xl font-bold text-red-600">10 Nos</span>
        <span className="text-gray-600 text-lg">30 day's Booking</span>
      </div>
    </div>
    <div className="flex flex-col mt-5 gap-4 bg-white p-4 rounded-lg shadow-lg w-[800px]">
      <div className="flex items-center justify-between p-4 bg-yellow-100 h-[100px] rounded-lg">
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
      case "bookingDetail": // Xử lý khi nhấn nút Booking Detail
        return <BookingDetailForm />;
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
