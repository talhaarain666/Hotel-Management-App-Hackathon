import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import AdminPanel from "../../pages/adminpanel";
import BookingForm from "../../pages/bookingform";
import HomePg from "../../pages/home";
import LogInPg from "../../pages/login";
import LogOutUser from "../../pages/logout";
import PaymentForm from "../../pages/paymentform";
import MyBookings from "../../pages/mybookings";
import SignUpPg from "../../pages/signup";
import UserBookingDetails from "../../pages/userbookingdetails";
import ResponsiveAppBar from "../components/navbar";
import Profile from "../../pages/profile";
import AlertComponent from "../components/AlertComponent";

export default function AppRouting() {

    const [alert, setAlert] = useState(null);

    let showAlert = (message,type) => {
      setAlert({
        msg: message,
        type: type,
  
      })
      setTimeout(() => {
  
        setAlert(null)
      }, 3000);
  
    }

    return (
        <Router>
            <AlertComponent alert={alert} />
            <Routes>
                <Route path="/" element={<HomePg />} />
                <Route path="adminpanel" element={<AdminPanel />} />
                <Route path="bookingform" element={<BookingForm showAlert={showAlert} />} />
                <Route path="paymentform" element={<PaymentForm />} />
                <Route path="bookingdetails" element={<UserBookingDetails />} />
                <Route path="profile" element={<Profile />} />
                <Route path="login" element={<LogInPg showAlert={showAlert}/>} />
                <Route path="signup" element={<SignUpPg />} />
                <Route path="mybookings" element={<MyBookings />} />
                <Route path="logout" element={<LogOutUser showAlert={showAlert}/>} />
            </Routes>
        </Router>
    );
}