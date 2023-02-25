import { CircularProgress, Grid, LinearProgress, Typography } from "@mui/material";
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

    // Loader and Loader Progress 1-100
    const [loader, setLoader] = useState(false);


    const localStorageDataSignup = JSON.parse(localStorage.getItem("signUpData"))
    const localStorageDataLogin = JSON.parse(localStorage.getItem("logInData"))

    useEffect(() => {
        setLoader(true);
        getData("hotelDetails")
            .then((res) => {
                setRenderDetails(res)
                setLoader(false);

            })
        if (localStorageDataLogin || localStorageDataSignup) {

            getSingleData("users", localStorageDataLogin ? localStorageDataLogin.userUid : localStorageDataSignup.userUid).then((res) => {
                // console.log(res)
                setProfileImageIcon(res.profileImgLink)
            })
        }
        // setLoader(false);
        // setProgress(100)
    }, [])

    let bookNow = (details) => {
        navigate("bookingform", { state: details })

    }

    const handleInput = (e) => {
        setPrice(e.target.value);
    }

    return <>
        <Box minHeight={"100vh"}>

            <ResponsiveAppBar imageFletter={profileImgaeIcon ? profileImgaeIcon : ""} />


            {/* Filter */}
            {/* imageFletter={localStorageDataSignup ? localStorageDataSignup.userName : localStorageDataLogin} */}
            <Box sx={{ padding: "0.7% 2%", display: "flex", justifyContent: "center" }}>
                <Typography variant="p" sx={{ padding: "0.3rem" }}>Filter By Price</Typography>
                <DiscreteSlider min={1000} max={20000} step={1000} onChange={handleInput} />
            </Box>


            {/* Loader */}
            {
                loader &&
                <Box display={"flex"} justifyContent="center"><CircularProgress /></Box>
            }


            {/* Cards Rendering */}
            <Grid container spacing={2} display="flex" justifyContent="center">

                {!loader && renderDetails.filter(hotel => {
                    return hotel.perDayPrice >= parseInt(price)
                })
                    .map(e => {
                        return <>
                            <Grid item md={4} lg={3} xl={2}>
                                <ActionAreaCard imgLink={e.imageLink} hotelName={e.hotelName} noOfRooms={e.rooms} service1={e.service1} service2={e.service2} service3={e.service3} perDayPrice={e.perDayPrice} buttonOnClick={() => bookNow(e)} buttonLabel="Book Now" />
                            </Grid>
                        </>
                    })}
            </Grid>
            {/* <Grid container spacing={2}>
            {notes.map((note) => {
                return <>
                
                <NoteItem showAlert={props.showAlert} updatenote={updatenote} note={note} />
                </Grid>
                </>
            })}
        </Grid> */}
        </Box>
    </>
}



export default HomePg;