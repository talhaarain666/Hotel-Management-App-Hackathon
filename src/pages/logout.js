import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { checkAuthUser, logOutUser } from "../config/firebase/firebasemethods";
import { Button } from "@mui/material";

function LogOutUser(props) {

    const dataFromRedux = useSelector((a) => a.user)
    // console.log(dataFromRedux)
    const navigate = useNavigate();
    useEffect(() => {

        logOutUser().then((res)=>{
            props.showAlert("Log out Successfully","success")
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