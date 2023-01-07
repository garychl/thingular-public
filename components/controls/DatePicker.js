import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { Box } from "@mui/system";

export default function DatePicker(props) {
  const { name, value, label, onChange, ...others } = props;

  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });
  return (
    <Box sx={{ width: "80%" }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label={label}
          inputFormat="MM/dd/yyyy"
          name={name}
          value={value}
          onChange={(date) => onChange(convertToDefEventPara(name, date))}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Box>
  );
}
