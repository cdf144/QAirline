import { createRoot } from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AirlineLogin } from "./component/AirlineLogin.tsx";
import { BookingPage } from "./component/BookingPage.tsx";
import { HomePage } from "./component/HomePage.tsx";
import { ManageBooking } from "./component/ManageBooking.tsx";
import { SignUpPage } from "./component/SignUpPage.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route
        path="/login"
        element={<AirlineLogin key={new Date().getTime()} />}
      />
      <Route path="/manage" element={<ManageBooking />} />
      <Route path="/signUp" element={<SignUpPage />} />
    </Routes>
  </Router>,
);
