import React from "react";
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

export default function AppRouting() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePg />} />
                <Route path="adminpanel" element={<AdminPanel />} />
                <Route path="bookingform" element={<BookingForm />} />
                <Route path="paymentform" element={<PaymentForm />} />
                <Route path="bookingdetails" element={<UserBookingDetails />} />
                <Route path="profile" element={<Profile />} />
                <Route path="login" element={<LogInPg />} />
                <Route path="signup" element={<SignUpPg />} />
                <Route path="mybookings" element={<MyBookings />} />
                <Route path="logout" element={<LogOutUser />} />
            </Routes>
        </Router>
    );
}