import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox(props) {
  return (
    <Autocomplete
      size='small'
      disablePortal
      id="combo-box-demo"
      options={bankNames}
      onChange={props.onChange}
      renderInput={(params) => <TextField {...params} label="Select Bank" />}
    />
  );
}

const bankNames = [
  { label: 'Bank Al-Habib' },
  { label: 'Meezan Bank' },
  { label: 'Bank Al-Falah' },

];
