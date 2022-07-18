import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ActionAreaCard from "../config/components/card";
import DiscreteSlider from "../config/components/filterslider";
import ResponsiveAppBar from "../config/components/navbar";
import { getData, getSingleData } from "../config/firebase/firebasemethods";

function HomePg() {

    const navigate = useNavigate();

    const [renderDetails, setRenderDetails] = useState([])
    const [price, setPrice] = useState(0);
    const [profileImgaeIcon, setProfileImageIcon] = useState();

    const localStorageDataSignup = JSON.parse(localStorage.getItem("signUpData"))
    const localStorageDataLogin = JSON.parse(localStorage.getItem("logInData"))

    useEffect(() => {
        getData("hotelDetails")
            .then((res) => {
                setRenderDetails(res)
            })
        if (localStorageDataLogin || localStorageDataSignup) {

            getSingleData("users", localStorageDataLogin ? localStorageDataLogin.userUid : localStorageDataSignup.userUid).then((res) => {
                // console.log(res)
                setProfileImageIcon(res.profileImgLink)
            })
        }
    }, [])

    let bookNow = (details) => {
        navigate("bookingform", { state: details })

    }

    const handleInput = (e) => {
        setPrice(e.target.value);
    }

    return <>
        <ResponsiveAppBar imageFletter={profileImgaeIcon?profileImgaeIcon:""} />
        {/* imageFletter={localStorageDataSignup ? localStorageDataSignup.userName : localStorageDataLogin} */}
        <Box sx={{ backgroundColor: "lightyellow", padding: "0.7% 2%" }}>
            <Typography variant="h6">Filter By Price</Typography>
            <DiscreteSlider min={1000} max={20000} step={1000} onChange={handleInput} />
        </Box>
        {renderDetails.filter(hotel => {
            return hotel.perDayPrice >= parseInt(price)
        })
            .map(e => {
                return <ActionAreaCard imgLink={e.imageLink} hotelName={e.hotelName} noOfRooms={e.rooms} service1={e.service1} service2={e.service2} service3={e.service3} perDayPrice={e.perDayPrice} buttonOnClick={() => bookNow(e)} buttonLabel="Book Now" />
            })}

        {/* {renderDetails.map((e) => {
           return (<>
                <ActionAreaCard imgLink={e.imageLink} hotelName={e.hotelName} noOfRooms={e.rooms} service1={e.service1} service2={e.service2} service3={e.service3} perDayPrice={e.perDayPrice} buttonOnClick={() => bookNow(e)} buttonLabel="Book Now" />
            </>)
        })} */}
    </>
}



export default HomePg;