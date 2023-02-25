import TAInput from "../config/components/input";
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import TAButton from "../config/components/button";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { saveDetails } from "../config/firebase/firebasemethods";
import { useSelector } from "react-redux";
function BookingForm(props) {

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

        if (dataFromRedux || localStorageDataSignUp || localStorageDataLogIn) {

        } else {
            navigate("/login")
        }
    }, [])

    let bookingFormSubmit = () => {

        const { name, cnic, address, contact, noOfPersons, noOfDays } = userBookingDetails;


        // Validation
        if (!name || !cnic || !address || !contact || !noOfPersons || !noOfDays) {
            props.showAlert("Please fill out each field", "error")
            return;
        }


        // Submitting And Saving Form

        saveDetails("bookingForm", userBookingDetails).then(() => {
            props.showAlert("Form Submitted Successfully", "success")
        }).catch((err) => {
            console.log(err)
        })
        navigate("/paymentform")
    }

    return <>
<Box sx={{height: "100vh"}}>


        <Grid className="alignImageData" container sx={{ display: "flex", justifyContent: "center", padding: "3%",alignItems:"center" }}>




            {/* Data coming through Redux or LocalStorage */}

            <Grid md={3} sm={4} xs={12}>

                {/* Image and Data Responsiveness */}
                <Grid  container sx={{background:"linear-gradient(to right, #0f0c29, #302b63, #24243e)",color:"white",padding:"2%"}}>
                    <Grid md={12} sm={12} xs={5} >

                        <img width={"100%"} src={location.state.imageLink} />
                    </Grid>

                    <Grid md={12} sm={12} xs={6} paddingX="2%" fontSize={"1.1em"}>

                        {/* <Typography sx={{color:"#ffcc33"}} component={"div"} variant="p">Hotel Name: {location.state.hotelName}</Typography> */}
                        <Typography sx={{color:"#fdfc47"}} component={"div"} variant="p">Hotel Name: {location.state.hotelName}</Typography>
                        <Typography component={"div"} variant="p">Rooms: {location.state.rooms}</Typography>
                        <Typography className="servicesDNone" component={"div"} variant="p">Services</Typography>
                        <Typography className="servicesDNone" sx={{color:"lightgrey"}} fontSize={"0.8em"} component={"li"} variant="p">{location.state.service1}</Typography>
                        <Typography className="servicesDNone" sx={{color:"lightgrey"}} fontSize={"0.8em"} component={"li"} variant="p">{location.state.service2}</Typography>
                        <Typography className="servicesDNone" sx={{color:"lightgrey"}} fontSize={"0.8em"} component={"li"} variant="p">{location.state.service3}</Typography>
                        <Typography  sx={{ display: "flex", justifyContent: "space-between" }} variant="p"><span>Per Day Price: </span><span>{location.state.perDayPrice}</span></Typography>
                        <Divider />
                        <Typography  sx={{color:"#ffcc33", display: "flex", justifyContent: "space-between" }} variant="p"><span>Total: </span><span>{userBookingDetails ? userBookingDetails.noOfDays * location.state.perDayPrice : location.state.perDayPrice}</span></Typography>
                        <Divider />

                    </Grid>
                </Grid>

            </Grid>

            {/* Booking Form */}

            <Grid md={4} sm={4} xs={12} sx={{ paddingX: "5%" }} >
                <form >

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
                        <TAInput type="tel" required label="Contact Number" fullWidth onChange={(e) => setUserBookingDetails({ ...userBookingDetails, contact: e.target.value })} />
                    </Box>
                    <Box>
                        <TAInput type="number" required label="No of persons" fullWidth onChange={(e) => setUserBookingDetails({ ...userBookingDetails, noOfPersons: e.target.value })} />
                    </Box>
                    <Box>
                        <TAInput type="number" required label="No of days to stay" fullWidth onChange={(e) => setUserBookingDetails({ ...userBookingDetails, noOfDays: e.target.value })} />
                    </Box>
                    <Box margin={"3%"}>
                    <TAButton label="Continue" onClick={bookingFormSubmit} />
                    </Box>


                </form>
            </Grid>
           
        </Grid>
        </Box>
    </>

}

export default BookingForm;