import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import BookingPage from "./component/BookingPage";
import HomePage from "./component/HomePage";
import ManageBooking from "./component/ManageBooking";

const App: React.FC = () => {
  return (
    <Router>
      <BrowserRouter>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/manage-booking" element={<ManageBooking />} />
      </BrowserRouter>
    </Router>
  );
};

export default App;
