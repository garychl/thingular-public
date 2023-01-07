import { FormHelperText, TextField } from "@mui/material";
import React from "react";

export default function TextInput(props) {
  const { name, label, value, onChange, ...others } = props;
  return (
    <>
      <TextField
        variant="outlined"
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        {...others}
      />
    </>
  );
}
