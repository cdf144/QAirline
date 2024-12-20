import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import formBg from "../assets/Booking_bg.png";
import bookingBg from "../assets/bookingbg.jpg";
import FilledButton from "../components/buttons/Filled";
import OutlinedButton from "../components/buttons/Outlined";
import { useAuth } from "../context/AuthContext";
import StandardLayout from "../layouts/Standard";

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        new URL("/v1/auth/login", import.meta.env.VITE_API_BASE_URL).toString(),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, password: password }),
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log(data);
      await login(email, password);
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StandardLayout>
      <div
        className="flex flex-col justify-center items-center w-screen min-h-screen bg-cover bg-center px-4"
        style={{
          backgroundImage: `url(${bookingBg})`,
        }}
      >
        <div
          className="w-full max-w-screen-md mt-12 shadow-md rounded-3xl flex flex-col pt-10 bg-white bg-cover bg-center"
          style={{
            backgroundImage: `url(${formBg})`,
          }}
        >
          <div className="px-6 py-6">
            <SelectButton />

            <div className="my-4 text-lg lg:text-xl font-bold text-gray-700">
              Login
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 mt-1 border bg-white rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-black"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 mt-1 border rounded-md bg-white focus:outline-none focus:ring focus:ring-blue-300 text-black"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-md italic">{error}</p>}

              <div className="flex justify-end space-x-2 text-black text-sm lg:text-base">
                <Link to="/signup" className="text-white no-underline">
                  <span className="hover:underline text-black">Sign Up</span>
                </Link>

                <span>|</span>

                <Link to="/forgot-password" className="text-white no-underline">
                  <span className="hover:underline text-black">
                    Forgot your password
                  </span>
                </Link>
              </div>

              <div className="flex justify-center py-2 mt-4">
                <FilledButton text="LOGIN" size="full" loading={loading} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
};

export const SelectButton: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8 mb-6">
      <Link to="/booking" className="text-white no-underline">
        <OutlinedButton text="Booking" size="large" color="primary" />
      </Link>

      <Link to="/manage" className="text-white no-underline">
        <OutlinedButton text="Manage Booking" size="large" color="primary" />
      </Link>
    </div>
  );
};

export default SelectButton;
