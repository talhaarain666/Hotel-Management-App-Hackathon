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

        getSingleData("users", dataLogin ? dataLogin.userUid : dataSignUp.userUid).then((res) => {
            console.log(res)
            setUserData(res)
        })
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
        <Typography sx={{ backgroundColor: "black", color: "white", padding: "1%", textAlign: "center", marginBottom: "3%" }} variant="h3">Profile</Typography>
        <Box display={"flex"} alignItems="center" justifyContent={"space-around"}>
            <Box width={"60%"}>
                <Box margin="2%">
                    <Typography sx={{
                        backgroundColor: "#045de9",
                        backgroundImage: "linear-gradient(315deg, #045de9 0%, #09c6f9 74%)",
                        padding: "2%"
                    }} variant="h3">Name: {userData.userName}</Typography>
                </Box>
                <Box margin="2%">
                    <Typography sx={{
                        backgroundColor: "#045de9",
                        backgroundImage: "linear-gradient(315deg, #045de9 0%, #09c6f9 74%)",
                        padding: "2%"
                    }} variant="h3">Email: {userData.email}</Typography>
                </Box>
            </Box>

            <Box width={"30%"}>
                <img width={"100%"} src={pImage.profileimg} />
                <input type={"file"} onChange={(e) => fileVal(e)} accept="image/*" />
            </Box>
        </Box>


    </>
}

export default Profile;