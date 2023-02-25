import { Button } from "@mui/material";

function TAButton(props) {
    const { loading, label, disabled, onClick,fullWidth,color } = props;
    return <>
        <Button sx={{background:"linear-gradient(to left, #6441a5, #2a0845)",color:"#fdfc47"}} disabled={loading || disabled} onClick={onClick} variant="contained" fullWidth={fullWidth} color={color}>{loading ? "loading..." : label}</Button>
    </>
}
export default TAButton;