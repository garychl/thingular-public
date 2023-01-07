import { Box, Container, Grid, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

function convertToDisplay(data) {
  const displayData = {};
  const skip = [
    "imageURL",
    "createdAt",
    "postEndDate",
    "updatedAt",
    "uid",
    "slug",
    "periodUnit",
  ];
  const keyMapping = {
    // createdAt: "Post Date",
    // postEndDate: "Post End Date",
    postStatus: "Post Status",
    postTitle: "Post Title",
    postType: "Post Type",
    price: "Price",
    productCategory: "Product Category",
    productDescription: "Product Description",
    queueCount: "No. of people queueing",
    shareTo: "Share to",
    // updatedAt: "Last Updated",
    username: "User Name",
    remarks: "Remarks",
  };

  for (const [key, value] of Object.entries(data)) {
    if (!skip.includes(key)) {
      console.log(key, value);
      displayData[keyMapping[key]] = value;
      //   displayData[keyMapping[key]] =
      //     value != null ? value[0].toUpperCase() + value.slice(1) : "";
    }
    if (data.postType == "lend") {
      displayData["Price"] = "$" + data.price + " per " + data.periodUnit;
    }
  }
  return displayData;
}

function getProductDesc(data) {
  const displayData = convertToDisplay(data);
  const result = [];
  for (const [key, value] of Object.entries(displayData)) {
    result.push(
      <TableRow
        key={key}
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
        }}
      >
        <TableCell component="th" scope="row" sx={{ fontSize: 18 }}>
          {key}
        </TableCell>
        <TableCell align="right" sx={{ fontSize: 18 }}>
          {value}
        </TableCell>
      </TableRow>
    );
  }
  console.log(result);
  return result;
}

export default function ProductDescription({ post, imageRight = true }) {
  const direction = imageRight ? "row" : "row-reverse";
  return (
    <Box
      flexDirection={direction}
      sx={{
        mt: 15,
        display: "flex",
        alignItems: "center",
        gap: 3,
        border: 0,
      }}
    >
      <Box sx={{ border: 0 }}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table" sx={{ minWidth: 800 }}>
            <TableBody>{getProductDesc(post)}</TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ border: 0, justifyContent: "center" }}>
        <Image src={post.imageURL} alt="tmp" height="1200" width="900" />
      </Box>
    </Box>
  );
}
