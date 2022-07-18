import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { checkAuthUser, logOutUser } from "../config/firebase/firebasemethods";
import { Button } from "@mui/material";

function LogOutUser() {

    const dataFromRedux = useSelector((a) => a.user)
    // console.log(dataFromRedux)
    const navigate = useNavigate();
    useEffect(() => {

        checkAuthUser(dataFromRedux).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
        
        logOutUser().then((res)=>{
            alert(res)
        }).catch((err)=>{
            console.log(err)
        })
        localStorage.clear()
        navigate("/")
    }, [])


  


    return <>

    </>
}

export default LogOutUser;