import { Box, FormControl, Stack } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import AuthCheck from "../components/AuthCheck";
import Feed from "../components/Feed";
import { criteriaData as initialSearchCriteria } from "../data/criteriaData";
import SearchArea from "../components/SearchArea";
import { productCategory as productCategoryData } from "../data/productCategory";
import ActivityFeed from "../components/ActivityFeed";

export default function Home() {
  const [searchCriteria, setSearchCriteria] = React.useState(
    initialSearchCriteria
  );

  // update criteriaData
  const handleCriteriaChange = (event, level) => {
    const arr = [...searchCriteria[level]];
    if (event.target.checked) {
      arr.indexOf(event.target.name) === -1
        ? arr.push(event.target.name)
        : null;
    } else {
      arr.indexOf(event.target.name) !== -1
        ? arr.splice(arr.indexOf(event.target.name), 1)
        : null;
    }

    setSearchCriteria({
      ...searchCriteria,
      [level]: arr,
    });
  };

  const searchOptions = {
    purpose: [
      {
        name: "find",
        label: "Find Something",
        checked: searchCriteria["purpose"].includes("find"),
      },
      {
        name: "help",
        label: "Help Someone",
        checked: searchCriteria["purpose"].includes("help"),
      },
      {
        name: "thought",
        label: "Thought",
        checked: searchCriteria["purpose"].includes("thought"),
      },
    ],
    transactionType: [
      {
        name: "free",
        label: "Free",
        checked: searchCriteria["transactionType"].includes("free"),
      },
      {
        name: "secondHand",
        label: "Second Hand",
        checked: searchCriteria["transactionType"].includes("secondHand"),
      },
      {
        name: "rent",
        label: "Rent",
        checked: searchCriteria["transactionType"].includes("rent"),
      },
      {
        name: "firstHand",
        label: "First Hand",
        checked: searchCriteria["transactionType"].includes("firstHand"),
      },
    ],
    productCategory: productCategoryData.map((category) => {
      return {
        name: category.id,
        label: category.label,
        checked: searchCriteria["productCategory"].includes(category.id),
      };
    }),
    shareTo: [
      {
        name: "public",
        label: "Public",
        checked: searchCriteria["shareTo"].includes("public"),
      },
      {
        name: "friends",
        label: "Friends",
        checked: searchCriteria["shareTo"].includes("friends"),
      },
    ],
  };

  return (
    <>
      <AuthCheck>
        <Box>
          {/* ---------------- Search Panel ----------------  */}
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Box
              flex={1}
              p={2}
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              <Box sx={{ display: "flex" }}>
                <FormControl
                  sx={{ m: 3 }}
                  component="fieldset"
                  variant="standard"
                ></FormControl>
              </Box>
              {Object.keys(searchOptions).map((level) => (
                <SearchArea
                  key={level}
                  level={level}
                  optionArray={searchOptions[level]}
                  handleCriteriaChange={handleCriteriaChange}
                />
              ))}
            </Box>
            {/* ---------------- Feed ----------------  */}
            <Box flex={4} p={2}>
              <Feed criteria={searchCriteria} />
            </Box>
            {/* ---------------- Right Bar ----------------  */}
            <Box flex={1} p={2}>
              <ActivityFeed />
            </Box>
          </Stack>
        </Box>
      </AuthCheck>
    </>
  );
}
