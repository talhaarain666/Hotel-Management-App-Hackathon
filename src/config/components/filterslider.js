import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}`;
}

export default function DiscreteSlider(props) {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
      sx={{color:"purple"}}
        aria-label="Temperature"
        defaultValue={5000}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={props.step}
        marks
        min={props.min}
        max={props.max}
        onChange={props.onChange}
      />
    </Box>
  );
}
