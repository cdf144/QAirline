import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AirlineLogin } from "./component/AirlineLogin.tsx";
import { BookingPage } from "./component/BookingPage.tsx";
import BookingPageAfterClickInRecommend from "./component/BookingPageAfterClickInRecommend.tsx";
import ForgotPassword from "./component/ForgotPassword.tsx";
import { HomePage } from "./component/HomePage.tsx";
import { ManageBooking } from "./component/ManageBooking.tsx";
import { SignUpPage } from "./component/SignUpPage.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/login" element={<AirlineLogin />} />
        <Route path="/manage" element={<ManageBooking />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route
          path="/recommend"
          element={<BookingPageAfterClickInRecommend />}
        />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
      </Routes>
    </Router>
  </StrictMode>,
);
