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
import allPosts from "../data/dummyData";
import { PostsCriteriaContext } from "../lib/context";
import { useContext } from "react";
import { PostsCriteriaProvider } from "../lib/context";
import PurposeArea from "./PurposeArea";

export default function SearchPanel() {
  //   const [state, setState] = React.useState({
  //     purpose: {
  //       find: true,
  //       help: true,
  //       thought: true,
  //     },
  //   });

  //   const handleChange = (event) => {
  //     const level = event.target.level;
  //     setState({
  //       ...state,
  //       [level]: {
  //         [event.target.name]: event.target.checked,
  //       },
  //     });
  //   };

  //   const { find, help, thought } = state["purpose"];

  return (
    <PostsCriteriaProvider>
      <Box sx={{ display: "flex" }}>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Purpose</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={postsCriteria["purpose"]["find"]}
                  onChange={(event) =>
                    updatePostsCriteria(
                      event.target.level,
                      event.target.name,
                      event.target.checked
                    )
                  }
                  name="find"
                  level="purpose"
                />
              }
              label="Find Something"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={postsCriteria["purpose"]["find"]}
                  onChange={(event) =>
                    updatePostsCriteria(
                      event.target.level,
                      event.target.name,
                      event.target.checked
                    )
                  }
                  name="help"
                  level="purpose"
                />
              }
              label="Help Someone"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={postsCriteria["purpose"]["find"]}
                  onChange={(event) =>
                    updatePostsCriteria(
                      event.target.level,
                      event.target.name,
                      event.target.checked
                    )
                  }
                  name="thought"
                  level="purpose"
                />
              }
              label="Thoughts"
            />
          </FormGroup>
        </FormControl>
      </Box>
    </PostsCriteriaProvider>
  );
}
