import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./assets/css/index.css";
import PrivateRoute from "./components/PrivateRoute.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { AdminPage } from "./pages/Admin.tsx";
import { BookingPage } from "./pages/Booking.tsx";
import BookingAfterRecommendPage from "./pages/BookingAfterRecommend.tsx";
import ForgotPasswordPage from "./pages/ForgotPassword.tsx";
import { HomePage } from "./pages/Home.tsx";
import { LoginPage } from "./pages/Login.tsx";
import { ManageBookingPage } from "./pages/ManageBooking.tsx";
import { SignUpPage } from "./pages/SignUp.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/manage" element={<ManageBookingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/recommend" element={<BookingAfterRecommendPage />} />
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
