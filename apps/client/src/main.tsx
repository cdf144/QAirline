import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AirlineLogin } from "./components/AirlineLogin.tsx";
import { BookingPage } from "./components/BookingPage.tsx";
import BookingPageAfterClickInRecommend from "./components/BookingPageAfterClickInRecommend.tsx";
import ForgotPassword from "./components/ForgotPassword.tsx";
import { HomePage } from "./components/HomePage.tsx";
import { ManageBooking } from "./components/ManageBooking.tsx";
import { SignUpPage } from "./components/SignUpPage.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/login" element={<AirlineLogin />} />
        <Route path="/manage" element={<ManageBooking />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/recommend"
          element={<BookingPageAfterClickInRecommend />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  </StrictMode>,
);
