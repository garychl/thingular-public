import {
  Stack,
  Typography,
  Box,
  Container,
  Button,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from "@mui/material";
import React from "react";

const levelLabelMapping = {
  purpose: "Purpose",
  transactionType: "Transaction Type",
  productCategory: "Product Category",
  shareTo: "Visibility",
};

export default function SearchArea({
  level,
  optionArray,
  handleCriteriaChange,
}) {
  return (
    <Box>
      {" "}
      <FormLabel component="legend">{levelLabelMapping[level]}</FormLabel>
      <FormGroup>
        {optionArray.map((option) => (
          <FormControlLabel
            key={option.name}
            control={
              <Checkbox
                checked={option.checked}
                onChange={(event) => handleCriteriaChange(event, level)}
                name={option.name}
              />
            }
            label={option.label}
          />
        ))}
      </FormGroup>
    </Box>
  );
}
