import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../config/firebase/firebasemethods";

function MyBookings() {

   const dataSignUp = JSON.parse(localStorage.getItem("signUpData"))
   const dataLogin = JSON.parse(localStorage.getItem("logInData"))
   const navigate = useNavigate();

   const [prevData, setPrevData] = useState([]);

   useEffect(() => {

      if (!dataSignUp && !dataLogin) {
         navigate("/login")
      }

      getData("bookingForm").then((res) => {
         setPrevData(res)
      })

   }, [])

   let allPreviousData = [];
   let funcForLoginData = () => {

      for (var i = 0; i < prevData.length; i++) {

         if (dataLogin.userUid == prevData[i].userData.userUid) {
            // console.log(prevData[i].name)
            allPreviousData.push(prevData[i])
         }
      }
   }
   let funcForSignupData = () => {

      for (var i = 0; i < prevData.length; i++) {

         if (dataSignUp.userUid == prevData[i].userData.userUid) {
            // console.log(prevData[i].name)
            allPreviousData.push(prevData[i])
         }
      }
   }


   if (dataSignUp) {
      funcForSignupData();
   } if (dataLogin) {
      funcForLoginData();
   }
   // else {
   //    navigate("/login")
   // }



   return <>
      <Box sx={{ textAlign: "center", }}>

         <Typography sx={{ background: "linear-gradient(to left, #6441a5, #2a0845)", color: "white", padding: "1%", textAlign: "center",marginBottom:"2rem",fontSize:"5vw" }}>Your Previous Bookings</Typography>

         <Grid container spacing={2} display="flex" justifyContent="center">

            {allPreviousData.map((e, ind) => {
               return <>
                  <Grid item md={4} lg={3} xl={2} >

                     <Box key={ind} display={"inline-block"} width="auto"  sx={{ margin: "1%", backgroundColor: "white", padding: "1%", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", textAlign:"left" }}>
                        <img width={"300px"} height={"200px"} src={e.hotelImage} />
                        <Box sx={{padding:"1rem"}}>

                        <Typography variant="p" component={"div"}>Name: {e.name}</Typography>
                        <Typography variant="p" component={"div"}>CNIC: {e.cnic}</Typography>
                        <Typography variant="p" component={"div"}>Contact: {e.contact}</Typography>
                        <Typography variant="p" component={"div"}>Address: {e.address}</Typography>
                        <Typography variant="p" component={"div"}>Hotel Name: {e.userHotel}</Typography>
                        <Typography variant="p" component={"div"}>No Of Persons: {e.noOfPersons}</Typography>
                        <Typography variant="p" component={"div"}>No Of Days: {e.noOfDays}</Typography>
                        <Typography variant="p" component={"div"}>Per Day Price: {e.hotelPerDayPrice}</Typography>
                        <Typography variant="p" component={"div"}>Total : {e.hotelPerDayPrice * e.noOfDays}</Typography>
                        </Box>
                     </Box>
                  </Grid>
               </>
            })}
         </Grid>

      </Box>
   </>

}
export default MyBookings;