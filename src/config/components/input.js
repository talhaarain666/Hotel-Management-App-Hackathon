import { TextField } from "@mui/material";

function TAInput(props) {
    const { label, type, onChange, value, fullWidth, required,autoFocus,defaultValue } = props;
   
   return <>
        <TextField sx={{ marginY: "1%", marginX: "3%" }} label={label} variant="standard" type={type} fullWidth={fullWidth} onChange={onChange} value={value} required={required} autoFocus={autoFocus} defaultValue={defaultValue}/>
    </>
}
export default TAInput;