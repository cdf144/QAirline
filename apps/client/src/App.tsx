import * as React from "react";

export const AirlineLogin: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-200">
      {/* Header */}
      <div className="w-full max-w-md bg-white shadow-md rounded-lg">
        {/* Background */}
        <div
          className="relative w-full h-40 bg-cover bg-center rounded-t-lg"
          style={{
            backgroundImage: "url('https://your-background-image-url')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="flex flex-col items-start px-6 py-4 text-white">
            <h1 className="text-2xl font-bold">QAirline</h1>
            <p className="text-sm">Safe Skies, Smart Prices</p>
          </div>
          <div className="absolute top-4 right-4 text-white">
            cần gì đó ỏw đây
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between px-6 py-4 bg-white">
          <button className="w-full py-2 mr-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600">
            Booking
          </button>
          <button className="w-full py-2 ml-2 text-sm font-medium bg-gray-200 rounded hover:bg-gray-300">
            Manager
          </button>
        </div>

        {/* Login Form */}
        <div className="px-6 py-6 bg-white">
          <h2 className="mb-4 text-xl font-bold text-gray-700">Login</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Member number or email or phone
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your email or phone"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 text-gray-400"
                >
                  👁️
                </button>
              </div>
            </div>

            <div className="flex justify-between text-sm text-blue-500">
              <a href="#" className="hover:underline">
                Sign-up
              </a>
              <a href="#" className="hover:underline">
                Forgot your password
              </a>
            </div>

            <button className="w-full py-2 mt-4 text-white bg-yellow-500 rounded hover:bg-yellow-600">
              LOGIN
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-100">
          <div className="flex items-center gap-2">
            <img
              src="https://your-icon-url"
              alt="News Icon"
              className="w-5 h-5"
            />
            <span className="text-sm font-medium text-gray-700">News</span>
          </div>
        </div>
      </div>
    </div>
  );
};
