import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from "@mui/material";
import React from "react";

export default function Select(props) {
  const {
    label,
    name,
    value,
    error = null,
    onChange,
    options,
    ...others
  } = props;

  return (
    <FormControl variant="outlined" {...(error && { error: true })} {...others}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} name={name} value={value} onChange={onChange}>
        {options.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.title}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
