import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup as MuiRadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from "@mui/material";

export default function RadioGroup(props) {
  const { label, name, value, error = null, onChange, items } = props;

  return (
    <FormControl {...(error && { error: true })}>
      <FormLabel>{label}</FormLabel>
      <MuiRadioGroup row name={name} value={value} onChange={onChange}>
        {items.map((item) => {
          return (
            <FormControlLabel
              key={item.id}
              value={item.id}
              control={<Radio />}
              label={item.title}
            />
          );
        })}
      </MuiRadioGroup>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
