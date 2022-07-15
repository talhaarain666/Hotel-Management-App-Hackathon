import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LogOutUser() {

    const navigate = useNavigate();
    useEffect(() => {
        localStorage.clear()
        navigate("/")
    }, [])

    return <>

    </>
}

export default LogOutUser;