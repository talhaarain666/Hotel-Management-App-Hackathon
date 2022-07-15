import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, Grid, List, ListItem, ListItemText } from '@mui/material';
import { Box } from '@mui/system';
import TAButton from './button';

export default function ActionAreaCard(props) {
    const { imgLink, hotelName, noOfRooms, perDayPrice, service, buttonLabel, buttonOnClick, service1, service2, service3,deleteBtn,button2Label,button2OnClick } = props;
    const [allServices, setAllServices] = React.useState([]);

    React.useEffect(() => {
        if (service) {
            setAllServices(service)
        }

    }, [])


    return (
        <Box sx={{ minWidth: 300, display: "inline-block" }}>
            <Card sx={{ margin: "5%" }}>
                {/* sx={{ maxWidth: 345 }} */}
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="160"
                        image={imgLink}
                        alt={hotelName}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {hotelName}
                        </Typography>
                        <Typography variant='p' component="div" color="text.secondary">
                            Rooms: {noOfRooms}
                        </Typography>
                        <Typography variant='p' component="div" color="text.secondary">
                            Per Day Price: {perDayPrice}
                        </Typography>
                        <List>
                            <ListItem disablePadding sx={{paddingLeft:"10px", backgroundColor: "lightyellow", marginY: "2%" }}>
                                <ListItemText primary="Our Services" />
                            </ListItem>
                            <ul>
                                <li>

                                    {service1}
                                </li>
                                <li>

                                    {service2}
                                </li>
                                <li>

                                    {service3}
                                </li>
                            </ul>
                            {allServices.map((e, i) => {
                                return <ul key={i}><li >{e}</li></ul>
                            })}
                        </List>
                    </CardContent>
                </CardActionArea>
                <TAButton color='info' fullWidth={true} label={buttonLabel} onClick={buttonOnClick} />
                {deleteBtn ? <TAButton color='error' fullWidth={true} label={button2Label} onClick={button2OnClick}/> : ""}
            </Card>
        </Box>
    );
}
