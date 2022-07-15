import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 20,
    label: '15000',
  },
  {
    value: 50,
    label: '30000',
  },
  {
    value: 100,
    label: '50000',
  },
];

function valuetext(value) {
  return `${value}`;
}

export default function DiscreteSliderMarks(props) {
  return (
    <Box sx={{ width: 300,marginX:"5%" }}>
      <Slider
        aria-label="Custom marks"
        defaultValue={20}
        getAriaValueText={valuetext}
        step={10}
        valueLabelDisplay="auto"
        marks={marks}
      />
    </Box>
  );
}
