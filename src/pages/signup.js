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
        SignUp(obj).then(() => {
            setLoader(false)
            alert("SignUp Successfully")
            localStorage.setItem("signUpData", JSON.stringify({ userName: obj.userName, email: obj.email }))
            navigate("/")
        }).catch((err) => {
            setLoader(false)
            alert(err)
        })
        // console.log(obj)

    }


    return <>
        <Box sx={{ background: "linear-gradient(to right, #ffefba, #ffffff)", height: "100vh", display: "flex", justifyContent: "center" }}>
          
            <Box sx={{ border: "10px ridge orange", padding: "5%", height: "50%" }}>

            <Typography variant="h4">SignUp Form</Typography>
                <Divider />
                <Box>
                    <TAInput label="Enter Name" onChange={(e) => setUserName(e.target.value)} />
                </Box>
                <Box>
                    <TAInput label="Enter Email" onChange={(e) => setEmail(e.target.value)} />
                </Box>
                <Box>
                    <TAInput label="Enter Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                </Box>
                <Box sx={{ margin: "1em 1em 1em 0.5em" }}>
                    already have an account? <Link to="/login">Login</Link>
                </Box>
                <Box sx={{ margin: "1em 1em 1em 0.5em" }}>
                    <TAButton loading={loader} label="signUp" onClick={signUpUser} />
                </Box>
            </Box>
        </Box>
    </>
}
export default SignUpPg;