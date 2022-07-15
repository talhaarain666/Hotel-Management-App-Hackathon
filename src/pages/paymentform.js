import { Box } from "@mui/system";
import TAButton from "../config/components/button";
import TAInput from "../config/components/input";
import ComboBox from "../config/components/autocompleteinput";
import { useState } from "react";

function PaymentForm() {

    const [userPaymentDetails, setUserPaymentDetails] = useState();

    let submitPaymentForm = () => {
        console.log(userPaymentDetails)
    }

    return <>


        <Box display={"flex"} justifyContent="center" alignItems={"center"} sx={{ height: "100vh", background: "linear-gradient(to right, #ffefba, #ffffff)" }}>
            <Box width={"80%"} display="flex" justifyContent="center" alignItems={"center"} sx={{ backgroundColor: "#F8F8F8", border: "10px ridge orange" }}>
                <Box>
                    <img width={"100%"} src="https://www.nicepng.com/png/detail/217-2178986_png-credit-cards-debit-and-credit-cards-png.png" />
                </Box>
                <Box display={"flex"} justifyContent="space-around" flexWrap={"wrap"}>
                    <Box width={"80%"}>
                        <ComboBox onChange={(e) => setUserPaymentDetails({ ...userPaymentDetails, bankName: e.target.innerText })} />
                        <TAInput fullWidth label="Enter Credit Card Number" onChange={(e) => setUserPaymentDetails({ ...userPaymentDetails, cardNumber: e.target.value })} />
                        <TAInput type="password" fullWidth label="Card Code" onChange={(e) => setUserPaymentDetails({ ...userPaymentDetails, cardCode: e.target.value })} />
                        <TAInput type="date" defaultValue="2023-01-01" fullWidth label="Expiry Date" onChange={(e) => setUserPaymentDetails({ ...userPaymentDetails, cardExpiryDate: e.target.value })} />
                        <TAButton label="Submit" onClick={submitPaymentForm} fullWidth />
                    </Box>
                </Box>
            </Box>
        </Box>
    </>
}

export default PaymentForm;