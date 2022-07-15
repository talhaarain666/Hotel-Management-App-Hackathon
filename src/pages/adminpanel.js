import { useEffect, useState } from "react";
import TAButton from "../config/components/button";
import ActionAreaCard from "../config/components/card";
import TAInput from "../config/components/input";
import { deleteData, getData, saveDetails, updateData } from "../config/firebase/firebasemethods";
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';


const drawerWidth = 300;


function AdminPanel() {

    const [hotelDetails, setHotelDetails] = useState({});
    const [renderDetails, setRenderDetails] = useState([])
    const [editAllDetails, seteditAllDetails] = useState()


    let saveDetails = () => {
        saveDetails("hotelDetails", hotelDetails)
        // console.log(hotelDetails)
        setRenderDetails([...renderDetails, hotelDetails])
    }

    useEffect(() => {
        getData("hotelDetails")
            .then((res) => {
                setRenderDetails(res)
                // console.log(renderDetails)
            })
    }, [])

    let editDetails = (e) => {
        // console.log(e)
        seteditAllDetails(e)

    }
    let updateDetails = () => {
        updateData(editAllDetails, "hotelDetails", editAllDetails.id).then(() => {
            alert("Updated Successfully")

        }).catch((err) => {
            console.log(err)
        })
    }
    let deleteCard = (id) => {
       deleteData("hotelDetails", id)
        
    }

    return <>

        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Admin Panel
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />

                <Divider />
                <TAInput label="Image Link" onChange={(e) => setHotelDetails({ ...hotelDetails, imageLink: e.target.value })} />
                <TAInput label="Hotel Name" onChange={(e) => setHotelDetails({ ...hotelDetails, hotelName: e.target.value })} />
                <TAInput label="Rooms" onChange={(e) => setHotelDetails({ ...hotelDetails, rooms: e.target.value })} />
                <TAInput label="Per Day Price" onChange={(e) => setHotelDetails({ ...hotelDetails, perDayPrice: e.target.value })} />
                <TAInput label="Service 1" onChange={(e) => setHotelDetails({ ...hotelDetails, service1: e.target.value })} />
                <TAInput label="Service 2" onChange={(e) => setHotelDetails({ ...hotelDetails, service2: e.target.value })} />
                <TAInput label="Service 3" onChange={(e) => setHotelDetails({ ...hotelDetails, service3: e.target.value })} />
                <TAButton label="Add" onClick={saveDetails} />

                <TAInput value={editAllDetails ? editAllDetails.imageLink : ""} label="Image Link" onChange={(e) => seteditAllDetails({ ...editAllDetails, imageLink: e.target.value })} />
                <TAInput value={editAllDetails ? editAllDetails.hotelName : ""} label="Hotel Name" onChange={(e) => seteditAllDetails({ ...editAllDetails, hotelName: e.target.value })} />
                <TAInput value={editAllDetails ? editAllDetails.rooms : ""} label="Rooms" onChange={(e) => seteditAllDetails({ ...editAllDetails, rooms: e.target.value })} />
                <TAInput value={editAllDetails ? editAllDetails.perDayPrice : ""} label="Per Day Price" onChange={(e) => seteditAllDetails({ ...editAllDetails, perDayPrice: e.target.value })} />
                <TAInput value={editAllDetails ? editAllDetails.service1 : ""} label="Service 1" onChange={(e) => seteditAllDetails({ ...editAllDetails, service1: e.target.value })} />
                <TAInput value={editAllDetails ? editAllDetails.service2 : ""} label="Service 2" onChange={(e) => seteditAllDetails({ ...editAllDetails, service2: e.target.value })} />
                <TAInput value={editAllDetails ? editAllDetails.service3 : ""} label="Service 3" onChange={(e) => seteditAllDetails({ ...editAllDetails, service3: e.target.value })} />

                <TAButton label="Update" onClick={updateDetails} />
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Toolbar />
                {renderDetails.map((e, i) => {
                    return (<>

                        <ActionAreaCard imgLink={e.imageLink} hotelName={e.hotelName} noOfRooms={e.rooms} service1={e.service1} service2={e.service2} service3={e.service3} perDayPrice={e.perDayPrice} buttonOnClick={() => editDetails(e)} buttonLabel="Edit" deleteBtn button2Label="Delete" button2OnClick={() => deleteCard(e.id)} />

                    </>)
                })}
            </Box>
        </Box>












    </>

}

export default AdminPanel;