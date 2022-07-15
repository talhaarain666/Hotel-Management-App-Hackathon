import { Typography } from "@mui/material";
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
      if (dataSignUp) {
         // console.log(dataSignUp)
      } if (dataLogin) {
         // console.log(dataLogin)
      }
      else {
         navigate("/login")
      }
      getData("bookingForm").then((res) => {
         setPrevData(res)

      })

   }, [])


   let allPreviousData = [];
   let check = () => {

      for (var i = 0; i < prevData.length; i++) {
         if (dataLogin.email == prevData[i].userData.email) {
            // console.log(prevData[i].name)
            allPreviousData.push(prevData[i])
         }
      }
   }
   check();

   // console.log(allPreviousData)

   return <>

      <Box sx={{ background: "linear-gradient(to right, #ffefba, #ffffff)" }}>

         <Typography sx={{ backgroundColor: "black", color: "white", padding: "1%", textAlign: "center" }} variant="h3">Your Previous Bookings</Typography>
         {allPreviousData.map((e, ind) => {
            return <>
               <Box key={ind} display={"inline-block"} width="28%" sx={{ margin: "1%", backgroundColor: "white", padding: "1%", boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" }}>
                  <img width={"100%"} src={e.hotelImage} />
                  <Typography variant="h6">Name: {e.name}</Typography>
                  <Typography variant="h6">CNIC: {e.cnic}</Typography>
                  <Typography variant="h6">Contact: {e.contact}</Typography>
                  <Typography variant="h6">Address: {e.address}</Typography>
                  <Typography variant="h6">Hotel Name: {e.userHotel}</Typography>
                  <Typography variant="h6">No Of Persons: {e.noOfPersons}</Typography>
                  <Typography variant="h6">No Of Days: {e.noOfDays}</Typography>
                  <Typography variant="h6">Per Day Price: {e.hotelPerDayPrice}</Typography>
                  <Typography variant="h6">Total : {e.hotelPerDayPrice * e.noOfDays}</Typography>
               </Box>
            </>
         })}
     
      </Box>
   </>

}
export default MyBookings;