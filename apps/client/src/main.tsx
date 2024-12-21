import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./assets/css/index.css";
import PrivateRoute from "./components/PrivateRoute.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { AdminPage } from "./pages/Admin.tsx";
import BlogPage from "./pages/Blog.tsx";
import { BookingPage } from "./pages/Booking.tsx";
import FlightsPage from "./pages/Flights.tsx";
import ForgotPasswordPage from "./pages/ForgotPassword.tsx";
import { HomePage } from "./pages/Home.tsx";
import { LoginPage } from "./pages/Login.tsx";
import { ManageBookingPage } from "./pages/ManageBooking.tsx";
import ProfilePage from "./pages/Profile.tsx";
import { SignUpPage } from "./pages/SignUp.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/flights" element={<FlightsPage />} />
          <Route
            path="/manage"
            element={
              <PrivateRoute requiredRoles={["user"]}>
                <ManageBookingPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/booking"
            element={
              <PrivateRoute requiredRoles={["user"]}>
                <BookingPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute requiredRoles={["user"]}>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute requiredRoles={["admin"]}>
                <AdminPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  </StrictMode>,
);
