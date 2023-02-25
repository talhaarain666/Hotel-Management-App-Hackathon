import * as React from 'react';
import Alert from '@mui/material/Alert';
import { Box, Snackbar } from '@mui/material';


export default function AlertComponent(props) {


    const [open, setOpen] = React.useState(true)

    return <>
      
        {props.alert &&
            <Snackbar open={open}>
                <Alert severity={props.alert.type} sx={{ width: '100%' }}>
                    {props.alert.msg}
                </Alert>
            </Snackbar>}

    </>
}