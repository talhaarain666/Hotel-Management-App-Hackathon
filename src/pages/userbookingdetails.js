import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getData } from "../config/firebase/firebasemethods";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function UserBookingDetails() {

    const [userBookingDetails, setUserBookingDetails] = useState([]);

    useEffect(() => {
        getData("bookingForm").then((res) => {
            // console.log(res);
            setUserBookingDetails(res)
        })
    }, [])

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));


    return <>

        <Typography variant="h3" sx={{backgroundColor:"lightyellow",padding:"1%",textAlign:"center" }} >User Booking Details</Typography>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell align="right">Email Address</StyledTableCell>
                        <StyledTableCell align="right">CNIC No.</StyledTableCell>
                        <StyledTableCell align="right">Contact</StyledTableCell>
                        <StyledTableCell align="right">Address</StyledTableCell>
                        <StyledTableCell align="right">No Of Persons</StyledTableCell>
                        <StyledTableCell align="right">No Of Days to Stay</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userBookingDetails.map((e) => (
                        <StyledTableRow key={e.name}>
                            <StyledTableCell component="th" scope="row">
                                {e.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{e.userData.email}</StyledTableCell>
                            <StyledTableCell align="right">{e.cnic}</StyledTableCell>
                            <StyledTableCell align="right">{e.contact}</StyledTableCell>
                            <StyledTableCell align="right">{e.address}</StyledTableCell>
                            <StyledTableCell align="right">{e.noOfPersons}</StyledTableCell>
                            <StyledTableCell align="right">{e.noOfDays}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    </>

}
export default UserBookingDetails;