import TAInput from "../config/components/input";
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import TAButton from "../config/components/button";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { saveDetails } from "../config/firebase/firebasemethods";
import { useSelector } from "react-redux";
function BookingForm() {

    const location = useLocation();
    const navigate = useNavigate();

    const dataFromRedux = useSelector((a) => a.user)
    const localStorageDataSignUp = JSON.parse(localStorage.getItem("signUpData"))
    const localStorageDataLogIn = JSON.parse(localStorage.getItem("logInData"))

    const [userBookingDetails, setUserBookingDetails] = useState(
        {
            userData: localStorageDataLogIn ? localStorageDataLogIn : localStorageDataSignUp,

            userHotel: location.state.hotelName,
            hotelImage: location.state.imageLink,
            hotelPerDayPrice: location.state.perDayPrice,

        }

    );

    useEffect(() => {
        // console.log(dataFromRedux)
        // console.log(location)
        if (dataFromRedux || localStorageDataSignUp ? localStorageDataSignUp : localStorageDataLogIn) {

        } else {
            navigate("/login")
        }
    }, [])

    // console.log(localStorageDataLogIn)
    let bookingFormSubmit = () => {
        // console.log(userBookingDetails)
        saveDetails("bookingForm", userBookingDetails).then(() => {
            alert("Form Submitted Successfully")
        }).catch((err) => {
            console.log(err)
        })
        navigate("/paymentform")
    }

    return <>

        <Grid container sx={{ display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(to right, #ffefba, #ffffff)", height: "100vh" }}>
            <Grid md={4} sx={{ padding: "5%" }}>

                <Typography variant="h4">Booking Form</Typography>
                <Divider />
                <Box>
                    <TAInput required label="Enter Name" fullWidth onChange={(e) => setUserBookingDetails({ ...userBookingDetails, name: e.target.value })} />
                </Box>
                <Box>
                    <TAInput required label="CNIC No." fullWidth onChange={(e) => setUserBookingDetails({ ...userBookingDetails, cnic: e.target.value })} />
                </Box>
                <Box>
                    <TAInput required label="Address" fullWidth onChange={(e) => setUserBookingDetails({ ...userBookingDetails, address: e.target.value })} />
                </Box>
                <Box>
                    <TAInput required label="Contact Number" fullWidth onChange={(e) => setUserBookingDetails({ ...userBookingDetails, contact: e.target.value })} />
                </Box>
                <Box>
                    <TAInput required label="No of persons" fullWidth onChange={(e) => setUserBookingDetails({ ...userBookingDetails, noOfPersons: e.target.value })} />
                </Box>
                <Box>
                    <TAInput required label="No of days to stay" fullWidth onChange={(e) => setUserBookingDetails({ ...userBookingDetails, noOfDays: e.target.value })} />
                </Box>
                <TAButton label="Continue" onClick={bookingFormSubmit} />
            </Grid>
            <Grid md={3} marginLeft="3%">
                <img width={"100%"} height="80%" src={location.state.imageLink} />
                <Typography variant="h5">Hotel Name: {location.state.hotelName}</Typography>
                <Typography variant="h6">Rooms: {location.state.rooms}</Typography>
                <Typography variant="h6">Services</Typography>
                <Typography component={"li"} variant="p">{location.state.service1}</Typography>
                <Typography component={"li"} variant="p">{location.state.service2}</Typography>
                <Typography component={"li"} variant="p">{location.state.service3}</Typography>
                <Typography sx={{ display: "flex", justifyContent: "space-between" }} variant="h6"><span>Per Day Price: </span><span>{location.state.perDayPrice}</span></Typography>
                <Divider />
                <Typography sx={{ display: "flex", justifyContent: "space-between" }} variant="h6"><span>Total: </span><span>{userBookingDetails ? userBookingDetails.noOfDays * location.state.perDayPrice : location.state.perDayPrice}</span></Typography>
                <Divider />


            </Grid>
        </Grid>
    </>

}

export default BookingForm;