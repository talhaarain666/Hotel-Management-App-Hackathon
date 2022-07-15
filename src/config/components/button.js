import { Button } from "@mui/material";

function TAButton(props) {
    const { loading, label, disabled, onClick,fullWidth,color } = props;
    return <>
        <Button disabled={loading || disabled} onClick={onClick} variant="contained" fullWidth={fullWidth} color={color}>{loading ? "loading..." : label}</Button>
    </>
}
export default TAButton;