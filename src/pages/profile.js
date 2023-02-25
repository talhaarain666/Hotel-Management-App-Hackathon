import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData, getSingleData, updateData } from "../config/firebase/firebasemethods";

function Profile() {

    const dataSignUp = JSON.parse(localStorage.getItem("signUpData"))
    const dataLogin = JSON.parse(localStorage.getItem("logInData"))

    const [userData, setUserData] = useState({});
    const navigate = useNavigate()

    const [pImage, setPImage] = useState({
        profileimg: ""
    });



    useEffect(() => {

        if (!dataSignUp && !dataLogin) {
            navigate("/login")
        }
        else {

            getSingleData("users", dataLogin ? dataLogin.userUid : dataSignUp.userUid).then((res) => {
                setUserData(res)
            })

            // Image 

            getSingleData("users", dataLogin ? dataLogin.userUid : dataSignUp.userUid).then((res) => {
                setPImage({ profileimg: res.profileImgLink })
            })

        }
    }, [])






    let fileVal = (e) => {
        const reader = new FileReader();
        console.log(reader)

        reader.onload = () => {
            const imgReadObj = {
                profileImgLink: reader.result
            }
            if (reader.readyState === 2) {
                setPImage({ profileimg: reader.result })
                localStorage.setItem("ProfileImage", JSON.stringify({ profileImg: reader.result }))
                updateData(imgReadObj, "users", dataLogin ? dataLogin.userUid : dataSignUp.userUid)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }



    return <>
    <Box sx={{height:"100vh"}}>

        <Typography sx={{ background: "linear-gradient(to left, #6441a5, #2a0845)", color: "white", padding: "0.5%", textAlign: "center", marginBottom: "3%",fontSize:"5vw" }} >Profile</Typography>
        <Box display={"flex"} alignItems="top" justifyContent={"space-around"} >
            <Box width={"60%"}>
                <Box margin="2%">
                    <Typography sx={{
                        backgroundColor: "lightyellow", 
                        padding: "2%",
                        fontSize:"3vw",
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
                    }} >Name: {userData.userName}</Typography>
                </Box>
                <Box margin="2%">
                    <Typography sx={{
                        backgroundColor: "lightyellow",
                        padding: "2%",
                        fontSize:"3vw",
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
                    }}>Email: {userData.email}</Typography>
                </Box>
            </Box>

            <Box width={"30%"}>
                <img width={"100%"} src={pImage.profileimg} />
                <input style={{ width: "100%" }} type={"file"} onChange={(e) => fileVal(e)} accept="image/*" />
            </Box>
        </Box>


                    </Box>
    </>
}

export default Profile;