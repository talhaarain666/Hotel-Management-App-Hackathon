import { Box } from "@mui/system";
import { useState } from "react";
import TAButton from "../config/components/button";
import TAInput from "../config/components/input";
import { Link, useNavigate } from "react-router-dom"
import { SignUp } from "../config/firebase/firebasemethods";
import { Divider, Typography } from "@mui/material";

function SignUpPg() {

    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loader, setLoader] = useState(false)

    const navigate = useNavigate();

    const signUpUser = () => {
        const obj = {
            userName,
            email,
            password,
        }
        if (!email) {
            alert("Enter Email")
            return;
        }
        if (!password) {
            alert("Enter Password")
            return;
        }
        setLoader(true)
        SignUp(obj).then((res) => {
            console.log(res)
            setLoader(false)
            alert("SignUp Successfully")
            localStorage.setItem("signUpData", JSON.stringify({ userUid: res.uid }))
            navigate("/")
        }).catch((err) => {
            setLoader(false)
            alert(err)
        })

    }


    return <>

       
        <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Box sx={{ padding: "5%", height: "50%", backgroundColor: "white", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}>

                <Box sx={{ padding: "3%", background: "linear-gradient(to left, #6441a5, #2a0845)" }}>
                    <Typography sx={{ color: '#ffcc33' }} variant="h5">Signup Form</Typography>
                </Box>

                <Box marginY={"5%"}>
                    <TAInput label="Enter Name" onChange={(e) => setUserName(e.target.value)} />
                </Box>
                <Box marginY={"5%"}>
                    <TAInput label="Enter Email" onChange={(e) => setEmail(e.target.value)} />
                </Box>
                <Box marginY={"5%"}>
                    <TAInput label="Enter Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                </Box>
                <Box sx={{ margin: "2em 1em 2em 0.5em" }}>
                    already have an account? <Link to="/login">Login</Link>
                </Box>
                <Box sx={{ margin: "0em 1em 0em 0.5em" }}>
                    <TAButton loading={loader} label="signUp" onClick={signUpUser} />
                </Box>
            </Box>
        </Box>
    </>
}
export default SignUpPg;