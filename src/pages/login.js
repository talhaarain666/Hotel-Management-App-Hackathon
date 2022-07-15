import { Box } from "@mui/system";
import { useState } from "react";
import TAButton from "../config/components/button";
import TAInput from "../config/components/input";
import { Link } from "react-router-dom"
import { logIn } from "../config/firebase/firebasemethods";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Divider, Typography } from "@mui/material";

function LogInPg() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loader, setLoader] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginUser = () => {

        const obj = {
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
        logIn(obj).then((res) => {
            alert("Login Successfully")
            // console.log(res)
            dispatch({
                type: "DATAFROMLOGIN",
                payload: res,
            })
            navigate("/")
            localStorage.setItem("logInData", JSON.stringify({ userName: obj.userName, email: obj.email }))
            setLoader(false)
        }).catch((err) => {
            setLoader(false)
            alert(err)
        })

    }


    return <>
        <Box sx={{ background: "linear-gradient(to right, #ffefba, #ffffff)", height: "100vh", display: "flex", justifyContent: "center" }}>
            <Box sx={{ border: "10px ridge orange", padding: "2% 5% 5% 5% ", height: "50%" }}>
                <Box sx={{ paddingBottom: "5%" }}>
                    <TAButton fullWidth label="Back" onClick={() => navigate("/")} />
                </Box>
                <Typography variant="h4">LogIn Form</Typography>
                <Divider />
                <Box>
                    <TAInput label="Enter Email" onChange={(e) => setEmail(e.target.value)} />
                </Box>
                <Box>
                    <TAInput label="Enter Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                </Box>
                <Box sx={{ margin: "1em 1em 1em 0.5em" }}>
                    New Here? <Link to="/signup">Create Account</Link>
                </Box>
                <Box sx={{ margin: "1em 1em 1em 0.5em" }}>
                    <TAButton label="Login" onClick={loginUser} />
                </Box>
            </Box>
        </Box>
    </>
}
export default LogInPg;