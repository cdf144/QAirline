import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AirlineLogin } from "./AirlineLogin";
import { BookingPage } from "./BookingPage.tsx";
import { BookingPageAfterClickInRecommend } from "./BookingPageAfterClickInRecommend.tsx";
import { HomePage } from "./HomePage.tsx";
import "./index.css";
import { ManageBooking } from "./ManageBooking.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HomePage />
    <BookingPageAfterClickInRecommend />
    <BookingPage />
    <ManageBooking />
    <AirlineLogin />
  </StrictMode>,
);
