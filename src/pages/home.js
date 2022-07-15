import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ActionAreaCard from "../config/components/card";
import ResponsiveAppBar from "../config/components/navbar";
import { getData } from "../config/firebase/firebasemethods";

function HomePg() {

    const navigate = useNavigate();

    const [renderDetails, setRenderDetails] = useState([])
    // const [price, setPrice] = useState(40);
    useEffect(() => {
        getData("hotelDetails")
            .then((res) => {
                setRenderDetails(res)
            })
    }, [])

    let bookNow = (details) => {
        navigate("bookingform", { state: details })

    }
    // let checkNewfunc = (price) => {
    //     let b = price >= 15000
    //     console.log(b)

    // }

    const localStorageDataSignup = JSON.parse(localStorage.getItem("signUpData"))
    const localStorageDataLogin = JSON.parse(localStorage.getItem("signUpData"))

    // const handleInput = (e) => {
    //     setPrice(e.target.value);
    //     console.log(price)
    // }

    return <>
        <ResponsiveAppBar imageFletter={localStorageDataSignup ? localStorageDataSignup.userName : localStorageDataLogin} />

        {/* <input type="range" onInput={handleInput} />
        {renderDetails.filter(hotel => { return hotel.perDayPrice > parseInt(price, 10) }).map(hotel => {
            return <p key={hotel.hotelName}>{hotel.hotelName} | {hotel.perDayPrice} &euro; </p>
        })} */}

        {renderDetails.map((e) => {
            // let priceArray = [e.perDayPrice]
            // let filterPriceArray = priceArray.filter(checkNewfunc)
            return (<>

                <ActionAreaCard imgLink={e.imageLink} hotelName={e.hotelName} noOfRooms={e.rooms} service1={e.service1} service2={e.service2} service3={e.service3} perDayPrice={e.perDayPrice} buttonOnClick={() => bookNow(e)} buttonLabel="Book Now" />


            </>)
        })}
    </>
}



export default HomePg;