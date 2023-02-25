import { Box } from "@mui/system";
import { useState } from "react";
import TAButton from "../config/components/button";
import TAInput from "../config/components/input";
import { Link } from "react-router-dom"
import { logIn } from "../config/firebase/firebasemethods";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Typography } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function LogInPg(props) {

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
            props.showAlert("Logged In Successfully", "success")
            console.log(res.uid)
            dispatch({
                type: "DATAFROMLOGIN",
                payload: res.uid,
            })
            localStorage.setItem("logInData", JSON.stringify({ userUid: res.uid }))
            setLoader(false)
            navigate("/")
        }).catch((err) => {
            setLoader(false)
            alert(err)
        })

    }


    return <>
        <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Box sx={{ padding: "5%", height: "50%", backgroundColor: "white",boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}>
                <Box sx={{ padding: "2% 0.5%", background: "linear-gradient(to left, #6441a5, #2a0845)",display:"flex" }}>

                    <Button onClick={() => navigate("/")} sx={{ width: "fit-content" }}>
                        <ArrowBackIosIcon sx={{color: '#ffcc33'}}/>
                    </Button>

                    <Typography sx={{ color: '#ffcc33' }} variant="h5">Login Form</Typography>
                </Box>
                
                <Box marginY={"5%"}>
                    <TAInput label="Enter Email" onChange={(e) => setEmail(e.target.value)} />
                </Box>
                <Box marginY={"5%"}>
                    <TAInput label="Enter Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                </Box>
                <Box sx={{ margin: "2em 1em 2em 0.5em" }}>
                    New Here? <Link to="/signup">Create Account</Link>
                </Box>
                <Box sx={{ margin: "0em 1em 0em 0.5em" }}>
                    <TAButton label="Login" onClick={loginUser} />
                </Box>
            </Box>
        </Box>
    </>
}
export default LogInPg;